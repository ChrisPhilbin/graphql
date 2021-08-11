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

const db = {
  users,
  posts,
  comments,
};

export default db;
