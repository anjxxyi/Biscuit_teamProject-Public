import React, {useState} from "react"
import {POST, PUT} from "../Aaxios"
import { Link, useNavigate } from "react-router-dom"

const FindPwForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [next, setNext] = useState(false);
  const [existPw, setExistPw] = useState("");
  const [data, setData] = useState("");
  const [pw, setPw] = useState("");
  const [pwCh, setPwch] = useState("");

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
  
  const handleFindPw = () => {
    if(id, name, birth, phone == ""){
			alert("빈 칸을 입력해주세요");
			return;
		}
    const data = {
      userId: id,
      name: name,
      birth: birth.substring(0,1) > 2 ? "19" + changeDateString(birth) : "20" + changeDateString(birth),
      phone: changePhone(phone)
    }

    POST("/api/auth/findPw", data, {
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => {
      setNext(true);
      setExistPw(res.data);
    })
    .catch((error) => console.log(error));
  }

  const navigate = useNavigate();
  const handlePwChange = () => {
    if( pw == pwCh){
      const data = {password: pw}
      PUT(`/api/auth/findPw/${id}`, data, {
        headers: {"Content-Type": "application/json"}
      })
        .then((res) => {
        alert("비밀번호가 정상적으로 변경되었습니다.");
        navigate("/auth/signin");
        })
        .catch((err) => console.log(err));
    } else{alert("비밀번호가 일치하지 않습니다.")}
  }

  return (
    <>
    {!next ?
			<div className="formArea">
        <label className="inputBox">
          <input type="text" value={id} onChange={(e) => { setId(e.target.value) }} placeholder="아이디" />
          <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="성명" />
          <input type="text" value={birth} onChange={(e) => { setBirth(e.target.value) }} placeholder="생년월일 (예: 980614)" />
          <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="핸드폰 번호 ('-' 제외한 숫자만 입력)" maxLength={11} onKeyUp={e => e.key == "Enter" && handleFindPw()}/>
        </label>
				<div className="btnBox">
          <button type="button" className="findBtn" onClick={handleFindPw}>Find PW</button>
				</div>
      </div>
    : (existPw ?
			<div className="existArea">
        <label className="formBox">
          <span className="name">새 비밀번호</span>
          <input type="password" value={pw} onChange={(e) => {setPw(e.target.value)}}/>
        </label>
        <label className="formBox">
          <span className="name">새 비밀번호 확인</span>
          <input type="password" value={pwCh} onChange={(e) => {setPwch(e.target.value)}} onKeyUp={e => e.key == "Enter" &&  handlePwChange()}/>
        </label>
        <div className="btnBox">
          <button  onClick={handlePwChange}>Change your password</button>
        </div>
      </div>
      :
			<div className="existArea noExist">
				<p>일치하는 회원 정보가 없습니다.</p>
        <div className="btnBox">
          <Link to={`/auth/signup`}><button>회원가입 하기</button></Link>  
        </div>
      </div>
      )}
    </>
  )
}

export default FindPwForm