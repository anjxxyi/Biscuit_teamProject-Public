import requests
from bs4 import BeautifulSoup as bs
import json
import sys

# 담아 둘 배열
bookInfo = {}

# 크롤링할 page / sys.argv : 실행 변수 사용
page = requests.get(sys.argv[1])
soup = bs(page.text, "html.parser")

# html tag
indexName = soup.select('div.bookTitle_info_title__QuH_u')
authors = soup.select('span.bookTitle_inner_content__REoK1' )
authorDetail = soup.select('div.authorIntroduction_introduce_text__RYZDj' )

# data in
if indexName[1].get_text() != "번역": # 번역가가 없는 책일 때
      if authorDetail:
            bookInfo["author"] = authors[0].get_text()
            bookInfo["authorDetail"] = authorDetail[0].get_text()
            bookInfo["translator"] = None
            bookInfo["translatorDetail"] = None
      else:
            bookInfo["author"] = authors[0].get_text()
            bookInfo["authorDetail"] = None
            bookInfo["translator"] = None
            bookInfo["translatorDetail"] = None
elif len(authorDetail) == 1: # 번역가의 소개가 없는 책일 때
            bookInfo["author"] = authors[0].get_text()
            bookInfo["authorDetail"] = authorDetail[0].get_text()
            bookInfo["translator"] = authors[1].get_text()
            bookInfo["translatorDetail"] = None
else: # 작가와 번역가 둘 다 설명 있을 때
      bookInfo["author"] = authors[0].get_text()
      bookInfo["authorDetail"] = authorDetail[0].get_text()
      bookInfo["translator"] = authors[1].get_text()
      bookInfo["translatorDetail"] = authorDetail[1].get_text()

# data response
print (json.dumps(bookInfo))
# print (bookInfo)