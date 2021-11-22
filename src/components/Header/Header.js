import React from 'react';
import './Header.scss';
import Logo from './Logo/Logo'
import HeaderProfile from "./HeaderProfile/HeaderProfile";
import TopMenu from './TopMenu/TopMenu';

function Header() {
    return (
        <div className="Header">
            <Logo />
            <TopMenu />
            <HeaderProfile />
        </div>
    );
}

export default Header;