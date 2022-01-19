require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core/dist/plugin/drainHttpServer");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core/dist/plugin/landingPage/graphqlPlayground");
const { SubscriptionServer } = require("subscriptions-transport-ws");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Success"))
  .catch((error) => console.log(error.message));

// mongoose.set("debug", true);

(async function (params) {
  const app = express();
  const httpServer = require("http").createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers["auth-token"] : null;
      if (auth) {
        try {
          const decodedToken = jwt.verify(auth, process.env.JWT_SECRET);
          const currentUser = await User.findOne({ _id: decodedToken.id });
          return { currentUser };
        } catch (error) {
          return null;
        }
      }
    },
  });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
