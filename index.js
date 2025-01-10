const expess = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const { makeExecutableSchema } = require("graphql-tools");
const port = 5002;

const app = expess();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

//initialize prisma client

const prisma = new PrismaClient();

// Define the type definitions
const typeDefinition = `
   type Query {
    greeting: String
    }

    type Mutation {
    createGreeting(text: String!): String
    }
`

const resolverObject={
    Query: {
    greeting: async () => {
      const greeting = await prisma.greeting.findFirst({
        orderBy:{
            createdAt: 'desc',
        }
      });
      return greeting? greeting.text : 'No greeting found!';
    },
    getAllGreeting: async () =>{
      const allGreeting = await prisma.greeting.findMany();
      return allGreeting.map((greeting) => greeting.text);
    }
  },
  Mutation: {
    createGreeting: async (_, { text }) => {
      const newGreeting = await prisma.greeting.create({
        data: { text },
      });
      return newGreeting.text;
    },
  }
}

const schema = makeExecutableSchema({typeDefs:typeDefinition, resolvers:resolverObject})

const server = new ApolloServer({ schema, context: { prisma } });

async function startServer() {
    await server.start()
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port }, () =>
      console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
}
 startServer();
