import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { RiTimeFill, RiMapPinFill, RiBookFill, RiVipCrownFill } from "react-icons/Ri"
import { PiUsersThreeFill } from "react-icons/Pi"
import { TiLocationArrow } from "react-icons/Ti"
import { useNavermaps } from 'react-naver-maps'

import Sidebar from '../../components/layout/SideBar'
import Loading from '../../components/style/Loading'

import '../../styles/base/sub.css'
import '../../styles/base/bookclassStyle.css'
import { Context } from '../../components/store/Context'
import { POST, GET } from '../../components/Aaxios'

const BookclassView = () => {
  
  const no = useParams().no;
  const navigate = useNavigate();
  const props = useContext(Context);
  const userInfo = props.userInfo; 
  const [dataList, setDataList] = useState([]);
  const [joined, setJoined] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    if(userInfo != undefined || userInfo == null) {
      const axiosURL = userInfo != null ? `/api/bookclass/classNo=${no}&userNo=${userInfo.no}` : `/api/bookclass/classNo=${no}&userNo=0`;
      GET(axiosURL)
        .then(res => {
          switch (res.data.status) {
            case "모집중":
            case "종료됨":
              break;
            default:
              if(res.data.leaderNickname != userInfo.nickname)
                return navigate(-1);
              break;
          }

          setDataList(res.data);
          setJoined(res.data.joined);
          naverMap(res.data.location);
          setLoad(false);
        })
        .catch(error => console.log(error))
    }
  }, [props.userInfo]);

  
  // NAVER map geocode API -- START --
  const navermaps = useNavermaps();
  const [pointMap, setPointMap] = useState([]);

  const naverMap = (addr) => {
    navermaps.Service.geocode(
      {address: addr},
      function (status, response) {
        if (status !== navermaps.Service.Status.OK) {
          console.log('error');
          return alert('Something wrong!');
        }
        const result = response.result;
        if(result) setPointMap(result.items[0].point);
      }
    );   
  };
  // NAVER map geocode API -- END -- 


  // NAVER map API -- END --
  const mapElement = useRef(null);
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;
    const location = new naver.maps.LatLng(pointMap.y, pointMap.x);
    const mapOptions = naver.maps.MapOptions = {
      center: location,
      zoom: 17,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [pointMap]);
  // NAVER map API -- END --

  const tabBtn = useRef();
  const introBox = useRef();
  const bookBox = useRef();
  const classBox = useRef();
  const [scrollFocus, setScrollFocus] = useState({0: false, 1:false, 2:false});

  const onMoveToInfo = () => window.scrollBy({top:document.getElementById("introBox").getBoundingClientRect().top - 140, behavior:'smooth'});
  const onMoveToBook = () => window.scrollBy({top:document.getElementById("bookBox").getBoundingClientRect().top - 140, behavior:'smooth'});
  const onMoveToClass = () => window.scrollBy({top:document.getElementById("classBox").getBoundingClientRect().top - 140, behavior:'smooth'});

  const distancePeFromTop = () => {
    let tabBtnBtm = tabBtn.current.getBoundingClientRect().bottom;
    let introBoxTop = introBox.current.getBoundingClientRect().top;
    let bookBoxTop = bookBox.current.getBoundingClientRect().top;
    let classBoxTop = classBox.current.getBoundingClientRect().top;

    let iFocus = tabBtnBtm - introBoxTop;
    let bFocus = tabBtnBtm - bookBoxTop;
    let cFocus = tabBtnBtm - classBoxTop;

    if(iFocus >= 0 && bFocus < 0 && cFocus < 0) setScrollFocus({0: true, 1:false, 2:false})
    else if(iFocus > 0 && bFocus >= 0 && cFocus < 0) setScrollFocus({0: false, 1:true, 2:false})
    else if(iFocus > 0 && bFocus > 0 && cFocus >= 0) setScrollFocus({0: false, 1:false, 2:true})
    else setScrollFocus({0: false, 1:false, 2:false});
  };

  useEffect(() => {
    window.addEventListener("scroll", distancePeFromTop);
    return () => {
      window.removeEventListener("scroll", distancePeFromTop);
    };
  }, [distancePeFromTop]);
  
  
  // bookclass 참여신청
  const joinBookclass = () => {
    setLoad(true);
    if(dataList.leaderNickname !== userInfo.nickname) {
      const data = {bookclassNo: dataList.no, userNo: userInfo.no}
      POST(`/api/bookclass/party/in`, data)
        .then(res => {
          setJoined(!joined);
          dataList.partyMemCnt++;
          setLoad(false);
          if(res.data == "max") alert("북클래스가 이미 만원입니다.");
          else console.log(res.data);
        });
    }
  };

  // bookclass 참여취소
  const outBookclass = () => {
    if(dataList.leaderNickname !== userInfo.nickname) {
      const data = {bookclassNo: dataList.no, userNo: userInfo.no}
      POST(`/api/bookclass/party/out`, data)
        .then(res => {
          setJoined(!joined);
          dataList.partyMemCnt--;
          console.log(res.data);
        });
    }
  };

  return (
    <main id="pageContainer" className="bookclass view">
    {
      load &&
      <Loading opacity={1} />
    }
    {dataList ? (
      <>
      <div id="pageVisual">
        <h2 className="pageName">Book Class</h2>
        <h3 className="title">{dataList.title}</h3>
        <div className="info">
          <span className="leader"><RiVipCrownFill/>{dataList.leaderNickname}</span>
          {
            userInfo &&
            (
            userInfo?.nickname != dataList?.leaderNickname ?
              joined ?
              <button className="submit" type="button" onClick={outBookclass}>참여 취소</button>
              :
              <button className="submit" type="button" onClick={joinBookclass}>참여 신청</button>
            :
            <Link to={`/bookclass/apply?edit=${dataList.no}`} className="submit" type="button" >정보 수정</Link>
            )
          }          
        </div>
      </div>
      <div id="pageTabmenu" ref={tabBtn}>
        <button className={scrollFocus[0] ? "tabBtn active" : "tabBtn"} type="button" onClick={onMoveToInfo}>소 개</button>
        <button className={scrollFocus[1] ? "tabBtn active" : "tabBtn"}  type="button" onClick={onMoveToBook}>책 정보</button>
        <button className={scrollFocus[2] ? "tabBtn active" : "tabBtn"}  type="button" onClick={onMoveToClass}>클래스 정보</button>
      </div>
      
      {/* #pageContents --- START */}
      <div id="pageContents">
        <section className="mainSection">
          <dl className="introBox" id="introBox" ref={introBox}>
            <dt>소개</dt>
            <dd className="pin">
              <span className="location"><TiLocationArrow/><b>{dataList.location + " "}{dataList.locationDetail}</b></span>
              <span className="schedule">{dataList.scheduleStart + " - " + dataList.scheduleEnd}</span>
            </dd>
            <dd className="info"><pre>{dataList.intro}</pre></dd>
          </dl>
          <dl className="bookBox" id="bookBox" ref={bookBox}>
            <dt>책 정보</dt>
            <dd className="thumb"><img src={dataList.bookImgUrl} alt="" /></dd>
            <dd>
              <ul>
                <li className="name"><RiBookFill/><span>&lt;{dataList.bookTitle}&gt;, {dataList.bookAuthor}</span></li>
                <li className="info">{dataList.bookDetail}</li>
                <li><Link to={`/books/${dataList.bookIsbn}`}><button className="moreBtn styleRound" type="button">더보기</button></Link></li>
              </ul>
            </dd>
          </dl>
          <dl className="classBox" id="classBox" ref={classBox}>
            <dt>클래스 정보</dt>
            <dd className="map"><div ref={mapElement}/></dd>
            <dd>
              <ul>
                <li><RiTimeFill/><span>{dataList.scheduleStart + " - " + dataList.scheduleEnd}</span></li>
                <li><PiUsersThreeFill/><span>{dataList.partyMemCnt} / {dataList.memberCnt}명</span></li>
                <li><RiMapPinFill/><span>{dataList.location + " "}{dataList.locationDetail}</span></li>
              </ul>
            </dd>
          </dl>
        </section>
      </div>
      {/* #pageContents --- END */}
      </>
    ) : null}
    <Sidebar />
    </main>
  )
}

export default BookclassView