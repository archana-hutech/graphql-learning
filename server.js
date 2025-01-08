const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process?.env?.PORT || 5001;
const app = express();
const { makeExecutableSchema } = require("graphql-tools");
const {graphiqlExpress, graphqlExpress} = require("apollo-server-express")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

//define the type
const typeDefinition = `
      type Query{
      greeting:String
      }`

const resolverObject = {
  Query: {
    greeting: () => "Hello, World!"
  }
}

const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverObject,
});

app.use('/graphql', graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({endpointURL:'/graphql'}))
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

app.listen(port, () => {
  console.log("server listening on port", port);
});
