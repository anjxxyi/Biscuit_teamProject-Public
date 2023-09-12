import React from 'react'

import '../../styles/base/sub.css'
import '../../styles/base/goodsStyle.css'

import PageVisual from "../../components/layout/PageVisual"
import GoodsUploadForm from './GoodsUploadForm'
import AdminHandler from '../../components/layout/AdminHandler'

const GoodsUploadPage = () => {

  return (
    <main id="pageContainer" className="goods typeEdit">
      <PageVisual/>

      <div id="pageContents">
        <GoodsUploadForm/>
      </div>

			<AdminHandler edit={`/goods/new`}/>
    </main>
  )
}

export default GoodsUploadPage