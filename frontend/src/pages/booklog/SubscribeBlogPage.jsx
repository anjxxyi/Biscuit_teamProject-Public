import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import "../../styles/base/sub.css"; // ** Don't Touch ** subPage Common Style **
import "../../styles/base/subscriber.css"

import { Context } from '../../components/store/Context';

function SubscribeBlogPage() {

  const props = useContext(Context);
  const userInfo = props.userInfo;

  //-----------------------------------------------------------------------
  //                            구독중인 북로그 리스트 
  //-----------------------------------------------------------------------

  const { no } = useParams();

  const [subscribeBlogData, setSubscribeBlogData] = useState([]);

  const fetchSubscribeBlogData = () => {
    axios.get(`/api/subscribeBlog/${no}`)
      .then(response => {
        setSubscribeBlogData(response.data);
      })
      .catch(err => {
        console.log(err + ' 서버요청 에러 ');
      });

  }

  useEffect(() => {
    fetchSubscribeBlogData();
  }, [no]);

  //-----------------------------------------------------------------------
  //                            구독 취소 
  //-----------------------------------------------------------------------

  // 구독 취소 버튼 클릭 이벤트 처리 함수
  const handleCancelSubscription = (userNo, subedUserNo) => {
    if (userInfo && userInfo.no === subedUserNo) {
      axios
        .delete(`/api/subscriptions/${userNo}/${subedUserNo}`)
        .then((response) => {
          if (response.status === 200) {
            fetchSubscribeBlogData(); // 구독 취소 후 리스트 다시 가져오기
            alert("구독이 취소되었습니다!")
          }
        })
        .catch((error) => {
          console.error("구독 취소 중 오류 발생:", error);
        });
    } else if (!userInfo) {
      alert("권한이 없습니다!");
    } else {
      alert("권한이 없습니다!");
    }
  };

  return (
    <main id="pageContainer" className="subscribeBlog">
      <div className="subscribers-page">
        <h2>구독자 리스트</h2>
        {
          subscribeBlogData ? (
            <ul className="subscribers-list">
              {subscribeBlogData.map((item) => (
                <li key={item.no} className="subscriber-item">
                  <Link to={`/booklog/${item.user_no.userId}`}>
                    <div className="subscriber-info">
                      <span className="subscriber-nickname">{item.user_no.nickname}</span>
                      <span className="subscriber-userid">{item.user_no.userId}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null
        }
        {
          subscribeBlogData.length == 0 && (
            <section className='nosubscribe'>
              <div>텅❕</div>
              <div> </div>
            </section>
          )
        }
      </div>
    </main>
  )
}

export default SubscribeBlogPage