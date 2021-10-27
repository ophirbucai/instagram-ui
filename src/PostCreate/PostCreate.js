import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postScheme } from './post.scheme';
import { create } from '../services/postService';
import { useHistory } from 'react-router-dom';

function PostCreate() {
    const history = useHistory();

    async function submit(values) {
        try {
            await create(values);
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="Register">
            <Formik
                initialValues={{ body: '', image: null }}
                validationSchema={postScheme}
                onSubmit={submit}>
                {({ setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                            <input type="file" name="image" onChange={e => {
                                setFieldValue('image', e.currentTarget.files[0]);
                            }} />
                            <div className="error">
                                <ErrorMessage name="image" />
                            </div>
                        </div>
                        <div className="form-group">
                            <Field id="body" name="body" placeholder="Write a post" />
                            <div className="error">
                                <ErrorMessage name="body" />
                            </div>
                        </div>
                        <div className="submit">
                            <button type='submit'>Create Post</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostCreate;