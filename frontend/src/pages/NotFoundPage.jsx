import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main id="pageContainer" className="subPage">
      <section className="pageContents" aria-labelledby="not-found-title">
        <h2 id="not-found-title">페이지를 찾을 수 없습니다.</h2>
        <p>주소를 다시 확인하거나 홈으로 이동해 주세요.</p>
        <Link className="btnBasic" to="/">
          홈으로 이동
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
