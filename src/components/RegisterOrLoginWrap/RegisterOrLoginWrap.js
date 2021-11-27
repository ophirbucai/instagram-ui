import React from "react";
import Logo from "../Header/Logo/Logo";
import "./RegisterOrLoginWrap.scss";

export default function RegisterOrLoginWrap({ children }) {
  return (
    <div className="register-or-login-wrap">
      <div className="logo">
        <Logo />
      </div>
      <h1 className="headline">
        Take your photos <br />
        <div className="animated-word">
          {"further.".split("").map((letter, key) => (
            <span key={key}>{letter}</span>
          ))}
          {/* <span>f</span>
          <span>u</span>
          <span>r</span>
          <span>t</span>
          <span>h</span>
          <span>e</span>
          <span>r</span>
          <span>.</span> */}
        </div>
      </h1>
      <div className="inside">{children}</div>
    </div>
  );
}
