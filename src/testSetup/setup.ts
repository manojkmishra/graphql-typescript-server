import { startServer } from "../startServer";
import { AddressInfo } from "net";


export const setup = async () => {
   // let getHost1 = () => "";
  // let getHost1 = () => "";
  const app = await startServer();
  // console.log('app====',app);
   const { port } = app.address() as AddressInfo;
  // const port = app.address();
   console.log('port====',port);
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
 // process.env.TEST_HOST = `http://127.0.0.1:4000`;
};