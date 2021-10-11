import React from 'react';
import './Register.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from "./register.schema";

function Register(props) {

    async function submit(values) {
        const res = await fetch('http://localhost:4000/user', {
            method: 'POST',
            body: JSON.stringify(values),
            header: {
                'Content-Type': 'application/json'
            }
        });
        const json = await res.json();
        console.log(json);
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
                    <div className="field">
                        <label htmlFor="username">username:</label>
                        <Field autoFocus type="text" id="username" name="username"/>
                        <ErrorMessage name="username" component="span" />
                    </div>
                    <div className="field">
                        <label htmlFor="email">email:</label>
                        <Field type="text" id="email" name="email"/>
                        <ErrorMessage name="email" component="span" />
                    </div>
                    <div className="field">
                        <label htmlFor="password">password:</label>
                        <Field type="password" id="password" name="password"/>
                        <ErrorMessage name="password" component="span" />
                    </div>
                    <div>
                        <button type='submit'>Register</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Register;