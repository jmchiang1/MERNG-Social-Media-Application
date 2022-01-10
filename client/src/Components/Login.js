import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate } from "react-router-dom";
 

import { AuthContext } from '../Context/Auth';
import { useForm } from './Hooks';

function Login(props) {
    const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
    //   props.history.push('/');
    navigate("/", { replace: true });
    },
    // onError(err) {
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
    #   createdAt
      token
    }
  }
`;

export default Login;


// import React, { useState, useContext } from "react";
// import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/Auth";

// const Login = () => {

// const context = useContext(AuthContext)

//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//   });

//   const { username, password } = user;

//   const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   const navigate = useNavigate();

//   const [loginUser] = useMutation(LOGIN_USER, {
//     update(_, result) {
//     //   console.log(result);
//       context.login(result)
//       navigate("/");
//     },
//     // onError(err) {
//     //   console.log("register errors",setErrors(err.graphQLErrors[0].extensions.exception.errors));
//     //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
//     // },
//     variables: user,
//   });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     loginUser();
//   };

//   return (
//     <div className="container">
//       <h1>Login </h1>
//       <form onSubmit={onSubmit}>
//         <div>
//           <h2>Username</h2>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={onChange}
//             required
//           />
//         </div>
//         <div>
//           <h2>Password (must be longer than 2 characters)</h2>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={onChange}
//             required
//             minLength="2"
//           />
//         </div>
//         <button type="submit" value="Sign Up">
//           Login
//         </button>
//         {/* {Object.keys(errors).length > 0 && (
//         <div className="ui error message">
//           <ul className="list">
//             {Object.values(errors).map((value) => (
//               <li key={value}>{value}</li>
//             ))}
//           </ul>
//         </div>
//       )} */}
//       </form>
//     </div>
//   );
// };

// const LOGIN_USER = gql`
//   mutation login($username: String!, $password: String!) {
//     login(username: $username, password: $password) {
//       id
//       email
//       username
//       token
//     }
//   }
// `;
// export default Login;
