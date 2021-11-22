import React from 'react';
import './HeaderProfileMenu.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes"
function HeaderProfileMenu(props) {
    return (
        <>
            {props.isShown &&
                <nav className="header-profile-menu">
                    <FontAwesomeIcon icon={faTimes} className="close-icon"/>
                    <ul>
                        {props.children}
                    </ul>
                </nav>
            }
        </>
    );
}

export default HeaderProfileMenu;