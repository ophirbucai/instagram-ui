import React, { useMemo, useContext, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { PostCreateContext } from '../PostCreate';
import './PostCreateDropzone.scss';

export default function PostCreateDropzone({ setDisplayedImages }) {
    const { images, setImages } = useContext(PostCreateContext);
    const baseStyle = {
        padding: "20px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out"
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        // setImages(acceptedFiles);
        const acceptedFilesPromises = acceptedFiles.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                // reader.onerror = error => reject(error);
            });
        });
        const filesUrls = await Promise.all(acceptedFilesPromises);
        const arrayOfImages = [...images, ...filesUrls];
        const slicedArray = arrayOfImages.slice(0, 5);
        setImages(slicedArray);
        setDisplayedImages(slicedArray);
    }, [images, setImages, setDisplayedImages]);

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        onDrop,
        maxFiles: 5
    });

    const acceptStyle = {
        borderColor: "#afeeee",
        backgroundColor: "#e0ffff"
    };

    const rejectStyle = {
        borderColor: "#ff7f50",
        backgroundColor: "#ffe4e1"
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragAccept ? acceptStyle: {}),
            ...(isDragReject ? rejectStyle: {})
        }),
    // eslint-disable-next-line
        [isDragReject, isDragAccept]
    )

    return (
        <section className="PostCreateDropzone">
            <div {...getRootProps({ className: "dropzone", style })}>
                <input {...getInputProps()} />
                <p>
                    Drag and drop images here or click to select a file.
                </p>
            </div>
        </section>
    );
}