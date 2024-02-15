const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
require('dotenv').config();

const PORT = 4000;

// Mongoose MongoDB setup
// Connect to MongoDB using environment variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CONN = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then( (success) => {
  console.log('Success Mongodb connection')
}).catch( (error) => {
  console.log('Error Mongodb connection')
});

// Apollo GraphQL Server setup
const {EmployeeTypeDefs, EmployeeResolvers} = require('./gql/EmployeeGQL');
const {UserTypeDefs, UserResolvers} = require('./gql/UserGQL');

//combine all typeDefs and resolvers
const typeDefs = [EmployeeTypeDefs, UserTypeDefs];
const resolvers = [EmployeeResolvers, UserResolvers];

const server = new ApolloServer({ 
    typeDefs: typeDefs,
    resolvers: resolvers,
    GraphiQL: true
});

server.listen(PORT).then(({ url }) => {
    console.log(`Server is running at ${url}`);
});

