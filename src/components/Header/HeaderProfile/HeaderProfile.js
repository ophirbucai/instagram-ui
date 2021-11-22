import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "./HeaderProfile.scss";
import Avatar from "../../../components/Avatar/Avatar";
import { UserContext } from "../../../App";
import HeaderProfileMenu from "./HeaderProfileMenu/HeaderProfileMenu";

function HeaderProfile() {
  const [isShown, setIsShown] = useState(false);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const listener = () => setIsShown(false);
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  function logOut(e) {
    e.preventDefault();
    setUser({});
    localStorage.removeItem("token");
    history.push("/sign-in");
  }
  return (
    <div
      className="HeaderProfile"
      onClick={(e) => {
        if (!isShown) {
          e.stopPropagation();
          setIsShown(true);
        }
      }}>
      <Avatar size="md" username={user.username} />
      <span className="HeaderProfile__username">{user.username}</span>
      <HeaderProfileMenu isShown={isShown} setIsShown={setIsShown}>
        <li>
          <Link to="/">
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link to={"/profile/" + user.username}>
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/search">
            <span>Search</span>
          </Link>
        </li>
        <li>
          <Link to="/post/create">
            <span>Create Post</span>
          </Link>
        </li>
        <li>
          <a href="/#" onClick={logOut}>
            <span>Log Out</span>
          </a>
        </li>
      </HeaderProfileMenu>
    </div>
  );
}

export default HeaderProfile;
