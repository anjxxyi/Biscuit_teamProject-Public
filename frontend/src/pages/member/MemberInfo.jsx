import React from "react";
import MemberNav from "./MemberNav";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PUT, POST } from "../../components/Aaxios";
import { Context } from "../../components/store/Context";

import PopupPostCode from "../../components/PopupPostCode";

const MemberInfo = () => {
	const props = useContext(Context);
	const userInfo = props.userInfo;
	const setUserInfo = props.setUserInfo;

	// postcode --- START
  const [location, setLocation] = useState(null);
  const [postcode, setPostcode] = useState(null);
  const [locationDetail, setLocationDetail] = useState(null);
  const [isPopupPostCode, setIsPopupPostCode] = useState(false);

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
  // postcode --- END
  
  // 비밀번호 일치여부
  const [password, setPassword] = useState('');
  const [pwch, setPwch] = useState('');
  const pwCheck = () => {
	const data={
		no: userInfo.no,
		password : password
	}
	POST(`/api/member/${userInfo.no}/check`, data, {
		headers: {
			"Content-Type": "application/json",
		}
	})
	.then((res) => {
		if(res.data == false){
			alert("비밀번호가 일치하지 않습니다.");
			return;
		}
		setPwch(res.data);
	})
	.catch((err) => {
		console.log(err);
	})
  }

	const [nick, setNick] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	/** 회원 정보 변경 */
	const updateInfo = () => {
		function changePhone(phone){
      var first = phone.substr(0,3);
      var middle = phone.substr(3,4);
      var last = phone.substr(7,4);
      return first + "-" + middle + "-" + last
    }
	if (isNaN(Number(phone))) {
		return alert("핸드폰 번호는 숫자만 입력해주세요.");
	}

	const data = {
		no: userInfo.no,
		nickname: nick !== '' ? nick : userInfo?.nickname,
		email: email !== '' ? email: userInfo?.email,
		phone: phone !== '' ? changePhone(phone): userInfo?.phone,
		zipCode: postcode == '' ? userInfo?.zipCode : postcode,
		address: location == '' ? userInfo?.address :location ,
		address_detail: locationDetail == '' ? userInfo?.address_detail : locationDetail  
	}
	PUT(`/api/member/info/update`, data, {
		headers: {
			"Content-Type": "application/json",
		}
	})
	.then((res) => {
		alert("변경이 완료되었습니다.");
		localStorage.setItem("member", JSON.stringify(res.data));
		setUserInfo(res.data);
		setInfoChange(false);
	})
	.catch((err) => {
		console.log(err);
	})
	}
    /* 기존 비번 실시간 일치 여부 */
	const [currentPw, setCurrentPw] = useState(''); //기존비번
	const [newPw, setNewPw] = useState(''); //새비번
	const [newPwCh, setNewPwCh] = useState(''); //새비번확인
	const [correct, setCorrect] = useState(''); //기존비번과 일치여부
	const [correctPw, setCorrectPw] = useState(''); //새비번 일치여부

	useEffect(() => {
		if(currentPw !== ""){
			if(password !== currentPw){
				console.log("다름");
				setCorrect(false);
			} else{
				console.log("같음");
				setCorrect(true);
			}
		}
	}, [currentPw])

	/* 새 비번 실시간 일치여부 */
	useEffect(() => {
		if(newPw !== "" && newPwCh !== ""){
			if(newPw !== newPwCh){
				console.log("다름");
				setCorrectPw(false);
			} else{
				console.log("같음");
				setCorrectPw(true);
			}
		}
	}, [newPwCh])

	/* 비밀번호 변경 */
	const handleChangePw = () => {
		const data = {
			no: userInfo.no,
			password: newPw
		}
		PUT(`/api/member/info/${userInfo.no}`, data, {
			headers: {
				"Content-Type": "application/json",
			}
		})
		.then((res) => {
			alert("비밀번호 변경이 완료되었습니다.");
			setPwChange(false);
		})
		.catch((err) => {
			console.log(err);
		})
	}

const [infoChange, setInfoChange] = useState(false); //정보변경 버튼
const infoChangeBtn = () => {
	setInfoChange(!infoChange);
}
const [pwChange, setPwChange] = useState(false); //비번변경버튼
const pwChangeBtn = () => {
	setPwChange(!pwChange);
}

/** 회원탈퇴 */
const navigate = useNavigate();
const [quit, setQuit] = useState("Y");
const handleQuit = (e) => {
	const cf = confirm("정말로 탈퇴하시겠습니까?");
		if(cf == true){
			confirm("확인을 누르시면 탈퇴됩니다.");
		} else{
			alert("잘 생각하셨어요! 좀 더 머물다 가자구요!");
			return;
		}

	const data = {
		userId: userInfo.userId,
		quitYn: quit
	}
	PUT(`/api/member/${userInfo.userId}/quit`, data, {
		headers: {
			"Content-Type": "application/json",
	}
	})
	.then((res) => {
		const arr = ["LS_KEY_SAVE_ID_FLAG", "LS_KEY_ID", "member"]
		Object.keys(localStorage).forEach(e => { arr.includes(e) && localStorage.removeItem(e); })
		setUserInfo();
		navigate("/");
	})
	.catch((err) => {
	})
}




	return (
		<MemberNav>
			<div id="infoArea">
			  { userInfo &&
				pwch ?
				(<div>
					<div className="idPwArea">
					<div className="idPwBox w90">
						<h3 className="login_title">로그인 정보</h3>
						<div className="idBox">
						<p>아이디</p>
						<b>{userInfo.userId}</b>
						</div>
						<div className="pwBtnBox">
							{	pwChange 
								?
							<>
							<div className="blankInput">
							  <p>비밀번호</p>
							  <input type="password" placeholder="현재 비밀번호를 입력하세요" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)}/>
							  <input type="password" placeholder="새 비밀번호를 입력하세요" value={newPw} onChange={(e) => setNewPw(e.target.value)}/>
							  <input type="password" placeholder="새 비밀번호를 다시 한번 입력하세요" value={newPwCh} onChange={(e) => setNewPwCh(e.target.value)}/>
							
							  <div className="btnBox">
						  	  <button className="changeBtn w50" onClick={pwChangeBtn}>변경 취소</button>
							  <button className="checkBtn w50" onClick={handleChangePw}>확인</button>
							  </div>
							</div>
							</>
							:
							<>
							<div className="pwBox">
							  <p>비밀번호</p>
							  <p>●●●●●●●●</p>
							</div>
							<button className="changeBtn w20" onClick={pwChangeBtn}>변경</button>

							</>
							}
						</div>
					</div>
					</div>
					{
						infoChange ?
						<>
							<div className="infoArea w100">
								<div className="infoBox w90">
									<h3 className="info_title">회원 정보</h3>
									<div className="inputBox">
										<div className="idBox row">
											<p>성명</p>
											<input type="text" placeholder={userInfo?.name} disabled/>
										</div>
										<div className="nickBox row">
											<p>별명</p>
											<input type="text" placeholder={userInfo?.nickname} value={nick ? nick : ''} onChange={(e) => setNick(e.target.value)}/>
										</div>
										<div className="emailBox row">
											<p>이메일</p>
											<input type="text" placeholder={userInfo?.email} value={email ? email : ''} onChange={(e) => setEmail(e.target.value)}/>
										</div>
										<div className="callBox row">
											<p>연락처</p>
											<input type="text" placeholder={userInfo?.phone} pattern="[0-9]+" value={phone ? phone : ''} onChange={(e) => setPhone(e.target.value)} maxLength={11}/>
										</div>
										<div className="genderBox row">
											<p>성별</p>
											<input type="text" placeholder={userInfo?.gender} disabled/>
										</div>
									</div>
									<div className="btnBox"><button className="changeBtn w50" onClick={infoChangeBtn}>변경취소</button><button className="checkBtn w50" onClick={updateInfo}>회원수정</button></div>
								</div>
							</div>

							<div className="locationArea">
								<div className="locationBox w90">
								<h3 className="info_title">주소 정보</h3>
									<p className=".info_sideTitle">주소</p>
									<div className="locationBtnBox">
										<input type="text" placeholder={userInfo?.zipCode} required defaultValue={postcode} onClick={fnPostCodeTrigger} readOnly/>
										<button className="zipBtn" ref={postCodeTrigger} onClick={openPostCode}>우편번호 검색</button>
										{isPopupPostCode && <PopupPostCode onClose={closePostCode} setLocation={setLocation} setPostcode={setPostcode} locationDetail={locationDetail}/>} 
									</div>
									<input className="w100" placeholder={userInfo?.address} defaultValue={location} readOnly/>
									<input className="w100" placeholder={userInfo?.address_detail} value={locationDetail == null? '' :locationDetail} onChange={(e) => setLocationDetail(e.target.value)}/>
								</div>
								<div className="saveBtnBox w90"><button className="checkBtn w100" onClick={updateInfo}>주소 저장</button></div>
								</div>
						</>
						
						:
						<>
							<div className="infoArea w100">
								<div className="infoBox w90">
									<h3 className="info_title">회원 정보</h3>
									<div className="contentBox">
										<ul className="info_sideTitle">
											<li>성명</li>
											<li>별명</li>
											<li>이메일</li>
											<li>연락처</li>
											<li>성별</li>
										</ul>
										<ul className="info_content">
											<li>{userInfo?.name}</li>
											<li>{userInfo?.nickname}</li>
											<li>{userInfo?.email}</li>
											<li>{userInfo?.phone}</li>
											<li>{userInfo?.gender == "F" ? "여" : "남"}</li>
										</ul>
									</div>
									<div className="btnBox"><button className="changeBtn w100" onClick={infoChangeBtn}>회원수정</button></div>
								</div>
							</div>

							<div className="locationArea">
								<div className="locationBox w90">
								<h3 className="info_title">주소 정보</h3>
									<p className=".info_sideTitle">주소</p>
									<div className="locationBtnBox">
										<input type="text" placeholder={userInfo?.zipCode} required defaultValue={postcode}/>
										<button className="zipBtn" ref={postCodeTrigger} onClick={openPostCode}>우편번호 검색</button>
										{isPopupPostCode && <PopupPostCode onClose={closePostCode} setLocation={setLocation} setPostcode={setPostcode} />} 
									</div>
									<input className="w100" placeholder={userInfo?.address} defaultValue={location}/>
									<input className="w100" placeholder={userInfo?.address_detail} value={locationDetail || ""} onChange={(e) => setLocationDetail(e.target.value)}/>
								</div>
								<div className="saveBtnBox w90"><button className="checkBtn w100" onClick={updateInfo}>주소 저장</button></div>
								</div>

								<div className="quitBox"><button onClick={(e) => handleQuit()}>회원 탈퇴하기</button></div>
						</>
					}
				</div>)
				
					
				:
				<>
				<div className="pwchArea" >
					<div className="pwCheckBox">
						<b>비밀번호 확인</b>
						<small>회원님의 소중한 정보보호를 위해 비밀번호를 확인하고 있습니다.</small>
						<b className="title">아이디</b>
						<div>{userInfo?.userId}</div>
						<b className="title">비밀번호</b>
						<input type="password" className="pwCheck w80" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={e => e.key == "Enter" && pwCheck()}/>
					</div>
				</div>
				<div className="checkBox"><button className="checkBtn w40" onClick={pwCheck}>확인</button></div>
				</>
			  }
			</div>
			
		</MemberNav>
	);
};

export default MemberInfo;
