import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, Form, Grid, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
// import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext); //login status

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
  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  // redirect to main page after delete post
  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;

  if (!getPost) {
    postMarkup = <p> Loading post...please wait </p>;
  } else {
    const {
      id,
      username,
      title,
      description,
      //   likes,
      //   likeCount,
      comments,
      //   commentCount,
    } = getPost;

    postMarkup = (
      <div className="content-container">
        <div>
          <div classNAme="single-post-info">
            <p> Username: {username} </p>
            <p>Title: {title} </p>
            <p>Description: {description} </p>
          </div>

          <div>
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
          </div>
        </div>
        {user && (
          <div>
            <p> Reply Post </p>
            <Form>
              <input
                type="text"
                placeholder="Comment..."
                name="comment"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                ref={commentInputRef}
              />
              <button
                type="submit"
                className="ui button teal"
                disabled={comment.trim() === ""}
                onClick={submitComment}
              >
                Submit
              </button>
            </Form>
          </div>
        )}
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>
              {user && user.username === comment.username && (
                <DeleteButton postId={id} commentId={comment.id} />
              )}
              <p> {comment.username} </p>
              <p> {comment.body} </p>
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
      #   likes {
      #     username
      #   }
      #   likeCount
      comments {
        id
        username
        body
        # likes {
        #   username
        # }
      }
      #   commentCount
    }
  }
`;

const SUBMIT_COMMENT = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        username
        body
        # likes {
        #   username
        # }
      }
      #   commentCount
    }
  }
`;

export default SinglePost;
