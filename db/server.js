const express = require('express');
const mongoose = require('mongoose'); //ODM
const bodyParser = require('body-parser');

// const { graphqlExpress,graphiqlExpress } = require('graphql-server-express');
const { ApolloServer } = require('apollo-server-express');
const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');

const userTypeDefs = require('./types/user.types');
const userResolvers = require('./resolvers/user.resolvers');

const authFunc = require('./libs/auth');

mongoose.connect('mongodb://localhost/graphql_db_course', { useNewUrlParser: true })

const app = express();

const typeDefs = `
  type Alert{
    message: String
  }

  type Query {
    _ : Boolean
  }

  type Mutation {
    _ : Boolean
  }
`;

const resolver = {};

const server = new ApolloServer({
  typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
  resolvers: merge(resolver, courseResolvers, userResolvers),
  context: authFunc
});

server.applyMiddleware({app: app});

app.listen(8080,function(){
  console.log("Servidor iniciado");
})