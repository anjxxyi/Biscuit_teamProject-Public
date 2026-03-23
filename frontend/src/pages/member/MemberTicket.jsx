import React, { useState, useContext } from 'react'
import MemberNav from './MemberNav'
import { Context } from '../../components/store/Context';
import { requestPay } from '../../components/Aaxios';

function MemberTicket() {
  const [ticket] = useState(false); // api 연결 해야함
  const [managementOpen, setManagementOpen] = useState(false)

  const myTicketHandler = () => {
    setManagementOpen((opened) => !opened)
  };

  const userInfo = useContext(Context).userInfo;

  const payBtn = () => {
    const data = {
      name: '바삭 정기권',
      price: '12800',
      pd_type : "T",
      pd_no : "26",
      pd_cnt : 1,
      userInfo: userInfo
    }

    requestPay(data);
  }

  return (
    <MemberNav>
      <h3 id="memberTicketHead" className='memberHead'>나의 정기권</h3>
      {
        ticket ?
        <div id="ticketBox" className={managementOpen ? 'open' : undefined}>
          <section id="ticketSectionOne">
            <div id="ticketName"><b>바삭 정기권</b></div>
            <div id="ticketPeriodBox">
              <ul>
                <li id="ticketPeriod_index">구독 기간</li>
                <li id="ticketPaymentDate_index">다음 결제일</li>
              </ul>
              <ul>
                <li id="ticketPeriod">2023.01.01 ~ 2023.12.31</li>
                <li id="ticketPaymentDate">2024.01.01</li>
              </ul>
            </div>
            <button id="ticketSetting" className='noDrag' type="button" onClick={myTicketHandler}>정기권 관리 <span id="ticketSpin" style={{ transform: managementOpen ? 'rotate(90deg)' : undefined }}>▶</span></button>
          </section>
          <section id="ticketSectionTwo">
            <ul>
              <li><a>결제 수단 변경</a></li>
              <li><a>정기 결제 해지</a></li>
            </ul>
          </section>
        </div>
        :
        <div id="ticketBox">
          <b id="ticketName">바삭 정기권 (30일)</b>
          <div id="ticketDescription">2023.01.01 ~ 2023.12.31</div>
          <div id="ticketPaymentDate">2024.01.01</div>
          <button id="ticketSetting" onClick={payBtn}>정기권 구매</button>
        </div>
      }
    </MemberNav>
  )
}

export default MemberTicket
