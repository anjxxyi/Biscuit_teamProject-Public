import React, { useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { Link, Outlet } from 'react-router-dom'

import '../../styles/base/sub.css'
import '../../styles/base/authStyle.css'

const FindIdPwPage = () => {
  const pageTab = [
    {id: 0, path: 'id', title: '아이디 찾기'},
    {id: 1, path: 'pw', title: '비밀번호 찾기'}
  ]
  
  const [index, setIndex] = useState(0);
  const browserURL = document.location.pathname.replace("/", "").split("/")[3];
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
  console.log("browserURL : " + browserURL);
  console.log("filteredURL : " + filteredURL);

  return (
    <main id="pageContainer" className="auth find styleSide">
      <div id="pageVisual">
        <h2 className="title">
          Find <br />ID/PW
        </h2>
      </div>

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
            <Outlet/>
          </TabPanel>
          ))}
        </Tabs>
      </div>
    </main>
  )
}

export default FindIdPwPage