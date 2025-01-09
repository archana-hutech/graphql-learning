import { makeExecutableSchema } from "graphql-tools";
import { demoTypeDef } from "./demo-api/typedefs.js";
import { demoResolver } from "./demo-api/reslover.js";

export const schema = makeExecutableSchema({
    typeDefs:[
        demoTypeDef
    ],
    resolvers:[
        demoResolver
    ]
})