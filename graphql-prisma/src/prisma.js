import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4455",
});

const createPostForUser = async (authorId, data) => {
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
    "{ id }"
  );
  const user = await prisma.query.user(
    {
      where: {
        id: authorId,
      },
    },
    "{ id name email posts { id title published } }"
  );
  return user;
};

createPostForUser("cksejw4l2002b0834yy3zqovd", {
  title: "Great books",
  body: "War of art",
  published: true,
}).then((user) => console.log(JSON.stringify(user)));

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
