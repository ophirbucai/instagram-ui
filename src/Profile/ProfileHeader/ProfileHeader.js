import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Avatar from '../../common/Avatar/Avatar';
import { getUser, follow, unfollow, me as getMyself } from '../../services/userService';
import './ProfileHeader.scss';

function ProfileHeader({ username, postNum }) {
    const { user: me, setUser: setMe } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [isFollowing, setIsFollowing] = useState(me?.following?.includes(user._id));

    const handleFollow = () => {
        follow(username).then(() => {
            getMyself()
                .then(loggedUser => {
                    setMe(loggedUser);
                })
        }).catch(() => setIsFollowing(false));
    }
    const handleUnfollow = () => {
        unfollow(username).then(() => {
            getMyself()
                .then(loggedUser => {
                    setMe(loggedUser);
                })
        }).catch(() => setIsFollowing(true));
    }

    useEffect(() => {
        setIsFollowing(me?.following?.includes(user._id));
    }, [user, me]);

    useEffect(() => {
        async function initUser() {
            const user = await getUser(username);
            setUser(user);
        }
        initUser();
    }, [username]);

    useEffect(() => {
        async function initUser() {
            const user = await getUser(username);
            setUser(user);
        }
        initUser();
    }, [username]);

    return (
        <div className="profile__header">
            <div className="profile__avatar"><Avatar username={user.username} size="lg" /></div>
            <div>
                <div>
                    <h2>{user.username}</h2>
                    <p>{postNum} posts</p>
                    {me.username !== username ? isFollowing
                        ? <button onClick={handleUnfollow}>Unfollow</button>
                        : <button onClick={handleFollow}>Follow</button> : null}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;