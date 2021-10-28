import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopMenuItem({ linkTo, faIcon }) {
    return (
        <li>
            <Link to={linkTo}>
                <FontAwesomeIcon icon={faIcon} size="lg" />
            </Link>
        </li>
    );
}

export default TopMenuItem;