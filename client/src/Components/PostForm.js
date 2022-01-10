import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from './graphql'

const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
  
    const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const onSubmit = (event) => {
      event.preventDefault();
      callback();
    };
  
    return {
      onChange,
      onSubmit,
      values
    };
  };

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    }
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
            placeholder="Title"
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Description!"
            name="description"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
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