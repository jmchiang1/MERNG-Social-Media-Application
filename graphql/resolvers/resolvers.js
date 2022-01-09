const postResolvers = require('./postResolvers');
const userResolvers = require('./userResolvers');
const commentResolvers = require('./commentResolver');

module.exports = {
    Post: { //any mutation or query that returns a post, it will go through this post object
        likeCount: (parent) => {
            // console.log("LIKE PARENT",parent); //parent returns the entire getPost data
            return parent.likes.length
        },
        commentCount: (parent) => {
            return parent.comments.length;
        }
    },
    Query: {
        ...postResolvers.Query
    },
    Mutation: { 
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}