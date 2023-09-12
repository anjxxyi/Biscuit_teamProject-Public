import React from 'react'
import PageVisual from "../../components/layout/PageVisual";
import CampaignApplyForm from './CampaignApplyForm';

function CampaignApplyPage() {
  return (
    <main id="pageContainer" className='campaign apply'>
        <PageVisual/>
        
        {/* #pageContents --- START */}
        <div id="pageContents">
            <CampaignApplyForm />
        </div>
        {/* #pageContents --- END */}
    </main>
  )
}

export default CampaignApplyPage