const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');


const typeDefs = require('./graphql/typeDefinitions');
const resolvers = require('./graphql/resolvers/resolvers')
const { MONGODB } = require('./config');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
})
 
mongoose.connect(MONGODB, { useNewUrlParser: true})
.then(() => {
    console.log('Successfully connected to MongoDB')
    return server.listen({port: 5000})
})
.then(res => {
    console.log(`Server Running on ${res.url}`)
})