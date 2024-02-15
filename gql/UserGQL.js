const { gql } = require('apollo-server');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const UserTypeDefs = gql`#graphql

    type User{
        id: ID!
        email: String!
        username: String!
        password: String!
    }

    type Query{ # Display data
        users: [User], #return all users
        login(username: String!, password: String!): UserResponse # return a single user by id
    }

    type UserResponse{ # response message
        message: String!
        user: User!
    }

    type Mutation{ # CRUD operations
        signup(
            username: String!,
            email: String!,
            password: String!
        ) : UserResponse # add a new user

    }

`


const UserResolvers = {

    Query: {
        users: async () => {
            try{
                const allUsers = await User.find().exec();
                return allUsers;
            }catch(err){
                throw new Error(err);
            }
        },

        login: async (parent, { username, password }) => {
            try{
                const user = await User.findOne({username: username}).exec();
                
                //using bcrypt to compare the password
                const match = await bcrypt.compare(password, user.password);

                if(match){
                    return {
                        message: `user ${user.username} has been successfully logged in`,
                        user: user
                    }
                }
            }catch(err){
                throw new Error(err);
            }
        }
                    
    },

    Mutation: {
        signup: async (parent, args) => {
            try{
                const newUser = new User({...args});

                const savedUser = await newUser.save();
                
                if(savedUser){
                    return {
                        message: `user ${args.username} has beensuccessfully added`,
                        user: savedUser
                    }
                }
            }catch(err){
                throw new Error(err);
            }
        }
    }
}

module.exports = {UserTypeDefs, UserResolvers};