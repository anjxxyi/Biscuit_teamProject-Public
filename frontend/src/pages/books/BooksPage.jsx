import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CgSearch } from "react-icons/Cg"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/Md"
import { POST } from '../../components/Aaxios'

import PageVisual from "../../components/layout/PageVisual"
import BooksInner from './BooksInner'
import Loading from '../../components/style/Loading'
import SideBar from "../../components/layout/SideBar"

import '../../styles/base/sub.css'
import '../../styles/base/booksStyle.css'

const BooksPage = () => {

  const [start, setStart] = useState(1);
  const [load, setLoad] = useState(false);
  const bookQuery = useRef();
  
  // QueryString 가져오기 및 새로고침, view에서 뒤로가기 시 검색 정보 유지
  const [urlparams, setUrlparams] = useSearchParams();
  useEffect(() => {
    const input = bookQuery.current.value;
    const urlpar = urlparams.get("query");
    
    if(urlpar == null) {
      bookQuery.current.value = "";
      setAllBooks();
    } else if(input != "") {
      sortChanger(sortBtns);
    } else if(input == "" & urlpar != null) {
      bookQuery.current.value = urlpar;
      sortChanger(sortBtns);
    }
  }, [urlparams.get("query")])

  // 검색 기능
  const queryStringChanger = () => {
    const val = bookQuery.current.value;
    if(val != ""){
      urlparams.set("query", val); // QueryString 변경
      setUrlparams(urlparams);
      setPage(1);
      setStartNum(1);
    } else {
      alert("검색어를 입력해주세요.");
    }
  };

  // 도서 리스트 가져오기
  const getBookList = (num, st) => {
    setLoad(true);
    const word = bookQuery.current.value;
    
    st ? st : (st = "sim");
    if(num == undefined) { num = 1; setStart(1); };
    const data = {"title": word, "display": 100, "sort": st, "start": num}
    POST("/api/books/list", data,)
      .then(function (res) {
        if(num == 1) setAllBooks(res.data);
        else {
          let tempBooks = {...allBooks};
          tempBooks.items = [...tempBooks.items, ...res.data.items];
          setAllBooks(tempBooks);
        }
        setTimeout(() => {
          setLoad(false);
        }, 200);
      });
    return true;
  };

  const [allBooks, setAllBooks] = useState();

  const [sortBtns, setSortBtn] = useState(0);
  function sortChanger(n) { // sort 기준 변경
    const arr = ["sim", "date"];

    setSortBtn(n);
    getBookList(undefined, arr[n]);
  };


  // pagination --- START
  // const [totalBooks, setTotalBooks] = useState(0); // 데이터 총 갯수
  const [page, setPage] = useState(1); // default page => 1
  const [startNum, setStartNum] = useState(1);
  const pLimit = 10; // 10 contents in a page
  const pOffset = (page - 1) * pLimit; // 데이터 자르기 시작 지점 설정
  const totalBooks = allBooks ? Math.ceil(allBooks.items.length / 10) : 0;
  const bookData = allBooks ? allBooks.items.slice(pOffset, pOffset + pLimit) : []; // 데이터 pLimit만큼 자르기

  const pageSeletor = (k, i) => { // 페이지 선택
    if(page != k) {
      setPage(k);
      pageTextBolder(i);
    }
  };

  const pageChanger = (num) => { // 페이지 단락? 이동
    if(num > 0 && num <= totalBooks) {
      setStartNum(num);
      setPage(num);
      if(num === 1) {
        pageTextBolder(0);
      };
      if(num + 5 > totalBooks) {
        pageTextBolder(0);
      };
    } else if(num > totalBooks) {
      setStartNum(num);
      setPage(num);
      getBookList(start + 100);
      pageTextBolder(0);
      setStart(start + 100);
    } else {
      alert("페이지가 없습니다.")
    }
  };

  const pageTextBolder = (i) => { // 현재 페이지 폰트 굵게
    const pageNum = document.querySelectorAll("span.pageNum");
    pageNum.forEach(e => e.style.fontWeight = "inherit");
    pageNum[i].style.fontWeight = "700";
  };

  useEffect(() => { // 도서 검색 후 1페이지 버튼 굵게 및 처음 페이지 왼쪽 화살표 표시 제거
    const pageChg = document.querySelectorAll("span.pageChg");
    const pageNum = document.querySelectorAll("span.pageNum");
    if(pageNum.length != 0) pageTextBolder(0);}, [totalBooks]);  
  // pagination --- END

  // console.log("dd", page +", " + startNum)

  return (
    <main id="pageContainer" className="books">
      <PageVisual/>
      {
        load && 
        <Loading opacity={1} />
      }
      
      {/* #pageContents --- START */}
      <div id="pageContents">
        <section className={!urlparams.get("query") ? "topSection default" : "topSection"}>
          <div className="searchArea">
            <input type="text" name="search" id="bpsearch" className="searchBar" placeholder="찾고 싶은 도서를 입력해 주세요.&nbsp;&nbsp;예시) 비스킷, 어린왕자, 세계 문학" onKeyUp={e => e.key == "Enter" && queryStringChanger()} ref={bookQuery} />
            <button type="button" className="searchBtn typeIcon" onClick={() => queryStringChanger()}><CgSearch /></button>
          </div>
          {
            totalBooks != 0 &&
            <div className="sortArea">
              <button type="button" className={"sortBtn typeRec" + (sortBtns == 0 ? " active" : null) } onClick={() => sortChanger(0)}>연관순</button>
              <button type="button" className={"sortBtn typeNew'" + (sortBtns == 1 ? " active" : null) } onClick={() => sortChanger(1)}>최신순</button>
            </div>
          }
        </section>

        {
          totalBooks != 0 &&
          <section className='bookListSection'>
            <div className='bookList'>
              {
                bookData.map((e, i) => {
                  return <BooksInner key={i} bookData={e} />;
                })
              }
            </div>
            <div className='pagination noDrag'>
              <span className='pageChg' onClick={() => pageChanger(startNum - 5)}><MdArrowBackIos /></span>
              {Array(5).fill().map((e,i) => {
                  let k = startNum + i;
                  return totalBooks >= k &&
                  <span className='pageNum' key={i} onClick={() => pageSeletor(k ,i)}>{k}</span>;
                })
              }
              <span className='pageChg' onClick={() => pageChanger(startNum + 5)}><MdArrowForwardIos /></span>
            </div>
          </section>
        }
      </div>
      {/* #pageContents --- END */}
      <SideBar />
    </main>
  )
}

export default BooksPage