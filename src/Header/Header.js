import React from 'react';
import './Header.scss';
import Logo from './Logo/Logo'
import HeaderProfile from "./HeaderProfile/HeaderProfile";

function Header() {
    return (
        <div className="Header">
            <Logo />
            <HeaderProfile />
        </div>
    );
}

export default Header;