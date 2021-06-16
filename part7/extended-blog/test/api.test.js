const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./test_helper");

const api = supertest(app);
let token;

beforeAll(async () => {
  await api
    .post("/api/users")
    .send({ username: "test", name: "test", password: "test" });

  const response = await api
    .post("/api/login")
    .send({ username: "test", password: "test" });
  token = response.body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("get blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("should require authentication to save a blog", async () => {
  const newBlog = {
    title: "Type wars",
    author: "Unknown",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  };

  await api.post("/api/blogs").send(newBlog).expect(401).expect("Unauthorized");

  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(initialBlogs.length);
});

test("save a blog", async () => {
  const newBlog = {
    title: "Type wars",
    author: "Unknown",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: token.id,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(initialBlogs.length + 1);
  const blogs = res.body.map((blog) => blog.title);
  expect(blogs).toContainEqual("Type wars");
});

test("verify blog list has a unique identifier", async () => {
  const { body: blogs } = await api.get("/api/blogs");

  expect(blogs.forEach((blog) => expect(blog.id).toBeDefined()));
});

test("if the likes property is missing, default value to 0", async () => {
  const newBlog = {
    title: "Type wars",
    author: "Unknown",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: token.id,
  };

  const { body: savedBlog } = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(savedBlog.likes).toBe(0);
});

test("return bad request if title and url is missing", async () => {
  const newBlog = {
    author: "John Doe",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog);
  expect(response.statusCode).toBe(400);

  const { body: blogs } = await api.get("/api/blogs");
  expect(blogs).toHaveLength(initialBlogs.length);
});

test("confirm deletion of a blog", async () => {
  const blogsAtStart = await blogsInDb();
  const newBlog = {
    title: "Type wars",
    author: "Unknown",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: token.id,
  };

  const { body: savedBlog } = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api
    .delete(`/api/blogs/${savedBlog.id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(204);

  const { body: blogsAtEnd } = await api.get("/api/blogs");
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  const contents = blogsAtEnd.map((blog) => blog.title);

  expect(contents).not.toContain(savedBlog.title);
});

test("update a blog", async () => {
  const blogsAtStart = await blogsInDb();
  const { title, author, url, id } = blogsAtStart[0];

  const blog = { title, url, author, likes: 30 };

  const { body: updatedBlog } = await api
    .put(`/api/blogs/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(blog)
    .expect(200);

  expect(updatedBlog.likes).toBe(30);
});

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});
