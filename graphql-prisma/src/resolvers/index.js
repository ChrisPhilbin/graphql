import { extractFragmentReplacements } from "graphql-binding";
import Query from "./Query";
import Mutation from "./Mutation";
import Subscription from "./Subscription";
import Post from "./Post";
import User from "./User";
import Comment from "./Comment";

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
