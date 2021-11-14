import React, { useRef, useState } from 'react';
import './ImageEdit.scss';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function ImageEdit({ image, setFieldValue } ) {
    // const [croppedLiveUrl, setCroppedLiveUrl] = useState("");
    // const [croppedData, setCroppedData] = useState({ url: "", data: {} });
    const aspects = [1 / 1, 4 / 3, 16 / 9];
    const [aspect, setAspect] = useState(1 / 1);

    function getAspectLabel(aspect) {
        switch (aspect) {
            case 1:
                return '1 / 1'
            case 4 / 3:
                return '4 / 3'
            case 16 / 9:
                return '16 / 9'
            default:
                return 'N/A'
        }
    }
    const cropperRef = useRef();
    const cropHandler = () => {
        // console.log(cropperRef.current.cropper.getCroppedCanvas().toBlob());
        // const urlObject = URL.createObjectURL(cropperRef.current.cropper.getCroppedCanvas());
        // console.log(urlObject);
        // const contentType = 'image/png';
        // const b64Data = cropperRef.current.cropper.getCroppedCanvas().toDataURL().split(';')[1].split(',')[1];
        // const cleanUrl = URL.createObjectURL(base64StringToBlob(b64Data, contentType)).slice(5);
        // console.log(cleanUrl);
        // setCroppedLiveUrl(cleanUrl);

        let dataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL("image/png");
        // const objectUrl = URL.createObjectURL(dataUrl);
        // console.log('objectUrl',objectUrl);
        // const blob = base64StringToBlob(dataUrl)
        setFieldValue('image', dataUrl);
        // console.log(URL.createObjectURL(blob));
        // console.log(URL.createObjectURL(blob))
        // console.log('objectUrl', objectUrl);
        // setFieldValue('image', objectUrl);
    }

    return (
        <div className="ImageEdit">
            <div onClick={cropHandler}>completed cropping</div>

            <div className="preview">
                <Cropper src={image}
                         key={aspect}
                         initialAspectRatio={aspect}
                         // style={{ height: 400, width: "100%" }}
                         // crop={followCropBox}
                         preview=".img-preview"
                         ref={cropperRef}
                         background={false}
                         responsive={true}
                         crossOrigin="false"
                         // onInitialized={(instance) => {
                         //     setCropper(instance);
                         // }}
                />
            </div>
            <div className="controller">
                <label htmlFor="aspect">Select an Aspect Ratio:</label>
                <select name="aspect" id="aspect" onChange={(e) => setAspect(aspects[e.target.selectedIndex])}>
                    {aspects.map(aspect => <option name="aspect" id="aspect">{getAspectLabel(aspect)}</option>)}
                </select>
            </div>
            {/*{croppedLiveUrl && <img src={croppedLiveUrl} alt="fucker" style={{display: 'block', background: 'black', width: '250px', height: '250px'}}/>}*/}
        </div>
    );
}