import express ,{Express ,Request , Response} from "express"
import * as database from "./config/database"
import dotenv from "dotenv"
import { ApolloServer, gql } from "apollo-server-express";
import { Query } from "mongoose";
import {resolvers} from "./resolvers/index.resolvers"
import { typeDefs } from "./typeDefs/index.typeDefs";
const startServer = async () =>{
  dotenv.config()
database.connect();



const app :Express = express();
const port : number| string = process.env.PORT || 3000 ;



// graphql




const apolloServer = new ApolloServer({
  typeDefs:typeDefs,
  resolvers: resolvers
})

await apolloServer.start();

apolloServer.applyMiddleware({
  app: app as any,
  path: "/graphql"
})
app.listen(port,()=>{
  console.log(`App listening on port ${port}`)
})
}
startServer();