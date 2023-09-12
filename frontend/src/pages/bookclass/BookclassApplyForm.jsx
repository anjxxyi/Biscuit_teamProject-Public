import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Context } from '../../components/store/Context'
import { RiInformationLine } from 'react-icons/Ri'
import { MdArrowRight } from 'react-icons/Md'

import PopupPostCode from '../../components/PopupPostCode'
import PopupFindBook from '../../components/PopupFindBook'
import { POST, GET, PUT } from '../../components/Aaxios'

const BookclassApplyForm = () => {
  const navigate = useNavigate();

  // userInfo
	const props = useContext(Context);
  const userInfo = props.userInfo;
  console.log(userInfo);
  useEffect(() => {
    props.loginChk();
    if (userInfo?.grade !== "L") {
      alert("아쉽지만 북클래스 개설신청이 가능한 회원등급이 아닙니다.");
      navigate(-1);
    }
  },[]);


  // postcode
  const [location, setLocation] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [isPopupPostCode, setIsPopupPostCode] = useState(false)
  const openPostCode = () => {
    setIsPopupPostCode(true);
    document.body.style.overflow = "hidden";
  };
  const closePostCode = (e) => {
    setIsPopupPostCode(false);
    document.body.style.overflow = "unset";
  };
  const postCodeTrigger = useRef(null);
  const fnPostCodeTrigger = () => {
    (postCodeTrigger !== null && postCodeTrigger.current !== null) ?
    postCodeTrigger.current.click() : null
  }


  // findBook
  const [bookTitle, setBookTitle] = useState(null);
  const [bookAuth, setBookAuth] = useState(null);
  const [bookPub, setBookPub] = useState(null);
  const [bookIsbn, setBookIsbn] = useState(null);
  const [isPopupFindBook, setIsPopupFindBook] = useState(false)

  const submitBtn = useRef();
  const locationDetail = useRef();

  const openFindBook = () => {
    setIsPopupFindBook(true);
    document.body.style.overflow = "hidden";
    submitBtn.current.type = "button"
  };
  const closeFindBook = (e) => {
    setIsPopupFindBook(false);
    document.body.style.overflow = "unset";
    submitBtn.current.type = "submit"
  };


  // handleApplySubmit
	const handleApplySubmit = async (e) => {
		e.preventDefault();

    if(submitBtn.current.id == "apply"){
      const data = {
        title: title.value,
        intro: intro.value,
        zipCode: zipCode.value,
        location: location,
        locationDetail: locationDetail.current.value,
        memberCnt: memberCnt.value,
        scheduleStart: date.value + " " + timeStart.value,
        scheduleEnd: date.value + " " + timeEnd.value,
        userId: userInfo.userId,
        isbn: bookIsbn
      };
      POST("/api/bookclass/apply", data,)
        .then(response => { // success
          alert("북클래스 개설 신청이 정상적으로 접수되었습니다.");
          navigate("/bookclass");
        })
        .catch(error => { // failure
          alert("북클래스 개설 신청 접수가 실패하였습니다.");
          console.error(error);
        });

    } else if(submitBtn.current.id == "edit") {
      const urlpar = urlparams.get("edit");
      const data = {
        title: title.value,
        intro: intro.value,
        zipCode: zipCode.value,
        location: location,
        locationDetail: locationDetail.current.value,
        memberCnt: memberCnt.value,
        scheduleStart: date.value + " " + timeStart.value,
        scheduleEnd: date.value + " " + timeEnd.value,
        isbn: bookIsbn
      };
      PUT(`/api/bookclass/${urlpar}/update`, data,)
        .then(response => { // success
          alert(`북클래스 수정이 되었습니다.
관리자 확인 후 변경 사항이 적용됩니다.`);
          navigate("/bookclass");
        })
        .catch(error => { // failure
          alert("북클래스 수정을 실패하였습니다. 잠시후 다시 시도해주세요.");
          console.error(error);
        });
    }
	};


  // handleCancel
  const handleCancel = () => {
    if(confirm("작성을 취소하시겠습니까?") === true) {
      return navigate('/bookclass');
    } else {
      return null;
    };
  };
  

  // edit -----------------------
  // get book's information
  const [classData, setClassData] = useState();
  const [urlparams,] = useSearchParams();
  useEffect(() => {
    const urlpar = urlparams.get("edit");
    if(urlpar != null) {
      userInfo && GET(`/api/bookclass/${urlpar}/e`)
        .then((res) => {
          setClassData(res.data);
          setLocation(res.data.location);
          if(userInfo.authority != "A") {
            if(userInfo.nickname != res.data.userNickname) {
              navigate(-1);
            };
          }
        })
    }
  }, [props?.userInfo])

  return (
    <section className="formSection">
      <form className="formArea" onSubmit={handleApplySubmit}>
        <div className="infoBox typeUser">
          <h3 className="boxTitle">신청자 정보</h3>
          <div className="userId">
            <label>아이디</label>
            <div className="likeInput noDrag">{userInfo?.userId}</div>
          </div>
          <div className="name">
            <label>성명</label>
            <div className="likeInput noDrag">{userInfo?.name}</div>
          </div>
          <div className="nickname">
            <label>별명</label>
            <div className="likeInput noDrag">{userInfo?.nickname}</div>
          </div>
          <div className="email">
            <label>이메일</label>
            <div className="likeInput noDrag">{userInfo?.email}</div>
          </div>
          <div className="tel">
            <label>연락처</label>
            <div className="likeInput noDrag">{userInfo?.phone}</div>
          </div>
          <div className="caption"><RiInformationLine/> <b>신청자 정보 변경</b>은 <Link to={`/member/info`}><u>‘마이페이지</u><MdArrowRight/><u>내 정보’</u></Link>에서 변경해 주세요.</div>
        </div>

        <div className="infoBox typeBookclass">
          <h3 className="boxTitle">북클래스 정보</h3>
          <div className="classTitle">
            <label>북클래스명</label>
            <input type="text" name="title" id="title" placeholder="50자 이내 (예: 한국 소설을 읽고 모여 우리 삶의 소설적 순간을 나눠요.)" defaultValue={classData ? classData.title : ""} required />
          </div>
          <div className="info">
            <label>북클래스 소개</label>
            <textarea name="intro" id="intro" cols="30" rows="4" placeholder="200자 이내 (예: 책 속 어떤 장면이 감동을 주었는지, 어떤 인물의 선택이 마음을 건드렸는지, 어떤 이야기가 우리의 인생에 새로운 시선을 열어줬는지, 소설이 내게 선사한 마법같은 순간을 공유해요.)" defaultValue={classData ? classData.intro : ""} required />
          </div>
          <div className="schedule">
            <label>북클래스 일정</label>
            <div>
              <input className="date" type="date" name="date" id="date" defaultValue={classData ? classData.schedule : "" } required />
              <div className="timeBundle">
                <input className="time" type="time" name="timeStart" id="timeStart" defaultValue={classData ? classData.scheduleStart : "" } required /> ~
                <input className="time" type="time" name="timeEnd" id="timeEnd" defaultValue={classData ? classData.scheduleEnd : "" } required />
              </div>
            </div>
          </div>
          <div className="location">
            <label>북클래스 장소</label>
            <div className="post">
              <input type="text" placeholder="우편번호" defaultValue={postcode ? postcode : classData ? classData.zipCode : ""} id="zipCode" name="zipCode" onClick={fnPostCodeTrigger} required />
              <button type="button" ref={postCodeTrigger} onClick={openPostCode}>우편번호 검색</button>
              {isPopupPostCode && <PopupPostCode onClose={closePostCode} setLocation={setLocation} setPostcode={setPostcode} locationDetail={locationDetail} />} 
            </div>
            <input type="text" placeholder="주소" id="location" name="location" defaultValue={location ? location : ""} required />
            <input type="text" placeholder="상세 주소" name="locationDetail" id="locationDetail" ref={locationDetail} defaultValue={classData ? classData.locationDetail : ""} />
          </div>
          <div className="book">
            <label>읽을 도서</label>
            <div className="searchBundle">
              <input type='text' id="booktitleInput" placeholder='<도서명> 저자, 출판사' value={bookTitle? `<${bookTitle}> ${bookAuth}, ${bookPub}` : (classData ? `<${classData.bookTitle}> ${classData.bookAuthor}, ${classData.bookPublisher}` : "")} readOnly />
              <button type="button" onClick={openFindBook}>도서 검색</button>
              {isPopupFindBook && <PopupFindBook onClose={closeFindBook} setBookTitle={setBookTitle} setBookAuth={setBookAuth} setBookPub={setBookPub} setBookIsbn={setBookIsbn} userInfo={userInfo} />}
            </div>
          </div>
          <div className="memberCnt">
            <label>함께할 인원</label>
            <div><input type="number" id="memberCnt" name="memberCnt" min="2" max="10" defaultValue={classData ? classData.memberCnt : ""} required />명</div>
          </div>
        </div>

        <div className="btnBox">
          <button className="cancel" type="button" onClick={handleCancel}>취소</button>
          {
            !classData ?
            <button className="submit" type="submit" id="apply" ref={submitBtn}>신청</button>
            :
            <button className="submit" type="submit" id="edit" ref={submitBtn}>수정</button>
          }
        </div>
      </form>
    </section>
  )
}

export default BookclassApplyForm