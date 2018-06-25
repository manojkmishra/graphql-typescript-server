// import { ResolverMap } from "./types/graphql-utils";
import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
// import {User} from './entity/User'; 
import * as yup from "yup";
import { formatYupError } from "../../utils/formatYupError";

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255)
});

export const resolvers: ResolverMap = 
{
 // Query: {    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || "World"}`  },
  Query:{bye: ()=>"bye"},
  Mutation: 
  { // register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => 
    register: async (_, args: GQL.IRegisterOnMutationArguments) => 
    { // error handling
      try {   await schema.validate(args, { abortEarly: false });    } 
      catch (err) {  // console.log('/modules/reg/resolvers-error=',err);   
                     return formatYupError(err);
                   }
      const { email, password } = args;
      const userAlreadyExists = await User.findOne({  where: { email }, select: ["id"] });
      if (userAlreadyExists) 
      {   
       // throw Error("error here");
       // throw Error({"email already exist"});
       return [{ path: "email",  message: "already taken" }]; // return array of errors from resovlers
      }
             
      const hashedPassowrd = await bcrypt.hash(password, 10); // this is async---but we are waiting(ie wait till its done--then move ahead)
      const user= User.create({email, password:hashedPassowrd }); // await added---so wait till its finished
      await user.save(); 
    //  return true;
      return null; // changed to this from true in error handling
     // return email + password;  
    }
  }
};