import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/Fc'
import { POST } from "./../Aaxios";
import { Context } from '../store/Context';

const LS_KEY_ID = "LS_KEY_ID";
const LS_KEY_SAVE_ID_FLAG = "LS_KEY_SAVE_ID_FLAG";  

const SigninForm = () => {

  /*
    로그인 유지 기능 구현할지 말지 결정해야함
    기본 로그인 1시간 유지임.
  */

  // login 후 사용자 정보 useInfo에 저장하기 위해 사용
  const props = useContext(Context);

  const navigate = useNavigate();
  const tagsRef = useRef([]); // -> form 안의 input#id, input#pw, signin btn tag 값 관리

  const [saveIDFlag, setSaveIDFlag] = useState(false);
  //아이디 기억하기 기능
  const handleSaveIDFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveIDFlag);
    setSaveIDFlag(!saveIDFlag);
  };

  const [loginID, setLoginID] = useState('');
  useEffect(() => {
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) setSaveIDFlag(idFlag);
    if (idFlag === false) localStorage.setItem(LS_KEY_ID, "");
  
    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) setLoginID(data);
  }, []);

  const handleSigninSubmit = async () => {
    const inputs = tagsRef.current;
    if(loginID == "" || inputs["ipw"].value == "")
      return alert("아이디 또는 비밀번호를 입력하세요.");

    const data = {
      userId: loginID,
      password: inputs["ipw"].value,
    };

    POST(`/api/auth/signin`, data,)
      .then((res) => {
        if(res.data.quitYn == "Y"){
          alert("탈퇴한 회원입니다");
          return;
        }
         else{
          if(saveIDFlag){
            localStorage.setItem(LS_KEY_ID, loginID);
          }
          localStorage.setItem("member", JSON.stringify(res.data));
          alert(`${res.data.name}님, 반갑습니다.`);
          props.setUserInfo(res.data);
          navigate("/", true);
        }
      })
      .catch((err) => {
        const serverErr = err.response.data.status;
        serverErr == 401 ? alert("아이디 또는 비밀번호를 확인해주세요.")
          : console.log(serverErr);
      })
  }

  return (
    <>
      <form className="formArea">
        <div className="inputBox">
          <input type="text" name="userId" id="id" placeholder="ID" value={loginID}
          onChange={(e) => setLoginID(e.target.value)}
            onKeyDown={e => e.key == "Enter" && tagsRef.current["ipw"].focus()} />
          <input type="password" name="password" id="pw"
            placeholder="Password" ref={e => tagsRef.current["ipw"] = e}
            onKeyDown={e => e.key == "Enter" && handleSigninSubmit()} />
        </div>
        <div className="btnBox">
          <button type="button"
            ref={e => tagsRef.current["btn"] = e}
            onClick={handleSigninSubmit} >Sign in</button>
        </div>
        <div className="ctrlBox">
          <label htmlFor="staySignin"><input type="checkbox" name="staySignin" id="staySignin" checked={saveIDFlag} onChange={handleSaveIDFlag}/><span>아이디 기억하기</span></label>
          <Link to={`/auth/find/id`}>아이디/비밀번호 찾기</Link>
        </div>
      </form>
      <div className="linkArea">
        <Link className="biscuit" to={`/auth/signup`}>
          <span className="icon"><img src="/images/biscuitIcon.svg" alt="" /></span>
          <span className="text"><b>Biscuit</b> 회원가입</span>
        </Link>
        {/* <Link className="google" to={``}>
          <span className="icon"><FcGoogle /></span>
          <span className="text"><b>Google</b> 로그인</span>
        </Link> */}
      </div>
    </>
  )
}

export default SigninForm