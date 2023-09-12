import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import * as XLSX from "xlsx"
import { AiTwotoneCalendar } from "react-icons/Ai"
import { SiMicrosoftexcel } from "react-icons/Si"
import { Context } from "../../components/store/Context"

import AdminHandler from "../../components/layout/AdminHandler"
import SideBar from "../../components/layout/SideBar"

import "../../styles/base/sub.css"
import "../../styles/base/eventsStyle.css"

const EventsViewPage = () => {
	//-----------------------------------------------------------------------
	//                        로그인 된 정보 가져오기
	//-----------------------------------------------------------------------

	const navigate = useNavigate();

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
	//                        이벤트 게시글 정보
	//-----------------------------------------------------------------------

	const [eventDetailData, setEventDetailData] = useState([]);
	const [participationData, setParticipationData] = useState([]);
	const [showParticipation, setShowParticipation] = useState(false);
	const [loading, setLoading] = useState(true);

	const { no } = useParams();
	const eventDetailUrl = `/api/events/${no}`;
	const participationUrl = `/api/participations/events/${no}`;

	const fetchEventDetailData = () => {
		axios
			.get(eventDetailUrl)
			.then((response) => {
				setEventDetailData(response.data);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};

	const fetchParticipationData = () => {
		axios
			.get(participationUrl)
			.then((response) => {
				setParticipationData(response.data);
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		fetchEventDetailData();
		fetchParticipationData();
	}, [no]);

	const handleParticipationListButtonClick = () => {
		if (participationData.length == 0) {
			alert("참여자가 아직 없습니다. \n첫번째 참여자가 되어보는 건 어때요?");
		} else setShowParticipation(!showParticipation);
		return;
	};

	//-----------------------------------------------------------------------
	//                        이벤트 참가하기
	//-----------------------------------------------------------------------

	const handleParticipationButtonClick = () => {
		if (userInfo?.no == null) {
			alert("로그인 후 이용해 주세요.")
		} else {
			axios
				.post(`/api/events/${no}/participate/${userInfo?.no}`)
				.then(() => {
					alert("이벤트에 참여되었습니다.");
					fetchParticipationData();
				})
				.catch(err => console.log(err));
		}
	};

	//-----------------------------------------------------------------------
	//                        이벤트 참가취소 하기
	//-----------------------------------------------------------------------

	const isParticipated = participationData.some(
		(item) => item.user_no.no === userInfo?.no,
	);

	const handleCancelParticipationButtonClick = () => {
		axios
			.delete(`/api/events/${no}/participate/${userInfo?.no}`)
			.then(() => {
				alert("이벤트 참여가 취소되었습니다.");
				fetchParticipationData();
			})
			.catch(err => console.log(err));
	};

	//-----------------------------------------------------------------------
	//                        참가자 리스트 엑셀 다운로드
	//-----------------------------------------------------------------------

	const downloadExcel = () => {
		const eventTitle = eventDetailData.length > 0 ? eventDetailData[0].event.title : "participants";
		const worksheet = XLSX.utils.json_to_sheet(participationData.map(item => {
			return {
				닉네임: item.user_no.nickname,
				ID: item.user_no.userId.slice(0, 3) + "***",
				신청일: formatDateTime(item.created_at), // 신청한 날짜를 적절한 함수로 포맷
			};
		}));

		// 엑셀 파일 생성
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");

		// 파일 다운로드
		XLSX.writeFile(workbook, `${eventTitle}_list.xlsx`);
	};

	//-----------------------------------------------------------------------
	//                        이벤트 수정하기
	//-----------------------------------------------------------------------

	const handleEditButtonClick = () => {
		// 수정하기 버튼 클릭 시 EventEdit 페이지로 이동
		navigate(`/events/${no}/update`);
	};

	return (
		<main id="pageContainer" className="events typeView">
			{eventDetailData.length > 0 && (
				<>
					{eventDetailData.map((item) => (
						item.images.thumbnailYn == "N" && (
							<div
								id="pageContents"
								className="eventDetail"
								key={item.event.no}
							>
								<section className="titleSection">
									<h3 className="title">{item.event.title}</h3>
									<div className="info">
										<div className="date">
											<AiTwotoneCalendar />
											<span>
												{formatDateTime(item.event.event_start)} ~{" "}
												{formatDateTime(item.event.event_end)}
											</span>
										</div>
										<div className="cnt"></div>
									</div>
								</section>
								<section className="mainSection">
									<img src={item.images.imgPath} alt={item.images.imgName} />
									<div>{item.event.content}</div>
								</section>
								<section className="btnSection">
									{userInfo && (
										<>
											{isParticipated ? (
												<button
													className="cancel"
													onClick={handleCancelParticipationButtonClick}
												>
													참가취소
												</button>
											) : (
												<button
													className="submit"
													onClick={handleParticipationButtonClick}
												>
													참여하기
												</button>
											)}
										</>
									)}
								</section>
								<section className="listSection">
									{userInfo && (userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ?
										<button className="listBtn" onClick={handleParticipationListButtonClick}>참여자 리스트</button>
									: 
										<>
											{participationData.length != 0 && (
												<button className="listBtn" onClick={downloadExcel}><SiMicrosoftexcel /> 참여자 리스트</button>
											)}
										</>
									}
									{showParticipation && (
										<ul className="pList">
											{participationData
												? participationData.map((item) => (
														<li className="pListSection" key={item.no}>
															<b className="nickname">
																{item.user_no.nickname}{" "}
															</b>
															{item.user_no.userId.slice(0, 3)}***
														</li>
													))
												: null}
										</ul>
									)}
								</section>
							</div>
						)
					))}
				</>
			)}
			<SideBar />
      <AdminHandler edit={`/events/new`}/>
		</main>
	);
};

export default EventsViewPage;
