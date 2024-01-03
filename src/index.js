import { ApolloServer } from 'apollo-server';
import  { connectDB }  from './db/dbconnect.js';
import  jwt  from 'jsonwebtoken';

connectDB();
import './mongoSchema/mongoUserModel.js';
import './mongoSchema/mongoProjectModel.js';

import  {resolvers}  from './models/resolvers.js';
import  {typeDefs}  from './models/schema.js';

import { JWT_TOKEN } from './config.js';


const server = new ApolloServer({typeDefs, resolvers,
context: ({req})=>{
    const {authorization}= req.headers
    if(authorization){
        const {userId} = jwt.verify(authorization,JWT_TOKEN);
        return {userId}
    }
    
}});


server.listen().then(({url})=>{
    console.log(`server is running on ${url}`);
}
);