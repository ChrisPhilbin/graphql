const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    } else {
      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
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
};

export default Query;
