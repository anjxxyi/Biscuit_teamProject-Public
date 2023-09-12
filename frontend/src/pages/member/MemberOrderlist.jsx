import React, { useContext, useEffect, useRef, useState } from 'react'
import MemberNav from './MemberNav'
import { CgSearch } from "react-icons/Cg"
import { GET, POST, toFormatDate } from '../../components/Aaxios'
import { Context } from '../../components/store/Context';
import LoadingSmall from '../../components/style/LoadingSmall';

function Memberorderlist() {

  const props = useContext(Context);
  const userInfo = props.userInfo;
  const [load, setLoad] = useState(false);

  const [shipData, setShipData] = useState();

  useEffect(() => {
    if(userInfo) {
      getListAll();
    }
  }, [props.userInfo]);

  const getListAll = () => {
    setLoad(true);
    GET(`/api/orders/list/${userInfo.no}`)
    .then(res => {
      setShipData(res.data);
      setLoad(false);
    })
  };

  const getListSorted = (str) => {
    setLoad(true);
    const data = { user_no: userInfo.no, order_status: str }
    POST(`/api/orders/sort`, data)
      .then(res => {
        setShipData(res.data);
        setLoad(false);
      });
  };

  const cancelOrder = (no) => {
    if(confirm("주문을 반품(취소) 하시겠습니까?")) {
      GET(`/api/orders/cancel/${no}`)
      .then(res => {
        console.log(res.data);
        sortHandler(sortBtn);
      });
    }
  };

  const confirmOrder = (no) => {
    if(confirm("배송 완료 확인을 하시겠습니까? \n\n이후에는 단순 변심으로 인한 반품은 불가합니다.")) {
      const data = { order_no: no, order_status: "E" }
      POST(`/api/orders/change`, data, )
      .then(res => {
        console.log(res.data);
        sortHandler(sortBtn);
      });
    }
  };
  
  const [sortBtn, setSortBtn] = useState("A");
  const sortHandler = (str) => {
    setSortBtn(str);
    if(str == "A") getListAll();
    else getListSorted(str);
  };


  return (
    <MemberNav>
      <h3 id="memberOrderlistHead" className='memberHead'>나의 주문내역</h3>
      <div id="myOrderlist">
        <div className="memberMenuTop">
          <div className="memberMenuSearch">
            <input type='text' className="miniSearchBar" placeholder='검색' onKeyUp={e => e.key == "Enter" && alert("Not supported")} />
            <button type="button" className="searchBtn typeIcon" onClick={() => alert("Not supported")} ><CgSearch /></button>
          </div>
          <div className="sortArea">
            {
              Array(5).fill().map((e,i) => {
                const btnIndex = {"typeAll": "전체내역", "typeShipBf": "배송준비", "typeShip": "배송중", "typeShiped": "상품 도착", "typeShipAf": "배송완료"};
                const arr = ["A", "B", "D", "X", "E"];

                return(
                  <button key={i} type="button" className={`sortBtn ${Object.keys(btnIndex)[i]}` + (sortBtn == arr[i] ? " active" : null)} onClick={() => sortHandler(arr[i])}>{Object.values(btnIndex)[i]}</button>
                );
              })
            }
          </div>
        </div>
        {
          shipData != "" && shipData != undefined ?
          shipData.map(e => {
            return(
              <div className="shipInfoBox" key={e.no}>
                <div className='shipInfo_topBox'>
                  <div className='shipInfo_status'><b>{e.status}</b></div>
                  <div className='shipInfo_topRight'>
                    <div className='shipInfo_topRight_split'></div>
                    <div className='shipInfo_date'>
                      <div style={{fontSize: "0.8rem", marginBottom: "0.3rem"}}>주문일 : {toFormatDate(e.createdAt)}</div>
                      <div style={{fontSize: "0.8rem"}}>주문 번호 : {e.merchant_uid}</div>
                    </div>
                    {/* <button type='button' className='shipInfo_more'><span>주문 상세</span><MdArrowForwardIos /></button> */}
                  </div>
                </div>
                
                <div className='shipInfo_main'>
                  <div className='shipInfo_main_content'>
                    <div className="shipInfo_main_left">
                      <img src={e.gno ? e.gimgPath : e.bimgUrl} />
                      <div className='shipInfo_pd'>
                        <div className='shipInfo_pd_name'>{e.gno ? e.gname : e.btitle}</div>
                        <div>
                          <span>{e.gno ? e.gprice : e.rprice}원</span>
                          <span className='spancolor'>&nbsp;&nbsp;{e.orderCnt}개</span>
                          <div>총 주문 금액: {e.orderPrice.toLocaleString()}원</div>
                        </div>
                      </div>
                    </div>
                    <div className='shipInfo_btm'>
                      <div className="shipInfo_btm_address">
                        <span><b>배송지 정보: </b></span>
                        <span>{e.shipTo}, </span>
                        <span>{e.phone}</span>
                        <div>[{e.shipPost}] {e.shipAddress} {e.shipDetail}</div>
                      </div>
                    </div>
                  </div>

                  <div className="shipInfo_main_right">
                    <div>결제수단: {e.payment}</div>
                    {
                      e.statusCode == "C" ?
                        <b>취소된 주문</b>
                      :
                        e.statusCode == "E" ?
                          <b>완료된 주문</b>
                        :
                          e.statusCode == "B" ?
                            <button type='button' onClick={() => cancelOrder(e.no)}>주문 취소</button>
                          :
                            <>
                            <button type='button' onClick={() => confirmOrder(e.no)}>배송 완료 확인</button>
                            <button type='button' onClick={() => cancelOrder(e.no)}>반품 신청</button>
                            </>
                    }
                  </div>
                </div>

              </div>
            );
          })
          :
          load ||
          <div className='textCenter'>
            <b>주문내역이 없습니다.</b>
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

export default Memberorderlist