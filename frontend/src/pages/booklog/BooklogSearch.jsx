import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { CgSearch } from "react-icons/Cg";

import PageVisual from "../../components/layout/PageVisual";
import SideBar from "../../components/layout/SideBar";

import "../../styles/base/sub.css";
import "../../styles/base/booklogStyle.css";

function BooklogSearch() {
	//-----------------------------------------------------------------------
	//                        날짜 포맷
	//-----------------------------------------------------------------------

	function formatDate(dateArray) {
		const [year, month, day, hour, minute, second] = dateArray;
		const formattedDate = new Date(year, month - 1, day, hour, minute, second);
		return formattedDate.toLocaleString(); // Adjust locale as needed
	}
	//-----------------------------------------------------------------------
	//                            북로그 게시글 리스트
	//-----------------------------------------------------------------------
	const [data, setData] = useState([]);

	const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
	const itemsPerPage = 3; // 페이지당 보여줄 아이템 수

	const url = "/api/booklogarticles";

	const fetchData = () => {
		axios
			.get(url)
			.then((response) => {
				setData(response.data);
			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
			});
	};

	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
	};

	const offset = currentPage * itemsPerPage;
	const pageCount = Math.ceil(data.length / itemsPerPage);

	//-----------------------------------------------------------------------
	//                            북로그 리스트
	//-----------------------------------------------------------------------

	const [booklogData, booklogSetData] = useState([]);

	const [booklogCurrentPage, booklogSetCurrentPage] = useState(0); // 현재 페이지 번호
	const booklogItemsPerPage = 2; // 페이지당 보여줄 아이템 수

	const booklogUrl = "/api/booklogs";

	const booklogFetchData = () => {
		axios
			.get(booklogUrl)
			.then((response) => {
				booklogSetData(response.data);
			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
			});
	};

	useEffect(() => {
		fetchData(); // 북로그 게시글 리스트
		booklogFetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
	}, []);

	useEffect(() => {
		booklogFetchData();
	}, []);

	const booklogHandlePageChange = ({ selected }) => {
		booklogSetCurrentPage(selected);
	};

	const booklogOffset = booklogCurrentPage * booklogItemsPerPage;
	const booklogPageCount = Math.ceil(booklogData.length / booklogItemsPerPage);

	//-----------------------------------------------------------------------
	//                            북로그 , 게시글 찾기
	//-----------------------------------------------------------------------

	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOption, setSelectedOption] = useState("전체");

	const handleOptionChange = (newOption) => {
		setSelectedOption(newOption);
	};

	const handleSearch = async () => {
		setData([]);
		booklogSetData([]);

		try {
			const articleResponse = await axios.get(
				`/api/booklogarticles/search?keyword=${searchQuery}`,
			);
			let filteredArticleData = articleResponse.data;

			if (selectedOption !== "전체") {
				filteredArticleData =
					selectedOption === "글"
						? articleResponse.data.filter(
								(item) =>
									item.title.includes(searchQuery) ||
									item.content.includes(searchQuery),
						  )
						: [];
			}

			setData(filteredArticleData);

			const booklogResponse = await axios.get(
				`/api/booklogs/search?keyword=${searchQuery}`,
			);
			let filteredBooklogData = booklogResponse.data;

			if (selectedOption !== "전체") {
				filteredBooklogData =
					selectedOption === "북로그"
						? booklogResponse.data.filter(
								(item) =>
									item.user_no?.nickname.includes(searchQuery) ||
									item.user_no?.userId.includes(searchQuery) ||
									item.user?.nickname.includes(searchQuery) ||
									item.user?.userId.includes(searchQuery),
						  )
						: [];
			}

			booklogSetData(filteredBooklogData);
		} catch (error) {
			console.error("검색 결과 가져오기 오류:", error);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<main id="pageContainer" className="booklog search">
			<PageVisual />

			<div id="pageContents">
				<section className="topSection">
					<div className="searchArea">
						<select
							className="selectBox"
							value={selectedOption}
							onChange={(e) => handleOptionChange(e.target.value)}
						>
							<option value="전체">전체</option>
							<option value="글">글</option>
							<option value="북로그">북로그</option>
						</select>
						<input
							type="text"
							name="search"
							id="search"
							className="searchBar"
							placeholder="찾고 싶은 내용을 검색해 주세요."
							value={searchQuery}
							autoComplete="off"
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<button
							type="button"
							className="searchBtn typeIcon"
							onClick={() => handleSearch()}
						>
							<CgSearch />
						</button>
					</div>
				</section>

				<section className="mainSection typeArticle">
					{selectedOption == "글" || (selectedOption == "전체" && data) ? (
						<div className="articleInner">
							<div className="sectinTitle">
								<h3 className="title">글</h3>
								{data.length > 0 ? (
									<ReactPaginate
										previousLabel={"<"}
										nextLabel={">"}
										pageCount={pageCount}
										onPageChange={handlePageChange}
										containerClassName={"pagination"}
										activeClassName={"active"}
									/>
								) : (
									<div className="nothingSearchResult">
										검색된 결과가 없습니다!
									</div>
								)}
							</div>

							<ul className="listArea">
								{data.slice(offset, offset + itemsPerPage).map((item) => (
									<li key={item.no} className="listItem">
										<Link
											to={`/booklog/${
												item.booklog_no &&
												item.booklog_no.user &&
												item.booklog_no.user.no
											}/${item.no}`}
										>
											<div className="txtBox">
												<h4 className="cate">{item.groups}</h4>
												<h3 className="title">{item.title}</h3>
												<pre
													className="content"
													dangerouslySetInnerHTML={{ __html: item.content }}
												></pre>
												<p className="info">
													<span className="likeCnt">공감 {item.likes}</span>
													<span className="commCnt">조회수 {item.cnt} </span>
													<span className="updatedAt">{item.updatedAt}</span>
												</p>
											</div>
											<div className="imgBox">
												<img src={item?.books_no?.bookImgUrl || item?.books?.bookImgUrl } alt="" />
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</section>

				<section className="mainSection typeBooklog">
					{selectedOption == "북로그" ||
					(selectedOption == "전체" && booklogData) ? (
						<div className="booklogInner">
							<div className="sectinTitle">
								<h3 className="title">북로그</h3>
								{booklogData && booklogData.length > 0 ? (
									<ReactPaginate
										previousLabel={"<"}
										nextLabel={">"}
										pageCount={booklogPageCount}
										onPageChange={booklogHandlePageChange}
										containerClassName={"pagination"}
										activeClassName={"active"}
									/>
								) : (
									<div className="nothingSearchResult">
										검색된 결과가 없습니다!
									</div>
								)}
							</div>

							<ul className="listArea">
								{booklogData
									? booklogData
											.slice(booklogOffset, booklogOffset + booklogItemsPerPage)
											.map((item) => (
												<li key={item.no} className="listItem">
													<div className="userBox">
														{/* {item.user_no && ( */}
														<>
															<strong className="nickname">
																{item.user_no?.nickname}
																{item.user?.nickname}
															</strong>
															<span className="userId">
																{item.user_no?.userId}
																{item.user?.userId}
															</span>
															<Link to={`/booklog/${item.user_no?.userId || item.user?.userId}`}>
																	방문하기
															</Link>
														</>
														{/* )} */}
													</div>
													<div className="introBox">
														{/* {item.user_no && ( */}
														<>
															<h3 className="title">
																{item?.booklog_name}
																{item?.booklogName}
															</h3>
															<p className="since">
																<b>since</b>
																{item.user_no?.createdAt}
																{item.user?.createdAt}
															</p>
														</>
														{/* )} */}
													</div>
												</li>
											))
									: null}
							</ul>
						</div>
					) : null}
				</section>
			</div>
			<SideBar />
		</main>
	);
}

export default BooklogSearch;
