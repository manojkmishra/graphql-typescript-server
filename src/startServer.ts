import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
// import {resolvers} from './resolvers'
// import {createConnection} from 'typeorm'
import * as path from "path";
import { createTypeormConn } from "./utils/createTypeormConn";

import * as fs from "fs";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

// const typeDefs = importSchema(path.join(__dirname,"./schema.graphql"))
// const server = new GraphQLServer({ typeDefs, resolvers })
// createConnection().then(()=>{
 //   server.start(() => console.log('Server is running on localhost:4000'))
// }) 

// --------above server run conf comment done after jest installation------now write below---with async and await
export const startServer = async () => 
{   
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));
  folders.forEach(folder => 
    {    const { resolvers } = require(`./modules/${folder}/resolvers`);
          const typeDefs = importSchema( path.join(__dirname, `./modules/${folder}/schema.graphql`) );
          schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
    });
    // const typeDefs = importSchema(path.join(__dirname, "./schema.graphql"));
    // const server = new GraphQLServer({ typeDefs, resolvers });
    // const server = new GraphQLServer({ typeDefs, resolvers });
    const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
    // await createConnection();
    await createTypeormConn();
    const app= await server.start({port:process.env.NODE_ENV==="test"?0:4000});
    console.log("Server is running on localhost:4000");
    return app;
};