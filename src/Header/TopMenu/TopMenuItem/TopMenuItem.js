import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../../App";

function TopMenuItem({ linkTo, faIcon, color, disabled }) {
    const { darkTheme } = useContext(ThemeContext);

    return (
        <li>
            <Link to={linkTo} onClick={e => {if (disabled) e.preventDefault()}}>
                <FontAwesomeIcon icon={faIcon} size="lg" color={color || (darkTheme ? "#f2f1f0" : "#b99043")} />
            </Link>
        </li>
    );
}

export default TopMenuItem;