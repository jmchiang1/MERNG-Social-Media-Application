import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import DeleteButton from "./DeleteButton";
import "./CSS/SinglePost.css";

function SinglePost(props) {
//   const { user } = useContext(AuthContext); //login status

  const { postId } = useParams();
  console.log("postId", { postId }); //returns the post id

  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  //get single post
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  console.log("getPost", getPost); //returns undefined
  //message":"Variable \"$postId\" got invalid value, ID cannot represent value

  //create new comment
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
      console.log("comment blur",commentInputRef.current.blur());
    },
    variables: {
      postId,
      body: comment,
    },
  });

  let postMarkup;

  if (!getPost) {
    postMarkup = <p> Loading post...please wait </p>;
  } else {
    const { id, username, title, description, comments } = getPost;

    postMarkup = (
      <div className="content-container">
        {/* single post div */}
        <div className="single-post-info">
          <p> Username: {username} </p>
          <p>Title: {title} </p>
          <p>Description: {description} </p>
        </div>

        {/* reply post div */}
        <div>
          {/* <p> Reply Post Below: </p> */}
          {/* <Form> */}
          <input
            type="text"
            placeholder="Comment..."
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            ref={commentInputRef}
          />
          <button type="submit" onClick={submitComment}>
            Submit
          </button>
          {/* </Form> */}
        </div>

        {/* Comment div */}
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>
              {/* {user && user.username === comment.username && ( */}
              {/* )} */}
              <div className="comment-container">
                <p> Username: {comment.username} </p>
                <p> Comment: {comment.body} </p>
                <DeleteButton postId={id} commentId={comment.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      title
      description
      comments {
        id
        username
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
      }
    }
  }
`;

export default SinglePost;
