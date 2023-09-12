import React, { useState } from "react"
import { POST } from "../Aaxios"
import { Link } from "react-router-dom"

const FindIdForm = () => {
	const [name, setName] = useState("");
	const [birth, setBirth] = useState("");
	const [phone, setPhone] = useState("");
	const [next, setNext] = useState(false);
	const [existId, setExistId] = useState("");
	const [data, setData] = useState("");

	function changeDateString(birth) {
		var year = birth.substr(0, 2);
		var month = birth.substr(2, 2);
		var day = birth.substr(4, 2);
		return year + "-" + month + "-" + day
	}

	function changePhone(phone) {
		var first = phone.substr(0, 3);
		var middle = phone.substr(3, 4);
		var last = phone.substr(7, 4);
		return first + "-" + middle + "-" + last
	}
	
	const handleFindId = () => {
		if(name, birth, phone == ""){
			alert("빈 칸을 입력해주세요");
			return;
		}
		const data = {
			name: name,
			birth: birth.substring(0,1) > 2 ? "19" + changeDateString(birth) : "20" + changeDateString(birth),
			phone: changePhone(phone)
		};

		POST("/api/auth/findId", data, {
			headers: {"Content-Type": "application/json"}
		})
			.then((res) => {
				if(res.data == "회원정보가 없습니다"){
					setNext(true);
					setExistId(false);
					return;
				} 
				 else {
					setNext(true);
					setData(res.data);
					setExistId(true);
					return;
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<>
		{!next ?
			<div className="formArea">
				<label className="inputBox">
					<input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="성명" />
					<input type="text" maxLength={6} value={birth} onChange={(e) => { setBirth(e.target.value) }} placeholder="생년월일 (예: 980614)" />
					<input type="text" value={phone} maxLength={11} onChange={(e) => { setPhone(e.target.value) }} placeholder="핸드폰 번호 ('-' 제외한 숫자만 입력) " onKeyUp={e => e.key == "Enter" && handleFindId()}/>
				</label>
				<div className="btnBox">
					<button type="button" onClick={handleFindId} className="findBtn">Find ID</button>
				</div>
			</div>
		: (existId ?
			<div className="existArea">
				<div className="infoBox">
					<span className="name">아이디</span>
					<span className="result">{data.userId}</span>
				</div>
				<div className="btnBox">
					<Link to={`/auth/signin`}><button type="button" className="goBtn">Go to Sign in</button></Link>
					<Link to={`/auth/find/pw`}><button type="button" className="moveBtn">Find Password</button></Link>
				</div>
			</div>
			: 
			<div className="existArea">
				<p>아이디가 존재하지 않습니다.</p>
				<Link to={`/auth/signup`}><button type="button" className="moveBtn">회원가입 하기</button></Link>
			</div>
		)}
		</>
	)
}

export default FindIdForm