const express = require('express');
const { ApolloServer, gql } = require('apollo-server');

const PORT = 4000;
// const app = express();

const {EmployeeTypeDefs, EmployeeResolvers} = require('./models/EmployeeGQL');
const {UserTypeDefs, UserResolvers} = require('./models/UserGQL');


//combine all typeDefs and resolvers
const typeDefs = [EmployeeTypeDefs, UserTypeDefs];
const resolvers = [EmployeeResolvers, UserResolvers];

const server = new ApolloServer({ 
    typeDefs: typeDefs,
    resolvers: resolvers 
});

server.listen(PORT).then(({ url }) => {
    console.log(`Server is running at ${url}`);
});

