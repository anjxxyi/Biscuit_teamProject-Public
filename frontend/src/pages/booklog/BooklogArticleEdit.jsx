import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Context } from "../../components/store/Context"

import "../../styles/base/sub.css"
import "../../styles/base/booklogArticleEditStyle.css"


const BooklogArticleEdit = () => {
	const props = useContext(Context);
	const userInfo = props.userInfo

	//-----------------------------------------------------------------------
	//              user_no 으로 게시글 가져와서 booklog_no 지정
	//-----------------------------------------------------------------------	

	const [userNumber, setUserNumber] = useState([]);
	const fetchUserNumber = () => {
		if (!userInfo) return;
		axios
			.get(`/api/booklogs/${userInfo?.userId}`)
			.then((response) => {
				setUserNumber(response.data.no);
			})
			.catch((error) => {
				console.error("booklog_no 가져오다 오류났다:", error);
			});
	}
	useEffect(() => fetchUserNumber(), [userInfo])

	const [bookData, setBookData] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedBook, setSelectedBook] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [groups, setGroups] = useState("");
	const [kinds, setKinds] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	useEffect(() => {
		// 북로그 게시글에 올릴 책들 가져오기
		axios
			.get("/api/booklogarticles/books")
			.then((res) => {
				setBookData(res.data);
			})
			.catch((error) => {
				console.error("책 목록 불러오기 오류:", error);
			});
	}, []);

	const handleToggle = () => setIsSearchOpen(!isSearchOpen);
	const handleSearch = () => {
		// 도서 검색 API 호출
		axios
			.get(`/api/booklogarticles/books/search?title=${searchQuery}`)
			.then((res) => {
				setSearchResults(res.data);
			})
			.catch((error) => {
				console.error("도서 검색 오류:", error);
			});

	};

	const handleBookSelect = (book) => {
		setSelectedBook(book);
		setIsSearchOpen(false); // 선택한 후 검색 결과 닫기
	};

	// 등록시 post 
	const handleArticleSubmit = () => {
		if (!selectedBook || !title || !content || !groups || !kinds) {
			alert("모든 필드를 입력해주세요.");
			return;
		}

		// 게시글 등록 API 호출
		const requestData = {
			title,
			content,
			groups,
			kinds,
			booklog_no: userNumber,
			books_no: selectedBook.no,
		};

		axios
			.post(`/api/booklogarticles/new/${userInfo.no}`, requestData,)
			.then((res) => {
				alert("게시글이 등록되었습니다!")
				window.location.href = "/biscuit-project/booklog/now"

			})
			.catch(error => console.error(error));
	};	

	const navigate = useNavigate(); 
	const handleCancel = () => {
    if(confirm("작성을 취소하시겠습니까?") === true) {
      return navigate(-1);
    } else {
      return null;
    };
  };

	return (
		<main id="pageContainer" className="booklog typeEdit">
			<div id="pageVisual">
				<h2 className="title">Create Post</h2>
				<p className="info">독서를 하고 떠오르는 생각과 느낌을 가벼운 기록으로 남겨 보세요.</p>
			</div>

			<div id="pageContents" className="articleEdit">
				<section className="topSection">
					<label className="groups">
						<strong>카테고리명</strong>
						<input type="text" value={groups} onChange={(e) => setGroups(e.target.value)} />
					</label>
					<label className="kinds">
						<strong>대표 해시태그</strong>
						<input type="text" value={kinds} onChange={(e) => setKinds(e.target.value)} placeholder="‘#’는 제외하고 1개" />
					</label>
				</section>
				<section className="bookSection">
					<div className="search">
						<div className="inputBox">
							<label className="bookFind">
								<strong>리뷰 도서</strong>
							</label>
							<button onClick={handleToggle}>
								{isSearchOpen ? "검색 닫기" : "도서 검색"}
							</button>
						</div>
						{isSearchOpen && (
						<div className="toggleBox">
								<>
								<label className="inputBar">
									<input
										type="text"
										placeholder="도서 제목 입력"
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
									<button onClick={handleSearch}>찾기</button>
								</label>

								<ul>
									{searchResults.map((book) => (
										<li className="searchValue" key={book.no} onClick={() => handleBookSelect(book)}>
											<div className="bookTitle"><strong>{book.title}</strong></div>
											<div className="bookAuthor">
												{book.author.replaceAll("^", ", ")} ｜ {book.publisher}
											</div>
										</li>
									))}
								</ul>
								</>
							</div>
							)}
					</div>
					{selectedBook && (
						<div className="selectBook">
							<h3>선택한 도서 정보</h3>
							<div className="bookInfo">
								<div className="imgBox">
									<img src={selectedBook.bookImgUrl} />
								</div>
								<div className="txtBox">
									<div className="title">
										<strong>{selectedBook.title}</strong>
									</div>
									<div className="author">{selectedBook.author.replaceAll("^", ", ")} ｜ {selectedBook.publisher}</div>
								</div>
							</div>
						</div>
					)}
				</section>
				<section className="formSection">
					<label className="title">
						<strong>제목</strong>
						<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해 주세요. (50자 이내)" />
					</label>
					<label className="content">
						<strong>내용</strong>
						<textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해 주세요." />
					</label>
				</section>
				<section className="btnSection">
					<button className="submit" onClick={handleArticleSubmit}>작성</button>
					<button className="cancel" type="button" onClick={handleCancel} >취소</button>
				</section>
			</div>
		</main>
	);
};

export default BooklogArticleEdit;
