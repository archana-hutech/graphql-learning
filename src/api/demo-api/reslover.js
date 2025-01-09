import { getGreeting } from "./Query/getGreeting.js";
import { createGreeting } from "./Mutation/createGreeting.js";

export const demoResolver = {
  // Query: {
  //   greeting: () => "Hello, World!",
  // },

  Mutation: {
    createGreeting: async (parent, _args, context) =>
      createGreeting(parent, _args, context),
  },
  Query: {
    getGreeting: async (parent, _args, context) =>
      getGreeting(parent, _args, context),
  },
};
