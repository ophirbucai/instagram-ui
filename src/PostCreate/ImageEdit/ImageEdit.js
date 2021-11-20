import React, { useState, useCallback, useContext } from 'react';
import { PostCreateContext } from '../PostCreate';
import './ImageEdit.scss';
import getCroppedImg from './cropImage'
import Cropper from "react-easy-crop";

export default function ImageEdit({ displayedImage, index, aspectRatio }) {
    const { images, setImages } = useContext(PostCreateContext);
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState({});
    const cropComplete = useCallback(async (e) => {
        e.preventDefault();
        const croppedImage = await getCroppedImg(
            displayedImage,
            croppedAreaPixels
        )
        const uploadedImages = images;
        uploadedImages[index] = croppedImage;
        setImages(uploadedImages);
        console.log('images2', uploadedImages);
    }, [croppedAreaPixels, displayedImage, images, index, setImages]);
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    console.log(displayedImage);

    return (
        <div className="ImageEdit">
            <div>
                <div className="preview">
                    <Cropper image={displayedImage}
                             crop={crop}
                             zoom={zoom}
                             aspect={aspectRatio}
                             onCropChange={setCrop}
                             onCropComplete={onCropComplete}
                             onZoomChange={setZoom}
                    />
                </div>
            </div>
            <div className="finished">
                <button onClick={cropComplete}>Crop Image</button>
            </div>
        </div>
    );
}