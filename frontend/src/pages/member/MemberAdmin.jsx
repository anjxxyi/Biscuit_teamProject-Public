import React, { useEffect, useRef, useState } from 'react'
import { GET } from '../../components/Aaxios'
import Loading from '../../components/style/Loading';
import { RiInformationLine } from "react-icons/Ri"

import '../../styles/base/memberStyle.css'

const MemberAdmin = () => {

  const [load, setLoad] = useState(false);

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setLoad(true);
    getDataList("All");
    setTimeout(() => {
      setLoad(false);
    }, 500);
  }, []);

  const getDataList = (type) => {
    GET(`/api/admin/list/${type}`)
    .then(res => {
      setDataList([...res.data].sort((a, b) => b.no - a.no));
    });
  };
  
  // select
  const [select, setSelect] = useState("All");
  const selectHandler = (e) => {
    const val = e.target.value;
    setSelect(e.target.value);
    setCheckbox([]);
    getDataList(val);
  };

  const [checkbox, setCheckbox] = useState([]);
  const checkboxHandler = (e, no) => {
    const chk = e.target.checked;
    if(chk) setCheckbox([...checkbox, no]);
    else setCheckbox(checkbox.filter(e => e !== no));
  };

  // 사용자 권한 설정
  const authorityHandler = (userNo) => {
    setLoad(true);
    GET(`/api/admin/authority/${userNo}`)
    .then(res => {
      console.log("result",res.data);
      getDataList(select);
      setTimeout(() => {
        setLoad(false);
      }, 300);
    });
  };

  // 사용자 탈퇴 설정
  const resigtryHandler = (userNo) => {
    GET(`/api/admin/out/${userNo}`)
    .then(res => {
      console.log("result",res.data);
      getDataList(select);
    });
  };

  // 아이디 검색
  const searchId = (query) => {
    setDataList([...dataList].filter(e => e.userId.includes(query)));
  };

  // input control
  const searchInput = useRef();

 
  return (
    <div id="admin_userPanel">
      {
        load &&
        <Loading opacity={1} />
      }
      <div className="listArea admin">
        <div className="selectBox">
          <div className="select">
            <select name="adminSelect" id="adminSelect" value={select} onChange={e => selectHandler(e)}>
              <option value="All">전체목록</option>
              <option value="User">일반회원</option>
              <option value="Out">탈퇴회원</option>
              <option value="Admin">관리자</option>
            </select>
            <span className="caption"><RiInformationLine/><b>주의:</b><u>필요한</u> 사용자만 변경하십시오 .</span>
          </div>
          <div className='select'>
            <input type='text' placeholder='현재 목록 내에서 아이디로 검색' onKeyDown={e => e.key == "Enter" && searchId(e.target.value)} ref={searchInput} />
            <button type="button" onClick={e => {getDataList("All"); searchInput.current.value = ""}}>검색 초기화</button>
          </div>
        </div>

        <div className="listItem title">
          <div className="left">
            <input type="checkbox" name="aa" id="nAll" className="check" disabled />
            <div className="top">
              <div>순번</div>
              <div>아이디</div>
              <div>성명</div>
              <div>전화번호</div>
              <div>이메일</div>
              <div>권한</div>
              <div>탈퇴여부</div>
            </div>
          </div>
          <div className="right">
            <div>기능1</div>
            <div>기능2</div>
          </div>
        </div>

            {
              dataList != "" ? dataList.map((item) => {
                return (
                  <div className="listItem" key={item.no}>
                    <div className="left">
                      <input type="checkbox" name="classNo" id={"n" + item.no} className="check" value={item.no} checked={checkbox.includes(item.no) ? true : false} onChange={e => checkboxHandler(e, item.no)} disabled />
                      <div className="top">
                        <div>{item.no}</div>
                        <div>{item.userId}</div>
                        <div>{item.name}</div>
                        <div>{item.phone}</div>
                        <div>{item.email}</div>
                        <div>{item.authority}</div>
                        <div>{item.quitYn}</div>
                      </div>
                    </div>
                    <div className="right">
                      {
                        item.quitYn == "Y" ?
                          <button type="button" className="yBtn" onClick={e => resigtryHandler(item.no)}>복구</button>
                        :
                        item.authority == "U" ?
                          <>
                          <button type="button" className="nBtn" onClick={e => resigtryHandler(item.no)}>탈퇴</button>
                          <button type="button" className="rBtn" onClick={e => authorityHandler(item.no)}>관리자</button>
                          </>
                        :
                        item.authority == "A" &&
                          <>
                          <button type="button" className="nBtn" onClick={e => authorityHandler(item.no)}>권한삭제</button>
                          </>
                      }
                    </div>
                  </div>
                )
              })
              :
              <h4 className='noDatalist'>표시할 목록이 없습니다.</h4>
            }
          </div>
    </div>
  )
} 

export default MemberAdmin