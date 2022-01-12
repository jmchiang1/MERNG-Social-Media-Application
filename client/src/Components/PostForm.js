import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "./Hooks";
import { FETCH_POSTS_QUERY } from "./graphql";
import './CSS/PostForm.css'

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
      <form className="create-post" onSubmit={onSubmit}>
        <h2 style={{marginTop: '0'}}>Create a post:</h2>

        <div className="input-form">
          <input
            placeholder="Title..."
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <textarea
          style={{width: '-webkit-fill-available', height: '6rem', fontSize: 'large'}}
            placeholder="Description..."
            name="description"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          />
          <button 
          style={{marginLeft: '0'}}
          type="submit">
            Submit
          </button>
        </div>
      </form>
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
