import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiTimeFill, RiMapPinFill, RiBookFill, RiVipCrownFill, RiCheckboxCircleFill } from "react-icons/Ri"
import { PiUsersThreeFill } from "react-icons/Pi"
import { TiLocationArrow } from "react-icons/Ti"

const BookclassModal = ({object, modalOpen, setModalOpen}) => {
  const handleSroll = () => {
    setModalOpen(!modalOpen);
    document.body.style.overflow = "unset";
  }

  // NAVER map API -- START --
  const mapElement = useRef(null);
  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions = naver.maps.MapOptions = {
      center: location,
      zoom: 17,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);
  // NAVER map API -- END --

  return (
    <>
    <div className="modal">
      <div className="summary">
        <p className="pin">
          <span className="location"><TiLocationArrow/><b>{object.location.split(" ")[0] + " " + object.location.split(" ")[1]}</b></span>
          <span className="schedule">{object.scheduleStart.replace("2023.", "") + "-" + object.scheduleEnd.split(" ")[1]}</span>
        </p>
        <h3 className="title">{object.title}</h3>
        <pre className="textBox" dangerouslySetInnerHTML={{ __html : object.intro}}></pre>
        <div className="leader"><RiVipCrownFill/>{object.leaderNickname}</div>
      </div>
      <div className="detail">
        <dl className="infoBox">
          <dd><RiBookFill/><span>&lt;{object.bookTitle}&gt;, {object.bookAuthor}</span></dd>
          <dd><RiTimeFill/><span>{object.scheduleStart + "-" + object.scheduleEnd.split(" ")[1]}</span></dd>
          <dd><PiUsersThreeFill/><span>{object.partyMemCnt} / {object.memberCnt}명</span>{object.joined && <RiCheckboxCircleFill style={{fontSize: "1rem", marginLeft: "7px", color: "var(--TxtColor)"}} />}</dd>
          <dd><RiMapPinFill/><span>{object.location}{/*<small>({object.map})</small>*/}</span></dd>
        </dl>
      </div>
    </div>
    <div className="btn">
      <Link to={`./${object.no}`} className="submitBtn" onClick={handleSroll}>자세히 보기</Link>
      <button className="closeBtn" type="button" onClick={handleSroll}>닫기</button>
    </div>
    <div className="bgClickClose" onClick={handleSroll}></div>
    </>
  )
}

export default BookclassModal