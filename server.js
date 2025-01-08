const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process?.env?.PORT || 5001;
const app = express();
const { makeExecutableSchema } = require("graphql-tools");
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

// Initialize Prisma Client
const prisma = new PrismaClient();

//define the type
const typeDefinition = `
      type Query{
        greeting:String
      }
      
      type Mutation {
        createGreeting(text: String!): String
  }
`;

const resolverObject = {
  // Query: {
  //   greeting: () => "Hello, World!",
  // },
  Query: {
    greeting: async () => {
      const greeting = await prisma.greeting.findFirst();
      return greeting ? greeting.text : 'No greeting found!';
    },
  },
  Mutation: {
    createGreeting: async (_, { text }) => {
      const newGreeting = await prisma.greeting.create({
        data: { text },
      });
      return `Greeting created: ${newGreeting.text}`;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverObject,
});

// app.use("/graphql", graphqlExpress({ schema }));
// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

const server = new ApolloServer({
  schema
});
// app.get("/", (req, res) => {
//   res.send("Welcome to the Express Server!");
// });

// app.listen(port, () => {
//   console.log("🚀 Server is running at http://localhost:", port);
// });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}${server.graphqlPath}`);
    console.log(`Apollo Sandbox available at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();

