import React, { useContext, useEffect, useRef } from 'react'
import './ProfileCustomize.scss';
import { UserContext } from '../../../App'

export default function ProfileCustomize() { // { setShown }
    const { user } = useContext(UserContext);
    const customizeRef = useRef()
    useEffect(() => {
        function clickOutside(e) {
            if (customizeRef.current.contains(e.target)) {
                return;
            }
            // setShown(false);
        }
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, [setShown, customizeRef])

    return (
        <div className="ProfileCustomize" ref={customizeRef}>
            {user.username}
        </div>
    )
}