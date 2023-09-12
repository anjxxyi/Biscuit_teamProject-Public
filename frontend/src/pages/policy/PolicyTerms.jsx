import React from 'react'

import PageVisual from '../../components/layout/PageVisual'
import SideBar from '../../components/layout/SideBar'

import '../../styles/base/sub.css'

const PolicyTerms = () => {
  return (
    <div className="typeTerms">
      <dl>
        <dt>제1조 (목적)</dt>
        <dd className="dot">본 약관은 회원(본 약관에 동의한 자를 말하며 이하 "회원"이라고 합니다)이 주식회사 비스킷(이하 "회사"라고 합니다)가 제공하는 서비스(이하 "서비스"라고 합니다)를 이용함에 있어 회사와 회원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</dd>
      </dl>
      <dl>
        <dt>제2조 (약관의 명시, 효력 및 개정)</dt>
        <dd className="dot">회사는 본 약관의 내용을 회원이 알 수 있도록 서비스 화면에 게시함으로써 이를 공지합니다.</dd>
        <dd className="dot">회사는 콘텐츠산업 진흥법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</dd>
      </dl>
      <dl>
        <dt>제3조 (서비스의 제공)</dt>
        <dd className="dot">회사가 제공하는 서비스의 종류는 아래 각 호로 합니다.</dd>
        <dd>
          <ol>
            <li>도서검색(Books) 서비스</li>
            <li>북로그(Booklog) 서비스</li>
            <li>북클래스(Bookclass) 서비스</li>
            <li>Us, Earth 캠페인(Us, Earth Campaign) 서비스</li>
            <li>Mr.Basak(Mr.Basak Goods) 서비스</li>
            <li>이벤트(Events) 서비스</li>
          </ol>
        </dd>
      </dl>
      <dl>
        <dt>제4조 (서비스 이용)</dt>
        <dd className="dot">서비스 이용시간은 회사의 업무상 또는 기술상 불가능한 경우를 제외하고는 연중무휴 1일 24시간(00:00-24:00)으로 함을 원칙으로 합니다. 다만, 회사는 서비스 설비의 정기점검 등의 사유로 일정 기간 동안 서비스 제공을 일시 중지하거나 서비스 제공 시간을 제한할 수 있으며, 이 경우 회사는 회원에 대해 그 사유를 사전에 통지합니다. 단, 회사는 사전 고지가 불가능한 긴급한 사유가 있는 경우 사후에 통지할 수 있습니다.</dd>
      </dl>
    </div>
  )
}

export default PolicyTerms