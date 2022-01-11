import React, { useContext, useState, useRef } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Form, Grid, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
  const { user } = useContext(AuthContext); //login status
  // const postId = props.match.params.postId; //Cannot read properties of undefined (reading 'params')?
  const postId = useParams();
  console.log("postId", postId);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");

  //get single post
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  console.log("getPost",getPost);   //returns undefined
  //message":"Variable \"$postId\" got invalid value, ID cannot represent value
  //

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
      <Grid className="content-container">
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header> {username} </Card.Header>
                <Card.Description> {title} </Card.Description>
                <Card.Description> {description} </Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                {/* <LikeButton user={user} post={{ id, likeCount, likes }} /> */}
                {user ? (
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("comment")}
                  >
                    <Button basic color="teal">
                      <Icon name="comments" />
                    </Button>
                    {/* <Label basic color="teal" pointing="left">
                      {commentCount}
                    </Label> */}
                  </Button>
                ) : (
                  <Button as={Link} to="/login" labelPosition="right">
                    <Button basic color="teal">
                      <Icon name="comments" />
                    </Button>
                    {/* <Label basic color="teal" pointing="left">
                      {commentCount}
                    </Label> */}
                  </Button>
                )}
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p> Reply Post </p>
                  <Form>
                    <div className="ui action input field">
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
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header> {comment.username} </Card.Header>
                  <Card.Description> {comment.body} </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
