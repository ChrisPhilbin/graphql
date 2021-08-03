import { GraphQLServer } from "graphql-yoga";

//types/application schema

const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float

    }
`;

//resolvers

const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    name() {
      return "Name";
    },
    age() {
      return "34";
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("Server is running!"));
