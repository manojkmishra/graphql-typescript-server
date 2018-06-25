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

const email="bb@bb.com"; const password="bb"; 
const mutation = `mutation {  register(email: "${email}", password: "${password}")  }`;
test("Register user", async () =>
{ // await startServer();
 // await createTypeormConn();
  // const response = await request(host, mutation);
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ register: true });
  // await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1); // it should be unique user
  const user = users[0]; //  take first entry of the array
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);  // password should be hashed so it will not be equal to user entered value
});