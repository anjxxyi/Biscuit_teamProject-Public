import { Route, Routes } from 'react-router-dom'

import FindIdForm from '../components/auth/FindIdForm'
import FindPwForm from '../components/auth/FindPwForm'
import AboutPage from '../pages/AboutPage'
import FaqPage from '../pages/FaqPage'
import HomePage from '../pages/HomePage'
import FindIdPwPage from '../pages/auth/FindIdPwPage'
import SigninPage from '../pages/auth/SigninPage'
import SignupPage from '../pages/auth/SignupPage'
import BookclassApplyPage from '../pages/bookclass/BookclassApplyPage'
import BookclassPage from '../pages/bookclass/BookclassPage'
import BookclassView from '../pages/bookclass/BookclassView'
import BooklogArticleEdit from '../pages/booklog/BooklogArticleEdit'
import BooklogArticleUpdate from '../pages/booklog/BooklogArticleUpdate'
import BooklogDetail from '../pages/booklog/BooklogDetail'
import BooklogPage from '../pages/booklog/BooklogPage'
import BooklogSearch from '../pages/booklog/BooklogSearch'
import MyBooklogPage from '../pages/booklog/MyBooklogPage'
import SubscribeBlogPage from '../pages/booklog/SubscribeBlogPage'
import SubscribersPage from '../pages/booklog/SubscribersPage'
import BooksPage from '../pages/books/BooksPage'
import BooksView from '../pages/books/BooksView'
import CampaignAccept from '../pages/campaign/CampaignAccept'
import CampaignApplyPage from '../pages/campaign/CampaignApplyPage'
import CampaignPage from '../pages/campaign/CampaignPage'
import CampaignViewPage from '../pages/campaign/CampaignViewPage'
import OrderPage from '../pages/campaign/OrderPage'
import EventEdit from '../pages/events/EventEdit'
import EventUpdate from '../pages/events/EventUpdate'
import EventsPage from '../pages/events/EventsPage'
import EventsViewPage from '../pages/events/EventsViewPage'
import GoodsEditPage from '../pages/goods/GoodsEditPage'
import GoodsPage from '../pages/goods/GoodsPage'
import GoodsUploadPage from '../pages/goods/GoodsUploadPage'
import GoodsViewPage from '../pages/goods/GoodsViewPage'
import MemberBookclass from '../pages/member/MemberBookclass'
import MemberBookclip from '../pages/member/MemberBookclip'
import MemberCancel from '../pages/member/MemberCancel'
import MemberInfo from '../pages/member/MemberInfo'
import MemberNav from '../pages/member/MemberNav'
import MemberOrderlist from '../pages/member/MemberOrderlist'
import MemberTicket from '../pages/member/MemberTicket'
import PolicyOppolicy from '../pages/policy/PolicyOppolicy'
import PolicyPage from '../pages/policy/PolicyPage'
import PolicyPrivacy from '../pages/policy/PolicyPrivacy'
import PolicyTerms from '../pages/policy/PolicyTerms'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:no" element={<BooksView />} />

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
      <Route path="/goods/new" element={<GoodsUploadPage />} />
      <Route path="/goods/:no/edit" element={<GoodsEditPage />} />

      <Route path="/campaign" element={<CampaignPage />} />
      <Route path="/campaign/:no" element={<CampaignViewPage />} />
      <Route path="/campaign/apply" element={<CampaignApplyPage />} />
      <Route path="/campaign/accept" element={<CampaignAccept />} />
      <Route path="/order" element={<OrderPage />} />

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
  )
}

export default AppRoutes
