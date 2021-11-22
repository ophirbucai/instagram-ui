import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginScheme } from "./loginScheme";
import { login, me } from "../../services/userService";
import { UserContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import RegisterOrLoginWrap from "../../components/RegisterOrLoginWrap/RegisterOrLoginWrap";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  async function submit(values) {
    try {
      const { token } = await login(values);
      localStorage.setItem("token", token);
      const loggedUser = await me();
      setUser(loggedUser);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    me()
      .then((loggedUser) => {
        if (!isLoggedIn(loggedUser)) {
          return;
        }
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, [history]);

  function isLoggedIn(user) {
    return user.hasOwnProperty("_id");
  }

  return (
    <RegisterOrLoginWrap>
      <header>
        <h2>Great to see you again!</h2>
        <p>Sign in to your Instagram Account</p>
      </header>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginScheme}
        onSubmit={submit}>
        <Form>
          <div className="form-group">
            <label htmlFor="username">username:</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage
              className="error-message"
              name="username"
              component="span"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              className="error-message"
              name="password"
              component="span"
            />
          </div>
          <div className="submit">
            <button type="submit">Sign In</button>
          </div>
        </Form>
      </Formik>
      <div className="container">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </RegisterOrLoginWrap>
  );
}

export default Login;
