import { getConnectionOptions, createConnection } from "typeorm";

export const createTypeormConn = async () => {
    console.log('its inside the createtypeormconn' );
    console.log('process.env.NODE_ENV=',process.env.NODE_ENV );
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV); // pass the ENV from package.json
  console.log('connectionOptions=',connectionOptions );
  return createConnection({ ...connectionOptions, name: "default" });
};