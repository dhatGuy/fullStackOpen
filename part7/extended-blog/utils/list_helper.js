const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    return acc + cur.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const fav = blogs.sort((a, b) => b.likes - a.likes)[0];
  return { title: fav.title, author: fav.author, likes: fav.likes };
};

const mostBlogs = (blogs) => {
  const most = blogs.sort((a, b) => b.likes - a.likes)[0];
  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
