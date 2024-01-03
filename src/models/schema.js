import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        _id:ID,
        name: String
        email: String
        password: String
        projects: [Project]
    }
    type Project{
        by:ID
        title: String
        active: Boolean
        description:String
    }
    type Query{
        users:[User]
        projects:[Project]
        user(_id:ID!): User
        iproject(by:ID!): [Project]
    }

    type token{
        token: String
    }

    type Mutation{
        addUser(userNew: userInput!): User
        signInUser(userSignIn:userSignInInput!): token
        addProject(projectInput: pr!): String
    }
    input pr{
        title: String!
        active: Boolean!
        description: String!
    }

    input userInput{
        name: String!
        email: String!
        password: String!
    }

    input userSignInInput{
        email: String!
        password: String!
    }
`
