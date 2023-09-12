import React, { useEffect, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"

const PageVisual = () => {
	const path = useLocation().pathname.replace("/", "").split("/");
	const pageDept = path[0];
	const pageMenu = path[1];
	const pageName = path[2];
	const [pageTitle, setPageTitle] = useState(null);
	const [pageInfo, setPageInfo] = useState(null);
	

	useEffect(() => {
    switch (pageDept) {
      case "about":
        setPageTitle("About");
        setPageInfo("반가워요. 당신의 독서 서포터 ‘비스킷’입니다.");
        break;
      case "books":
        setPageTitle("Books");
        setPageInfo("도서를 검색하고, 취향껏 담아 나만의 북클립을 만들어 보세요.");
        break;
      case "booklog":
      if (pageMenu === "now") {
        setPageTitle("Booklog Now");
        setPageInfo(
        "어쩌면 잊혀질 수 있는 지금, 어떤 기록이 남겨지고 있을까요?");
        break;
      } else if (pageMenu === "search") {
        setPageTitle("Booklog Search");
        setPageInfo("북로그를 검색하고, 다양한 생각과 느낌을 나누어 보세요.");
        break;
      } else {
        setPageTitle("Booklog");
        setPageInfo("독서를 하고 떠오르는 생각과 느낌을 가벼운 기록으로 남겨 보세요.");
        break;
      }
      case "bookclass":
      if (pageMenu === "apply") {
        setPageTitle("Create Book Class");
        setPageInfo(
        "하나의 책으로 다양한 생각을 함께 나눠보세요.");
        break;
      } else {
        setPageTitle("Book Class");
        setPageInfo("하나의 책으로 다양한 생각을 함께 나눠보세요.");
        break;
      }
      case "goods":
        if (pageMenu === "new") {
          setPageTitle("New Mr.Basak");
          setPageInfo("새로운 바삭군을 등록하세요.");
          break;
        } else if (pageName === "edit") {
          setPageTitle("Edit Mr.Basak");
          setPageInfo("굿즈 정보를 수정하세요.");
          break;
        } else {
        setPageTitle("Mr.Basak Goods");
        setPageInfo("귀여운 바삭군을 직접 만나보세요.");
        break;
        }
      case "campaign":
        setPageTitle("Us, Earth Campaign");
        setPageInfo("지갑도 챙기고, 생각도 공유하고, 환경도 지키는 일석삼조 리사이클 캠페인");
        break;
      case "market":
        setPageTitle("Biscuit Market");
        setPageInfo("비스킷에서 준비한 다양한 상품과 캠페인을 살펴볼 수 있습니다.");
        break;
      case "events":
        if (pageMenu === "new") {
          setPageTitle("New Event");
          setPageInfo("새로운 이벤트를 등록하세요.");
          break;
        } else {
        setPageTitle("Events");
        setPageInfo("비스킷에서 준비한 다양한 이벤트를 참여해 보세요.");
        break;
        }
      case "policy":
        setPageTitle("Policy");
        setPageInfo("비스킷과 여러분과의 약속입니다.");
        break;
      case "faq":
        setPageTitle("FAQ");
        setPageInfo("자주 하는 질문들을 모아두었습니다.");
        break;
      default:
        setPageTitle("Not Defined Title");
        setPageInfo("Please re-enter the path.");
    }
	}, [pageDept]);

  const [urlparams,] = useSearchParams();

	return (
		<div id="pageVisual" className={pageDept == "books" & !urlparams.get("query") ? "default" : ""}>
			<h2 className="title">{pageTitle}</h2>
			<p className="info">{pageInfo}</p>
		</div>
	);
};

export default PageVisual;
