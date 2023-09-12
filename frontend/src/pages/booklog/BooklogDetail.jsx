import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LiaHeartSolid, LiaHeart, LiaCommentDotsSolid } from "react-icons/Lia";
import { MdArrowBackIos } from "react-icons/Md";
import { AiFillEye } from "react-icons/Ai"

import Loading from "../../components/style/Loading";
import SideBar from "../../components/layout/SideBar";
import { Context } from "../../components/store/Context";

import { GiArchiveResearch } from "react-icons/Gi";

import "../../styles/base/sub.css";

// 날짜 시간 포맷
function formatDate(dateArray) {
	const [year, month, day, hour, minute, second] = dateArray;
	const formattedDate = new Date(year, month - 1, day, hour, minute, second);
	return formattedDate.toLocaleDateString(); // Adjust locale as needed
}

function BooklogDetail() {
	//-----------------------------------------------------------------------
	//                        로그인 된 정보 가져오기
	//-----------------------------------------------------------------------

	// 비로그인 시 userInfo.no 를 null 로 만듬
	const initialUserInfo = { no: null };

	// Context 로 로그인된 정보를 가져오는거
	const props = useContext(Context);
	const userInfo = props.userInfo || initialUserInfo;

	//-----------------------------------------------------------------------
	//                        북로그 게시글 상세보기
	//-----------------------------------------------------------------------

	const { no } = useParams(); // URL에서 식별자 값 가져오기

	const { user } = useParams(); // :userid 식별자 값 가져오기

	const [detailData, setDetailData] = useState("");

	const detailUrl = `/api/booklogarticles/${no}`;

	const fetchDetailData = () => {
		axios
			.get(detailUrl)
			.then((response) => {
				setDetailData(response.data);
			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
			});
	};

	useEffect(() => {
		fetchDetailData();
	}, [no]);

	//-----------------------------------------------------------------------
	//                        북로그 게시글 댓글들
	//-----------------------------------------------------------------------

	const [showComments, setShowComments] = useState(false); // 댓글 표시

	const [commentData, setCommentData] = useState([]);

	const [recommentData, setRecommentData] = useState({});

	const commentUrl = `/api/comments/booklogarticles/${no}`;

	const fetchCommentData = () => {
		axios
			.get(commentUrl)
			.then((response) => {
				setCommentData(response.data);

				//-----------------------------------------------------------------------
				//                          대댓글
				//-----------------------------------------------------------------------

			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
			});
	};

	useEffect(() => {
		fetchCommentData();
	}, [no]);

	// 댓글 버튼 클릭 이벤트 처리 함수
	const handleCommentButtonClick = () => {
		setShowComments(!showComments);

		// 댓글을 표시할 때 대댓글 데이터도 함께 가져오도록 수정
		if (!showComments) {
			commentData.forEach((item) => {
				if (userInfo.no !== null) {
					// 비로그인 상태일 때 대댓글 데이터 가져오지 않음
					fetchRecommentData(item.no);
				}
			});
		}
	};

	//-----------------------------------------------------------------------
	//                         대댓글
	//-----------------------------------------------------------------------

	// 대댓글 데이터 가져오기
	const fetchRecommentData = (commentNo) => {
		const recommentUrl = `/api/comments/${commentNo}/recomments`;

		axios
			.get(recommentUrl)
			.then((recommentResponse) => {
				setRecommentData((prevRecommentData) => ({
					...prevRecommentData,
					[commentNo]: recommentResponse.data, // 해당 댓글의 대댓글 데이터 저장
				}));
			})
			.catch((err) => {
				console.log(err + " 서버요청 에러 ");
			});
	};

	useEffect(() => {
		if (showComments && commentData) {
			commentData.forEach((item) => {
				if (item && item.no) {
					fetchRecommentData(item.no);
				}
			});
		}
	}, [showComments, commentData]);

	//-----------------------------------------------------------------------
	//                         게시글 좋아요
	//-----------------------------------------------------------------------

	const likesUrl = `/api/gonggam/add?userId=${userInfo?.no}&articleId=${no}`;
	const unlikesUrl = `/api/gonggam/remove?userId=${userInfo?.no}&articleId=${no}`;
	const checkUrl = `/api/gonggam/check?userId=${userInfo?.no}&articleId=${no}`;

	const [isLiked, setIsLiked] = useState(false); // 추가: 좋아요 상태 관리

	// 좋아요 버튼 클릭 이벤트 처리 함수
	const handleLikeClick = () => {
		if (userInfo?.no !== null) {
			if (!isLiked) {
				axios
					.post(likesUrl)
					.then((response) => {
						fetchDetailData();
						// setLikesData(response.data);
						setIsLiked(true);
						// 좋아요 상태를 localStorage에 저장
						localStorage.setItem(`isLiked_${no}`, true);
					})
					.catch((err) => {
						console.error(err);
					});
			} else {
				axios
					.post(unlikesUrl)
					.then((response) => {
						fetchDetailData();
						// setLikesData(response.data);
						setIsLiked(false);
						// 좋아요 상태를 localStorage에 저장
						localStorage.setItem(`isLiked_${no}`, false);
					})
					.catch((err) => {
						console.error(err);
					});
			}
		} else {
			alert("로그인후 이용 부탁드립니다!");
		}
	};

	// 컴포넌트가 마운트될 때 localStorage에서 좋아요 상태를 불러옴
	useEffect(() => {
		const savedIsLiked = localStorage.getItem(`isLiked_${no}`);
		if (savedIsLiked === "true") {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, []);

	// 좋아요 상태가 변경될 때마다 localStorage에 저장
	useEffect(() => {
		localStorage.setItem(`isLiked_${no}`, isLiked);
	}, [isLiked]);

	//-----------------------------------------------------------------------
	//                         댓글 추가
	//-----------------------------------------------------------------------

	const [newComment, setNewComment] = useState(""); // 새 댓글 상태 추가

	// 댓글 입력창 값 변경 이벤트 처리 함수
	const handleCommentInputChange = (event) => {
		setNewComment(event.target.value);
	};

	// 댓글 등록 버튼 클릭 이벤트 처리 함수
	const handleAddCommentClick = () => {
		if (!userInfo.no) {
			// 비로그인 상태일때 처리
			alert("댓글을 등록하려면 로그인이 필요합니다.");
			return;
		}

		if (newComment.trim() === "") {
			return; // 댓글 내용이 없으면 등록하지 않음
		}

		const commentData = {
			user_no: userInfo?.no,
			content: newComment,
			booklog_article_no: detailData.no,
		};

		axios
			.post("/api/comments", commentData)
			.then((response) => {
				// 댓글 등록 후 댓글 목록을 다시 가져옴
				fetchCommentData();
				// 댓글 입력창 내용 초기화
				setNewComment("");
			})
			.catch((err) => {
				console.error(err);
			});
	};

	//-----------------------------------------------------------------------
	//                         대댓글 추가
	//-----------------------------------------------------------------------

	const [newRecomment, setNewRecomment] = useState(""); // 새 대댓글 상태 추가

	const [showRecommentForm, setShowRecommentForm] = useState({});

	const handleAddRecommentClick = (parentCommentNo) => {
		if (newRecomment.trim() === "") {
			return; // 대댓글 내용이 없으면 등록하지 않음
		}

		const recommentData = {
			user_no: userInfo?.no,
			content: newRecomment,
			upcomment_no: parentCommentNo, // 부모 댓글 번호 추가
			booklog_article_no: detailData.no,
		};

		axios
			.post("/api/comments", recommentData)
			.then((response) => {
				// 대댓글 등록 후 대댓글 목록을 다시 가져옴
				fetchCommentData(parentCommentNo);
				/// 대댓글 입력창을 숨기도록 상태 업데이트
				setShowRecommentForm((prevShowRecommentForm) => ({
					...prevShowRecommentForm,
					[parentCommentNo]: false,
				}));
				// 대댓글 입력창 내용 초기화
				setNewRecomment("");
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// 대댓글 작성 버튼 클릭 이벤트 처리 함수
	const handleRecommentButtonClick = (commentNo) => {
		setShowRecommentForm((prevShowRecommentForm) => ({
			...prevShowRecommentForm,
			[commentNo]: !prevShowRecommentForm[commentNo],
		}));
	};

	// 대댓글 입력창 값 변경 이벤트 처리 함수
	const handleRecommentInputChange = (event) => {
		setNewRecomment(event.target.value);
	};

	//-----------------------------------------------------------------------
	//                         댓글 삭제
	//-----------------------------------------------------------------------

	const [isDeleted, setIsDeleted] = useState(false);

	const handleDelete = (commentNo) => {
		try {
			axios.put(`/api/comments/delete/${commentNo}`)
			.then(() => fetchCommentData());
			// 삭제 요청이 성공하면, commentData를 업데이트하여 해당 댓글을 화면에서 제거합니다.
			alert("삭제되었습니다!");
		} catch (error) {
			console.error("Error deleting comment:", error);
		}
	};

	//-----------------------------------------------------------------------
	//                         댓글 수정
	//-----------------------------------------------------------------------

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editCommentId, setEditCommentId] = useState(null);
	const [editComment, setEditComment] = useState("");

	// 댓글 수정 클릭 이벤트를 처리하는 함수
	const handleEditClick = (commentId, commentContent) => {
		setEditCommentId(commentId); // 수정 중인 댓글의 ID 설정
		setEditComment(commentContent); // 수정 중인 댓글 내용을 수정 필드에 설정
		setIsEditModalOpen(true); // 수정 모달 열기
	};

	// 댓글 수정 모달 컴포넌트
	const EditCommentModal = ({ commentContent, onClose }) => {
		const [editComment, setEditComment] = useState(commentContent);

		const handleEditSubmit = () => {
			if (!editComment.trim()) {
				return;
			}

			axios
				.put(`/api/comments/${editCommentId}`, { content: editComment })
				.then((response) => {
					// 수정된 댓글 정보로 화면 업데이트
					const updatedComments = commentData.map((comment) =>
						comment.no === editCommentId
							? { ...comment, content: editComment, isEditing: true }
							: comment,
					);
					setCommentData(updatedComments);
					closeEditModal();

					alert("수정되었습니다!");
				})
				.catch((error) => {
					console.error(error);
				});
		};

		useEffect(() => {
			setEditComment(commentContent);
		}, [commentContent]);

		const closeEditModal = () => {
			setIsEditModalOpen(false);
			setEditComment(""); // 모달 닫을 때 상태 초기화
			setEditCommentId(null);
		};

		useEffect(() => {
			setEditComment(commentContent);
		}, [commentContent]);

		return (
			<div className="modal">
				<div className="modal-content">
					<textarea
						value={editComment}
						onChange={(e) => setEditComment(e.target.value)}
					/>
					<button onClick={handleEditSubmit}>수정</button>
					<button onClick={closeEditModal}>닫기</button>
				</div>
			</div>
		);
	};

	//-----------------------------------------------------------------------
	//                         댓글 + 대댓글 갯수
	//-----------------------------------------------------------------------

	const [replyCount, setReplyCount] = useState();

	const fetchReplyCount = () => {
		axios
			.get(`/api/comments/count/${no}`)
			.then((response) => {
				setReplyCount(response.data);
			})
			.catch((error) => {
				console.error("Error fetching reply count:", error);
			});
	};

	useEffect(() => {
		fetchReplyCount();
	}, []);

	const navigate = useNavigate(); //변수 할당시켜서 사용 가능
	const backBtn = () => {
		navigate(-1);
	}; // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 가능


	// 북로그 삭제 함수
	const deleteBooklogHandler  = () => {
		const chk = confirm("정말 게시글을 삭제하시겠습니까??\n\n▶삭제후에는 복구할 수 없습니다.");
		if(chk) {
			axios.get(`/api/mybooklog/delete/${no}`)
			.then(res => {
				console.log(res.data);
				alert("게시글이 삭제되었습니다.");
				navigate(-1);
			});
		}
	};


	return (
		<main id="pageContainer" className="booklog detail">
			{detailData ? (
				<>
					<div id="pageVisual">
						<button className="backBtn" onClick={backBtn}>
							<MdArrowBackIos />
						</button>
						<span className="cate">
							<span>{detailData.groups}</span>
						</span>
						<h2 className="title">{detailData.title}</h2>
						<p className="info">
							<Link to={`/booklog/${detailData?.booklog_no?.user?.userId}`}>
								<span className="writer">
									<b>by</b> {detailData?.booklog_no?.user?.nickname}
								</span>
							</Link>
							<span className="count"><AiFillEye />{detailData?.cnt}</span>
							<span className="date">{formatDate(detailData?.created_at)}</span>
						</p>
					</div>

					<div id="pageContents">
						<section className="topSection">
							<div className="bookCard">
								<Link
									className="imgBox"
									to={`/books/${detailData?.books_no?.isbn}`}
								>
									<img
										src={detailData?.books_no?.bookImgUrl}
										alt={detailData?.books_no?.title}
									/>
								</Link>
								<div className="txtBox">
									<Link
										className="title"
										to={`/books/${detailData?.books_no?.isbn}`}
									>
										<h4>{detailData?.books_no?.title}</h4>
									</Link>
									<ul className="info">
										<li className="">
											<b>저자</b>
											<span>{detailData?.books_no?.author.replace("^", ", ")}</span>
										</li>
										<li className="">
											<b>출판</b>
											<span>{detailData?.books_no?.publisher}</span>
										</li>
										<li className="">
											<b>발매</b>
											<span>{detailData?.books_no?.publishedDate}</span>
										</li>
									</ul>
								</div>
							</div>
						</section>

						<section className="mainSection">
							<pre
								className="content"
								dangerouslySetInnerHTML={{ __html: detailData?.content }}
							></pre>

							{
                userInfo?.no == detailData?.booklog_no.user.no && (
					<div className="btnCase">
						<Link to={`/booklog/article/update/${no}`} className="updateContent">수정하기</Link>
						<button className="updateContent" onClick={deleteBooklogHandler}>삭제하기</button>
				  	</div>
                )
              }
						</section>

						<section className="btmSection">
							<div className="ctrlArea">
								<button
									className={isLiked ? "likes" : "unlikes"}
									onClick={handleLikeClick}
								>
									<b>{isLiked ? <LiaHeartSolid /> : <LiaHeart />}공감</b>
									{detailData?.likes}
								</button>
								<button className="comment" onClick={handleCommentButtonClick}>
									<b>
										<LiaCommentDotsSolid />
										댓글
									</b>{" "}
									{replyCount}
								</button>
							</div>

							{showComments && (
								<ul className="commentArea">
									{/* 댓글 출력 */}
									{commentData ? (
										commentData.map((comm) => (
											<li className="commItem" key={comm.no}>
												{/* 1) 댓글 영역 ----- START */}
												<div className="commInner">
													<span className="user">
														<strong>{comm.user_no.nickname}</strong> (
														{comm.user_no.userId})
													</span>
													<span className="date">
														{formatDate(comm.updated_at)}
													</span>
													{/* 1-1) 댓글 내용 or 수정 ----- START */}
													{isEditModalOpen && editCommentId === comm.no ? (
														<EditCommentModal
															commentId={comm.no}
															commentContent={comm.content}
															onClose={() => closeEditModal(comm.no)}
														/>
													) : (
														<>
															{/* 1-1-1) 댓글 본문 + 수정/삭제 버튼 ----- START */}
															<p className="content" style={comm.del_yn == "Y" ? {color:"var(--InputTxtColor)"}:{}}>{comm.del_yn != "Y" ? comm.content : "삭제된 댓글입니다."}</p>
															{userInfo?.no == comm.user_no.no ? (
																<>
																	<button
																		className="updateBtn"
																		onClick={() =>
																			handleEditClick(comm.no, comm.content)
																		}
																	>
																		수정
																	</button>
																	<button
																		className="deleteBtn"
																		onClick={() => handleDelete(comm.no)}
																	>
																		삭제
																	</button>
																</>
															) : null}
															{/* 1-1-1) 댓글 본문 + 수정/삭제 버튼 ----- END */}
														</>
													)}
													{/* 1-1) 댓글 내용 or 수정 ----- END */}

													<button
														type="button"
														className="recommBtn"
														onClick={() => handleRecommentButtonClick(comm.no)}
													>
														답글달기
													</button>
												</div>
												{/* 1) 댓글 영역 ----- END */}

												{/* 2) 답글 영역 ----- START */}
												<ul className="recommArea">
													{/* 2-1) 답글 폼 ----- START */}
													{showRecommentForm[comm.no] && (
														<li className="formCont typeRecomm">
															<textarea
																type="text"
																placeholder="답글글을 입력하세요"
																value={newRecomment}
																onChange={handleRecommentInputChange}
															/>
															<button
																className="addBtn"
																onClick={() => handleAddRecommentClick(comm.no)}
															>
																등록
															</button>
														</li>
													)}
													{/* 2-1) 답글 폼 ----- END */}

													{/* 2-2) 답글 출력 ----- START */}
													{recommentData[comm.no] &&
													recommentData[comm.no].length > 0
														? recommentData[comm.no].map((recomm) => (
																<li
																	className="commItem typeRecomm"
																	key={recomm.no}
																>
																	{/* 2-2-1) 답글 내용 ----- START */}
																	<div className="commInner">
																		<span className="user">
																			<strong>{recomm.user_no.nickname}</strong>{" "}
																			({recomm.user_no.userId})
																		</span>
																		<span className="date">
																			{formatDate(recomm.updated_at)}
																		</span>
																		{/* 2-2-1-1) 답글 내용 or 수정 ----- START */}
																		{isEditModalOpen &&
																		editCommentId === recomm.no ? (
																			<EditCommentModal
																				commentId={recomm.no}
																				commentContent={recomm.content}
																				onClose={() =>
																					closeEditModal(recomm.no)
																				}
																			/>
																		) : (
																			<>
																				{/* 답글 본문 + 수정/삭제 버튼 */}
																				<p className="content" style={recomm.del_yn == "Y" ? {color:"var(--InputTxtColor)"}:{}}>{recomm.del_yn != "Y" ? recomm.content : "삭제된 댓글입니다."}</p>
																				{userInfo?.no == recomm.user_no.no ? (
																					<>
																						<button
																							className="updateBtn"
																							onClick={() =>
																								handleEditClick(
																									recomm.no,
																									recomm.content,
																								)
																							}
																						>
																							수정
																						</button>
																						<button
																							className="deleteBtn"
																							onClick={() =>
																								handleDelete(recomm.no)
																							}
																						>
																							삭제
																						</button>
																					</>
																				) : null}
																			</>
																		)}
																		{/* 2-2-1-1) 답글 내용 or 수정 ----- END */}
																	</div>
																	{/* 2-2-1) 답글 내용 ----- END */}
																</li>
														  ))
														: null}
													{/* 2-2) 답글 출력 ----- END */}
												</ul>
												{/* 2) 답글 영역 ----- END */}
											</li>
										))
									) : (
										<Loading />
									)}

									{/* 댓글 입력 */}
									<li className="formCont typeComm">
										<textarea
											placeholder="댓글을 입력하세요"
											value={newComment}
											onChange={handleCommentInputChange}
										/>
										<button className="addBtn" onClick={handleAddCommentClick}>
											등록
										</button>
									</li>
								</ul>
							)}
						</section>
					</div>
				</>
			) : (
				<Loading />
			)}

			<SideBar>
				<button
					className={isLiked ? "sideLikes likes" : "sideLikes unlikes"}
					onClick={handleLikeClick}
				>
					{isLiked ? <LiaHeartSolid /> : <LiaHeart />}
				</button>
			</SideBar>
		</main>
	);
}

export default BooklogDetail;
