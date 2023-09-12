import React, { useState, useEffect, useRef , useContext } from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/Md"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/Ti"
import { Link } from 'react-router-dom'
import { GET } from "../../components/Aaxios"
import { Context } from '../../components/store/Context'
import defaultImg from '/images/goods/goods_default.png'

import PageVisual from '../../components/layout/PageVisual'
import SideBar from '../../components/layout/SideBar'
import AdminHandler from '../../components/layout/AdminHandler'

import '../../styles/base/sub.css'
import '../../styles/base/goodsStyle.css'

const GoodsPage = () => {
  // useInfo
  const props = useContext(Context);
  const userInfo = props.userInfo;


  // data
  const [goodsData, setGoodsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if((userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U")
    { GET(`/api/goods/list?saleYn=Y`)
      .then(res => {
        setGoodsData([...res.data].sort((a,b) => b.no - a.no));
      })
      .catch(err => console.log(err));
      return;
    }
    if(userInfo?.authority == "A"){
      GET(`/api/goods/list/all`)
      .then(res => setGoodsData([...res.data].sort((a,b) => b.no - a.no)))
      .catch(err => console.log(err));
      return;
    } 
  }, [userInfo?.authority]);


  // kind -> 전체, 판매, 품절
  const onChangeSelect = (e) => setSelectValue(e.target.value);

	const [selectValue, setSelectValue] = useState("A");
	useEffect(() => {
		if(selectValue == "T"){
			GET(`/api/goods/list/all`)
      .then(res => setGoodsData(res.data))
      .catch(err => console.log(err));
      return;
		}
		if(selectValue == "Y"){
			GET(`/api/goods/list?goods.saleYn=Y`)
      .then(res => setGoodsData(res.data))
      .catch(err => console.log(err));
      return;
		}
		if(selectValue == "N"){
			GET(`/api/goods/list/inventory`)
      .then(res => setGoodsData(res.data))
      .catch(err => console.log(err));
      return;
		}
	}, [selectValue])


  // sort
  const sortBtnsDiv = useRef();
  const [sortActive, setSortActive] = useState(0);
  const [price, setPrice] = useState(false);
  const newSort = () => {
    setSortActive(0);
    return [...goodsData].sort((a,b) => b.goods.no - a.goods.no);
  }
  function highPriceSort() {
    setPrice(!price);
    setSortActive(1);
    return [...goodsData].sort((a,b) => b.goods.price - a.goods.price);
  }
  function lowPriceSort() {
    setPrice(!price);
    setSortActive(1);
    return [...goodsData].sort((a,b) => a.goods.price - b.goods.price);
  }


  // images file Null
  const onErrorImg = (e) => e.target.src = defaultImg;


  // pagenation
  const itemsPerPage = 6;
  const currentGoodsData = (goodsData ? 
      goodsData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) 
      : 0
    );

  
  return (
    <main id="pageContainer" className="goods typeList">
      <PageVisual/>
      
      <div id="pageContents">
        <section className="topSection">
          {userInfo?.authority == "A" && (
            <section className='adminSection'>
              <div className="selectArea"> 
                <select onChange={onChangeSelect} value={selectValue} >
                  <option value="T"> -- 전체 --</option>
                  <option value="Y">판매 굿즈 목록</option>
                  <option value="N">품절 굿즈 목록</option>
                </select>
              </div>
            </section>
          )}
          <div className="sortArea" ref={sortBtnsDiv}>
            <button type="button"
                className={sortActive == 0 ? "sortBtn typeNew active" : "sortBtn typeNew"}
                onClick={() => (setGoodsData(newSort))}>신상품순</button>
           {price ?
            <button type="button"
                className={sortActive == 1 ? "sortBtn typeHigh active" : "sortBtn typeHigh"}
                onClick={() => setGoodsData(highPriceSort())}>가격순<TiArrowSortedDown /></button>
            : <button type="button"
                className={sortActive == 1 ? "sortBtn typeLow active" : "sortBtn typeLow"}
                onClick={() => setGoodsData(lowPriceSort())}>가격순<TiArrowSortedUp /></button>
					  }
          </div>
        </section>

        {currentGoodsData && currentGoodsData.length > 0 ? (
          <section className="listSection">
            <div className='listArea'>
              {currentGoodsData.map((item) => (
                <Link className="listItem" to={`/goods/${item.goods.no}`} key={item.goods.no}>
                  <div className="imgBox">
                    {item.goods.inventory == 0 &&
                      <div className="soldoutThumb"> 판매완료</div>
                    }
                    {item.images.imgPath !== null || "" ? 
                      <img src={item.images.imgPath} alt={item.goods.name} /> 
                       : onErrorImg
                    }
                  </div>
                  <div className="txtBox">
                    <h4 className="title">{item.goods.name}</h4>
                    <p className="price">{item.goods.price.toLocaleString()}원</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pagination">
              <ul className='pageBox'>
                <li className="pageChg"><MdArrowBackIos/></li>
                  {Array.from({length: Math.ceil(goodsData.length / itemsPerPage) }).map((_, index) => (
                  <li className={`pageNum ${index === currentPage ? 'active' : ''}`}
                      key={index}
                      onClick={() => setCurrentPage(index)}>{index + 1}</li>
                  ))}
                <li className="pageChg"><MdArrowForwardIos /></li>
              </ul>
            </div>
          </section>
        ) : (
          <div className="nothingSearchResult">해당 목록의 제품이 없습니다</div>
        )} 
      </div>
      
      <SideBar/>
      <AdminHandler edit={`/goods/new`}/>
    </main>
  )
}

export default GoodsPage