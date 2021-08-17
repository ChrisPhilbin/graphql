import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4455",
});

prisma.exists
  .User({
    id: "cksejw4l2002b0834yy3zqovd",
  })
  .then((exists) => console.log(exists));

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId,
  });

  if (!userExists) {
    throw new Error("User not found.");
  }

  const post = await prisma.mutation.createPost(
    {
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    },
    "{ author { id name email posts { id title published } } }"
  );
  return post.author;
};

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId,
  });

  if (!postExists) {
    throw new Error("Post not found.");
  }

  const post = await prisma.mutation.updatePost(
    {
      where: {
        id: postId,
      },
      data,
    },
    "{  author { id name email posts { id title published } } }"
  );

  return post.author;
};

// createPostForUser("cksejw4l2002b0834yy3zqovd", {
//   title: "Great books",
//   body: "War of art",
//   published: true,
// })
//   .then((user) => console.log(JSON.stringify(user)))
//   .catch((error) => console.log(error.message));

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "My next post is now live",
//         body: "This is amazing!",
//         published: true,
//         author: {
//           connect: {
//             id: "cksejw4l2002b0834yy3zqovd",
//           },
//         },
//       },
//     },
//     "{id title body published}"
//   )
//   .then((data) => console.log(JSON.stringify(data)));
