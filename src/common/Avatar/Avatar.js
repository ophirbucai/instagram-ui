import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.scss';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/open-peeps';

function Avatar({ username, size }) {

    return (
        <div className={`Avatar ${size || 'md'}`}>
            <div dangerouslySetInnerHTML={{__html: createAvatar(style, {seed: username, background: '#ccc', mood: 'angry'})}}/>
        </div>
    );
}

Avatar.propTypes = {
    user: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default Avatar;
