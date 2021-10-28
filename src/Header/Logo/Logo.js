import React from 'react';
import './Logo.scss';
import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link className="Logo" to="/">
            Instagram
        </Link>
    );
}

export default Logo;
