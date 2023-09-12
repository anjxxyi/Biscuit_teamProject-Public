import React, { useState, useContext } from 'react'
import MemberNav from './MemberNav'
import { Context } from '../../components/store/Context';
import { requestPay } from '../../components/Aaxios';

function MemberTicket() {
  const [ticket, setTicket] = useState(false); // api 연결 해야함

  const myTicketHandler = () => {
    const ticketSpin = document.getElementById("ticketSpin");
    if(!ticketSpin.style.transform) ticketSpin.style.transform = "rotate(90deg)";
    else ticketSpin.style.transform = null;

    const ticketBox = document.getElementById("ticketBox");
    if(ticketBox.classList.contains("open")) ticketBox.classList.remove("open");
    else ticketBox.classList.add("open");
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
        <div id="ticketBox">
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
            <div id="ticketSetting" className='noDrag' onClick={myTicketHandler}>정기권 관리 <span id="ticketSpin">▶</span></div>
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