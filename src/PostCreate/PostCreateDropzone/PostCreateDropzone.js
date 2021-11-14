import React, { useMemo } from 'react';
import { useDropzone } from "react-dropzone";

export default function PostCreateDropzone({ setFieldValue }) {

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFieldValue('image', URL.createObjectURL(acceptedFiles[0]));
        }});

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
                    Drag and drop image here or click to select a file.
                </p>
            </div>
        </section>
    );
}