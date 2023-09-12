import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/Md'

import SideBar from '../components/layout/SideBar'

import '../styles/base/sub.css'
import '../styles/base/aboutStyle.css'

const AboutPage = () => {
  useEffect(() => {
    AOS.init();
  })

  const onMoveToSection = () => window.scrollBy({top:document.getElementById("pageContents").getBoundingClientRect().top - 100, behavior:'smooth'});

  return (
    <main id="pageContainer" className="about">
      <div id="pageVisual">
        <h2 className="title" data-aos="flip-down" data-aos-duration="1000">
          <span>B</span>
          <span>i</span>
          <span>s</span>
          <span>c</span>
          <span>u</span>
          <span>i</span>
          <span>t</span>
        </h2>
        <p className="info" data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="800">반가워요! <br />당신의 독서 서포터 <b>‘비스킷’</b>입니다.</p>
        <div className="scrollAni">
          <button type="button" onClick={onMoveToSection}><MdOutlineKeyboardDoubleArrowDown/></button>
        </div>
      </div>
      
      <div id="pageContents">
        <section className="overView" data-aos="fade-right"  data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <h3 className="title"><span>OVERVIEW</span></h3>
          <div className="textArea">
          비스킷은 단순히 책이나 글 등을 읽는 행위를 넘어 감상과 생각을 기록하고 공유하며 <br />풀리지 않는 의문을 독자끼리 함께 대화로 풀어내고 소통하는 광장을 만들고자 합니다.
          </div>
        </section>
        <section className="about" data-aos="fade-right"  data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <h3 className="title"><span>ABOUT</span></h3>
          <div className="textArea">
            <p>독서에 시작과 끝이 있을까요?</p>
            <p>새해 다짐이나 큰 결심을 해야만 시작하는 독서. <br />굳이 어렵게 생각말고 짧은 글의 기록부터 시작하며 책과 가까이 지내보세요.</p>
            <p>시작하기 어려운 책이 있다면 누군가의 작은 기록으로 먼저 접해보세요. <br />그리고 책을 읽고 난 후 피어오르는 작은 생각도 기록으로 남겨보세요. <br />이또한 누군가가 당신이 읽은 책과 만날 기적이 될 지도 모르거든요.</p>
            <p>화려하고 볼 것도 많은 요즘이지만, 도란도란 모여서 함께 책을 읽으며 <br />우리가 마주하고 있는 여러 생각과 고민들을 함께 나누고 <br />깊은 사색, 허심탄회한 대화를 하다보면 독서 취향이 비슷한 친구가 생길지도 모릅니다.</p>
            <p>허기를 가볍게 채울 수 있는 비스킷처럼 <br />어렵지 않게 당신과 책이 가까워질 수 있도록 도와드릴게요.</p>
            <p>비스킷에서 우리는 책을 통해 얻은 모든 것을 기록으로 남기거나 <br />함께 대화로 풀어보며 공유합니다.</p>
            <p>책과 가까운 곳에 항상 비스킷이 있습니다.</p>
          </div>
        </section>
      </div>
      <SideBar/>
    </main>
  )
}

export default AboutPage