import React, { useContext } from 'react';
import './HeaderProfile.scss';
import Avatar from '../../common/Avatar/Avatar';
import { UserContext } from "../../App";

function HeaderProfile() {
    const { user } = useContext(UserContext);

    return (
        <div className="HeaderProfile">
            <Avatar size="md" username={user.username} />
            <span className="HeaderProfile__username">{ user.username }</span>
        </div>
    );
}

export default HeaderProfile;