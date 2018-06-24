import { ResolverMap } from "./types/graphql-utils";
import * as bcrypt from "bcryptjs";
import {User} from './entity/User'; 

export const resolvers: ResolverMap = 
{
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`
  },
  Mutation: {
    register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => 
    { const hashedPassowrd = await bcrypt.hash(password, 10); //this is async---but we are waiting(ie wait till its done--then move ahead)
      await User.create({email, password:hashedPassowrd }); //await added---so wait till its finished
      return true;
     // return email + password;  
    }
  }
};