import React, { useContext } from 'react';
import './HeaderProfile.scss';
import Avatar from '../../common/Avatar/Avatar';
import {UserContext} from "../../App";

function HeaderProfile() {
    const { user } = useContext(UserContext);

    return (
        <div className="HeaderProfile">
            <Avatar image="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
            <span className="HeaderProfile__username">{ user.username }</span>
        </div>
    );
}

export default HeaderProfile;