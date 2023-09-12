import React, { useState } from 'react'
import { useEffect } from 'react';
import { POST } from './Aaxios'

const PopupFindBook = ({ onClose, setBookTitle, setBookAuth, setBookPub, setBookIsbn, userInfo }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    POST("/api/member/clip", {"userNo": userInfo.no},)
      .then((res) => {
        const temp = res.data.map((e) => e.books);
        setData(temp);
      })
  }, [userInfo]);

  function chooseBookHandler(item) {
    setBookTitle(item.title);
    setBookAuth(item.author);
    setBookPub(item.publisher);
    setBookIsbn(item.isbn);
    saveBookinDB(item.isbn);
    onClose();
  };

  const saveBookinDB = (isbn) => {
    const data = {"isbn" : isbn};
    POST("/api/books/info", data, "headers: { 'Content-Type': 'application/json' }")
      .then(function (res) {
      });
  }

  /**
   * @searchBookHandler(word, ) => display 기본값 20
   * @searchBookHandler(word, display) => display 최대 100
   * 
   * @param {String} word => 검색할 도서 연관 단어
   * @param {int} display => 출력할 도서 갯수 (최대 100권)
   * @returns => List\<Books\>
   */
  const searchBookHandler = (e) => {
    if(!e.target.value) return alert("검색어 입력!");
    const data = {"title": e.target.value, "display": 20, "sort": "sim", "start": 1};

    POST("/api/books/list", data,).then(function(res) {
      setData(res.data.items);
    })
  };

  const dataChanger = (date) => {
    const y = date.substring(0,4)
    const m = date.substring(4,6)
    const d = date.substring(6,8)
    return y + "." + m + "." + d;
  }


  return (
    <div id="modalContent">
      <div className="findBook">
        <div className="searchBar">
          <input className="bar" type="search" name="" id="" placeholder="찾을 도서명을 입력하세요. 기본목록은 북클립입니다." onKeyDown={e => {e.key == "Enter" && searchBookHandler(e)}} />
        </div>
        <div className="resultBox">
          {
            data != "" ?
            data.map((item, index) => {
            return (
              <div className='popBookList' key={index} onClick={() => chooseBookHandler(item)}>
                <p className="title">{item.title}</p>
                <p className="bookInfo"><span className="auth">{item.author}</span> ｜ <span className="pub">{item.publisher}</span> ｜ <span className="pubDate">{item.publishedDate || dataChanger(item.pubdate)}</span></p>
              </div>
            )})
            :
            <p className="nullComm">검색된 결과가 없습니다.</p>
          }
        </div>
      </div>
      <div className="bgClickClose" onClick={onClose}></div>
    </div>
  )
}

export default PopupFindBook