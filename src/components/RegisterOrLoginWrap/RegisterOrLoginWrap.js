import React from "react";
import "./RegisterOrLoginWrap.scss";

export default function RegisterOrLoginWrap({ children }) {
  return (
    <div className="register-or-login-wrap">
      <div className="inside">{children}</div>
    </div>
  );
}
