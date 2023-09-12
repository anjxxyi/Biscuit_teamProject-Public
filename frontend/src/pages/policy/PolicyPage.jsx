import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import PageVisual from '../../components/layout/PageVisual'
import SideBar from '../../components/layout/SideBar'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import '../../styles/base/sub.css'
import '../../styles/base/policyStyle.css'

const PolicyPage = () => {
  const pageTab = [
    {id: 0, path: 'terms', title: '서비스 이용약관'},
    {id: 1, path: 'privacy', title: '개인정보 처리방침'},
    {id: 2, path: 'oppolicy', title: '운영정책'}
  ]
  
  const [index, setIndex] = useState(0);
  const browserURL = document.location.pathname.replace("/", "").split("/")[2];
  const filteredURL = pageTab.map(({ path }) => path);

  useEffect(() => {
    const checkURL = (arr, val) => {
      return arr.filter(function(arrVal) {
        return val === arrVal;
      })[0];
    };
    const matchedURL = checkURL(filteredURL, browserURL);
    setIndex(filteredURL.indexOf(matchedURL));
  }, [browserURL]);

  return (
    <main id="pageContainer" className="policy">
      <PageVisual/>

      <div id="pageContents">
        <Tabs className="tabArea" selectedIndex={index} onSelect={index => setIndex(index)}>
          <TabList className="tabList">
            {pageTab.map(page => (
              <Tab className="tabItem" selectedClassName="active" key={page.id}>
                <Link to={`./${page.path}`}>{page.title}</Link>
              </Tab>  
            ))}
          </TabList>
          {pageTab.map(page => (
          <TabPanel className="tabPanel" selectedClassName="active" key={page.id}>
            <h3 className="title">{page.title}</h3>
            <Outlet/>
          </TabPanel>
          ))}
        </Tabs>
      </div>
      <SideBar />
    </main>
  )
}


export default PolicyPage