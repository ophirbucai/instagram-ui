import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "./register.schema";
import { me, register } from "../../services/userService";
import { Link, useHistory } from "react-router-dom";
import RegisterOrLoginWrap from "../../components/RegisterOrLoginWrap/RegisterOrLoginWrap";

function Register() {
  const history = useHistory();

  async function submit(values) {
    try {
      await register(values);
      history.push("/sign-in");
    } catch (err) {
      console.log(err);
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
      <div className="header">
        <h2>Create an Instagram profile</h2>
        <p>Share your photos with the world!</p>
      </div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={registerSchema}
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
            <label htmlFor="email">email:</label>
            <Field type="text" id="email" name="email" />
            <ErrorMessage
              className="error-message"
              name="email"
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
            <button type="submit">Register</button>
          </div>
        </Form>
      </Formik>
      <div className="container">
        Already signed up? <Link to="/sign-in">Sign in</Link>
      </div>
    </RegisterOrLoginWrap>
  );
}

export default Register;
