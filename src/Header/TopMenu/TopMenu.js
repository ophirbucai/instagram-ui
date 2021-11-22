import React, { useContext } from "react";
import "./TopMenu.scss";
import { faMoon, faSun, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faFortAwesomeAlt } from "@fortawesome/free-brands-svg-icons";
import TopMenuItem from "./TopMenuItem/TopMenuItem";
import { ThemeContext } from "../../App";

function TopMenu() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  return (
    <nav>
      <ul className="TopMenu">
        <TopMenuItem linkTo="/" faIcon={faFortAwesomeAlt} />
        <TopMenuItem linkTo="/search" faIcon={faSearch} />
        <TopMenuItem linkTo="/post/create" faIcon={faImages} />

        <div onClick={() => setDarkTheme(!darkTheme)}>
          <TopMenuItem
            linkTo="/#"
            disabled
            faIcon={darkTheme ? faSun : faMoon}
            color={darkTheme ? "#fada5e" : "#daa520"}
          />
        </div>
      </ul>
    </nav>
  );
}

export default TopMenu;
