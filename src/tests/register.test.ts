// function sum(a, b) {  return a + b;}
// test('adds 1 + 2 to equal 3', () => {  expect(sum(1, 2)).toBe(3);});
// import {startServer} from "..";
import { request } from "graphql-request";
import { host } from "./constants";

const email="aa@aa.com"; const password="aa"; 
const mutation = `mutation {  register(email: "${email}", password: "${password}")  }`;
test("Register user", async () =>
{ // await startServer();
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
});