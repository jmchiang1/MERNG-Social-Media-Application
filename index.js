const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/post')
const { MONGODB } = require('./config')

const typeDefs = gql`
type Post {
    id: ID!
    title: String!
    description: String!
}
    type Query {
        getPosts: [ Post ]
    }
`

const resolvers = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error (err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true})
.then(() => {
    console.log('Successfully connected to MongoDB')
    return server.listen({port: 5000})
})
.then(res => {
    console.log(`Server Running on ${res.url}`)
})