import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {GET, PUT} from "../../components/Aaxios"


const CampaignAccept= () => {
  // data
  const [acceptList, setAcceptList] = useState([]);
  useEffect(() => {
    GET(`/api/campaign/list?acceptYn=N`)
    .then(res => setAcceptList(res.data))
    .catch(err => console.log(err))
  }, [])

  /* 승인 버튼 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        recycleNo: no,
        acceptYn: "Y",
        status: selected,
        discountRate: selected == "S" ? 10 : selected == "G" ? 20 : selected == "N" ? 30 : 50,
        salePrice: price - (price * (selected == "S" ? 10 : selected == "G" ? 20 : selected == "N" ? 30 : 50)/100)
    }
    if(data.salePrice !== 0){
      PUT((`/api/campaign/accept/${no}`), data)
    .then(res => alert("승인 완료되었습니다."))
    .catch(err => console.log(err));
    } else{
      alert("상태를 체크해주세요");
    }
  }
  if(handleSubmit) if(acceptList == null) navigate("/campaign");

  const [price, setPrice] = useState('');
  const [selected, setSelected] = useState('');
  const [no, setNo] = useState('');
  const onChangeSelected = (e) => setSelected(e.target.value);

  // backBtn
  const navigate = useNavigate();
  const onClick = () => navigate(-1);


  return (
    <main id="pageContainer" className="campaign">
      <div id="pageContents">
        <form className="modalArea" onSubmit={handleSubmit}>
        <div className="campaignModal">
          <div className="acceptList">
            <table className="resultBox">
              <thead>
                <tr>
                  <th></th>
                  <th>no</th>
                  <th>책 제목</th>
                  <th>신청자</th>
                  <th>신청 상태</th>
                  <th>실제 상태</th>
                  <th>판매금액</th>
                  <th>승인여부</th>
                </tr>
              </thead>
              <tbody>
              {acceptList && acceptList.map((list) => {
              return (
                  <tr key={list?.recycleNo}>
                    <td className="check">
                      <label htmlFor={no}>
                        <input type='checkbox' id={list?.recycleNo} name={list?.recycleNo} value={no} onChange={(e) => setNo(e.target.name)}/>
                      </label>
                    </td>
                    <td className="check">
                      <label value={list?.recycleNo} htmlFor={list?.recycleNo}>
                        {list?.recycleNo}
                      </label>
                    </td>
                    <td className="name">
                      <label htmlFor={list?.recycleNo}>
                        <img src={list?.bookImgUrl} />
                        <span>{list?.bookName} </span>
                      </label>
                    </td>
                    <td className="userid">
                      <label htmlFor={list?.userId}>
                        {list?.userId}
                      </label>
                    </td>
                    <td className="price">
                      <span>
                        <input type='checkbox' id={list?.bookPrice} name={price} value={price} onClick={(no) => setPrice(no.target.id)} />
                        <label htmlFor={list?.bookPrice}>
                          {list?.status == "S" ? "최상" : list?.status == "G" ? "상" : list?.status == "N" ? "중" : "하"
                          }
                        </label>
                      </span>
                    </td>
                    <td className="condition">
                      <select onChange={onChangeSelected} defaultValue={selected} name={list?.recycleNo}>
                        <option>-- 상태 --</option>
                        <option value="S" >최상</option>
                        <option value="G" >상</option>
                        <option value="N" >중</option>
                        <option value="B" >하</option>
                      </select>
                    </td>
                    {selected == "" ? 
                      <td className="salePrice">
                        <span>
                          {list?.bookPrice.toLocaleString('ko-KR')}원
                        </span>
                      </td> 
                      : 
                      <td className="salePrice">
                        <span>
                          <label htmlFor={list?.bookPrice}>
                            {(list?.bookPrice - (list?.bookPrice * (selected == "S" ? 10 : selected == "G" ? 20 : selected == "N" ? 30 : 50 )/100)).toLocaleString('ko-KR')}원
                          </label>
                        </span>
                      </td>
                    }
                    <td className="submit">
                      <button type='submit'>승인</button>
                    </td>
                  </tr>
              )}) }
              </tbody>
            </table>
          </div>
          <div className="btn">
            <button className="closeBtn" type="button" onClick={onClick}>닫기</button>
          </div>
        </div>
        <div className="bgClickClose" onClick={onClick}></div>
        </form>
      </div>
    </main>
  )
}

export default CampaignAccept