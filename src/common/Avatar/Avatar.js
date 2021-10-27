import React from 'react';

function Avatar(props) {
    return (
        <div className="Avatar">
            <img src="{props.image}" alt="Show Instagram profile" />
        </div>
    );
}

export default Avatar;
