import React from 'react'

import '../../styles/base/sub.css'
import '../../styles/base/goodsStyle.css'

import PageVisual from "../../components/layout/PageVisual"
import GoodsEditForm from './GoodsEditForm'

const GoodsEditPage = () => {

  return (
    <main id="pageContainer" className="goods">
      <PageVisual/>

      <div id="pageContents">
        <GoodsEditForm />
      </div>

    </main>
  )
}

export default GoodsEditPage