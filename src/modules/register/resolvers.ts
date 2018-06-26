// tslint:disable
import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
// import {User} from './entity/User'; 
import * as yup from "yup";
import { formatYupError } from "../../utils/formatYupError";
import {  duplicateEmail,  emailNotLongEnough,  invalidEmail,  passwordNotLongEnough} from "./errorMessages";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";

const schema = yup.object().shape(
{  email: yup.string().min(3, emailNotLongEnough).max(255).email(invalidEmail),
   password: yup.string().min(3, passwordNotLongEnough).max(255)
});

export const resolvers: ResolverMap = 
{
  Query:{bye: ()=>"bye"},
  Mutation: 
  { register: async (_, args: GQL.IRegisterOnMutationArguments,{redis, url}) => 
    { try {   await schema.validate(args, { abortEarly: false });    } 
      catch (err) {  return formatYupError(err);
                   }
      const { email, password } = args;
      const userAlreadyExists = await User.findOne({  where: { email }, select: ["id"] });
      if (userAlreadyExists) 
      {   return [{ path: "email", 
                     message: duplicateEmail
                }]; // return array of errors from resovlers
      }
             
      const hashedPassowrd = await bcrypt.hash(password, 10); // this is async---but we are waiting(ie wait till its done--then move ahead)
      const user= User.create({email, password:hashedPassowrd }); // await added---so wait till its finished
      await user.save(); 
      // tslint:disable-next-line
      const link = await createConfirmEmailLink(url, user.id, redis);
      console.log('register-resolver-LInk=',link);
      return null; // changed to this from true in error handling
    }
  }
};