import React from 'react'

import '../../styles/base/sub.css'

const Modal = (props) => {
  console.log(props);
  return (
    <div id="modalContent">
      <div className="modal">
        <div className="summary">
          <span className="pin"><TiLocationArrow/><b>{object.map.split(" ")[0] + " " + object.map.split(" ")[1]}</b> {object.schedule.replace("2023.", "")}</span>
          <h3 className="title">{object.title}</h3>
          <div className="textBox">{object.intro}</div>
          <div className="leader"><RiVipCrownFill/>{object.userName}</div>
        </div>
        <div className="detail">
          <dl className="bookBox">
            <dt>책 정보</dt>
            <dd className="thumb"><img src={object.bookThumb} alt="" /></dd>
            <dd>
              <ul>
                <li className="name"><RiBookFill/><span>&lt;{object.bookName}&gt;, {object.bookAuthor}</span></li>
                <li className="info">{object.bookInfo}</li>
                <li><button className="moreBtn styleRound" type="button">자세히 보기</button></li>
              </ul>
            </dd>
          </dl>
          <dl className="infoBox">
            <dt>클래스 정보</dt>
            <dd className="map"><div ref={mapElement} /></dd>
            <dd>
              <ul>
                <li><RiTimeFill/><span>{object.schedule}</span></li>
                <li><PiUsersThreeFill/><span>{object.member}명</span></li>
                <li><RiMapPinFill/><span>{object.location}<small>({object.map})</small></span></li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
      <div className="btn">
        <button className="submitBtn" type="button" onClick={() => alert("준비중입니다.")}>참여신청</button>
        <button className="closeBtn" type="button" onClick={() => {
            setModalOpen(!modalOpen);
            document.body.style.overflow = "unset";
          }}>닫기</button>
      </div>
    </div>
  )
}

export default Modal