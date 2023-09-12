import React from 'react'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'

const VisualSlider = () => {
  const data = [
    {
      "no" : 1,
      "title" : "기억을 기록하는, 북로그",
      "info" : "<p>독서를 하고 떠오르는 생각과 느낌을 <b>가벼운 기록</b>으로 남겨 보세요.</p> <p>그리고 그 기록을 <b>북로그</b>에서 나누어 보세요.</p> <p>어쩌면 잊혀질 수 있는 <b>지금</b>, 어떤 기록이 남겨지고 있을까요?</p>",
      "buttonName" : "북로그 <b>Now</b>",
      "img" : "/main_visual01.svg",
      "bgcolor" : "none",
      "url" : "/booklog/now"
    }, 
    {
      "no" : 2,
      "title" : "생각과 경험을 공유하는, 북클래스",
      "info" : "<p><b>하나의 책</b>으로 <b>다양한 생각</b>을 함께 공유하고,</p> <p>사람들과 어울리며 책을 즐길 수 있는 <b>북클래스</b>를 소개합니다.</p> <p>지금 여기, <b>나와 같은 책을 읽는 사람들</b>을 찾아 보는 건 어때요?</p>",
      "buttonName" : "개설된 <b>북클래스</b>",
      "img" : "/main_visual02.svg",
      "bgcolor" : "none",
      "url" : "/bookclass"
    }
  ]
  const settings = {
		arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  // console.log("visualData.length : " + data.length);

  return (
    <>
      <Slider {...settings}>
        {data ? data.map((v, i) => {
            return (
              <div className={`slide no${v.no}`} key={i}>
                <div className="wrapper" style={{background : v.bgcolor}}>
                  <div className="txtBox">
                    <h2>{v.title}</h2>
                    <div dangerouslySetInnerHTML={{__html:v.info}}></div>
                    <Link to={v.url}><button className="styleRound" type="button"  dangerouslySetInnerHTML={{__html:v.buttonName}}></button></Link>
                  </div>
                  <img className="img" src={`/images/${v.img}`} alt="" />
                </div>
              </div>
            )
        }) : null}
      </Slider>
    </>
  )
}

export default VisualSlider