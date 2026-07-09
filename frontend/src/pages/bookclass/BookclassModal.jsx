import React from 'react'
import { Link } from 'react-router-dom'
import { RiTimeFill, RiMapPinFill, RiBookFill, RiVipCrownFill, RiCheckboxCircleFill } from "react-icons/ri"
import { PiUsersThreeFill } from "react-icons/pi"
import { TiLocationArrow } from "react-icons/ti"

const BookclassModal = ({object, setModalOpen}) => {
  const closeModal = () => setModalOpen(false)

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
      <Link to={`./${object.no}`} className="submitBtn" onClick={closeModal}>자세히 보기</Link>
      <button className="closeBtn" type="button" onClick={closeModal}>닫기</button>
    </div>
    <button className="bgClickClose" type="button" aria-label="북클래스 상세 닫기" onClick={closeModal} />
    </>
  )
}

export default BookclassModal
