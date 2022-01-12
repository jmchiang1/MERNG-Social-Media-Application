import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "./graphql";

function DeleteComment({ postId, commentId, callback }) {

  const mutation = DELETE_COMMENT_MUTATION;

  const [deleteComment] = useMutation(mutation, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let temp = data.getPosts.filter((p) => p.id !== commentId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: temp });

      if (callback) callback();
    },
    variables: { commentId, postId },
  });

  return (  
    <>
      <button onClick={deleteComment}>Delete Comment</button>
    </>
  );
}

//delete post 
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
      }
    }
  }
`;

export default DeleteComment;