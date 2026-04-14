import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CgSearch } from "react-icons/Cg"
import { RiVipCrownFill, RiCheckboxCircleFill,RiInformationLine } from "react-icons/Ri"
import { PiPlus } from "react-icons/Pi"
import { TiLocationArrow } from "react-icons/Ti"
import { MdAdminPanelSettings } from "react-icons/Md"
import { GET } from '../../components/Aaxios'
import useBodyScrollLock from '../../hooks/useBodyScrollLock'

import PageVisual from "../../components/layout/PageVisual"
import BookclassModal from './BookclassModal'
import SideBar from '../../components/layout/SideBar'

import '../../styles/base/sub.css'
import '../../styles/base/bookclassStyle.css'
import Loading from '../../components/style/Loading'

const BookClass = () => {
  // userInfo
  const userInfo = JSON.parse(localStorage.getItem("member"));

  const [load, setLoad] = useState(false);

  // data
  const [dataList, setDataList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useBodyScrollLock(modalOpen)
  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
      if(!userInfo) getClassList(0);
      else if(userInfo?.authority != "A") getClassList(0);
      else getClassForAdmin(1);
  }, []);

  function getClassList() {
    setLoad(true);
    const num = userInfo ? userInfo.no : 0;
    GET(`/api/bookclass/list/${num}`)
    .then(response => {
      setDataList(response.data);
      setTimeout(() => {
        setLoad(false);
      }, 200);
    })
    .catch(error => console.log(error))
  };


  // sort
  const [sortBtn, setSortBtn] = useState(1);
  const sortHandlerStart = () => {
    setSortBtn(0);
    return [...dataList].sort((a, b) => new Date(a.scheduleStart) - new Date(b.scheduleStart));
  };

  const sortHandlerNew = () => {
    setSortBtn(1);
    return [...dataList].sort((a, b) => b.no - a.no);
  };

  const sortHandlerRec = () => {
    const shuffle = () => (Math.random() - 0.5);
    setSortBtn(2);
    return [...dataList].sort(shuffle);
  };

  // apply -> check user grade
  const navigate = useNavigate();
  const checkUserGrade = () => {
    if(userInfo.grade == "L") return navigate('/bookclass/apply');
    else if(userInfo.grade == "M") return alert("아쉽지만 북클래스 개설신청이 가능한 등급이 아닙니다.");
    else return alert("회원등급을 확인해주세요.");
  }

  // search class
  const searchInput = useRef();
  const searchClass = () => {
    const keyword = searchInput.current.value;
    if(keyword == "") return alert("검색어를 입력해주세요.");
    if(keyword.length < 2) return alert("검색어를 두글자 이상 입력해주세요.")
    setLoad(true);

    GET(`/api/bookclass/search/q=${keyword}&u=${userInfo ? userInfo.no : null}`)
    .then(res => {
      setSortBtn(1);
      setDataList([...res.data].sort((a, b) => b.no - a.no));
      setLoad(false);
    })
  }

  // function for Admin ============================================================

  // user data list HTML
  const ListDivForUser = () => {
    return(
      <div className="listArea">
            {
              dataList != "" ? dataList.map((item) => {
                return (
                  <div className="listItem" key={item.no} onClick={() => {
                    setModalOpen(true);
                    setActiveObject(item);
                  }}>
                    <button className="expandBtn"><PiPlus/></button>
                    <p className="pin">
                      <span className="location"><TiLocationArrow/><b>{item.location.split(" ")[0] + " " + item.location.split(" ")[1]}</b></span>
                      <span className="schedule">{item.scheduleStart.replace("2023.", "") + "-" + item.scheduleEnd.split(" ")[1]}</span>
                    </p>
                    <h3 className="title">{item.title}</h3>
                    <pre className="intro" dangerouslySetInnerHTML={{ __html : item.intro}}></pre>
                    <div className="leader">
                      <div>
                        {
                          item.leaderNickname == userInfo?.nickname ?
                          "내가 만든 클래스"
                          :
                          <>
                          <RiVipCrownFill/>{item.leaderNickname}
                          </>
                        }
                      </div>
                      {
                        item.joined &&
                        <RiCheckboxCircleFill style={{color: "var(--PointColor)", fontSize: "1.4rem", marginRight: "5px"}} />
                      }
                    </div>
                  </div>
                )
              })
              :
              <h4 className='noDatalist'>표시할 북클래스 목록이 없습니다.</h4>
            }
          </div>
    )
  };


  // sort
  const [adminSortBtn, setAdminSortBtn] = useState(1);

  // temporary dataList
  const [temporary, setTemporary] = useState([]);

  // get dataList
  const getClassForAdmin = (n) => {
    if(userInfo.authority == "A") {
      setLoad(true);
      setAdminSortBtn(n);
      setCheckbox([]);
      setCheckAll(false);
      setSelect("Z");

      GET(`/api/bookclass/all/${n}`)
      .then(res => {
        setDataList([...res.data].sort((a, b) => b.no - a.no));
        setTemporary([...res.data].sort((a, b) => b.no - a.no));
        setTimeout(() => {
          setLoad(false);
        }, 200);
      })
    }
  };

  // admin data list Selectbox function
  const [select, setSelect] = useState("Z");
  const selectHandler = (e) => {
    const val = e.target.value;
    setSelect(val);
    setCheckAll(false);
    setCheckbox([]);
    if(adminSortBtn == 0) {
      val == "Y" && setDataList([...temporary].filter(e => e.statusCode == "A"));
      val == "N" && setDataList([...temporary].filter(e => e.statusCode == "Y"));
    }
  };

  // admin data list Check one function
  const [checkbox, setCheckbox] = useState([]);
  const checkboxHandler = (e, no) => {
    const chk = e.target.checked;
    if(chk) setCheckbox([...checkbox, no]);
    else setCheckbox(checkbox.filter(e => e !== no));
  };
  // admin data list Check All function
  const [checkAll, setCheckAll] = useState(false);
  const checkAllHandler = (e) => {
    const chkall = e.target.checked;
    if(dataList == "") return alert("선택할 목록이 없습니다.")

    let tempList;
    if(chkall) {
      if(select == "Z") return alert("변경할 클래스 상태를 먼저 선택해주세요.");
      else if(select == "Y") {
        setCheckAll(true);
        tempList = dataList.filter(e => e.statusCode == "A");
        setCheckbox(tempList.map(e => {return e.no;}));
      } else if(select == "N") {
        if(adminSortBtn == 1) {
          setCheckAll(true);
          tempList = dataList.filter(e => e.statusCode == "A");
          setCheckbox([...tempList].map(e => {return e.no;}));
        } else if(adminSortBtn == 0) {
          setCheckAll(true);
          tempList = dataList.filter(e => e.statusCode == "Y");
          setCheckbox([...tempList].map(e => {return e.no;}));
        }
      }
    } else {
      setCheckAll(false);
      setCheckbox([]);
    }
  };

  // admin data list class' status change function
  const changeClassStatus = (numList, status) => {
    if(numList == "") return alert("선택된 목록이 없습니다.");
    else if(status != "Z") {
      const txt = status == "Y" ? "모집중" : "개설 거절";
      const chk = confirm(`북클래스를 "${txt}" 상태로 정말 변경하시겠습니까?`);

      chk && GET(`/api/bookclass/status/list=${numList}&status=${status}`)
      .then(res => {
        console.log(res)
        getClassForAdmin(adminSortBtn);
      });
    } else return alert("기능 조건을 먼저 선택해 주세요");
  };
  // admin data list class delete function
  const deleteCalss = (classNo) => {
    const chk = confirm("정말로 삭제하시겠습니까??\n\n삭제한 후에는 복구할 수 없습니다.");

    chk && GET(`/api/bookclass/delete/${classNo}`)
    .then(res => {
      console.log(res);
      setDataList([...dataList].filter(e => e.no != classNo));
    });
  };

  const statusChangeConfirmHandler = () => {
    changeClassStatus(checkbox, select);
  };

  // search function (ID, Title)
  const searchId = (query) => {
    setCheckbox([]);
    setDataList([...dataList].filter(e => e.userId.includes(query) || e.title.includes(query)));
  };

  // search reset
  const searchResetBtn = () => {
    setCheckAll(false);
    setCheckbox([]);
    if(adminSortBtn == 0) {
      select == "Y" && setDataList([...temporary].filter(e => e.statusCode == "A"));
      select == "N" && setDataList([...temporary].filter(e => e.statusCode == "Y"));
      select == "Z" && setDataList(temporary);
    } else setDataList(temporary);
  }
  

  // admin data list HTML
  const ListDivForAdmin = () => {
    return(
      <div className="listArea admin noDrag">
        <div className='admin_searchBox'>
          <input type='text' placeholder='현재 목록 내에서 아이디, 제목으로 검색' onKeyDown={e => {e.key == "Enter" && searchId(e.target.value)}} />
          <button type="button" onClick={searchResetBtn} >검색 초기화</button>
        </div>

        <div className="selectBox">
          <div className="select">
            <select name="adminSelect" id="adminSelect" value={select} onChange={e => selectHandler(e)}>
              <option value="Z">- 선 택 -</option>
              <option value="Y">승 인</option>
              <option value="N">반 려</option>
            </select>

            <label htmlFor="nAll" className="allCheck">
              <input type="checkbox" name="aa" id="nAll" className="check" checked={checkAll} onChange={e => checkAllHandler(e)} />
              <span>전체 선택</span>
            </label>
            <span className="caption"><RiInformationLine/><b>반려 전체선택 기능:</b><u>승인해야할 목록</u> "개설 신청" 상태만 선택됨, <u>전체 목록</u> "모집중" 상태만 선택됨.</span>
          </div>

          <button type="button" onClick={statusChangeConfirmHandler}>확인</button>
        </div>

            {
              dataList != "" ? dataList.map((item) => {
                return (
                  <div className="listItem" key={item.no}>
                    <div className="left">
                      <input type="checkbox" name="classNo" id={"n" + item.no} className="check" value={item.no} checked={checkbox.includes(item.no) ? true : false} onChange={e => checkboxHandler(e, item.no)} />
                      <div className="top">
                        <span>No: {item.no} <b style={{marginLeft: "1em", color: "yellowgreen"}}>𐂅 {item.status}</b></span>
                        <span><b>{item.userId}</b>({item.scheduleStart + "-" + item.scheduleEnd.split(" ")[1]})</span>
                      </div>
                      <div className="btm" onClick={() => {
                        setModalOpen(true);
                        setActiveObject(item);
                      }}>
                        <h3>{item.title}</h3>
                        <span className="location">장소: {item.location.split(" ")[0] + " " + item.location.split(" ")[1]}</span>
                      </div>
                    </div>
                    <div className="right">
                      {
                        item.status == "개설 신청" ?
                          <>
                          <button type="button" className="yBtn" onClick={() => changeClassStatus(item.no, "Y")}>승인</button>
                          <button type="button" className="nBtn" onClick={() => changeClassStatus(item.no, "N")}>반려</button>
                          </>
                        :
                        item.status == "모집중" ?
                          <button type="button" className="nBtn" onClick={() => changeClassStatus(item.no, "N")}>반려</button>
                        :
                        item.status == "개설 거절" ?
                          <>
                          <button type="button" className="rBtn" onClick={() => changeClassStatus(item.no, "Y")}>복구</button>
                          <button type="button" className="nBtn" onClick={() => deleteCalss(item.no)}>삭제</button>
                          </>
                        :
                        item.status == "취소됨" | item.status == "종료됨" &&
                          <button type="button" className="nBtn" onClick={() => deleteCalss(item.no)}>삭제</button>
                      }
                    </div>
                  </div>
                )
              })
              :
              <h4 className='noDatalist'>승인 대기 중인 또는 개설된 북클래스 목록이 없습니다.</h4>
            }
          </div>
    )
  };


  // MAIN HTML Return =============================
  return (
    <main id="pageContainer" className="bookclass">
      <PageVisual/>
      {
        load &&
        <Loading opacity={1} />
      }

      {/* #pageContents --- START */}
      <div id="pageContents">
        <section className="topSection">
          <div className="searchArea" style={userInfo?.authority == "A" ? {visibility: "hidden"} : {}}>
            <input type="text" name="search" id="bookclassSearch" className="searchBar" autoComplete="off" placeholder="찾고 싶은 북클래스 명을 입력해 주세요." onKeyDown={e => e.key == "Enter" && searchClass()} ref={searchInput}/>
            <button type="button" className="searchBtn typeIcon" onClick={() => searchClass()}>
              <CgSearch />
            </button>
          </div>
          {userInfo && (userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ?
            <div className="applyArea">
              <div className="bubble">혹시 북클래스를 <br/>개설하고 싶으신가요?</div>
              <button className="applyBtn" onClick={checkUserGrade}><img className="icon" src="/images/sub_bookclassIcon.gif" alt="" /> <span>북클래스 개설</span></button>
            </div>
            : null
          }
          <div className="sortArea">
            <button type="button" className={"sortBtn typeNew" + (sortBtn == 1 ? " active" : "")} onClick={() => setDataList(sortHandlerNew())}>최신순</button>
            {
              userInfo?.authority != "A" &&
              <button type="button" className={"sortBtn typeRec" + (sortBtn == 2 ? " active" : "")} onClick={() => setDataList(sortHandlerRec())}>추천순</button>
            }
            <button type="button" className={"sortBtn typeRec" + (sortBtn == 0 ? " active" : "")} onClick={() => setDataList(sortHandlerStart())}>마감 임박순</button>
          </div>
          {
            userInfo?.authority == "A" &&
            <div className="sortArea forAdmin">
              <MdAdminPanelSettings />
              <button type="button" className={"sortBtn typeNew" + (adminSortBtn == 1 ? " active" : "")} onClick={() => getClassForAdmin(1)}>승인해야할 목록</button>
              <button type="button" className={"sortBtn typeRec" + (adminSortBtn == 0 ? " active" : "")} onClick={() => getClassForAdmin(0)}>전체 목록</button>
            </div>
          }
        </section>

        <section className="mainSection">
          {
            userInfo?.authority == "A" ?
            <ListDivForAdmin />
            :
            <ListDivForUser />
          }

          <SideBar />

          {
            modalOpen &&
              <div className="modalArea">
                <BookclassModal object={activeObject} modalOpen={modalOpen} setModalOpen={setModalOpen} />
              </div>
          }
        </section>
      </div>
      {/* #pageContents --- END */}

    </main>
  )
}

export default BookClass
