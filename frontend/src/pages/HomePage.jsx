import React , { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgSearch } from "react-icons/Cg"
import axios from 'axios'

import BannerSlider from '../components/layout/BannerSlider'
import VisualSlider from '../components/layout/VisualSlider'

import campaignImg from "/images/main_campaign01.png"
import campaignTitle from "/images/main_campaign02.png"

import '../styles/base/main.css'

const HomePage = () => {
  const navigate = useNavigate();
  function searchHandler() {
    const query = document.getElementById("hpsearch").value;
    if(query === "") alert("검색어를 입력해주세요.");
    else navigate(`/books?query=${query}`);
  }

  // goods
  const [goodsList, setGoodsList] = useState([]);
  useEffect(() => {
    const url = `/api/goods/list?saleYn=Y`;
    axios.get(url)
    .then((result)=> {
      setGoodsList(result.data);
    })
    .catch((err) => {
      console.log(err + " 서버요청 에러");
    })
  }, [])

  // goods 랜덤 출력
  const ramdomArr = () => {
    const shuffle = () => (Math.random() - 0.5);
    return [...goodsList].sort(shuffle).slice(0, 3);
  }

  return (
    <main id="pageContainer" className="main">
      {/* #pageContents --- START */}
      <div id="pageContents">
        <section className="mainVisual">
          <VisualSlider />
        </section>
        
        <section className="search">
          <div className="searchBox">
            <input type="text" name="search" id="hpsearch" className="searchBar" autoComplete="off" placeholder="찾고 싶은 도서를 검색해 보세요." onKeyUp={e => e.key == "Enter" && searchHandler()} />
            <button type="button" className="searchBtn typeIcon" onClick={() => searchHandler()}><CgSearch /></button>
          </div>
        </section>

        <section className="market">
          <div className="goodsArea">
            <h3 className="title"><Link to={`/goods`}><b>귀여운 바삭군</b>을 내 품에</Link></h3>
            <div className="list">
              {goodsList != "" && ramdomArr().map((item) => (
                <Link to={`/goods/${item.goods.no}`} key={item.goods.no}>
                  <div className="imgBox"><img src={item.images.imgPath} alt={item.goods.name} /></div>
                  <div className="txtBox">
                    <h4 className="name"> {item.goods.name} </h4>
                    <p className="price"> {item.goods.price.toLocaleString()}원 </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="campaignArea">
            <h3 className="title"></h3>
            <Link to={`/campaign`}>
              <div className="txtBox">
                <h4 className="title"><img className="title" src={campaignTitle} alt="" /></h4>
                <p className="info">지갑도 챙기고, 생각도 공유하고, <br />환경도 생각하는 <b>일석삼조 리사이클 캠페인</b></p>
                <span className="more">more view</span>
              </div>
              <img className="img" src={campaignImg} alt="" />
            </Link>
          </div>
        </section>

        <section className="events">
          <BannerSlider />
        </section>
      </div>
    </main>
  )
}

export default HomePage