import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { createMiddleware } from "../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { session }) => // first _ is resolver param from middleware.ts
     console.log('/me/resolver-session.userId=',session.userId) || User.findOne({ where: { id: session.userId } })
    )
  }
};