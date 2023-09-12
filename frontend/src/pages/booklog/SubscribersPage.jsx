import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

import "../../styles/base/sub.css"; // ** Don't Touch ** subPage Common Style **
// import "../../styles/base/booklogStyle2.css"; // 참고하여 새파일 생성 후 연결
import "../../styles/base/subscriber.css"
import { Context } from '../../components/store/Context';

function SubscribersPage() {

  const props = useContext(Context);
  const userInfo = props.userInfo;

  //-----------------------------------------------------------------------
  //                            구독자 리스트 
  //-----------------------------------------------------------------------

  const { no } = useParams();

  const [data, setData] = useState([]);

  // 제거하려는 값 (예: 33)
  const [valueToRemove, setValueRemove] = useState();

  const url = `/api/subscribers/${no}`;

  const fetchData = () => {
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        console.log(err + ' 서버요청 에러 ');
      });
  };

  useEffect(() => {
    fetchData();  // 북로그 게시글 리스트
  }, []);

  //-----------------------------------------------------------------------
  //                            구독 취소 
  //-----------------------------------------------------------------------

  const handleCancelSubscription = (userNo, subedUserNo) => {

    axios
      .delete(`/api/subscriptions/${userNo}/${subedUserNo}`)
      .then((response) => {
        if (response.status === 200) {
          alert("구독이 취소되었습니다!")

          setTimeout(() => {
            fetchData(); // 구독 취소 후 리스트 다시 가져오기
          }, 100); // 100ms 딜레이 적용 (조정 가능)

        }
      })
      .catch((error) => {
        console.error("구독 취소 중 오류 발생:", error);
      });


  };

  return (
    <main id="pageContainer" className="subscribe">
      <div className="subscribers-page">
        <h2>구독중인 북로그</h2>
        {
          data ? (
            <ul className="subscribers-list">
              {data.map((item) => (
                <li key={item.no} className="subscriber-item">
                  <Link to={`/booklog/${item.subed_no.userId}`}>
                    <div className="subscriber-info">
                      <span className="subscriber-nickname">{item.subed_no.nickname}</span>
                      <span className="subscriber-userid">{item.subed_no.userId}</span>
                    </div>
                  </Link>
                  {
                    userInfo?.no == no && (
                      <div className="subscriber-actions">
                        <button
                          className="subscriber-button"
                          onClick={() => handleCancelSubscription(item.user_no.no, item.subed_no.no)}
                        >구독중</button>
                      </div>
                    )
                  }
                </li>
              ))}
            </ul>
          ) : null
        }
        {
          data.length == 0 && (
            <section className='nosubscribe'>
              <div>아직 구독중인 북로그가 없네요~ </div>
              <div>관심있는 북로그를 구독해보세요😀 </div>
            </section>
          )
        }
      </div>
    </main>
  )
}

export default SubscribersPage