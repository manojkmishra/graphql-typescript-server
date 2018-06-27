import { request } from "graphql-request";
import { invalidLogin } from "./errorMessages";

const email = "manojkm1980@gmail.com";
const password = "jalksdf";

const loginMutation = (e: string, p: string) => `mutation {  login(email: "${e}", password: "${p}") {    path    message  }}`;

describe("login", () => 
 {  test("email not found send back error", async () => 
       {   const response = await request( process.env.TEST_HOST as string, loginMutation(email, password) );
           expect(response).toEqual({  login:[{  message: invalidLogin, path: "email" }]  });
       
        });

 });