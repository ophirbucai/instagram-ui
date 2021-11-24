import React, { useState, useCallback, useContext, useMemo } from "react";
import { PostCreateContext } from "../PostCreate";
import "./ImageEdit.scss";
import getCroppedImg from "./cropImage";
import Cropper from "react-easy-crop";

export default function ImageEdit({ displayedImage, index, aspectRatio }) {
  const { images, setImages } = useContext(PostCreateContext);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});
  const maintainAspectRatio = useMemo(() => {
    if (aspectRatio === 4 / 3) {
      return "75%";
    } else if (aspectRatio === 16 / 9) {
      return "56.25%";
    } else {
      return "100%";
    }
  }, [aspectRatio]);

  const cropComplete = useCallback(
    async (e) => {
      e.preventDefault();
      const croppedImage = await getCroppedImg(
        displayedImage,
        croppedAreaPixels
      );
      const uploadedImages = images;
      uploadedImages[index] = croppedImage;
      setImages(uploadedImages);
    },
    [croppedAreaPixels, images, index, setImages, displayedImage]
  );
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className="ImageEdit" style={{ paddingBottom: maintainAspectRatio }}>
      <div className="preview">
        <Cropper
          image={displayedImage}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            mediaClassName: "crop-media",
          }}
        />
      </div>

      <div className="finished">
        <button onClick={cropComplete}>Crop Image</button>
      </div>
    </div>
  );
}
