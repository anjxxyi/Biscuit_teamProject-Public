import React, { useEffect, useContext, useState } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/Io"
import { RiInformationLine } from 'react-icons/Ri'
import { BsFillClipboardCheckFill } from 'react-icons/Bs'
import { GET } from "../../components/Aaxios"
import { Context } from "../../components/store/Context"

import AdminHandler from '../../components/layout/AdminHandler'
import SideBar from '../../components/layout/SideBar'
import Loading from "../../components/style/Loading"

import '../../styles/base/sub.css'
import '../../styles/base/campaignStyle.css'

const CampaignViewPage = () => {
  const props = useContext(Context);
	const userInfo = props.userInfo;
  const [load, setLoad] = useState(false);

  // navigate
  const navigate = useNavigate(); 
  const backBtn = () => { navigate(-2);};

  const [detail, setDetail] = useState('');
  const { no } = useParams();

  useEffect(() => {
    setLoad(true);
    GET(`/api/campaign/${no}`)
      .then((res) => {
        setDetail(res.data);
        setTimeout(() => {
          setLoad(false);
        }, 300);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
      <main id="pageContainer" className="campaign typeView">
      {detail && <>
        <div id="pageVisual">
          <div className="visualInner">
            <Link className="backBtn" onClick={backBtn}><IoIosArrowBack /></Link>
            <div className="imgBox">
              <div className="thumb">
                <img src={detail.bookImgUrl}/>
                {detail?.saleYn == "Y" && <div className="soldoutThumb">판매완료</div>}
              </div>
              <div className="imgContent">
                <h3 className="bookName">{detail.bookName}</h3>
                <p className="bookAuthor">{detail.bookAuthor.replaceAll("^", ", ")}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="pageContents">
          {
            load &&
            <Loading opacity={1} />
          }
          <section className="detailSection">
            <div className="detail basic">
              <h4 className="head">기본정보</h4>
              <div className="content typeOption">
                <ul>
                  <li>
                    <strong>출판</strong>
                    <span>{detail.publisher}</span>
                  </li>
                  <li>
                    <strong>정가</strong>
                    <span>{detail.bookPrice.toLocaleString()}원</span>
                  </li>
                  <li>
                    <strong>할인율</strong>
                    <span>{detail.discountRate}%</span>
                  </li>
                  <li>
                    <strong>판매가</strong>
                    <span>{(detail.bookPrice - (detail.bookPrice * detail.discountRate) / 100).toLocaleString()}원</span>
                  </li>
                  <li>
                    <strong>상태</strong>
                    <span className={detail.status == "S" ? 'status gradeS' : detail.status == "G" ? "status gradeG" : detail.status == "N" ? "status gradeN" : "status gradeB"}>{detail.status == "S" ? "최상" : detail.status == "G" ? "상" : detail.status == "N" ? "중" : "하"}</span>
                  </li>
                </ul>
                {userInfo == null && 
                  <div className="caption"><RiInformationLine/><b>구매는 회원만 가능합니다.</b></div>
                } 
                {userInfo?.authority == "A" ? null :
                  detail?.saleYn == "Y" ? 
                    <div className='buyBtn soldout'> 판매완료 </div> :
                  userInfo == null ? "" :
                    <Link to={`/order`} state={{recycleNo : detail.recycleNo}} className="buyBtn">구매하기</Link>
                }
              </div>
            </div>
            <div className="detail book">
              <h4 className="head">책소개</h4>
              <pre className="content">{detail.bookDetail}</pre>
            </div>
            <div className="detail author">
              <h4 className="head">작가소개</h4>
              <div className="content">
                <div className="authorInfo">
                  <b>{detail.bookAuthor.replaceAll("^", ", ")}</b>
                  <small>지음</small>
                </div>
                <pre className="des_book_authorDt">{detail.authorDetail}</pre>
                {
                detail.translator &&
                <>
                <div className='dotLine'></div>
                <div className='des_book_author'>
                  <b>{detail.translator.replaceAll("^", ", ")}</b>
                  <small>옮김</small>
                </div>
                <pre className='des_book_authorDt'>{detail.transDetail}</pre>
                </>
              }
              </div>
            </div>
          </section>
        </div>
      </>
      }
      <SideBar/>
      <AdminHandler>
        <Link to={`/campaign/accept`}><BsFillClipboardCheckFill/></Link>
      </AdminHandler>
    </main>
    
  )
}

export default CampaignViewPage