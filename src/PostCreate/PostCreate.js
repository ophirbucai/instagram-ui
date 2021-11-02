import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postScheme } from './post.scheme';
import { create } from '../services/postService';
import ImageEdit from './ImageEdit/ImageEdit';
import { useHistory } from 'react-router-dom';
import './PostCreate.scss';

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
        <div className="PostCreate">
            <Formik
                initialValues={{ body: '', image: null }}
                validationSchema={postScheme}
                onSubmit={submit}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="form-group">
                              <input className="file" type="file" name="image" onChange={e => {
                                  setFieldValue('image', e.currentTarget.files[0]);
                              }} />
                            <span>Drop the image here</span>
                            <div className="error">
                                <ErrorMessage name="image" />
                            </div>
                        </div>
                        {values.image && <div className="form-group">
                            <Field id="body" name="body" placeholder="Write a post"/>
                            <div className="error">
                                <ErrorMessage name="body"/>
                            </div>
                        </div>}
                        <div className="submit">
                            <button type='submit'>Create Post</button>
                        </div>
                        {values.image && (
                            <ImageEdit image={URL.createObjectURL(values.image)} />
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostCreate;