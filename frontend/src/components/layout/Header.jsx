import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgDarkMode } from "react-icons/Cg";

import BiscuitLogo from "/images/biscuitLogo.svg";
import BiscuitLogo_dark from "/images/biscuitLogo_dark.svg";

import Navigation from "./Navigation";
import NavigationGlobal from "./NavigationGlobal";
import HeaderSearch from "./HeaderSearch";

const Header = ({ darkMode, handleDarkMode }) => {
  // Dropdown
	const [dropdownGnb, setDropdownGnb] = useState(false);
	const [dropdownSearch, setDropdownSearch] = useState(false);
	const handleDropdownGnb = (() => {
		setDropdownGnb(!dropdownGnb);
		setDropdownSearch(false);
	});
	const handleDropdownSearch = (() => {
		setDropdownSearch(!dropdownSearch);
		setDropdownGnb(false);
	});
  
  // DarkMode
	const path = useLocation().pathname;
	const pathGroup = path.replace("/", "").split("/");
	const headerDark = (
		(pathGroup[0] == "books" && !isNaN(pathGroup[1])) ||
		(pathGroup[0] == "booklog" && pathGroup[1] == "now")
	);
  const [isPageChange,] = useState(path);
  useEffect(() => {
    if(path !== isPageChange) {
      setDropdownGnb(false);
      setDropdownSearch(false);
    }
  }, [path])

	return (
    <header id="header" className={headerDark ? "darkFixed" : null}>
      <div className="headerTop">
        <Link to="/" className="logo">
          <h1><img src={headerDark || darkMode ? BiscuitLogo : BiscuitLogo_dark} alt="Biscuit" /></h1>
        </Link>
        <Navigation
          dropdownGnb={dropdownGnb} 
          dropdownSearch={dropdownSearch} 
          handleDropdownGnb={handleDropdownGnb} 
          handleDropdownSearch={handleDropdownSearch} 
        />
      </div>
      <NavigationGlobal dropdownVisibility={dropdownGnb} handleDropdownGnb={handleDropdownGnb} />
      <HeaderSearch dropdownVisibility={dropdownSearch} handleDropdownSearch={handleDropdownSearch} />
      <button className="fixedBtn typeDark typeIcon" onClick={handleDarkMode}><CgDarkMode/></button>
    </header>
	);
};

export default Header;
