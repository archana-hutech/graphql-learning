//define the typedefinitions
export const demoTypeDef = `    
    type Greeting {
      id: Int
      text: String!
    }
      type Mutation {
        createGreeting(text: String!): String
    }

    type Query{
        getGreeting:String
        getAllGreeting: [Greeting!]!
    }
`;
