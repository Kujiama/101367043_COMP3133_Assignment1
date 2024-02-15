const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const PORT = 4000;
const app = express();

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

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    graphiql: true
  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
}

startApolloServer(typeDefs, resolvers);
