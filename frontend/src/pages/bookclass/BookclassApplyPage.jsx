import React from 'react'

import '../../styles/base/sub.css'
import '../../styles/base/bookclassStyle.css'

import PageVisual from "../../components/layout/PageVisual"
import BookclassApplyForm from './BookclassApplyForm'

const BookclassApplyPage = () => {
  return (
    <main id="pageContainer" className="bookclass apply">
      <PageVisual/>
      
      <div id="pageContents">
        <BookclassApplyForm />
      </div>
    </main>
  )
}

export default BookclassApplyPage