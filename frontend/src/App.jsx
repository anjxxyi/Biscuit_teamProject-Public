import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Context } from "./components/store/Context"

import "./styles/reset.css"
import "./styles/common.css"

import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"

import BooksPage from "./pages/books/BooksPage"
import BooksView from "./pages/books/BooksView"

import BooklogPage from "./pages/booklog/BooklogPage"
import BooklogSearch from "./pages/booklog/BooklogSearch"
import MyBooklogPage from "./pages/booklog/MyBooklogPage"
import BooklogDetail from "./pages/booklog/BooklogDetail"
import SubscribersPage from "./pages/booklog/SubscribersPage"

import BookclassPage from "./pages/bookclass/BookclassPage"
import BookclassView from "./pages/bookclass/BookclassView"
import BookclassApplyPage from "./pages/bookclass/BookclassApplyPage"

import GoodsPage from "./pages/goods/GoodsPage"
import GoodsViewPage from "./pages/goods/GoodsViewPage"
import GoodsUploadPage from "./pages/goods/GoodsUploadPage"
import GoodsEditPage from "./pages/goods/GoodsEditPage"

import CampaignPage from "./pages/campaign/CampaignPage"
import CampaignViewPage from "./pages/campaign/CampaignViewPage"
import CampaignApplyPage from "./pages/campaign/CampaignApplyPage"
import CampaignAccept from "./pages/campaign/CampaignAccept"
import OrderPage from "./pages/campaign/OrderPage"

import EventsPage from "./pages/events/EventsPage"
import EventsViewPage from "./pages/events/EventsViewPage"

import SignupPage from "./pages/auth/SignupPage"
import SigninPage from "./pages/auth/SigninPage"
import FindIdPwPage from "./pages/auth/FindIdPwPage"

import MemberNav from "./pages/member/MemberNav"
import MemberInfo from "./pages/member/MemberInfo"
import MemberCancel from "./pages/member/MemberCancel"
import MemberBookclip from "./pages/member/MemberBookclip"
import MemberBookclass from "./pages/member/MemberBookclass"
import MemberOrderlist from "./pages/member/MemberOrderlist"
import MemberTicket from "./pages/member/MemberTicket"
import SubscribeBlogPage from "./pages/booklog/SubscribeBlogPage"
import BooklogArticleEdit from "./pages/booklog/BooklogArticleEdit"
import EventEdit from "./pages/events/EventEdit"

import PolicyPage from "./pages/policy/PolicyPage"
import PolicyTerms from "./pages/policy/PolicyTerms"
import PolicyPrivacy from "./pages/policy/PolicyPrivacy"
import FaqPage from "./pages/FaqPage"
import PolicyOppolicy from "./pages/policy/PolicyOppolicy"
import FindIdForm from "./components/auth/FindIdForm"
import FindPwForm from "./components/auth/FindPwForm"
import EventUpdate from "./pages/events/EventUpdate"
import BooklogArticleUpdate from "./pages/booklog/BooklogArticleUpdate"

function App() {
  // darkMode --- START
	const [darkMode, setDarkMode] = useState(false);
	const handleDarkMode = () => setDarkMode(!darkMode);
  // darkMode --- END


  // userInfo --- START
	const [userInfo, setUserInfo] = useState();
	useEffect(() => refreshHandler(), []);

	function refreshHandler() {
		const member = JSON.parse(localStorage.getItem("member"));
		userInfo || setUserInfo(member);
		if(member == undefined) return;

		const tokenChecker = setTimeout(() => {
			new Date().getTime() >= userInfo.tokenExpiresIn && signoutHandler();
		}, 180000);
		return () => clearTimeout(tokenChecker);
	};

	const navigate = useNavigate();
  
	const signoutHandler = () => {
		const arr = ["LS_KEY_SAVE_ID_FLAG", "LS_KEY_ID"];
		Object.keys(localStorage).forEach(e => { !arr.includes(e) && localStorage.removeItem(e); })
		setUserInfo();
		alert("로그아웃 되었습니다.");
		navigate("/", true);
	};

	const loginChk = (boolean) => {
		if(boolean !== undefined) {
			boolean || navigate("/auth/signin");
		} else {
			if(JSON.parse(localStorage.getItem("member")) == null || JSON.parse(localStorage.getItem("member")) == "") {
				alert("로그인 후 이용해 주세요.");
				navigate("/auth/signin");
			}
		}
	}
  // userInfo --- END
  
  
	return (
    <Context.Provider value={{ userInfo, setUserInfo, signoutHandler, navigate, loginChk }}>
		<Layout darkMode={darkMode} handleDarkMode={handleDarkMode} >
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />

				<Route path="/books" element={<BooksPage />} />
				<Route path="/books/:no" darkMode={darkMode} element={<BooksView />} />

				<Route path="/booklog/now" element={<BooklogPage />} />
				<Route path="/booklog/search" element={<BooklogSearch />} />
				<Route path="/booklog/:no" element={<MyBooklogPage />} />
				<Route path="/booklog/:user/:no" element={<BooklogDetail />} />
				<Route path="/booklog/subscribers/:no" element={<SubscribersPage />} />
				<Route path="/booklog/subscribeBlog/:no" element={<SubscribeBlogPage />} />
				<Route path="/booklog/article/new" element={<BooklogArticleEdit />} />
				<Route path="/booklog/article/update/:no" element={<BooklogArticleUpdate />} />
				
				<Route path="/bookclass" element={<BookclassPage />} />
				<Route path="/bookclass/:no" element={<BookclassView />} />
				<Route path="/bookclass/apply" element={<BookclassApplyPage />} />

				<Route path="/goods" element={<GoodsPage />} />
				<Route path="/goods/:no" element={<GoodsViewPage />} />
				<Route path="/goods/new" element={<GoodsUploadPage />}/>
				<Route path="/goods/:no/edit" element={<GoodsEditPage />}/>

				<Route path="/campaign" element={<CampaignPage />} />
				<Route path="/campaign/:no" element={<CampaignViewPage />} />
				<Route path="/campaign/apply" element={<CampaignApplyPage />}/>
				<Route path="/campaign/accept" element={<CampaignAccept />}/>
				<Route path="/order" element={<OrderPage />}/>

				<Route path="/events" element={<EventsPage />} />
				<Route path="/events/:no" element={<EventsViewPage />} />
				<Route path="/events/new" element={<EventEdit />} />
				<Route path="/events/:no/update" element={<EventUpdate />} />

				<Route path="/auth/signin" element={<SigninPage />} />
				<Route path="/auth/signup" element={<SignupPage />} />
				<Route path="/auth/find/*" element={<FindIdPwPage />}>
					<Route path="id" element={<FindIdForm />} />
					<Route path="pw" element={<FindPwForm />} />
				</Route>

				<Route path="/member/admin" element={<MemberNav />} />
				<Route path="/member/info" element={<MemberInfo />} />
				<Route path="/member/cancel" element={<MemberCancel />} />
				<Route path="/member/bookclip" element={<MemberBookclip />} />
				<Route path="/member/bookclass" element={<MemberBookclass />} />
				<Route path="/member/orderlist" element={<MemberOrderlist />} />
				<Route path="/member/ticket" element={<MemberTicket />} />

				<Route path="/policy/*" element={<PolicyPage />}>
          <Route path="terms" element={<PolicyTerms />} />
          <Route path="privacy" element={<PolicyPrivacy />} />
          <Route path="oppolicy" element={<PolicyOppolicy />} />
        </Route>

				<Route path="/faq" element={<FaqPage />} />
			</Routes>
		</Layout>
    </Context.Provider>
	);
}

export default App;
