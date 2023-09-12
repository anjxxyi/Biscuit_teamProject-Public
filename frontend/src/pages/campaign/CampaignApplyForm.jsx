import React, {useContext, useState, useRef, useEffect} from 'react'
import { Link, useNavigate , useSearchParams} from 'react-router-dom'
import { RiInformationLine } from 'react-icons/Ri'
import { MdArrowRight } from 'react-icons/Md'
import {Context} from "../../components/store/Context";
import {POST} from "../../components/Aaxios";

import PopupFindBook from '../../components/PopupFindBook';
import PopupPostCode from '../../components/PopupPostCode';

function CampaignApplyForm() {
  const props = useContext(Context);
  const userInfo = props.userInfo;
  useEffect(() => {
    props.loginChk();
  },[]);

  // postcode
  const [location, setLocation] = useState('');
  const [postcode, setPostcode] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [isPopupPostCode, setIsPopupPostCode] = useState(false);

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

   const [classData, setClassData] = useState();
   const [urlparams,] = useSearchParams();
   useEffect(() => {
     const urlpar = urlparams.get("edit");
     if(urlpar != null) {
       GET(`/api/bookclass/${urlpar}/e`)
         .then((res) => {
           setClassData(res.data);
           // if(userInfo.nickname != res.data.userNickname) {
           //   navigate(-1);
           // };
         })
     }
   }, [])

   //apply
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const navigate = useNavigate(); 
   const [status, setStatus] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    const cfm = confirm("캠페인 참여에 동의하시겠습니까?");
    if(cfm == true){
      if(submitBtn.current.id == "apply"){
        const data = {
          title: title,
          content: content,
          pickupAddress: location + locationDetail,
          isbn: bookIsbn,
          userId: userInfo?.userId,
          status: status
        }
        POST("/api/campaign/apply", data, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            alert("접수가 완료되었습니다.");
            navigate("/campaign")
        })
        .catch((err) => {
            console.log(err);
        })
      }
    } if(cfm == false){
      alert("신청이 취소되었습니다.");
      navigate("/campaign");
    }

    
   }

   function conditionBtn(condition){
        setStatus(condition);
   }

   const handleCancel = () => {
    if(confirm("작성을 취소하시겠습니까?") === true) {
      return navigate('/campaign');
    } else {
      return null;
    };
  };



  return (
   <section className='applySection'>
    <form className='formArea' onSubmit={handleSubmit}> 
        <div className='infoBox user'>
            <h3 className='infoTitle'>신청자 정보</h3>
            <div className='caption red'><RiInformationLine/><b>캠페인 특성상 신청 후 취소는 불가합니다.</b></div>
            <div className='id'>
                <label>아이디</label>
                <div className='likeInput noDrag'>{userInfo?.userId}</div>
            </div>
            <div className='name'>
                <label>성명</label>
                <div className='likeInput noDrag'>{userInfo?.name}</div>
            </div>
            <div className='nick'>
                <label>별명</label>
                <div className='likeInput noDrag'>{userInfo?.nickname}</div>
            </div>
            <div className='email'>
                <label>이메일</label>
                <div className='likeInput noDrag'>{userInfo?.email}</div>
            </div>
            <div className='phone'>
                <label>연락처</label>
                <div className='likeInput noDrag'>{userInfo?.phone}</div>
            </div>
            <div className="caption"><RiInformationLine/> <b>신청자 정보 변경</b>은 <Link to={`/member/info`}><u>‘마이페이지</u><MdArrowRight/><u>내 정보’</u></Link>에서 변경해 주세요.</div>
        </div>

        <div className='infoBox useBook'>
          <h3 className='infoTitle'>중고도서 정보</h3>
          <div className='applyTitle'>
              <label>제목</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해 주세요'/>
          </div>
          <div className='applyContent'>
              <label>내용</label>
              <textarea cols="30" rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder='간단한 책의 상태를 알려주세요'/>
          </div>
          <div className='conditionBox'>
              <button type='button' className='gradeS' onClick={() => conditionBtn("S")}>최상</button>
              <button type='button' className='gradeA' onClick={() => conditionBtn("G")} >상</button>
              <button type='button' className='gradeB' onClick={() => conditionBtn("N")}  >중</button>
              <button type='button' className='gradeC' onClick={() => conditionBtn("B")}  >하</button>
          </div>

          <div className='location'>
              <label>픽업 장소</label>
              <div className='zip'>
                  <input type='text' defaultValue={postcode || ''}  onClick={fnPostCodeTrigger} readOnly/>
                  <button type='button' ref={postCodeTrigger} onClick={openPostCode}>우편번호 검색</button>
                  {isPopupPostCode && <PopupPostCode onClose={closePostCode} setLocation={setLocation} setPostcode={setPostcode} locationDetail={locationDetail}/>} 
              </div>
              <input type='text' placeholder='주소' defaultValue={location} readOnly/>
              <input type='text' placeholder='상세 주소'  id="locationDetail"  value={locationDetail} onChange={(e) => setLocationDetail(e.target.value)}/>
          </div>

          <div className='book'>
              <label>판매할 도서 정보</label>
              <div className="searchBundle">
              <input type='text' id="booktitleInput" placeholder='<도서명> 저자, 출판사' value={bookTitle? `<${bookTitle}> ${bookAuth}, ${bookPub}` : (classData ? `<${classData.bookTitle}> ${classData.bookAuthor}, ${classData.bookPublisher}` : "")} readOnly />
              <button type="button" onClick={openFindBook}>도서 검색</button>
              {isPopupFindBook && <PopupFindBook onClose={closeFindBook} setBookTitle={setBookTitle} setBookAuth={setBookAuth} setBookPub={setBookPub} setBookIsbn={setBookIsbn} userInfo={userInfo}/>}
              </div>
          </div>
        </div>

        <div className="btnBox">
          <button className="cancel" type="button" onClick={handleCancel} >취소</button>
          <button className="submit" type="submit" id="apply" ref={submitBtn} onClick={handleSubmit}>신청</button>
        </div>
    </form>
   </section>
  )
}

export default CampaignApplyForm