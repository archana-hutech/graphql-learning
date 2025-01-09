import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
const port = process?.env?.PORT || 5001;
const app = express();
import { ApolloServer } from "apollo-server-express";
import { schema } from "./src/api/schema.js";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

const server = new ApolloServer({
  schema
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}${server.graphqlPath}`);
    console.log(`Apollo Sandbox available at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();
