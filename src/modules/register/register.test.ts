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

let getHost = () => "";
beforeAll(async () => 
{ // await createTypeormConn(); 
 const app=await startServer();
 const { port } = app.address();
 getHost = () => `http://127.0.0.1:${port}`;
});

const email="bb"; const password="bb"; 
const mutation = `mutation {  register(email: "${email}", password: "${password}") { path  message} }`;
test("Register user", async () =>
{ // await startServer();
 // await createTypeormConn();
  // const response = await request(host, mutation);
  const response = await request(getHost(), mutation);
  // expect(response).toEqual({ register: true }); // after error handling register:null
  expect(response).toEqual({ register: null });
  // await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1); // it should be unique user
  const user = users[0]; //  take first entry of the array
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);  // password should be hashed so it will not be equal to user entered value
  // ---------------in case error------------do below---------------
  const response2: any = await request(getHost(), mutation);
  expect(response2.register).toHaveLength(1);  // in case error---register will return an array--
  expect(response2.register[0].path).toEqual("email"); // first element of array will be email, second will be error
});