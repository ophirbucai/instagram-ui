import React from 'react';
import './Avatar.scss';

function Avatar({ image }) {
    return (
        <div className="Avatar">
            <img src={image} alt="" />
        </div>
    );
}

export default Avatar;
