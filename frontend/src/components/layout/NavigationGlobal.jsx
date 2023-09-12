import React, { useContext } from "react"
import { Link } from "react-router-dom"

import Dropdown from "../style/Dropdown"
import { Context } from "../store/Context"


const NavigationGlobal = ({ dropdownVisibility, handleDropdownGnb }) => {
  const userInfo = JSON.parse(localStorage.getItem("member"));

  return (
    <Dropdown visibility={dropdownVisibility} handleDropdown={handleDropdownGnb} >
      <nav className="globalNav">
        <ul>
          <li><p className="dept1">Biscuit</p>
            <ul className="dept2">
              <li><Link to={`/about`}>소개</Link></li>
              <li><Link to={`/faq`}>FAQ</Link></li>
              <li><Link to={`/policy/terms`}>약관 및 정책</Link></li>
            </ul>
          </li>
          <li><p className="dept1">도서 검색</p>
            <ul className="dept2">
              <li><Link to={`/books`}>도서 찾기</Link></li>
            </ul>
          </li>
          <li><p className="dept1">북로그</p>
            <ul className="dept2">
              <li><Link to={`/booklog/now`}>북로그 나우</Link></li>
              <li><Link to={`/booklog/search`}>북로그 검색</Link></li>
              <li>
                <Link to={userInfo ? `/booklog/${userInfo.userId}` : `/auth/signin`}>
                  내 북로그
                </Link>
              </li>
            </ul>
          </li>
          <li><p className="dept1">북클래스</p>
            <ul className="dept2">
              <li><Link to={`/bookclass`}>개설된 북클래스</Link></li>
              <li><Link to={`/bookclass/apply`}>북클래스 개설</Link></li>
            </ul>
          </li>
          <li><p className="dept1">마켓</p>
            <ul className="dept2">
              <li><Link to={`/campaign`}>Us, Earth 캠페인</Link></li>
              <li><Link to={`/goods`}>김바삭 굿즈</Link></li>
            </ul>
          </li>
          <li><p className="dept1">이벤트</p>
            <ul className="dept2">
              <li><Link to={`/events`}>진행중인 이벤트</Link></li>
            </ul>
          </li>
          <li><p className="dept1">마이페이지</p>
            <ul className="dept2">
              {
                userInfo?.authority != "A" ?
                <>
                <li><Link to={`/member/info`}>내 정보</Link></li>
                <li><Link to={`/member/bookclip`}>북클립 관리</Link></li>
                <li><Link to={`/member/bookclass`}>북클래스 관리</Link></li>
                <li><Link to={`/member/orderlist`}>주문내역</Link></li>
                </>
                :
                <li><Link to={`/member/admin`}>사용자 관리</Link></li>
              }
              {/* <li><Link to={`/member/campaign`}>바삭 정기권</Link></li> */}
            </ul>
          </li>
        </ul>
      </nav>
    </Dropdown>
  );
};

export default NavigationGlobal;