import { error } from 'console';
import { users, projects } from '../dummyData/dummyData.js'
import {randomBytes} from 'crypto';
import mongoose from 'mongoose';
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../config.js';

const User = mongoose.model("User");
const Project = mongoose.model("Project");


export const resolvers = {
    Query:
    {
        users: ()=> users,
        projects: ()=>projects,
        user: (_, args)=> users.find(user=> args._id==user._id),
        iproject: (_,{_id})=> projects.filter(pr=> pr.by==_id)
    },

    User:{
        projects:(ur)=>projects.filter(project=> project.by==ur._id)
    },
    
    Mutation:{
        addUser:async(_, {userNew})=>
        {
        const user =await User.findOne({email: userNew.email});
        if(user){
            throw new Error("User already exists");
        }

        const hashedPassword = await bycrypt.hash(userNew.password,12);
        const newUser = new User({
            ...userNew,
            password: hashedPassword
        })
        return await newUser.save()
        },

        signInUser: async(_,{userSignIn})=>{
            //
            const user = await User.findOne({email: userSignIn.email})
            if(!user){
                throw new Error("User doesn't exits with this email")
            }
            const match = await bycrypt.compare(userSignIn.password,user.password);
            if(!match){
                throw new Error("Email or Password is invalid")
            }

            const token = jwt.sign({userId : user._id},JWT_TOKEN);
            return {token: token}

        },
        addProject: async(_, {projectInput},{userId})=>{
            //todo
            if(!userId){
                throw new Error("You are not logged in")
            }
           const newProject = await new Project({
                ...projectInput,
                by: userId
            })
            await newProject.save();
            return "Project submitted successfully"
        }

    }

}
