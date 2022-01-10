import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

const Login = () => {

const context = useContext(AuthContext)

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
    //   console.log(result);
      context.login(result)
      navigate("/");
    },
    // onError(err) {
    //   console.log("register errors",setErrors(err.graphQLErrors[0].extensions.exception.errors));
    //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    // },
    variables: user,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="container">
      <h1>Login </h1>
      <form onSubmit={onSubmit}>
        <div>
          <h2>Username</h2>
          <input
            type="text"
            name="username"
            value={username}
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
        <button type="submit" value="Sign Up">
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
    }
  }
`;
export default Login;
