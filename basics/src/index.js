import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

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

const posts = [
  {
    id: "123",
    title: "First post title",
    body: "Body of the first post",
    published: true,
    author: "abc123",
  },
  {
    id: "456",
    title: "Second post title",
    body: "Body of the second post",
    published: true,
    author: "abc123",
  },
  {
    id: "789",
    title: "Third post title",
    body: "Body of the last post",
    published: false,
    author: "abc789",
  },
];

const comments = [
  {
    id: "1",
    text: "This is the first comment",
    author: "abc123",
    post: "123",
  },
  {
    id: "2",
    text: "Today is Sunday!",
    author: "abc456",
    post: "456",
  },
  {
    id: "3",
    text: "The weather is nice outside today",
    author: "abc456",
    post: "123",
  },
  {
    id: "4",
    text: "The crow flies west at sundown",
    author: "abc789",
    post: "789",
  },
];

//types/application schema

const typeDefs = `
    type Query {
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      me: User!
      user: User!
      post: Post!
      comments: [Comment!]!
    }

    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
      createComment(text: String!, author: ID!, post: ID!): Comment!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
      comments: [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
    comments(parent, args, cts, info) {
      return comments;
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.email;
      });
      if (emailTaken) {
        throw new Error("This email address has already been taken!");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.author;
      });

      if (!userExists) {
        throw new Error("The user ID provided is not valid.");
      }

      const post = {
        id: uuidv4(),
        author: args.author,
        title: args.title,
        body: args.body,
        published: args.published,
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => {
        return user.id === args.author;
      });

      const postExists = posts.some((post) => {
        return post.id === args.post && post.published;
      });

      if (!userExists || !postExists) {
        throw new Error("User or post are invalid.");
      }

      const comment = {
        id: uuidv4(),
        text: args.text,
        author: args.author,
        post: args.post,
      };

      comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log("Server is running!"));
