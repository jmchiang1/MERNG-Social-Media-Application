const { gql } = require("apollo-server");

// ! = the input cannot be null / empty
// parameters are the returned data
module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
    username: String!
    # comments: [Comment]!
    # likes: [Like]!
  }
#   type Comment {
#     id: ID!
#     createdAt: String!
#     username: String!
#     body: String!
#   }
#   type Like {
#     id: ID!
#     createdAt: String!
#     username: String!
#   }
  type User { 
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(title: String!, description: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
