import React, { useContext, useEffect } from 'react'

import { Link, useLocation } from "react-router-dom";
import { Context } from '../../components/store/Context';
import SideBar from "../../components/layout/SideBar"

import { GiTicket, GiBookshelf } from "react-icons/Gi"
import { BsFillPersonBadgeFill } from "react-icons/Bs"

import '../../styles/base/sub.css'
import '../../styles/base/memberStyle.css'
import MemberAdmin from './MemberAdmin';

const MemberNav = ({children}) => {

  const path = useLocation().pathname;
	const pathGroup = path.replace("/", "").split("/");
  
  useEffect(() => {
    if(userInfo?.authority != "A") {
      const liTags = document.querySelectorAll("section.navSideSection > ul > li");
      liTags.forEach(e => e.style.fontWeight = "400");
      if(pathGroup[1] === "info" || pathGroup[1] === "cancel") liTags[0].style.fontWeight = "700";
      if(pathGroup[1] === "bookclip") liTags[1].style.fontWeight = "700";
      if(pathGroup[1] === "bookclass") liTags[2].style.fontWeight = "700";
      if(pathGroup[1] === "orderlist") liTags[3].style.fontWeight = "700";
      if(pathGroup[1] === "savedgoods") liTags[4].style.fontWeight = "700";
    }
  }, [])

  const props = useContext(Context);
  const userInfo = JSON.parse(localStorage.getItem("member"));
  useEffect(() => {
    props.loginChk();
  },[]);

  
  return (
    <main id="pageContainer" className='memberNav'>
      <div id="pageVisual">
        <h2 className="title">{userInfo?.authority != "A" ? "My Page" : "User Management"}</h2>
        <div className="info">
          <div className='infoLeft'>
            <div id="myNick">{props.userInfo?.nickname}</div>
            <div id="myId">{props.userInfo?.userId}</div>
          </div>
          {
            userInfo?.authority != "A" &&
            <div className='infoRight'>
              <div>
                <BsFillPersonBadgeFill />
                <span>{props.userInfo?.grade == "L" ? "비스킷 리더" : "바삭 멤버"}</span>
              </div>
              <div>
                <GiBookshelf />
                <span>{props.userInfo?.point.toLocaleString()}</span>
              </div>
            </div>
          }
          {/* <Link to={"/member/ticket"} id='myTicket'><GiTicket />바삭 정기권</Link> */}
        </div>
      </div>

      {/* #pageContents.default --- START */}
      {
        userInfo?.authority != "A" ?
        <div id="pageContents" className="memberNavMain">
            <section className="navSideSection">
              <ul>
                <li><Link to={'/member/info'}>내 정보</Link></li>
                <li><Link to={'/member/bookclip'}>북클립 관리</Link></li>
                <li><Link to={'/member/bookclass'}>북클래스 관리</Link></li>
                <li><Link to={'/member/orderlist'}>주문내역</Link></li>
              </ul>
            </section>
            <section className="navContentSection">
              <div className='navContentSection_childrenCase'>
                {children}
              </div>
            </section>
        </div>
        :
        <div id="pageContents" className="memberNavMain">
          <MemberAdmin />
        </div>
      }
      {/* #pageContents.default --- END */}
      <SideBar />
    </main>
  )
}

export default MemberNav