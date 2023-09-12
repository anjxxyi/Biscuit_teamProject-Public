import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'

import { Context } from '../../components/store/Context'
import PageVisual from '../../components/layout/PageVisual'
import SideBar from '../../components/layout/SideBar'

import '../../styles/base/sub.css'
import '../../styles/base/eventsStyle.css'
import 'react-datepicker/dist/react-datepicker.css'

function EventEdit() {
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
  //                        이벤트 글쓰기
  //-----------------------------------------------------------------------

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [eventType, setEventType] = useState('이벤트');
  const [eventStart, setEventStart] = useState(null); // 수정: 날짜 상태 추가
  const [eventEnd, setEventEnd] = useState(null);     // 수정: 날짜 상태 추가

  //-----------------------------------------------------------------------
  //                        이미지 업로드
  //-----------------------------------------------------------------------

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [contentFile, setContentFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [contentPreview, setContentPreview] = useState(null);

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
  const handleCreateEvent = async () => {
    try {
      // 이벤트 생성 요청
      const response = await axios.post('/api/events', {
        title: title,
        content: content,
        cnt: 0,
        likes: 0,
        del_yn: 'N',
        images_no: null,
        event_type: eventType,
        event_start: eventStart,
        event_end: null,
      });

      // 생성된 이벤트의 정보에서 event_no 가져오기
      const eventNo = response.data.no;

      // 이미지 정보 업데이트 요청
      await axios.put(`/api/events/${eventNo}`, {
        title: title,
        content: content,
        cnt: 0,
        likes: 0,
        del_yn: 'N',
        images_no: null, // 이미지 정보에 event_no 업데이트
        event_type: eventType,
        event_start: eventStart,
        event_end: eventEnd,
      });

      // 썸네일 이미지 업로드 요청
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('file', thumbnailFile);
      await axios.post(`/api/upload/thumbnail?eventNo=${eventNo}`, thumbnailFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // 내용 이미지 업로드 요청
      const contentFormData = new FormData();
      contentFormData.append('file', contentFile);
      await axios.post(`/api/upload?eventNo=${eventNo}`, contentFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('이벤트가 업로드 되었습니다!');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event or uploading images:', error);
      alert('실패');
    }
  };

  // handleCancel
  const handleCancel = () => {
    if(confirm("이벤트 등록을 취소하시겠습니까?") === true) {
      return navigate(`/events`);
    } else {
      return null;
    };
  };

  return (
    <main id="pageContainer" className="events edit">
      <PageVisual />

      <div id="pageContents" className='eventEdit'>
        <section className='dateSection'>
          <div className='sectionInner'>
            <label>카테고리</label>
            <select
              value={eventType}
              onChange={(e) =>
                setEventType(e.target.value)}
              className='eventType'
            >
              <option value="이벤트">이벤트</option>
              <option value="프로모션">프로모션</option>
              <option value="기획전">기획전</option>
            </select>
          </div>
          <div className='sectionInner'>
            <label>기간</label>
            <DatePicker
              selected={eventStart}
              onChange={(date) => setEventStart(date)}
              showSelect
              dateFormat="yyyy-MM-dd"
              className="eventData"
              placeholderText='YYYY-MM-DD'
            />
            <span> ~ </span>
            <DatePicker
              selected={eventEnd}
              onChange={(date) => setEventEnd(date)}
              showSelect
              dateFormat="yyyy-MM-dd"
              className="eventData"
              placeholderText='YYYY-MM-DD'
            />
          </div>
        </section>
        <section className='formSection'>
          <div className='sectionInner'>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='title'
              placeholder='새로운 이벤트 제목을 입력하세요.'
            />
          </div>
          <div className='sectionInner'>
            <label>내용</label>
            <textarea
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='content'
              placeholder='새로운 이벤트 내용을 입력하세요.'
            />
          </div>
        </section>
        <section className='imgSection'>
          <div className='sectionInner'>
            <label>썸네일 이미지 <small>&#40;600*600&#41;</small></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailFileChange}
              className='thumbnailImage'
            />
            {
              thumbnailPreview &&
              <img className='previewImage' src={thumbnailPreview} alt="Thumbnail Preview" />
            }
          </div>
          <div className='sectionInner'>
            <label>내용 이미지 <small>&#40;5MB 이하&#41;</small></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleContentFileChange}
              className='contentImage'
            />
            {
              contentPreview &&
              <img className='previewImage' src={contentPreview} alt="Content Preview" />
            }
          </div>
        </section>
        <section className="btnSection">
          <button className="submit" onClick={handleCreateEvent}>등록하기</button>
          <button className="cancel" type="button" onClick={handleCancel}>취소</button>
        </section>
      </div>

      <SideBar />
    </main>
  );
}

export default EventEdit;
