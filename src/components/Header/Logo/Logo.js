import React from "react";
import "./Logo.scss";
import { Link } from "react-router-dom";
import logo from "./favpng_cool-flame-fire.png"; //spicy-logo.svg

function Logo() {
  return (
    <Link className="Logo" to="/">
      <div className="logo-container">
        <img src={logo} alt="Spicy Logo" />
      </div>
      <span>Spicy</span>
    </Link>
  );
}

export default Logo;
