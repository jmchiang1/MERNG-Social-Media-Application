import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";

const Register = () => {
//   const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      navigate('/')
    },
    // onError(err) {
    //   console.log("register errors",setErrors(err.graphQLErrors[0].extensions.exception.errors));
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: user,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="container">
      <h1>Register New Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Name</h2>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <h2>Email Address (must be unique)</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <h2>Password (must be longer than 2 characters)</h2>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="2"
          />
        </div>
        <div>
          <h2>Confirm Password</h2>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength="2"
          />
        </div>
        <button type="submit" value="Sign Up">
          Sign Up
        </button>
        {/* {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )} */}
      </form>
    </div>
  );
};

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
      token
    }
  }
`;

export default Register;
