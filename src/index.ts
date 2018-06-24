import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import {resolvers} from './resolvers'
// import {createConnection} from 'typeorm'
import * as path from "path";
import { createTypeormConn } from "./utils/createTypeormConn";

// const typeDefs = importSchema(path.join(__dirname,"./schema.graphql"))
// const server = new GraphQLServer({ typeDefs, resolvers })
// createConnection().then(()=>{
 //   server.start(() => console.log('Server is running on localhost:4000'))
// }) 

// --------above server run conf comment done after jest installation------now write below---with async and await
export const startServer = async () => 
{   const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
    const server = new GraphQLServer({ typeDefs, resolvers });
    // await createConnection();
    await createTypeormConn();
    await server.start();
    console.log("Server is running on localhost:4000");
};
startServer();