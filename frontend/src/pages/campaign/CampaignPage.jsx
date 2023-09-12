import React, { useEffect, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GET } from "../../components/Aaxios"
import { Context } from "../../components/store/Context"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/Ti"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/Md"
import { BsFillClipboardCheckFill } from "react-icons/Bs"

import PageVisual from "../../components/layout/PageVisual"
import SideBar from "../../components/layout/SideBar"
import AdminHandler from "../../components/layout/AdminHandler"
import Loading from "../../components/style/Loading"

import "../../styles/base/sub.css"
import "../../styles/base/campaignStyle.css"

const CampaignPage = () => {
	const props = useContext(Context);
	const userInfo = props.userInfo;
	const [recycleList, setRecycleList] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [load, setLoad] = useState(false);
	
	/* 관리자로 로그인할때랑 유저로 로그인할때 다르게 보임 */
	useEffect(() => {
		setLoad(true);
		if ((userInfo == null && userInfo == undefined) || userInfo?.authority == "U") {
			GET(`/api/campaign/list?acceptYn=Y`)
			.then(res =>  {
				setRecycleList([...res.data].sort((a,b) => b.recycleNo - a.recycleNo))
				setTimeout(() => {
					setLoad(false);
				}, 300);
			})
			.catch(err => console.log(err));
			return;
		}
		if (userInfo?.authority == "A") {
			GET(`/api/campaign/list/all`)
			.then(res => {
				setRecycleList([...res.data].sort((a,b) => b.recycleNo - a.recycleNo))
				setTimeout(() => {
					setLoad(false);
				}, 300);
			})
			.catch(err => console.log(err));
			return;
		}
	}, [userInfo?.authority]);

	
	

	/** 상세페이지 이동버튼 */
	const navigate = useNavigate();
	const handleMove = ({ data }) => {
		navigate(`/campaign/${data.recycleNo}`, {
			state: {
				recycleNo: `${data.recycleNo}`
			}
		})
	}


	/** 승인된 목록과 승인해야할 목록별로 나오게 */
	const onChangeSelect = (e) => {
		setSelectValue(e.target.value);
	};
	const [selectValue, setSelectValue] = useState("Y");
	useEffect(() => {
		if (selectValue == "T") {
			GET(`/api/campaign/list/all`)
			.then(res => setRecycleList([...res.data].sort((a,b) => b.recycleNo - a.recycleNo)))
			.catch(err => console.log(err));
			return;
		}
		if (selectValue == "Y") {
			GET(`/api/campaign/list?acceptYn=Y`)
			.then(res => setRecycleList([...res.data].sort((a,b) => b.recycleNo - a.recycleNo)))
			.catch(err => console.log(err));
			return;
		}
		if (selectValue == "N") {
			GET(`/api/campaign/list?acceptYn=N`)
				.then(res => setRecycleList([...res.data].sort((a,b) => b.recycleNo - a.recycleNo)))
				.catch(err => console.log(err));
			return;
		}
	}, [selectValue])

	/** 신청페이지 이동버튼 */
	const handleApply = () => {
		if (userInfo !== null) {
			navigate("/campaign/apply")
			return;
		} else {
			alert("로그인을 해주세요");
		}
	}

	/** 분류 */
	const [sort, setSort] = useState(1);

	const cntListSort= () => {
		setSort(1);
		return [...recycleList].sort((a, b) => b.recycleNo - a.recycleNo);
	}
	const [price, setPrice] = useState(false);

	function highPriceSort() {
		setSort(2);
		setPrice(!price);
		return [...recycleList].sort((a, b) => b.salePrice - a.salePrice);
	}
	function rowPriceSort() {
		setSort(2);
		setPrice(!price);
		return [...recycleList].sort((a, b) => a.salePrice - b.salePrice);	 
	}
	

	/** pagination --- START */
	const itemsPerPage = 12;
	// 현재 페이지에 해당하는 굿즈 데이터
	const currentRecycle
		= recycleList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);




	return (
		<main id="pageContainer" className="campaign typeList">
			<PageVisual />

			{/* #pageContents --- START */}
			<div id="pageContents">
				{
					load &&
					<Loading opacity={1} />
				}
				<section className="topSection">
					{userInfo && (userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ?
						<div className="applyArea">
							<div className="bubble">다 읽은 책을<br/>접수해 보세요!</div>
							<button className="applyBtn" onClick={handleApply}><img className="icon" src="/images/sub_campaignIcon.gif" alt="" /> <span>Us, Earth 신청</span></button>
						</div>
						: null
					}
					{
					 userInfo?.authority == "A" ?
					  <div className="selectArea">
						<select onChange={onChangeSelect} value={selectValue} >
							<option value="T" > -- 전체 --</option>
							<option value="Y">승인된 목록</option>
							<option value="N">승인해야할 목록</option>
						</select>
					 </div>
					 :
					 <div className="sortArea" >
					 <button
						type="button"
						className= { sort == 1 ? "sortBtn typeRec active" : "sortBtn typeRec"}
						onClick={() => setRecycleList(cntListSort())} > 최신순
					 </button>
					 {
						price ?
						<button
						type="button"
						className={ sort == 2 ? "sortBtn typeNew active" : "sortBtn typeNew"}
						onClick={() => setRecycleList(highPriceSort())}	>가격순<TiArrowSortedDown />
					 	</button>
						:
						<button
						type="button"
						className="sortBtn typeNew"
						onClick={() => setRecycleList(rowPriceSort())} >가격순<TiArrowSortedUp />
					 	</button>
					 }
					 </div>
					}
					
				</section>
				<section className="listSection">
				 <div className="listArea" >
					{currentRecycle !== undefined &&
					currentRecycle.map((data) => {
						return (
						 <Link className="listItem" to={`/campaign/${data.recycleNo}`} key={data.recycleNo} onClick={() => handleMove({ data })}>
							<div className="imgBox">
								{data.saleYn == "Y" &&
									<div className="soldoutThumb"> 판매완료</div>
								}
								<img src={data.bookImgUrl} alt="bookImgUrl" />
								<div className="imgBg" style={{ background: `url(${data.bookImgUrl}) center center / cover` }}></div>
							</div>
							<div className={data.status == "S" ? "txtBox gradeA" : data.status == "G" ? "txtBox gradeA" : data.status == "N" ? "txtBox gradeB" : "txtBox gradeC"}>
							 <span className="condition">
								{data.status == "S" ? "최상" : data.status == "G"
									? "상" : data.status == "N"
										? "중" : "하"}
							 </span>
								<h4 className="title">{data.bookName}</h4>
								<p className="info">
									{data.bookAuthor} / {data.publisher}
								</p>
								<div className="price saleY">
									<span className="before">
										{data.bookPrice.toLocaleString()}
									</span>
									<span className="sale">{data.discountRate}%</span>
									<p className="after saleY">
										<span >
											{(
												data.bookPrice -
												(data.bookPrice * data.discountRate) / 100
											).toLocaleString()}
											원
										</span>
										{data.saleYn == "Y" &&
											<span className="soldout">판매완료</span>
										}
									</p>
								</div>
							</div>
							 </Link>
							);
						})}
				 </div>
					<div className="pagination">
						<ul className="pageBox" >
							{
								recycleList.length < itemsPerPage ? null :
									<li className="pageChg">
										<MdArrowBackIos />
									</li>
							}
							{Array.from({ length: Math.ceil(recycleList.length / itemsPerPage) }).map((_, index) => (
								<li
									className={`pageNum ${index === currentPage ? 'active' : ''}`}
									key={index}
									onClick={() => setCurrentPage(index)}
								>
									{index + 1}
								</li>
							))}
							{
							recycleList.length < itemsPerPage ? null :
								<li className="pageChg">
									<MdArrowForwardIos />
								</li>
							}
						</ul>
					</div>
				</section>
			</div>
			<SideBar />
      <AdminHandler>
        <Link to={`/campaign/accept`}><BsFillClipboardCheckFill/></Link>
			</AdminHandler>
			{/* #pageContents --- END */}
		</main>
	);
};

export default CampaignPage;
