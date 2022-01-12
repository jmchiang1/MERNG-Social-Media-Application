// const post = require("../../models/post");
const Post = require("../../models/post");
const checkAuth = require("../../util/checkAuth");
const { AuthenticationError } = require("apollo-server"); //apollo specific authentication error

module.exports = {
  Query: {
    //GET ALL POST
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    // GET SINGLE POST
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        // console.log("POST", post);
        if (post !== undefined) {
          return post;
        } else {
          console.log("Post not found");
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    // CREATE POST
    async createPost(_, { title, description }, context) {
      const user = checkAuth(context); //make sure user is authenicated and able to post things
      // console.log("USER", user);

      if (title.length === 0 || description.length === 0){
        throw new error('Title or description cannot be empty')
      }

      const newPost = new Post({
        //create new post
        title,
        description,
        user: user.id,
        username: user.username,
      });

      const post = await newPost.save();
      return post;
    },
    //DELETE POST
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await Post.deleteOne();
          return "Post has been deleted!";
        } else {
          throw new AuthenticationError("This is not your post to delete");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    //LIKE AND UNLIKE POST
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        //make sure user that liked the post matches the username
        if (post.likes.find((like) => like.username === username)) {
          //post already liked, then unlike it
          post.likes = post.likes.filter((like) => like.username !== username); //remove like with the username
        } else {
          //not liked yet, like post
          post.likes.push({
            username,
          });
        }
        await post.save();
        return post;
      }
    },
  },
};
