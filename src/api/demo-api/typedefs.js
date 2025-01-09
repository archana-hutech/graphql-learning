//define the typedefinitions
export const demoTypeDef = `    
      type Mutation {
        createGreeting(text: String!): String
    }

    type Query{
        getGreeting:String
    }
`;