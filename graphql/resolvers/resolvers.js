const postsResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');

module.exports = {
    Query: {
        ...postsResolvers.Query
    }
}