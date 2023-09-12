import React, { useContext, useEffect, useState } from 'react'
import MemberNav from './MemberNav'
import { Link } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/Md"
import { RiMapPinFill, RiTimeFill, RiVipCrownFill } from "react-icons/Ri"
import { PiUsersThreeFill } from "react-icons/Pi"
import { CgSearch } from "react-icons/Cg"
import { FaBook } from "react-icons/Fa"
import { Context } from '../../components/store/Context';
import { POST } from '../../components/Aaxios';
import LoadingSmall from '../../components/style/LoadingSmall';

function MemberBookclass() {
  
  const [classData, setClassData] = useState();
  const [load, setLoad] = useState(false);

  // 사용자 정보
  const props = useContext(Context);
  const userInfo = props.userInfo;

  // 사용자 클래스 정보 호출
  const openedClassApi = (st) => { // 개설한 클래스 조회
    setLoad(true);
    st ? st : st = 0;
    POST("/api/member/class/open", {"userNo" : userInfo.no, "sortNum" : st},)
    .then((res) => {
      setClassData(res.data);
      setLoad(false);
    })
  }

  const participatedClassApi = (st) => { // 참여한 클래스 조회
    setLoad(true);
    st ? st : st = 0;
    POST("/api/member/class/party", {"userNo" : userInfo.no, "sortNum" : st},)
    .then((res) => {
      setClassData([...res.data].filter(e => e.leaderNickname != userInfo.nickname));
      setLoad(false);
    })
  }

  useEffect(() => {
    if(!userInfo) return;
    participatedClassApi();
  },[userInfo])

  // 정렬 버튼 관리  
  const [sortBtn, setSortBtn] = useState(0);
  const sortTypeBtn = (n) => {
    setSortBtn(n);
    if(listBtn == 0) openedClassApi(n);
    if(listBtn == 1) participatedClassApi(n);
  };

  const [listBtn, setListBtn] = useState(1);
  const listTypeBtn = (n) => {
    setListBtn(n);
    if(n == 0) openedClassApi(sortBtn);
    if(n == 1) participatedClassApi(sortBtn);
  };

  const statusTxtHandler = (txt) => {
    switch (txt) {
      case "개설 신청":
        return "blue";
      case "모집중":
        return "point";
      case "개설 거절":
        return "red";
      case "취소됨":
      case "종료됨":
        return "gray"
    }
  };

  return (
    <MemberNav>
      <h3 id="memberBookclassHead" className='memberHead'>나의 북클래스</h3>
        <div id="myBookclass">
          <div className="memberMenuTop">
            <div className="memberMenuSearch">
              <input type='text' className="miniSearchBar" placeholder='검색' onKeyUp={e => e.key == "Enter" && alert("Not supported")} />
              <button type="button" className="searchBtn typeIcon" onClick={() => alert("Not supported")} ><CgSearch /></button>
            </div>
            <div className="sortArea">
              <div className="sortArea" style={{marginRight: "5px"}}>
                <button type="button" className={"sortBtn typeShipBf" + (listBtn == 1 ? " active" : null)} onClick={e => listTypeBtn(1)}>참여 클래스</button>
                <button type="button" className={"sortBtn typeAll" + (listBtn == 0 ? " active" : null)} onClick={e => listTypeBtn(0)}>개설 클래스</button>
              </div>
              ｜ 
              <button style={{marginLeft: "5px"}} type="button" className={"sortBtn typeAll" + (sortBtn == 0 ? " active" : null)} onClick={e => sortTypeBtn(0)}>전체</button>
              <button type="button" className={"sortBtn typeShipBf" + (sortBtn == 1 ? " active" : null)} onClick={e => sortTypeBtn(1)}>모집중</button>
              <button type="button" className={"sortBtn typeShip" + (sortBtn == 2 ? " active" : null)} onClick={e => sortTypeBtn(2)}>{listBtn == 0 ? "신청됨" : "종료됨"}</button>
            </div>
          </div>

          {
            classData != "" & classData != undefined ?
            <>
              {
                classData.map(e => {
                    const endTime = e.scheduleEnd.length;
                  return(
                    <div className="classInfoBox" key={e.no}>
                      <div className="classInfo_top">
                        <div className='classInfo_title'><b>{e.title}</b></div>
                        <div className='classInfo_created'>개설일: {new Date(e.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="classInfo_content">
                        <img src={e.bookImgUrl} />
                        <div className='classInfo_main'>
                          <Link to={`/books/${e.bookIsbn}`} className='mouseHover' ><FaBook />{e.bookTitle}</Link>
                          <div><RiMapPinFill/>{e.location} {e.locationDetail? (", " + e.locationDetail) : "" }</div>
                          <div><RiTimeFill/>{e.scheduleStart}-{e.scheduleEnd.substring(endTime - 5, endTime)}</div>
                          <div><PiUsersThreeFill/>{e.partyMemCnt} / {e.memberCnt} 명</div>
                        </div>
                        <div className='classInfo_right'>
                          <div className={"classInfo_status " + statusTxtHandler(e.status)}><b>{e.status}</b></div>
                          {
                            userInfo?.nickname == e.leaderNickname ?
                            <div><b>내가 만든 클래스</b></div>
                            :
                            <div className='classInfo_leader'><RiVipCrownFill /><b>{e.leaderNickname}</b></div>
                          }
                          <Link to={`/bookclass/${e.no}`} className='mouseHover' >클래스 정보<MdArrowForwardIos /></Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </>
            :
            load ||
            <div className='textCenter'>
              <b>참여하거나 개설한 클래스가 없습니다.</b>
              <br />
              <Link to={"/bookclass"}>&gt;&gt;&nbsp;북 클래스 가기</Link>
            </div>
          }
          {
            load &&
            <LoadingSmall />
          }
        </div>
    </MemberNav>
  )
}

export default MemberBookclass