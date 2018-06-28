import { Resolver, GraphQLMiddlewareFunc } from "../types/graphql-utils";

export const createMiddleware = (
  middlewareFunc: GraphQLMiddlewareFunc,    // coming from /modules/me/middleware.ts file
  resolverFunc: Resolver            // comming from /me/resolvers.ts
) => (parent: any, args: any, context: any, info: any) =>
middlewareFunc(resolverFunc, parent, args, context, info);