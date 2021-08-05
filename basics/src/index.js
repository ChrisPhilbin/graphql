import { GraphQLServer } from "graphql-yoga";

//test data for users

const users = [
  {
    id: "abc123",
    name: "Andrew",
    email: "andrew@example.com",
    age: 28,
  },
  {
    id: "abc456",
    name: "Shelly",
    email: "shelly@example.com",
    age: 8,
  },
  {
    id: "abc789",
    name: "Abby",
    email: "abby@example.com",
    age: 5,
  },
];

//types/application schema

const typeDefs = `
    type Query {
      users(query: String): [User!]!
      me: User!
      post: Post!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

//resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      } else {
        return users.filter((user) => {
          return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
      }
    },
    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@example.com",
        age: 28,
      };
    },
    post() {
      return {
        id: "123456",
        title: "Title of first post",
        body: "This is the body of the first post",
        published: true,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("Server is running!"));
