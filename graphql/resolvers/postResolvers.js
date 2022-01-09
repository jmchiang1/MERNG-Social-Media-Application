const Post = require("../../models/post");
const checkAuth = require('../../util/checkAuth')

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort()
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        console.log("POST", post);
        if (post !== undefined) {
          return post;
        } else {
          console.log('Post not found')
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { title, description }, context){
      const user = checkAuth(context);  //make sure user is authenicated and able to post things 
      console.log("USER", user);

      const newPost = new Post({  //create new post 
        title, 
        description,
        user: user.id,
        username: user.username
      })

      const post = await newPost.save();
      return post;
    }
  }
};
