require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Success"))
  .catch((error) => console.log(error.message));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers["auth-token"] : null;
    if (auth) {
      const decodedToken = jwt.verify(auth, process.env.JWT_SECRET);
      const currentUser = await User.findOne({ _id: decodedToken.id });
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
