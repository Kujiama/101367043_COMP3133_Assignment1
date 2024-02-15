const { gql } = require('apollo-server');
const users = require('../dummyUsers');

const UserTypeDefs = gql`#graphql

    type User{
        id: ID!
        email: String!
        username: String!
        password: String!
    }

    type Query{ # Display data
        users: [User], #return all users
        login(username: String!, password: String!): User # return a single user by id
    }

    type UserResponse{ # response message
        message: String!
        user: User!
    }

    type Mutation{ # CRUD operations
        signup(
            id: ID!,
            username: String!,
            email: String!,
            password: String!
        ) : UserResponse # add a new user

    }

`


const UserResolvers = {

    Query: {
        users: () => {return users},
        login: (parent, { email, password }) => {return users.find(user => user.email === email && user.password === password)},
    },

    Mutation: {
        signup: (parent, {id,username, email, password }) => {
            const user = {
                id,
                username,
                email,
                password
            }
            users.push(user);
            return {
                message: "User added successfully",
                user
            }
        }
    }
}

module.exports = {UserTypeDefs, UserResolvers};