import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { POST, GET } from "./../Aaxios";
import PopupPostCode from "../PopupPostCode";

const SignupForm = () => {
	const [bisAgree, setBisAgree] = useState(false);
	const [personAgree, setPersonAgree] = useState(false);

	const bisopenModal = () => setBisAgree(true);
	const biscloseModal = () => setBisAgree(!bisAgree);
	const personOpenModal = () => setPersonAgree(true);
	const personCloseModal = () => setPersonAgree(!personAgree);

	const navigate = useNavigate();
	
	/* 회원가입 정보 */
	const [userId, setUserId] = useState(""); // 아이디
	const [password, setPassword] = useState(""); // 패스워드
	const [password2, setPassword2] = useState(""); // 패스워드 확인
	const [name, setName] = useState(""); // 사용자 이름
	const [nickname, setNickname] = useState(""); // 닉네임
	const [email, setEmail] = useState(""); // 이메일
	const [phone, setPhone] = useState(""); // 폰번호
	const [birth, setBirth] = useState(""); // 생년월일
	const [gender, setGender] = useState(""); //성별
	const [location, setLocation] = useState(null); //주소
  const [postcode, setPostcode] = useState(null); //우편번호
	const [address_detail, setAddress_detail] = useState(""); //상세주소

  const [isPopupPostCode, setIsPopupPostCode] = useState(false)

	const [doubleCheck, setDoubleCheck] = useState(null); // 아이디 중복여부 체크
	const [pwCheck, setPwCheck] = useState(""); // 비밀번호 일치여부 체크
	const [nicknameCheck, setNicknameCheck] = useState(null); //닉네임 중복여부 체크

	//유효성 체크
	const [isId, setIsId] = useState(false); 
	const [isNickname, setIsNickname] = useState(false);
	const [isPassword, setIsPassword] = useState(false);

	/* 아이디 중복 확인 함수 */
	const handleCheckUserId = async (e) => {
		e.preventDefault();
		GET(`/api/auth/idCheck?userId=${encodeURIComponent(userId)}`)
			.then((res) => {
				if(res.data == false){
					GET(`/api/auth/idCheck/quitYn?userId=${encodeURIComponent(userId)}`)
					.then((res) => {
						const result = res.data;
						if(result == true){
							alert("탈퇴한 고객입니다.");
							return;
						}
					})
				}
				setDoubleCheck(res.data);
			})
			.catch((error) => {
				setDoubleCheck(error.response.status);
			});
	};

	//아이디 입력시 유효성 체크
	const onChangeId = (e) => {
		const currentId = e.target.value;
		setUserId(currentId);
		const idRegExp = /^[a-zA-z0-9]{8,16}$/;
 
		if (!idRegExp.test(currentId)) {
			console.log("8-16사이 대소문자 또는 숫자만 입력해 주세요!");
			setIsId(false);
		} else {
			console.log("사용가능한 아이디 입니다.");
			setIsId(true);
		}
	};

	/* 비밀번호 일치 실시간 확인 */
	useEffect(() => {
		if (password !== "" && password2 !== "") {
			// 비밀번호, 비밀번호 확인이 빈 값이 아닐 것
			if (password !== password2) {
				console.log("다름");
				setPwCheck(false);
			} else {
				console.log("동일함");
				setPwCheck(true);
			}
		}
	}, [password2]);


  //비밀번호 유효성 체크
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      console.log(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      console.log("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

	/* 닉네임 중복 확인 함수 */
	const handleUserNickname = async (e) => {
		e.preventDefault();

		GET(`/api/auth/nicknameCheck?nickname=${encodeURIComponent(nickname)}`)
			.then((res) => {
				setNicknameCheck(res.data);
			})
			.catch((error) => {
				console.log("통신안됨");
			});
	};

	//닉네임 길이 체크
	const onChangeNickname = (e) => {
		const currentName = e.target.value;
		setNickname(currentName);
 
		if (currentName.length < 2 || currentName.length > 8) {
			setIsNickname(false);
		} else {
			console.log("사용가능");
			setIsNickname(true);
		}
	};
	
	//주소 팝업 열기/닫기
	const openPostCode = () => {
    setIsPopupPostCode(true);
    document.body.style.overflow = "hidden";
  };
  const closePostCode = (e) => {
    setIsPopupPostCode(false);
    document.body.style.overflow = "unset";
  };

	const postCodeTrigger = useRef(null);
  const fnPostCodeTrigger = () => {
    (postCodeTrigger !== null && postCodeTrigger.current !== null) ?
    postCodeTrigger.current.click() : null
  }

	/* 회원가입 함수 */
	const handleSignupSubmit = async (e) => {
		e.preventDefault();

		if (doubleCheck == false) {
			// 아이디 중복 체크 안했을 시 회원가입 불가
			alert("아이디 중복 체크를 하세요.");
			return;
		}

		if (password !== password2) {
			// 비밀번호 불일치시 회원가입 불가
			alert("비밀번호가 일치하지않습니다.");
			return;
		}

		if(nicknameCheck == null){
			alert("닉네임 중복체크 해주세요");
			return;
		}

		if (isNaN(Number(birth)) || isNaN(Number(gender))) {
			return alert("생년월일은 숫자만 입력할 수 있습니다.");
		}

		function changeDateString(birth){
			var year = birth.substr(0,2);
			var month = birth.substr(2,2);
			var day = birth.substr(4,2);
			return year + "." + month + "." + day
	  }

    function changePhone(phone){
      var first = phone.substr(0,3);
      var middle = phone.substr(3,4);
      var last = phone.substr(7,4);
      return first + "-" + middle + "-" + last
    }
    
		const signUpData = {
			userId: userId,
			password: password,
			name: name,
			nickname: nickname,
			email: email,
			phone: changePhone(phone),
			birth: gender > 2 ? "20" + changeDateString(birth) : "19" + changeDateString(birth),
			gender: gender % 2 == 0 ? "F" : "M",
			zipCode: postcode,
			address: location,
			address_detail: address_detail,
		};
		console.log(signUpData);

		POST("/api/auth/signup", signUpData, 
      {headers:{"Content-Type":"application/json"}}
    )
      .then((res) => {
				// 회원가입 성공 시 처리
				alert("회원가입 성공");
				navigate("/auth/signin");
			})
			.catch((error) => {
				// 회원가입 실패 시 처리
				alert("회원가입 실패");
			});
	 };

	// useLayoutEffect(() => {
	// 	console.log("signupForm useLayoutEffect실행");
	// }, []);

	return (
		<form className="container" onSubmit={handleSignupSubmit}>
			<div className="termsBox">
				<h2>개인정보 이용약관</h2>
				<div className="inputBox">
					<div>
						<label htmlFor="agree1">
							<input type="checkbox" id="agree1" required />
							<p>(필수) 비스킷 이용약관</p>
						</label>
					</div>
					{bisAgree ? (
						<div>
							<button
								onClick={biscloseModal}
								type="button"
								className="closeBtn"
							>
								내용 접기
							</button>
						</div>
					) : (
						<div>
							<button onClick={bisopenModal} type="button">
								자세히 보기
							</button>
						</div>
					)}
				</div>
				{bisAgree && (
					<div className="termsContent">
						<dl>
							<dt>제1조 (목적)</dt>
							<dd className="dot">본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고 합니다)이 주식회사 비스킷(이하 "회사"라고 합니다)가 제공하는 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</dd>
						</dl>
						<dl>
							<dt>제2조 (약관의 명시, 효력 및 개정)</dt>
							<dd className="dot">회사는 본 약관의 내용을 회원이 알 수 있도록 서비스 화면에 게시함으로써 이를 공지합니다.</dd>
							<dd className="dot">회사는 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</dd>
						</dl>
						<dl>
							<dt>제3조 (서비스의 제공)</dt>
							<dd className="dot">회사가 제공하는 서비스의 종류는 아래 각 호로 합니다.</dd>
							<dd>
								<ol>
									<li>도서검색(Books) 서비스</li>
									<li>북로그(Booklog) 서비스</li>
									<li>북클래스(Bookclass) 서비스</li>
									<li>Us, Earth 캠페인(Us, Earth Campaign) 서비스</li>
									<li>Mr.Basak(Mr.Basak Goods) 서비스</li>
									<li>이벤트(Events) 서비스</li>
								</ol>
							</dd>
						</dl>
						<dl>
							<dt>제4조 (서비스 이용)</dt>
							<dd className="dot">서비스 이용시간은 회사의 업무상 또는 기술상 불가능한 경우를 제외하고는 연중무휴 1일 24시간(00:00-24:00)으로 함을 원칙으로 합니다. 다만, 회사는 서비스 설비의 정기점검 등의 사유로 일정 기간 동안 서비스 제공을 일시 중지하거나 서비스 제공 시간을 제한할 수 있으며, 이 경우 회사는 회원에 대해 그 사유를 사전에 통지합니다. 단, 회사는 사전 고지가 불가능한 긴급한 사유가 있는 경우 사후에 통지할 수 있습니다.</dd>
						</dl>
					</div>
				)}

				<div className="inputBox">
					<div>
						<label htmlFor="agree2">
							<span className="checkMark"></span>
							<input type="checkbox" id="agree2" required />
							<p>(필수) 개인정보 수집 및 이용</p>
						</label>
					</div>
					{personAgree ? (
						<div>
							<button
								onClick={personCloseModal}
								type="button"
								className="closeBtn"
							>
								내용 접기
							</button>
						</div>
					) : (
						<div>
							<button onClick={personOpenModal} type="button">
								자세히 보기
							</button>
						</div>
					)}
				</div>
				{personAgree && (
					<div className="termsContent">
						<dl>
							<dt>01. 비스킷 개인정보 처리방침</dt>
							<dd className="dot">개인정보 처리방침”이란 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미하며, 비스킷은 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을 제공합니다.</dd>
							<dd className="dot">비스킷은 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있습니다. 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수 있도록 다양한 노력을 기울이고 있으며, 이러한 노력의 일환으로 카카오의 주요 개인정보 처리 관련 정보를 라벨링으로 제공합니다.</dd>
							<dd className="dot">비스킷은 개인정보 처리방침은 회사가 제공하는 서비스(이하 ‘서비스'라 함)에 적용됩니다. 단, 특정 서비스에서 개별적으로 개인정보 처리방침을 운영하는 경우 그에 따릅니다.</dd>
						</dl>
						<dl>
							<dt>02. 개인정보 수집</dt>
							<dd className="dot">서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다.</dd>
							<dd className="dot">회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있습니다.</dd>
						</dl>
				 </div>
				)}
			</div>
			<div className="container user">
				<h2>회원 정보</h2>
				<div className="idPwBox">
					<div className="idBox flex" >
						<label>아이디</label>
						<div
							className={
								userId == "" ? "w60" : isId ? (doubleCheck == null ? "w60" : doubleCheck ? "w60 yellow" : "w60 red") : "red w60" 
							}
						>
							<input
								type="text"
								placeholder="영문,숫자 조합하여 8~16자"
								required
								className="w100 margin-bottom"
								value={userId}
								onChange={onChangeId}								
							/>
						</div>
						<button
							className="duplicationBtn1"
							type="button"
							onClick={handleCheckUserId}
						>
							중복검사
						</button>
					</div>
					<div className="pwBox flex">
						<label>비밀번호</label>
						<div className={password == "" ? "w80" : isPassword ? "yellow w80" : "red w80"}>
							<input
								type="password"
								className="w100 margin-bottom"
								placeholder="영문,숫자,특수문자 조합하여 8~16자"
								required
								value={password}
								onChange={onChangePassword}
							/>
						</div>
					</div>
					<div className="pwBox flex">
						<label>비밀번호 확인</label>
						<div
							className={
								password2 == "" ? "w80" : pwCheck ? "yellow w80 " : "red w80"
							}
						>
							<input
								type="password"
								className="w100 margin-bottom"
								placeholder="영문,숫자,특수문자 조합하여 8~16자"
								required
								value={password2}
								onChange={(e) => setPassword2(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className="infoBox">
					<div className="nameBox flex">
						<label>성명</label>
						<input
							type="text"
							className="w80"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="nicknameBox flex">
						<label>별명</label>
						<div
							className={
								nickname == "" ? "w60" : isNickname ? (nicknameCheck == null ? "w60" : nicknameCheck ? "w60 yellow" : "w60 red") : "red w60"
									
							}
						>
							<input
								type="text"
								placeholder="2~8자이내(한글 또는 영어,숫자 사용가능)"
								className="w100 margin-bottom"
								required
								value={nickname}
								onChange={onChangeNickname}
							/>
						</div>
						<button
							type="button"
							className="duplicationBtn2"
							onClick={handleUserNickname}
						>
							중복검사
						</button>
					</div>
					<div className="birthBox flex">
						<label>생년월일</label>
						<div>
							<input
								type="text"
								className="w30"
								placeholder="예: 980315"
								required
								maxLength={6}
								value={birth}
								onChange={(e) => {
									setBirth(e.target.value)}}
							/>
							-
							<input
								type="text"
								className="w10"
								required
								maxLength={1}
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							/>
							● ● ● ● ● ●
						</div>
					</div>
					<div className="mailBox flex">
						<label>이메일</label>
						<input
							type="email"
							className="w80"
							placeholder="@ 포함하여 전체 이메일 주소 입력"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="phoneBox flex">
						<label>연락처</label>
						<input
							type="tel"
							className="w80"
							placeholder="'-' 제외하고 숫자만 입력"
							required
							maxLength={11}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className="addressBox ">
						<label>주소</label>
						<div>
							<input
								type="text"
								name="zipcode"
								className="w30"
								placeholder="우편번호"
								defaultValue={postcode}
								onClick={fnPostCodeTrigger}
							/>
							<button type="button" ref={postCodeTrigger} onClick={openPostCode}>우편번호 검색</button>
							{isPopupPostCode && <PopupPostCode onClose={closePostCode} setLocation={setLocation} setPostcode={setPostcode} />} 
						</div>
						<input
							type="text"
							name="address"
							className="w100"
							placeholder="주소"
							required
							defaultValue={location}
						/>
						<input
							type="text"
							className="w100"
							placeholder="상세 주소"
							required
							value={address_detail}
							onChange={(e) => setAddress_detail(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="btnBox displayFlex">
				<button className="cancelBtn" type="button">
					취소
				</button>
				<button className="checkBtn" type="submit">
					확인
				</button>
			</div>
		</form>
	);
}

export default SignupForm;
