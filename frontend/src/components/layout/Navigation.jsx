import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { MdAdminPanelSettings } from "react-icons/Md"
import { CgMenu, CgClose } from "react-icons/Cg"
import { TbSearch, TbSearchOff } from "react-icons/Tb"
import { HiUser } from "react-icons/Hi"
import { RiLogoutBoxRLine } from "react-icons/Ri"
import { Context } from "../store/Context"


const Navigation = ({ dropdownGnb, dropdownSearch, handleDropdownGnb, handleDropdownSearch }) => {
	const props = useContext(Context);
	const userInfo = props.userInfo;

	return (
		<>
			<nav className="mainNav">
				<Link to={`/about`}>소개</Link>
				<Link to={`/books`}>도서 검색</Link>
				<Link to={`/booklog/now`}>북로그</Link>
				<Link to={`/bookclass`}>북클래스</Link>
				<Link to={`/campaign`}>Us, Earth 캠페인</Link>
				<Link to={`/goods`}>Mr.BASAK</Link>
				<Link to={`/events`}>이벤트</Link>
			</nav>
			<nav className="rightNav">
				<button className="menuBtn typeIcon" onClick={handleDropdownGnb}>
					{dropdownGnb ? <CgClose /> : <CgMenu />}
				</button>
				<button className="menuBtn typeIcon" onClick={handleDropdownSearch}>
					{dropdownSearch ? <TbSearchOff /> : <TbSearch />}
				</button>
				{props.userInfo ? 
					<>
						<Link to={(userInfo?.authority == "A") ? `/member/admin` : `/member/info`}><button className="myPageBtn typeIcon"><HiUser /></button></Link>
						<button className="signoutBtn typeIcon" onClick={props.signoutHandler}><RiLogoutBoxRLine /></button>
						{(userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ? 
							<Link to={`/booklog/${userInfo.userId}`}><button className="authBtn styleRound">내 북로그</button></Link>
							: null 
						}
					</>
					:
					<Link to={`/auth/signin`}><button className="authBtn styleRound">시작하기</button></Link>
				}
			</nav>
			
			{(userInfo?.authority == null && userInfo?.authority == undefined) || userInfo?.authority == "U" ? 
				null : <span className="checkAuthority"><MdAdminPanelSettings />관리자모드</span>
      }
		</>
	);
};

export default Navigation;
