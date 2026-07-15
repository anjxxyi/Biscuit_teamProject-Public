<div align="center">
  <img src="./frontend/public/images/biscuitLogo_dark.svg" alt="Biscuit" width="240" />

  <h3>책을 매개로 기록하고, 발견하고, 연결되는 공간</h3>

  <p>
    독서 기록부터 북클래스, 중고 도서, 굿즈와 이벤트까지<br />
    하나의 경험으로 연결한 도서 커뮤니티 플랫폼입니다.
  </p>

  <p>
    <a href="https://youtu.be/MqECvmNpCtI"><strong>프로젝트 시연 영상</strong></a>
    ·
    <a href="./process/file/Biscuit_final-project_PPT.pdf"><strong>프로젝트 발표 자료</strong></a>
    ·
    <a href="https://biscuit-ui-preview.vercel.app"><strong>UI Preview</strong></a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot 3" />
    <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white" alt="MariaDB" />
    <img src="https://img.shields.io/badge/Repository-Public-8A63D2?style=flat-square&logo=github&logoColor=white" alt="Public repository" />
  </p>
</div>

> 이 저장소는 프로젝트 공개용 사본입니다. 환경 설정과 인증 정보 등 민감한 내용이 포함된 파일은 제외했습니다.<br />
> 2023년 시연용 서버는 운영이 종료되었습니다. 현재 UI Preview는 고정 데이터로 화면과 주요 사용자 흐름을 보여 줍니다.

## About Biscuit

비스킷은 독서 기록 공유, 함께 읽는 북클래스, 중고 도서 거래, 굿즈 스토어를 결합한 도서 커뮤니티 플랫폼입니다.<br />
일반 사용자의 탐색·커뮤니티·커머스 흐름부터 관리자의 승인·운영·데이터 관리 기능까지 전 과정을 구현했습니다.

## Key Features

| 기능 | 제공 경험 |
| --- | --- |
| **Books & Bookclip** | 도서 정보 탐색 및 관심 도서 저장·관리 (Python 크롤링으로 도서 데이터 수집) |
| **Booklog** | 독서 기록 CRUD 및 타 사용자 북로그 검색·구독 |
| **Bookclass** | 독서 모임 개설·참여·취소 및 개설자 전용 모임 관리 |
| **Us, Earth** | 중고 도서 등록 신청·구매 및 관리자 검수·승인 프로세스 |
| **Goods & Event** | 굿즈 주문, 이벤트 참여 및 관리자 상품·이벤트·참여자 관리 |
| **Account & My Page** | 회원가입·로그인·계정 찾기, 저장 도서·모임·주문 내역 통합 조회 |
| **Admin** | 회원 권한/상태 관리, 전체 콘텐츠 운영 및 참여자 목록 엑셀 다운로드 |

## Tech Stack

| 영역 | 기술 |
| --- | --- |
| **Frontend** | React 18, Vite, React Router, Axios, React Slick, Draft.js, SheetJS, CSS |
| **Backend** | Java 17, Spring Boot 3, Spring Security, Spring Data JPA, MyBatis, JWT |
| **Database** | MariaDB |
| **Data** | Python, Web Crawling |
| **Testing** | Vitest, Testing Library, JUnit 5 |
| **Design & Collaboration** | Figma, Adobe Photoshop, Adobe Illustrator, GitHub |
| **Deployment** | AWS EC2 (기존 서비스), Static SPA (UI Preview) |

## Project Structure

```text
Biscuit_teamProject-Public/
├── docs/                     # 백엔드 재연결 공개 가이드
├── frontend/                 # React + Vite 웹 클라이언트
│   ├── public/
│   └── src/
├── backend/
│   └── java-spring/          # Spring Boot API 서버
└── process/
    └── file/                 # 발표 자료 등 프로젝트 산출물
```

## Getting Started

### Frontend

Node.js 18 이상이 필요합니다.

```bash
cd frontend
npm install
npm run dev:preview
```

위 명령은 백엔드 없이 UI Preview를 실행합니다. 전체 로컬 환경을 구성한 경우에는 `npm run dev`를 사용합니다.

### Backend

Java 17과 MariaDB가 필요합니다. 공개 저장소에는 민감한 설정값이 포함되어 있지 않으므로,<br />
로컬 환경에 맞는 애플리케이션 설정을 별도로 구성한 뒤 실행해야 합니다.

```bash
cd backend/java-spring
./gradlew bootRun
```

Windows에서는 `gradlew.bat bootRun`을 사용합니다.<br />
프론트엔드 개발 서버는 기본적으로 `localhost:9090`의 API 서버를 바라봅니다.

### Verification

```bash
# frontend
npm run lint
npm run test:run
npm run build:preview

# backend
./gradlew test
```

> 결제 기능은 팀 프로젝트 시연용 결제 흐름이며 실제 운영 결제로 사용할 수 없습니다.

UI Preview 빌드 결과는 `frontend`에서 `npm run serve:preview`로 확인합니다. 접속 경로는 `/`이며 기본 주소는 `http://localhost:4173/`입니다.

## UI Preview

[UI Preview 열기](https://biscuit-ui-preview.vercel.app)

운영이 종료된 API 서버 대신 프론트엔드의 고정 mock 데이터를 사용해 주요 화면을 둘러볼 수 있습니다.

- 도서, 북로그, 북클래스, 중고 도서, 굿즈와 이벤트 조회
- UI Preview 계정 로그인: `preview` / `biscuit123!`
- 회원가입 입력 및 검증 흐름 체험 (입력 정보는 저장되지 않음)
- 주문·참여 등 주요 상호작용의 UI 흐름 체험
- 외부 지도 대신 위치 안내 화면 제공
- 실제 결제, 파일 업로드, 영구 데이터 저장은 지원하지 않음

정적 배포에서도 새로고침과 직접 URL 접근이 가능하도록 SPA 라우팅을 구성했습니다.

향후 백엔드를 다시 연결할 때는 [백엔드 재연결 가이드](./docs/BACKEND_RECONNECT.md)의 저장소 분리 원칙과 보안 체크리스트를 따릅니다.

## Public Repository Notice

이 저장소는 결과물과 구현 내용을 공유하기 위한 공개 버전입니다.<br />
다음과 같은 정보는 저장소에 포함하지 않습니다.

- 데이터베이스 접속 정보
- API 키와 인증 정보
- 운영 환경 전용 설정
- 개인 정보 또는 운영 계정 정보

## Team

| 이름 | 역할 | GitHub |
| --- | --- | --- |
| 안재이 | Team Lead | [@anjxxyi](https://github.com/anjxxyi) |
| 김성은 | Team Member | [@chickencoc](https://github.com/chickencoc) |
| 박종빈 | Team Member | [@Jonville](https://github.com/Jonville) |
| 권은지 | Team Member | [@xxnjx](https://github.com/xxnjx) |
| 최현정 | Team Member | [@hyungeongchoi2](https://github.com/hyungeongchoi2) |

## Project Period

2023.08.01 — 2023.08.31

## License

This project is licensed under the terms of the [MIT License](./LICENSE).
