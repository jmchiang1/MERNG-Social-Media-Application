import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "./graphql";

function DeleteButton({ postId, callback }) {
  const mutation = DELETE_POST_MUTATION;

  const [deletePost] = useMutation(mutation, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let temp = data.getPosts.filter((p) => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: temp } });

      if (callback) callback();
    },
    variables: { postId },
  });

  return (  
    <>
      <button onClick={deletePost}>Delete</button>
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;


export default DeleteButton;
