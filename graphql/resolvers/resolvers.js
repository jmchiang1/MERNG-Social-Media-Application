const postsResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation
    }
}