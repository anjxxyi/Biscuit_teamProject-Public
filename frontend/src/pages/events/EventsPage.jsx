import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from "../../components/store/Context"
import { AiTwotoneCalendar } from "react-icons/Ai"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/Md"

import PageVisual from "../../components/layout/PageVisual"
import SideBar from "../../components/layout/SideBar"
import AdminHandler from "../../components/layout/AdminHandler"

import "../../styles/base/sub.css"
import "../../styles/base/eventsStyle.css"

const EventsPage = () => {
	//-----------------------------------------------------------------------
	//                        로그인 된 정보 가져오기
	//-----------------------------------------------------------------------

	// 비로그인 시 userInfo.no 를 null 로 만듬
	const initialUserInfo = { no: null };

	// Context 로 로그인된 정보를 가져오는거
	const props = useContext(Context);
	const userInfo = props.userInfo || initialUserInfo;

	//-----------------------------------------------------------------------
	//                        날짜 포맷
	//-----------------------------------------------------------------------

  function formatDateTime(dateArray) {
    const [year, month, day] = dateArray;
  
    // 원하는 형식으로 날짜 및 시간 정보 포맷팅
    const formattedDate = `${year}.${month}.${day}`;
  
    return `${formattedDate}`;
  }

	//-----------------------------------------------------------------------
	//                        종료된 이벤트 이미지 대체
	//-----------------------------------------------------------------------

  // 현재 시간을 가져오는 함수
  const getCurrentTime = () => {
    return new Date().getTime();
  };

	 // 배열로 표현된 날짜를 타임스탬프로 변환하는 함수
	 const convertArrayToTimestamp = (dateArray) => {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day).getTime(); // month는 0부터 시작하므로 -1 처리
  };

  // 이벤트의 종료 시간과 현재 시간을 비교하여 이미지를 대체하는 함수
  const replaceImageIfExpired = (item) => {
    const currentTime = getCurrentTime();
    const eventEnd = convertArrayToTimestamp(item.event.event_end);

    if (eventEnd < currentTime) {
      item.images.imgPath = '\\images\\event\\Quit_Event_Image.png'; 
    }

    return item;
  };

	  // 이벤트 항목 클릭 시 종료 여부를 확인하고 알림창을 띄우는 함수
		const handleEventItemClick = (item) => {
			const currentTime = getCurrentTime();
			const eventEnd = convertArrayToTimestamp(item.event.event_end);

			if (eventEnd < currentTime) {
				alert("이벤트가 이미 종료되었습니다.");
	      window.location.href = `/biscuit-project/events/`; // 이벤트 상세 페이지로 이동
			} 
		};

	//-----------------------------------------------------------------------
	//                        이벤트 리스트
	//-----------------------------------------------------------------------

	// 초기 이벤트 데이터를 별도의 상태로 저장
	const [initialEventData, setInitialEventData] = useState([]);

	const [eventData, setEventData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(false);

	const [eventNumber, setEventNumber] = useState();

	const url = `/api/events`;

	const fetchEventData = () => {
		setLoading(true);
		axios
			.get(url)
			.then((response) => {
				setLoading(false);

        // 이미지 대체 처리를 적용한 데이터로 업데이트합니다.
        const eventDataWithImageReplacement = response.data.map(replaceImageIfExpired);

				setEventData(eventDataWithImageReplacement);
				setInitialEventData(eventDataWithImageReplacement); // 초기 데이터 저장
				// 이미지 대체 처리를 적용한 데이터로 업데이트합니다.

			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchEventData();
	}, []);

	//-----------------------------------------------------------------------
	//                        인기 , 최신 순 정렬
	//-----------------------------------------------------------------------

	const [sortType, setSortType] = useState("latest");

	// 인기순 정렬 함수
	const sortByPopular = () => {
		const sortedData = [...initialEventData].sort((a, b) => b.event.cnt - a.event.cnt);
		setEventData(sortedData);
		setSortType("popular");
	};

	// 최신순 정렬 함수
	const sortByLatest = () => {
		const sortedData = [...initialEventData].sort(
			(a, b) => new Date(b.event.createdAt) - new Date(a.event.createdAt),
		);
		setEventData(sortedData);
		setSortType("latest");
	};

	// 정렬 버튼 클릭 시 이벤트
	const handleSort = (type) => {
		if (type === "popular") {
			sortByPopular();
		} else if (type === "latest") {
			sortByLatest();
		}
	};

	//-----------------------------------------------------------------------
	//                        페이지 네이션
	//-----------------------------------------------------------------------

	// 페이지당 아이템 개수
	const itemsPerPage = 6;

	// 현재 페이지에 해당하는 이벤트 데이터
	const currentEventData = eventData.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage,
	);

	return (
		<main id="pageContainer" className="events">
			<PageVisual />

			<div id="pageContents">
				<section className="topSection">
					<div className="sortArea">
						<button
							type="button"
							className={`sortBtn typeNew ${
								sortType === "latest" ? "active" : ""
							}`}
							onClick={() => handleSort("latest")}
						>
							최신순
						</button>
						<button
							type="button"
							className={`sortBtn typeRec ${
								sortType === "popular" ? "active" : ""
							}`}
							onClick={() => handleSort("popular")}
						>
							인기순
						</button>
					</div>
				</section>
				<section className="listSection">
					<div className="listArea">
						{currentEventData.length > 0 && (
							<ul>
								{currentEventData.map((item, index) => (
									<Link
										className="listItem"
										to={`/events/${item.event.no}`}
										key={index}
										onClick={() => handleEventItemClick(item)}
									>
										<li>
											<div className="imgBox">
												<img
													src={item.images.imgPath}
													alt={item.images.imgName}
												/>
											</div>
											<div className="txtBox">
												<span className="cate">{item.event.eventType}</span>
												<h4 className="title">{item.event.title}</h4>
												{/* <p className="info">{item.event.content}</p> */}
												<p className="date">
													<AiTwotoneCalendar />
													{formatDateTime(item.event.event_start)} ~{" "}
													{formatDateTime(item.event.event_end)}
												</p>
											</div>
										</li>
									</Link>
								))}
							</ul>
						)}
					</div>
					<div className="pagination">
						<ul className="pageBox">
							<li className="pageChg">
								<MdArrowBackIos />
							</li>
							{/* 페이지 번호에 대한 페이지네이션을 생성 */}
							{Array.from({
								length: Math.ceil(eventData.length / itemsPerPage),
							}).map((_, index) => (
								<li
									className={`pageNum ${index === currentPage ? "active" : ""}`}
									key={index}
									onClick={() => setCurrentPage(index)}
								>
									{index + 1}
								</li>
							))}
							<li className="pageChg">
								<MdArrowForwardIos />
							</li>
						</ul>
					</div>
				</section>
			</div>
			<SideBar/>
      <AdminHandler edit={`/events/new`}/>
		</main>
	);
};

export default EventsPage;
