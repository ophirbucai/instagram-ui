import React from 'react';
import './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from "./register.schema";
import { register } from '../services/userService';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory();

    async function submit(values) {
        try {
            await register(values);
            history.push('/sign-in');
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="Register">
            <h2>Create an Instagram profile</h2>
            <p>Share your photos with the world!</p>
            <Formik
                initialValues={{ username: '', email: '', password: ''}}
                validationSchema={registerSchema}
                onSubmit={submit}>
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">username:</label>
                        <Field type="text" id="username" name="username"/>
                        <ErrorMessage className="error-message" name="username" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">email:</label>
                        <Field type="text" id="email" name="email"/>
                        <ErrorMessage className="error-message" name="email" component="span" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password:</label>
                        <Field type="password" id="password" name="password"/>
                        <ErrorMessage className="error-message" name="password" component="span" />
                    </div>
                    <div className="submit">
                        <button type='submit'>Register</button>
                    </div>
                </Form>
            </Formik>
            <div className="sign-in-container">
                Already signed up? <a href="/sign-in">Sign in</a>
            </div>
        </div>
    );
}

export default Register;