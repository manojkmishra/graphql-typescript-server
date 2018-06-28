import { request } from "graphql-request";

import { User } from "../../entity/User";
import { duplicateEmail, emailNotLongEnough, invalidEmail, passwordNotLongEnough} from "./errorMessages";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";
/*
let getHost = () => "";
beforeAll(async () => 
{ // await createTypeormConn(); 
    const app=await startServer();
    const { port } = app.address();
    getHost = () => `http://127.0.0.1:${port}`;
});
*/
const getHost=process.env.TEST_HOST as string;
const email="bbbb@bb.com"; const password="bbb"; 
const mutation = (e: string, p: string) => `
    mutation { register(email: "${e}", password: "${p}") { path message} }`;

let conn: Connection;
beforeAll(async () => {   conn = await createTypeormConn();    });
afterAll(async () => {  conn.close();   });
    
describe("Register user", async () => 
{ it("check for duplicate emails", async () => // it or test----it can be any of the two
  { // --------------------error handling-----------------------------------
    const response = await request(getHost, mutation(email, password));
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1); // it should be unique user
    const user = users[0]; // take first entry of the array
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password); // password should be hashed so it will not be equal to user entered value
    // ---------------in case error-------duplicate email---------------
    const response2: any = await request(getHost, mutation(email, password));
    expect(response2.register).toHaveLength(1); // in case error---register will return an array--
    expect(response2.register[0]).toEqual({ path: "email", message: duplicateEmail}); // first element of array will be email, second will be error
  });
  // -----------------------------------error handling---catch bad email
  it("check bad email", async () => // ----------------we can put test or it anything of the two
  { const response3: any = await request(getHost, mutation("b", password));
  expect(response3).toEqual(
     { register: [ { path: "email", message: emailNotLongEnough },
                   { path: "email", message: invalidEmail }
                  ] 
    });
  });
  // -----------------------------------------catch bad password
  it("check bad password", async () => 
  { const response4: any = await request(getHost, mutation(email, "ad"));
  expect(response4).toEqual({ register: [{ path: "password", message: passwordNotLongEnough } ]});
  });
// -----------------------------------------catch bad password and bad email
  it("check bad password and bad email", async () => 
  { const response5: any = await request(getHost, mutation("df", "ad"));
    expect(response5).toEqual(
    { register: [{ path: "email", message: emailNotLongEnough },
                  { path: "email", message: invalidEmail },
                  { path: "password", message: passwordNotLongEnough }
                ]
    });
  });
});
