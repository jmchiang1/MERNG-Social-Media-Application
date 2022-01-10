import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../Context/Auth';
import { useForm } from './Hooks';

function Register(props) {
    const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
    //   props.history.push('/');
    navigate("/", { replace: true });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
    #   createdAt
      token
    }
  }
`;

export default Register;


// import React, { useState, useContext } from "react";
// import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/Auth";

// const Register = () => {

//   const context = useContext(AuthContext)
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const { username, email, password, confirmPassword } = user;

//   const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   const navigate = useNavigate();

//   const [addUser] = useMutation(REGISTER_USER, {
//     update(_, result) {
//     //   console.log(result);
//     context.login(result)
//       navigate('/')
//     },
//     // onError(err) {
//     //   console.log("register errors",setErrors(err.graphQLErrors[0].extensions.exception.errors));
//     //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
//     // },
//     variables: user,
//   });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     addUser();
//   };

//   return (
//     <div className="container">
//       <h1>Register New Account</h1>
//       <form onSubmit={onSubmit}>
//         <div>
//           <h2>Name</h2>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={onChange}
//             required
//           />
//         </div>
//         <div>
//           <h2>Email Address (must be unique)</h2>
//           <input
//             type="email"
//             name="email"
//             value={email}
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
//         <div>
//           <h2>Confirm Password</h2>
//           <input
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             onChange={onChange}
//             required
//             minLength="2"
//           />
//         </div>
//         <button type="submit" value="Sign Up">
//           Sign Up
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

// const REGISTER_USER = gql`
//   mutation register(
//     $username: String!
//     $email: String!
//     $password: String!
//     $confirmPassword: String!
//   ) {
//     register(
//       registerInput: {
//         username: $username
//         email: $email
//         password: $password
//         confirmPassword: $confirmPassword
//       }
//     ) {
//       id
//       email
//       username
//       token
//     }
//   }
// `;

// export default Register;
