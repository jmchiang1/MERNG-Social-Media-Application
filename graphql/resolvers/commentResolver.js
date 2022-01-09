const Post = require("../../models/post");
const checkAuth = require("../../util/checkAuth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    //CREATWE COMMENT
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context); //validate user
      if (body.length === 0) {
        throw new UserInputError("Invalid: Comment camnot be empty");
      }
      const post = await Post.findById(postId); //if comment is not empty, find post by id
      if (post) {
        post.comments.unshift({
          //unshift: move comment to the top
          body,
          username,
        });
        await post.save(); //save in DB and return it
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    //DELETE COMMENT
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context); //validate user

      const post = await Post.findById(postId);
      if (post) {
        const commentIdx = post.comments.findIndex( 
          (comment) => comment.id === commentId
        );
        if (post.comments[commentIdx].username === username) {  //make sure username matches the one that wrote the comment
        //   await post.comments.deleteOne();   //why doesnt this work 
        post.comments.splice(commentIdx, 1);    //this works 
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("You did not write this comment");
        }
      }
    },
  },
};
