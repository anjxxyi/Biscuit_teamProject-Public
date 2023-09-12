import React from 'react'

import PageVisual from '../../components/layout/PageVisual'
import SideBar from '../../components/layout/SideBar'

import '../../styles/base/sub.css'

const PolicyPrivacy = () => {
  return (
    <div className="typePrivacy">
      <dl>
        <dt>01. 비스킷 개인정보 처리방침</dt>
        <dd className="dot">개인정보 처리방침”이란 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미하며, 비스킷은 정보통신서비스제공자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보 처리방침을 제공합니다.</dd>
        <dd className="dot">비스킷은 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있습니다. 이용자의 권리(개인정보 자기결정권)를 적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수 있도록 다양한 노력을 기울이고 있으며, 이러한 노력의 일환으로 카카오의 주요 개인정보 처리 관련 정보를 라벨링으로 제공합니다.</dd>
        <dd className="dot">비스킷은 개인정보 처리방침은 회사가 제공하는 서비스(이하 ‘서비스'라 함)에 적용됩니다. 단, 특정 서비스에서 개별적으로 개인정보 처리방침을 운영하는 경우 그에 따릅니다.</dd>
      </dl>
      <dl>
        <dt>02. 개인정보 수집</dt>
        <dd className="dot">서비스 제공을 위한 필요 최소한의 개인정보를 수집합니다.</dd>
        <dd className="dot">회원 가입 시 또는 서비스 이용 과정에서 홈페이지 또는 개별 어플리케이션이나 프로그램 등을 통해 서비스 제공을 위해 필요 최소한의 개인정보를 수집하고 있습니다.</dd>
      </dl>
    </div>
  )
}

export default PolicyPrivacy