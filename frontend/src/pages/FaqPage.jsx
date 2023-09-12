import React, { useState } from 'react'

import PageVisual from '../components/layout/PageVisual'
import SideBar from '../components/layout/SideBar'

import '../styles/base/sub.css'

const FaqPage = () => {
  const cate = [
    {no: 0, c:'전체'},
    {no: 1, c:'회원 관리'},
    {no: 2, c:'북클래스'},
    {no: 3, c:'북로그'},
    {no: 4, c:'북클래스'},
    {no: 5, c:'캠페인'},
    {no: 6, c:'굿즈'},
    {no: 7, c:'이벤트'}
  ]

  const data = [
    {
      no: 1,
      c:'회원 관리',
      q:'비스킷은 어떻게 이용하나요?', 
      a:'비스킷은 신규 회원가입 및 로그인 후 서비스를 이용하실 수 있습니다.'
    },{
      no: 1,
      c:'회원 관리',
      q:'로그인 계정이 기억나지 않아요.', 
      a:'‘시작하기 - ID/PW찾기’를 통해 비스킷 가입 시 입력한 성명, 생년월일, 핸드폰 번호를 입력하여 찾으실 수 있습니다.'
    },{
      no: 2,
      c:'북클래스',
      q:'마음에 드는 도서를 저장하고 싶어요.', 
      a:'마음에 드는 도서를 검색하신 후 해당 도서의 상세 페이지에서 ‘북클립’에 저장하실 수 있습니다.'
    },{
      no: 2,
      c:'북클래스',
      q:'저장한 북클립을 찾아보고 싶어요.', 
      a:'저장된 북클립들은 ‘마이페이지 - 북클립 관리’에서 찾아보실 수 있습니다. \n또한, 저장된 북클립들을 한 곳에서 관리할 수 있고 손쉽게 도서 정보를 확인할 수 있습니다.'
    },{
      no: 3,
      c:'북로그',
      q:'북로그가 무엇인가요?', 
      a:'내가 읽었던 책들을 소개하고 공유하는 서비스입니다.'
    },{
      no: 3,
      c:'북로그',
      q:'내 북로그 소개글을 변경하고 싶어요.', 
      a:'‘내 북로그 - 소개 탭’에 들어가시면 수정하실 수 있습니다.'
    },{
      no: 3,
      c:'북로그',
      q:'구독한 북로그를 취소하고 싶어요.', 
      a:'‘내 북로그 - 구독 블로그’에 들어가시면 구독을 취소할 수 있습니다. \n또한 구독한 북로그로 와서 구독을 해제하실 수도 있습니다.'
    },{
      no: 4,
      c:'북클래스',
      q:'북클래스가 무엇인가요?', 
      a:'혼자선 읽기 어려웠던 책을 함께 읽을 수 있도록 개설신청을 통해 독서모임을 열고, 원하는 모임에 참여하는 곳입니다.'
    },{
      no: 4,
      c:'북클래스',
      q:'북클래스를 개설하고 싶어요.', 
      a:'회원가입 후 북로그에서 글을 작성해보세요. \n리더등급이 되면 개설신청을 할 수 있습니다.'
    },{
      no: 4,
      c:'북클래스',
      q:'북클래스에 참여하고 싶어요.', 
      a:'회원가입 후 마음에 드는 북클래스에 [참여신청] 버튼을 눌러보세요. \n확인 및 관리는 ‘마이페이지 - 북클래스 관리’ 에서 가능합니다.'
    },{
      no: 4,
      c:'북클래스',
      q:'참여(개설)한 북클래스는 어디서 확인하나요?', 
      a:'참여 혹은 개설한 북클래스들은 ；마이페이지 - 북클래스 관리’에서 찾아보실 수 있습니다. \n또한 북클래스 정보 수정, 참여 여부 수정을 할 수 있습니다.'
    },{
      no: 5,
      c:'캠페인',
      q:'Us, Earth 캠페인이 무엇인가요?', 
      a:'한번 읽고 읽지 않은 종이책들의 낭비를 줄이기 위해 저렴한 가격으로 판매하는 환경 캠페인 입니다.'
    },{
      no: 5,
      c:'캠페인',
      q:'Us, Earth 캠페인에 참여하고 싶어요.', 
      a:'Us, Earth 캠페인 페이지 오른쪽 상단에 Us,Earth 신청 버튼을 누르면 신청페이지로 연결됩니다. \n개인정보와 Us, Earth 캠페인에 참여하려는 책 정보와 픽업 장소를 입력하시면 신청이 완료됩니다.'
    },{
      no: 5,
      c:'캠페인',
      q:'Us, Earth 캠페인으로 구매한 도서를 보고 싶어요.', 
      a:'‘마이 페이지 - 주문내역’을 통해 구매한 도서목록을 확인 할 수 있습니다.'
    },{
      no: 6,
      c:'굿즈',
      q:'굿즈 상품을 구매하고 싶어요.', 
      a:'화면 상단의 Mr.BASAK 탭을 클릭하시면 다양한 김바삭 굿즈를 만나보실 수 있습니다. \n\n■ Mr.BASAK 굿즈 주문 방법 \n1) 로그인 후 화면 상단의 Mr.BASAK 탭을 클릭해 구매하실 상품을 선택합니다. \n2) 원하시는 상품의 상세페이지에서 구매 수량을 선택 후 [바로 구매]를 선택합니다. \n3) 이동한 [결제하기] 화면에서 선택 제품 정보, 배송지 정보를 확인 후 결제방법을 선택합니다. \n4) 최종 결제금액 확인 후 결제를 진행합니다.'
    },{
      no: 6,
      c:'굿즈',
      q:'구매한 굿즈는 어디서 볼 수 있나요?', 
      a:'‘마이페이지 - 주문내역’에서 주문내역과 배송상태를 확인 가능합니다.'
    },{
      no: 6,
      c:'굿즈',
      q:'품절된 굿즈 상품은 언제 입고 되나요?', 
      a:'품절 상품 재입고 여부 및 일정은 정확한 확인이 불가능합니다. \n현재 재입고 알림 서비스가 준비 중에 있습니다. \n빠른 시일 내 제공할 수 있도록 하겠습니다.'
    },{
      no: 7,
      c:'이벤트',
      q:'이벤트에 참여하고 싶어요.', 
      a:'이벤트 메뉴에 들어가셔서 참여하고 싶은 이벤트을 클릭하여 하단에 [참여하기] 버튼을 누르시면 됩니다.'
    },{
      no: 7,
      c:'이벤트',
      q:'참여한 이벤트는 어디서 볼 수 있나요?', 
      a:'참여하신 이벤트에 [참가자 리스트]를 확인하시면 됩니다.'
    }
  ]


  const [isCate, setIsCate] = useState(0);
  const handlerTab = (e) => {
    setIsCate(e);
  }

  return (
    <main id="pageContainer">
      <PageVisual/>

      <div id="pageContents" className="faq">
        <section className="topSection">
          <ul>
            {cate && cate.map((value, index) => (
              <li key={index}>
                <button type="button" className={isCate == index ? "tabBtn active" : "tabBtn"} onClick={() => handlerTab(index)}>{value.c}</button>
              </li>
            ))}
          </ul>
        </section>
        <section className="mainSection">
          {data && data.map((value, index) => (
            <details key={index} className={isCate == 0 || (isCate == value.no) ? "faqItem" : "faqItem none"}>
              <summary className="question"><strong>{value.c}</strong>{value.q}</summary>
              <pre className="answer" dangerouslySetInnerHTML={{ __html: value?.a }} />
            </details>
          ))}
        </section>
      </div>
      <SideBar />
    </main>
  )
}

export default FaqPage