import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { GET, requestPay } from "../../components/Aaxios";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { MdArrowRight } from 'react-icons/Md'
import { RiInformationLine } from 'react-icons/Ri'
import { Context } from "../../components/store/Context"


const OrderPage = () => {
  const props = useContext(Context);
  const userInfo = props.userInfo;

  const [detail, setDetail] = useState('');
  const [ detailData, setDetailData ] = useState("");
  const lc = useLocation();
  const loca = useLocation();
  const recycleNo = lc.state.recycleNo;
  const no = loca.state.no;
  const orderCnt = loca.state.orderCnt;


  useEffect(() => {
      GET(`/api/goods/${no}`)
      .then((response) => {
          setDetailData(response.data);
      })
      .catch((err) => {
      console.log(err + " 서버요청 에러 ");
      return;
      });
  }, [])

  useEffect(() => {
      GET(`/api/campaign/${recycleNo}`)
      .then((res) => {
          setDetail(res.data);
      })
      .catch((err) => {
          console.log(err);
      })
    }, [])


      /** 결제 */
    const payBtn = () => {
    const data = {
      name: detail? detail.bookName : detailData[0].goods.name,
      price: detail? detail.salePrice : (detailData[0].goods.price * orderCnt),
      pd_type : detail? "R" : "G",
      pd_no : detail? detail.recycleNo : detailData[0].goods.no,
      pd_cnt : detail? 1 : orderCnt,
      userInfo: userInfo
    }
    requestPay(data);
  }

  // handleCancel
  const navigate = useNavigate();
  const handleCancel = () => {
    if(confirm("이벤트 등록을 취소하시겠습니까?") === true) {
      return navigate(`/events`);
    } else {
      return null;
    };
  };

  
 

  return (
    <main id="pageContainer" className="order">
      <div id="pageVisual">
        <h2 className="title">Order</h2>
        <p className="info">주문하시는 상품이 맞는지 꼭 확인해 주세요!</p>
      </div>

      <div id="pageContent">
        <section className="orderSection">
          <h3 className="title">주문 내역</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>상품명</th>
                <th>금 액</th>
                <th>수 량</th>
                <th>총 금액</th>
              </tr>
            </thead>
            {recycleNo && detail !== null ?
            <tbody>
              <tr>
                <td className="image"><img src={detail?.bookImgUrl} /></td>
                <td className="bookTitle">{detail?.bookName}</td>
                <td className="price">{detail?.salePrice}원</td>
                <td className="cnt">1개</td>
                <td className="total">{detail?.salePrice}원</td>
              </tr> 
            </tbody>
            : null}
            {detailData && no !== null &&
            <tbody>
              <tr>
                <td className="image"><img src={detailData[0].images.imgPath} alt={detailData[0].images.no}/></td>
                <td className="title">{detailData[0].goods.name}</td>
                <td className="price">{detailData[0].goods.price.toLocaleString()}원</td>
                <td className="cnt">{orderCnt}개</td>
                <td className="total">{(detailData[0].goods.price*orderCnt).toLocaleString()}원</td>
              </tr> 
            </tbody>
            }
          </table>
        </section>
        <section className="userSection">
          <h3 className="title">주문자 정보</h3>
          <ul className="infoBox">
            <li className="name">
              <strong className="infotitle">주문자 성명</strong>
              <div>{userInfo?.name}</div>
            </li>
            <li className="call">
              <strong className="infotitle">연락처</strong>
              <div>{userInfo?.phone}</div>
            </li>
            <li className="payment">
              <strong className="infotitle">결제방법</strong>
              <div>카드</div>
            </li>
            <li className="email">
              <strong className="infotitle">이메일</strong>
              <div>{userInfo?.email}</div>
            </li>
            <li className="location">
              <strong className="infotitle">배송지 주소</strong>
              <div className="infotext">
                <input type="text" defaultValue={userInfo?.zipCode} placeholder={userInfo?.zipCode} readOnly/>
                <div className="zip">
                  <input type="text" placeholder={userInfo?.address} defaultValue={userInfo?.address} id="location" readOnly/>
                  <input type="text" placeholder={userInfo?.address_detail}  id="locationDetail" defaultValue={userInfo?.address_detail} readOnly/>
                </div>
                <div className="caption">
                  <RiInformationLine/><b>배송지 변경</b>은  <Link to={`/member/info`}><u>‘마이페이지</u><MdArrowRight/><u>내 정보’</u></Link>에서 변경해 주세요.
                </div>
              </div>
            </li>
          </ul>
        </section>
        <section className="btnSection">
          <button className="orderBtn" type="button" onClick={payBtn}>결제하기</button>
          <button className="cancel" type="button" onClick={handleCancel}>취소</button>
        </section>
      </div>
    </main>
  )
}

export default OrderPage