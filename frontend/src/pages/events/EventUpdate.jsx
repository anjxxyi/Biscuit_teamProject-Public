import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Context } from "../../components/store/Context"

import "../../styles/base/sub.css"
import "../../styles/base/eventsStyle.css"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function EventUpdate() {
	function formatDateTime(dateArray) {
		const [year, month, day] = dateArray;

		// 원하는 형식으로 날짜 및 시간 정보 포맷팅
		const formattedDate = `${year}.${month}.${day}`;

		return `${formattedDate}`;
	}

	const { no } = useParams();

	const navigate = useNavigate();

  // userInfo
	const props = useContext(Context);
  const userInfo = props.userInfo;
  useEffect(() => {
    if (userInfo?.authority !== "A") {
      alert("관리자만 접근가능합니다.");
      navigate(-1);
    }
  },[]);

	//-----------------------------------------------------------------------
	//                        이벤트 수정
	//-----------------------------------------------------------------------

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [eventType, setEventType] = useState("이벤트");
	const [eventStart, setEventStart] = useState(null); // 수정: 날짜 상태 추가
	const [eventEnd, setEventEnd] = useState(null); // 수정: 날짜 상태 추가

	//-----------------------------------------------------------------------
	//                        이미지 업로드
	//-----------------------------------------------------------------------

	const imageNoArray = [];

	const [thumbnailImageNo, setThumbnailImageNo] = useState("");
	const [contentImageNo, setContentImageNo] = useState("");

	const [thumbnailFile, setThumbnailFile] = useState(null);
	const [contentFile, setContentFile] = useState(null);
	const [thumbnailPreview, setThumbnailPreview] = useState(null);
	const [contentPreview, setContentPreview] = useState(null);

	useEffect(() => {
		// 이벤트 정보 가져오기
		const fetchEventInfo = async () => {
			try {
				const response = await axios.get(`/api/events/${no}`);
				const eventData = response.data;
				console.log("머가 나오나? ", response.data);
				setTitle(eventData[0].event.title);
				setContent(eventData[0].event.content);
				setEventType(eventData[0].event.eventType);
				
				setThumbnailImageNo(eventData[0].images.no);
				setContentImageNo(eventData[1].images.no);
				// // JSON 데이터 순회하면서 이미지의 no 값을 추출하여 배열에 저장
				// eventData.forEach((eventDataItem) => {
				// 	const imageInfo = eventDataItem.images;
				// 	if (imageInfo && imageInfo.no) {
				// 		imageNoArray.push(imageInfo.no);
				// 	}
				// });

				// 이미지 데이터 객체에서 imgPath 사용
				setThumbnailPreview(eventData[0].images.imgPath);
				setContentPreview(eventData[1].images.imgPath);

				setEventStart(formatDateTime(eventData.event.event_start)); // 날짜 문자열을 Date 객체로 변환
				setEventEnd(formatDateTime(eventData.event.event_end)); // 날짜 문자열을 Date 객체로 변환
        
			} catch (error) {
				console.error("Error fetching event info:", error);
			}
		};

		fetchEventInfo();
	}, [no]);

	useEffect(() => {
		// console.log("이벤트 데이터", eventData); // 이미지의 no 값들이 저장된 배열 출력
		console.log("!!!!!!!!!!", thumbnailImageNo , contentImageNo);
	}, [contentImageNo , thumbnailImageNo]);

	const handleThumbnailFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setThumbnailFile(selectedFile);
		setThumbnailPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
	};

	const handleContentFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setContentFile(selectedFile);
		setContentPreview(URL.createObjectURL(selectedFile)); // Create a preview URL
	};

	// 이벤트 정보 저장 및 이미지 업로드
	const handleUpdateEvent = async () => {
		try {
			// 이미지 정보 업데이트 요청
			await axios.put(`/api/events/${no}`, {
				title: title,
				content: content,
				cnt: 0,
				likes: 0,
				del_yn: "N",
				images_no: null, // 이미지 정보에 event_no 업데이트
				event_type: eventType,
				event_start: eventStart,
				event_end: eventEnd,
				thumbnailImageNo : thumbnailImageNo,
				contentImageNo : contentImageNo
			});

			// 썸네일 이미지 업로드 요청
			if (thumbnailFile && thumbnailImageNo) {
				const thumbnailFormData = new FormData();
				thumbnailFormData.append("file", thumbnailFile);
				await axios.put(
					`/api/event/thumbnailimage/update/${thumbnailImageNo}`,
					thumbnailFormData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);
			}

			// 내용 이미지 업로드 요청
			if (contentFile && contentImageNo) {
				const contentFormData = new FormData();
				contentFormData.append("file", contentFile);
				await axios.post(
					`/api/event/contentimage/update/${contentImageNo}`,
					contentFormData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);
			}

			alert("이벤트가 수정 되었습니다!");
			navigate("/events");
		} catch (error) {
			console.error("Error creating event or uploading images:", error);
			alert("실패");
		}
	};

	return (
		<main id="pageContainer" className="events edit">
			{/* #pageContents --- START */}
			<div id="pageContents" className="eventEdit">
				<section className="formSection">
					<label>제목</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="title"
					/>

					<label>내용</label>
					<textarea
						type="text"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="content"
					/>

					<section className="eventSection">
						<li>이벤트 타입</li>
						<select
							value={eventType}
							onChange={(e) => setEventType(e.target.value)}
							className="eventType"
						>
							<option value="이벤트">이벤트</option>
							<option value="프로모션">프로모션</option>
							<option value="기획전">기획전</option>
						</select>

						{/* 여기에 event_start 달력 표시 */}
						<li>이벤트 시작일</li>
						<DatePicker
							selected={eventStart}
							onChange={(date) => setEventStart(date)}
							showSelect
							dateFormat="yyyy-MM-dd"
							className="eventData"
							placeholderText="YYYY-MM-DD"
						/>
						<li>이벤트 종료일</li>
						<DatePicker
							selected={eventEnd}
							onChange={(date) => setEventEnd(date)}
							showSelect
							dateFormat="yyyy-MM-dd"
							className="eventData"
							placeholderText="YYYY-MM-DD"
						/>
					</section>
					{/* 썸네일 이미지 업로드 */}
					<label>
						썸네일 이미지 <span> &#40;600*600&#41;</span>
					</label>

					

					<input
						type="file"
						accept="image/*"
						onChange={handleThumbnailFileChange}
						className="thumbnailImage"
					/>
					{thumbnailPreview && (
						<img
							className="previewImage"
							src={thumbnailPreview}
							alt="Thumbnail Preview"
						/>
					)}

					{/* 내용 이미지 업로드 */}
					<label>
						내용 이미지 <span> &#40;5MB 이하&#41;</span>
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleContentFileChange}
						className="contentImage"
					/>
					{contentPreview && (
						<img
							className="previewImage"
							src={contentPreview}
							alt="Content Preview"
						/>
					)}
					<button onClick={handleUpdateEvent}>수정하기</button>
				</section>
			</div>
			{/* #pageContents --- END */}
		</main>
	);
}

export default EventUpdate;
