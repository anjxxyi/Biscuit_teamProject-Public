import React, { useContext, useEffect, useState } from 'react'
import MemberNav from './MemberNav'
import { Link } from 'react-router-dom';
import { MdBookmark, MdDelete, MdSaveAs } from "react-icons/Md"
import { CgSearch } from "react-icons/Cg"
import { POST, PUT, toFormatDate } from '../../components/Aaxios'
import { Context } from '../../components/store/Context';
import LoadingSmall from '../../components/style/LoadingSmall';

const MemberBookclip = () => {
  
  const props = useContext(Context);
  
  const [bookclipData, setBookclipData] = useState();
  const [load, setLoad] = useState(false);

  // 사용자 북클립 리스트 호출 함수
  const getMemClipList = (sortNum) => {
    setLoad(true);
    const data = {"userNo": props.userInfo?.no, "sortNum": sortNum};
    POST("/api/member/clip", data,)
     .then((res) => {
        setBookclipData(res.data);
        setLoad(false);
     });
  };

  // mount 시 사용자 북클립 리스트 호출, sort -> 최신순
  useEffect(() => {
    setLoad(true);
    getMemClipList(0);
  }, [props.userInfo]);

  // 북클립 삭제
  const delClip = (bookNo) => {
    const data = {"bookNo" : bookNo, "userNo" : props.userInfo.no}

    PUT("/api/books/delclip", data,)
    .then((res) => {
      console.log(res.data);
      getMemClipList(sortBtn);
    })
  };

  // sort 기능
  const [sortBtn, setSortBtn] = useState(0);
  const sortHandler = (n) => {
    setSortBtn(n);
    getMemClipList(n);
  };

  return (
    <MemberNav>
      <h3 id="memberBookclipHead" className='memberHead'>나의 북클립</h3>

        <div id="myBookclip">
          <div className="memberMenuTop">
            <div className="memberMenuSearch">
              <input type='text' className="miniSearchBar" placeholder='검색' onKeyUp={e => e.key == "Enter" && alert("Not supported")} />
              <button type="button" className="searchBtn typeIcon" onClick={() => alert("Not supported")} ><CgSearch /></button>
            </div>
            <div className="sortArea">
              {
                Array(3).fill().map((e,i) => {
                  const btnIndex = {"typeNew": "최신순", "typePrc": "가격순", "typePop": "인기순"};

                  return(
                    <button key={i} type="button" className={`sortBtn ${Object.keys(btnIndex)[i]}` + (sortBtn == i ? " active" : null)} onClick={e => sortHandler(i)}>{Object.values(btnIndex)[i]}</button>
                  );
                })
              }
            </div>
          </div>

          {
            bookclipData != "" & bookclipData != undefined ?
            <>
            {
              bookclipData.map(e => {
                return(
                  <div className="clipInfoBox" key={e.no} >
                    <div className="clipInfoBox_book">
                      <Link to={`/books/${e.books.isbn}`} className='clipInfoBox_title mouseHover' >
                        <MdBookmark style={{color: "#fe9b0c", marginRight: "7px"}} /><b>{e.books.title}</b>
                      </Link>
                      <div className='clipInfoBox_authors'>
                      {e.books.author} <small>지음</small>
                      {
                        e.books.translator &&
                        <>&nbsp;&nbsp;{e.books.translator} <small>옮김</small></>
                      }
                      </div>
                      <pre className='clipInfoBox_detail'>{e.books.detail}</pre>
                      <div className='clipInfoBox_priceAndupdate'>
                        <div>{e.books.price.toLocaleString()} 원</div>
                        <div className='clipInfoBox_update'>
                          <MdSaveAs style={{margin: "0 3px"}} />
                          {toFormatDate(e.updatedAt)}
                          <MdDelete style={{marginLeft: "10px"}} />
                          <span className='mouseHover' onClick={() => delClip(e.books.no)}>클립 삭제</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/books/${e.books.isbn}`} className="clipInfoBox_bookImg">
                      <img src={e.books.bookImgUrl} />
                    </Link>
                  </div>
                );
              })
            }
            </>
            :
            load ||
            <div className='textCenter'>
              <b>북클립에 담긴 책이 없습니다.</b>
            <br />
            <Link to={"/books?query=바삭"}>&gt;&gt;&nbsp;도서 검색</Link>
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

export default MemberBookclip
