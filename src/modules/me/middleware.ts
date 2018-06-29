import { Resolver } from "../../types/graphql-utils";

export default async ( resolver: Resolver, parent: any, args: any,  context: any,  info: any) => 
    {   // console.log('/me/middleware called -context=',context.session)
       // if(!context.session||!context.session.userid){throw Error("no cookie");} // if user is not logged in
      //  const result = await resolver(parent, args, context, info); // add middleware before this and then do anything afterewards
      // return result; 
       return resolver(parent, args, context, info);

    };