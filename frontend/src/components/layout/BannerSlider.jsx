import React, { useEffect, useState } from 'react'
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

const BannerSlider = () => {

  // data
  // const [eventData, setEventData] = useState();
  // const fetchEventData = () => {
  //   axios
  //     .get(`/api/events`)
  //     .then(res => setEventData(res.data))
  //     .catch(err => console.log(err));
  // }
  // useEffect(() => fetchEventData(), [])

  const data = [
    {
      "type": 1,
      "intro": "Welcome to Biscuit.",
      "title": "어서와, 비스킷은 처음이지?",
      "info": "지금 신규가입을 하면, 추첨을 통해 스타벅스 아메리카노 기프티콘 지급!",
      "img": "main_banner01.png",
      "bgcolor": "#fffce5",
      "url": "/events/38"
    }, {
      "type": 2,
      "intro": "심리학 박사가 전하는 마음 회복 프로젝트",
      "title": "마음의 힘과 자신감을 키우는 법",
      "info": "찌뿌둥한 마음 기지개 켤 준비가 되셨나요?",
      "img": "main_banner02.png",
      "bgcolor": "#1baa77",
      "url": "/events/38"
    }, {
      "type": 3,
      "intro": "지나야만 알 수 있는 삶의 지혜에 대하여",
      "title": "지나고 나서야 알게된 것들",
      "info": "나만의 삶의 지혜가 있다면 공유해 주세요!",
      "img": "main_banner03.png",
      "bgcolor": "#f5f5f5",
      "url": "/events/38"
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
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <style>
        {`
          .slick-slide {
            visibility: hidden;
          }

          .slick-slide.slick-active {
            visibility: visible;
          }
          
          .sliderImgInfo {
            width: 100%
          }
        `}
      </style>
      {/* <Slider {...settings}>
        {eventData ? eventData.slice(0, 3).map((item, i) => {
          const { event, images } = item;
          return (
            <div className="slide" key={item}>
              <Link
                className="wrapper" style={{ background: item.bgcolor }}
                to={`/events/${event.no}`}>
                <img className='sliderImgInfo' src={`${images.imgPath}`} alt=""/>
              </Link>
            </div>
          )
        }) : null}
      </Slider> */}
      <Slider {...settings}>
        {data ? data.map((v, i) => {
            return (
              <div className="slide" key={i}>
                <div className="wrapper" style={{background : v.bgcolor}}>
                  <img src={`/images/${v.img}`} alt="" />
                </div>
              </div>
            )
        }) : null}
      </Slider>
    </>
  )
}

export default BannerSlider
