import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postScheme } from './post.scheme';
import { create } from '../services/postService';
import ImageEdit from './ImageEdit/ImageEdit';
import { useHistory } from 'react-router-dom';
import './PostCreate.scss';
import PostCreateDropzone from "./PostCreateDropzone/PostCreateDropzone";

function PostCreate() {
    const history = useHistory();
    const submit = async (values) => {
        try {
            await create(values)
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <div className="PostCreate">
            <Formik
                initialValues={{ description: '', image: null }}
                validationSchema={postScheme}
                onSubmit={submit}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                            <PostCreateDropzone setFieldValue={setFieldValue} />
                            <div className="error">
                                <ErrorMessage name="image" />
                            </div>
                        </div>
                        {values.image && <div className="form-group">
                            <Field id="description" name="description" placeholder="Write a post"/>
                            <div className="error">
                                <ErrorMessage name="description"/>
                            </div>
                        </div>}
                        <div className="submit">
                            <button type='submit'>Create Post</button>
                        </div>
                        {values.image && (
                            <ImageEdit
                                image={values.image}
                                setFieldValue={setFieldValue}
                            />
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostCreate;