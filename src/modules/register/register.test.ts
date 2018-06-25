// function sum(a, b) {  return a + b;}
// test('adds 1 + 2 to equal 3', () => {  expect(sum(1, 2)).toBe(3);});
// import {startServer} from "..";
import { request } from "graphql-request";
import { startServer } from "../../startServer";
import { User } from "../../entity/User";
// import { host } from "./constants";
// import { createConnection } from "typeorm";
// import { User } from "../entity/User";
// import { createTypeormConn } from "../utils/createTypeormConn";
// import { startServer } from "../startServer";
import {  duplicateEmail,  emailNotLongEnough,  invalidEmail,  passwordNotLongEnough} from "./errorMessages";

let getHost = () => "";
beforeAll(async () => 
{ // await createTypeormConn(); 
 const app=await startServer();
 const { port } = app.address();
 getHost = () => `http://127.0.0.1:${port}`;
});

const email="bbbb@bb.com"; const password="bb"; 
// const mutation = 
const mutation = (e: string, p: string) => `
mutation {  register(email: "${e}", password: "${p}") { path  message} }`;
test("Register user", async () =>
{ // await startServer();
 // await createTypeormConn();
  // const response = await request(host, mutation);
  // --------------------error handling---to check if we can register a user-----------------------------------
  const response = await request(getHost(), mutation(email, password));
  // expect(response).toEqual({ register: true }); // after error handling register:null
  expect(response).toEqual({ register: null });
  // await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1); // it should be unique user
  const user = users[0]; //  take first entry of the array
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);  // password should be hashed so it will not be equal to user entered value
  // ---------------in case error-------duplicate email---------------
  const response2: any = await request(getHost(), mutation(email, password));
  expect(response2.register).toHaveLength(1);  // in case error---register will return an array--
 // expect(response2.register[0].path).toEqual("email"); // first element of array will be email, second will be error
 expect(response2.register[0]).toEqual({  path: "email",  message: duplicateEmail});
// -----------------------------------error handling---catch bad email
const response3: any = await request(getHost(), mutation("b", password));
expect(response3).toEqual(
{  register: [ { path: "email", message: emailNotLongEnough },
               { path: "email", message: invalidEmail  }
             ]
});
// -----------------------------------------catch bad password
const response4: any = await request(getHost(), mutation(email, "ad"));
expect(response4).toEqual({  register: [{ path: "password", message: passwordNotLongEnough } ]});
// -----------------------------------------catch bad password and bad email
const response5: any = await request(getHost(), mutation("df", "ad"));
expect(response5).toEqual(
  {  register: [{ path: "email", message: emailNotLongEnough },
                { path: "email", message: invalidEmail },
                { path: "password", message: passwordNotLongEnough }
               ]
  });
  
});