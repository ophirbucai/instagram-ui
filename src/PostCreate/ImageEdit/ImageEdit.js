import React, { useCallback, useState } from 'react';
import Cropper from "react-easy-crop";
import './ImageEdit.scss';

function ImageEdit({image}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const aspects = [1 / 1, 4 / 3, 16 / 9]
    const [aspect, setAspect] = useState(4 / 3)
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])
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

    return (
        <div className="ImageEdit">
            <div className="preview">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="controls">
                <input type="range" min="16" max="100" step="0.1" />
                <label>Aspect Ratio:</label>
                <select onChange={(e) => {
                    setAspect(aspects[e.target.selectedIndex]);
                }}>
                    {aspects.map(aspect => <option value={aspect}>{getAspectLabel(aspect)}</option>)}
                </select>
            </div>
        </div>
    );
}

export default ImageEdit;