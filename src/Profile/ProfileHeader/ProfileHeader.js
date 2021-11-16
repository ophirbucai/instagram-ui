import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { UserContext } from '../../App';
import Avatar from '../../common/Avatar/Avatar';
import { getUser, follow, unfollow, me as getLoggedUser } from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'
import './ProfileHeader.scss';

function ProfileHeader({ username, postsCount }) {
    const { user: me, setUser: setMe } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [followersCount, setFollowersCount] = useState(null);

    const isFollowing = useMemo(() => {
        return me?.following?.includes(user._id);
    }, [user, me]);

    const handleFollow = useCallback(() => {
        follow(username).then(() => {
            getLoggedUser()
                .then(loggedUser => {
                    setMe(loggedUser);
                    setFollowersCount(prev => prev + 1);
                })
        }).catch(() => setFollowersCount(prev => prev - 1));
    }, [setMe, username]);

    const handleUnfollow = useCallback(() => {
        unfollow(username).then(() => {
            getLoggedUser()
                .then(loggedUser => {
                    setMe(loggedUser);
                    setFollowersCount(prev => prev - 1);
                })
        }).catch(() => setFollowersCount(prev => prev + 1));
    }, [setMe, username]);

    useEffect(() => {
        async function initUser() {
            const user = await getUser(username);
            setFollowersCount(user.followers.length);
            setUser(user);
        }
        initUser();
    }, [username]);

    return (
        <div className="ProfileHeader">
            <div className="image">
                <Avatar username={user.username} size="xl" />
            </div>
            <div className="settings">
                <h1 className="username">{user.username}</h1>
                <div className="button-container">
                {me.username !== username
                    ? isFollowing
                        ? <button onClick={handleUnfollow}>Unfollow</button>
                        : <button onClick={handleFollow}>Follow</button>
                    : <button>Edit Profile <FontAwesomeIcon icon={faCog} /></button>}
                </div>
            </div>
            <div className="stats">
                <ul>
                    <li><strong className="stat-count">{postsCount}</strong> posts</li>
                    <li><strong className="stat-count">{followersCount}</strong> followers</li>
                    <li><strong className="stat-count">{user?.following?.length}</strong> following</li>
                </ul>
            </div>
            <div className="bio">
                <p><span className="name">{username}</span> Lorem ipsum dolor sit amet, consectetur adipisicing 😁✌️</p>
            </div>
        </div>
    );
}

export default ProfileHeader;