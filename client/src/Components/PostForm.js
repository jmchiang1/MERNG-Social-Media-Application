import React from "react";
import gql from "graphql-tag";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "./Hooks";
import { FETCH_POSTS_QUERY } from "./graphql";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: "",
    description: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.title = "";
      values.description = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Title..."
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Description..."
            name="description"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          />
          <Button type="submit">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {/* {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0]}</li>
          </ul>
        </div>
      )} */}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      id
      title
      description
      username
      likes {
        id
        username
      }
      likeCount
      comments {
        id
        body
        username
      }
      commentCount
    }
  }
`;

export default PostForm;
