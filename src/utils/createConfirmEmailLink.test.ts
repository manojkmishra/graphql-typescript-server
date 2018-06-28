import fetch from "node-fetch";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { User } from "../entity/User";
import { Connection } from "typeorm";
import { redis } from "../redis";

let userId = "";


let conn: Connection;
beforeAll(async () => {
  conn = await createTypeormConn();
  const user = await User.create({    email: "bob5@bob.com",    password: "jlkajoioiqwe"  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});


  test("Make sure it confirms user and clears key in redis", async () => 
  {
    
   // console.log('/email--1st test-process.env.TEST_HOST', process.env.TEST_HOST);
   // console.log('/email--1st test-userId', userId);
   // console.log('/email--1st test-redis', redis);
    const url = await createConfirmEmailLink( process.env.TEST_HOST as string,userId, redis );

    const response = await fetch(url);
    const text = await response.text();
    // console.log('/utils/createconfirmemaillinktest--text====',text);
    expect(text).toEqual("ok");
    const user = await User.findOne({ where: { id: userId } });
  //  expect((user as User).confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });



