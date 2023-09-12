import React from 'react'
import { CgSearch } from "react-icons/Cg"
import { useNavigate } from 'react-router-dom';

import Dropdown from "../style/Dropdown"

const HeaderSearch = ({ dropdownVisibility, handleDropdownSearch }) => {
  const navigate = useNavigate();
  function searchHandler() {
    const query = document.getElementById("hssearch").value;
    if(query === "") alert("검색어를 입력해주세요.");
    else navigate(`/books?query=${query}`);
  };

  return (
    <Dropdown visibility={dropdownVisibility} handleDropdown={handleDropdownSearch}>
      <h3>빠른 도서 검색</h3>
      <div className="searchBox">
        <input type="text" name="search" id="hssearch" className="searchBar" placeholder="찾고 싶은 도서를 검색해 보세요." onKeyUp={e => e.key == "Enter" && searchHandler()} />
        <button type="button" className="searchBtn typeIcon" onClick={() => searchHandler()}><CgSearch /></button>
      </div>
    </Dropdown>
  )
}

export default HeaderSearch