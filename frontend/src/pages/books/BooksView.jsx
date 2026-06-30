import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { RiPrinterFill } from "react-icons/ri"
import { MdArrowBackIos, MdSell } from "react-icons/md"
import { FaSearchPlus } from "react-icons/fa"
import { IoMdClose, IoMdHeartEmpty, IoMdHeart } from "react-icons/io"
import { Context } from '../../components/store/Context'
import { POST, PUT } from '../../components/Aaxios'
import Loading from '../../components/style/Loading'
import SideBar from "../../components/layout/SideBar"

import '../../styles/base/sub.css'
import '../../styles/base/booksStyle.css'

const BooksView = () => {
  const props = useContext(Context); // context
  const [load, setLoad] = useState(false);
  const param = useParams();
  const navigate = useNavigate(); //변수 할당시켜서 사용 가능
  const backBtn = () => { navigate(-1); }; // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 가능
  const handleIconKeyDown = (handler) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handler();
    }
  };
  
  // 도서 정보 가져오기
  useEffect(() => {
    setLoad(true);
    const data = {"isbn" : param.no, "userId" : props.userInfo?.userId};
    POST("/api/books/info", data, "headers: { 'Content-Type': 'application/json' }")
      .then(function (res) {
        setBookInfo(res.data.book);
        res.data.cliped != null && setClip(res.data.cliped);
        setLoad(false);
      });
  }, []);

  const [bookInfo, setBookInfo] = useState([]);

  // 북클립 기능
  const [clip, setClip] = useState(false);
  function bookClipHandler() {
    if(!props.userInfo) return;

    if(clip) {
      const data = {"bookNo" : bookInfo.no, "userNo" : props.userInfo.no}
      setClip(false)
      try {
        PUT("/api/books/delclip", data,)
        .then((res) => {
          console.log("success")
        })
      } catch {
        setClip(true)
      }
    } else {
      const data = {"isbn" : bookInfo.isbn, "userId" : props.userInfo.userId}
      setClip(true)
      try{
        POST("/api/books/clip", data,)
          .then((res) => {
            console.log("success")
          })
      } catch {
        setClip(false)
      }
    }
  };

  // 이미지 크게 보기
  const [viewer, setViewer] = useState(false);
  const viewerHandler = () => {
    setViewer(!viewer);
  };
  

  // 페이지 출력
  const printHandler = () => {
    const printContents = document.querySelector("#pageContainer.books").innerHTML;
    const objWin = window.open("", "_blank", "fullscreen");

    if (!objWin) return;

    objWin.document.write("<link rel='stylesheet' href='https://github.com/anjxxyi/Biscuit_teamProject/blob/develop/frontend/src/styles/base/booksStyle.css'>");
    objWin.document.write("<html><body>");
    objWin.document.write(printContents);
    objWin.document.write("</body></html>");
    objWin.document.close();
    setTimeout(function() {
      objWin.focus();
      objWin.print();
      objWin.close();      
    },100);
  };


  return (
    <main id="pageContainer" className="books view noDrag">
    {
      load && 
      <Loading />
    }
    {bookInfo.title != undefined &&
      <>
      { viewer &&
        <div id="bigImgViewer" onClick={viewerHandler}>
          <div id="bigImg">
            <div id="bigImgCloser" role="button" tabIndex={0} aria-label="표지 크게 보기 닫기" onClick={viewerHandler} onKeyDown={handleIconKeyDown(viewerHandler)}><IoMdClose /></div>
            <img src={bookInfo.bookImgUrl} alt={`${bookInfo.title} 표지 크게 보기`} />
          </div>
        </div>
      }
      <div id="pageVisual">
        <section id="pageVisual_item">
          <button type="button" className="backBtn" aria-label="이전 화면" onClick={backBtn}><MdArrowBackIos /></button>
          <div className="utilBtn">
            { props.userInfo &&
              <>
              {
                clip ?
                <IoMdHeart role="button" tabIndex={0} aria-label="북클립 해제" style={{color: "var(--PointColor"}} onClick={bookClipHandler} onKeyDown={handleIconKeyDown(bookClipHandler)} />
                :
                <IoMdHeartEmpty role="button" tabIndex={0} aria-label="북클립 추가" onClick={bookClipHandler} onKeyDown={handleIconKeyDown(bookClipHandler)} />
              }
              </>
            }
            <FaSearchPlus role="button" tabIndex={0} aria-label="표지 크게 보기" onClick={viewerHandler} onKeyDown={handleIconKeyDown(viewerHandler)} />
            <RiPrinterFill role="button" tabIndex={0} aria-label="도서 정보 인쇄" onClick={printHandler} onKeyDown={handleIconKeyDown(printHandler)} />
          </div>
          <div className="imgbox">
            <div className='imgCover'>
              <img src={bookInfo.bookImgUrl} alt={`${bookInfo.title} 표지`} />
            </div>
            <div className="imgContent">
              <b className="imgTitle">{bookInfo.title}</b>
              <span className="imgAuthor">{bookInfo.author.replaceAll("^",", ")}</span>
            </div>
          </div>
        </section>
      </div>

        {/* #pageContents --- START */}
        <div id="pageContents">
          <div className="pageContents_basicInfo">
            <div className='pageContents_basicInfo_head'><b>기본정보</b></div>
            <div className='pageContents_basicInfo_description'>
              <ul className='des_index'>
                <li>발행일</li>
                <li>ISBN</li>
                <li>출판</li>
                <li>가격</li>
              </ul>
              <ul className='des_content'>
                <li>{bookInfo.publishedDate}</li>
                <li>{bookInfo.isbn}</li>
                <li>{bookInfo.publisher}</li>
                <li>{bookInfo.price.toLocaleString()} 원 <a href={bookInfo.bookDtlUrl} target='_blank' rel="noreferrer" aria-label="판매처에서 도서 보기"><MdSell /></a></li>
              </ul>
            </div>
          </div>

          <div className="pageContents_detail">
            <div className='pageContents_detail_head'><b>책 소개</b></div>
            <pre className='pageContents_detail_description'>{bookInfo.detail}</pre>
          </div>

          <div className='pageContents_author'>
            <div className='pageContents_author_head'><b>작가 소개</b></div>
            <div className='pageContents_author_description'>
              <div className='des_book_author'>
                <b>{bookInfo.author.replaceAll("^", ", ")}</b>
                <small>지음</small>
              </div>
              <pre className='des_book_authorDt'>{bookInfo.authorDetail}</pre>
              {
                bookInfo.translator &&
                <>
                <div className='dotLine'></div>
                <div className='des_book_author'>
                  <b>{bookInfo.translator.replaceAll("^", ", ")}</b>
                  <small>옮김</small>
                </div>
                <pre className='des_book_authorDt'>{bookInfo.transDetail}</pre>
                </>
              }
            </div>
          </div>
      </div>
      {/* #pageContents --- END */}
      </>
    }
    <SideBar>
      {
        clip ?
        <button className="scrollTop" type="button" aria-label="북클립 해제" onClick={bookClipHandler}>
          <IoMdHeart style={{color: "var(--PointColor"}} />
        </button>
        :
        <button className="scrollTop" type="button" aria-label="북클립 추가" onClick={bookClipHandler}>
          <IoMdHeartEmpty />
        </button>
      }
    </SideBar>
    </main>
  )
}

export default BooksView;
