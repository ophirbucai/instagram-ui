import React from 'react';
import './TopMenu.scss';
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import TopMenuItem from "./TopMenuItem/TopMenuItem";

function TopMenu() {
    return (
        <nav>
            <ul className="TopMenu">
                <TopMenuItem linkTo="/search" faIcon={faSearch}/>
                <TopMenuItem linkTo="/post/create" faIcon={faPlusSquare} />
                <TopMenuItem linkTo="/" faIcon={faCheckSquare} />
            </ul>
        </nav>
    );
}

export default TopMenu;