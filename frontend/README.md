# Biscuit frontend

React 18과 Vite로 구성된 Biscuit 공개 웹 클라이언트입니다.

## 실행

Node.js 18 이상에서 다음 명령을 사용합니다.

```bash
npm install
npm run dev
```

## 환경변수

| 이름 | 설명 |
|---|---|
| `VITE_PUBLIC_URL` | BrowserRouter 및 정적 배포의 기준 경로 |
| `VITE_API_HOST` | 브라우저에서 요청할 API 서버 주소 |
| `VITE_API_PROXY_URL` | 개발 프록시 대상 주소 |
| `VITE_API_JSON_CONTENT` | JSON 요청의 Content-Type 값 |

공개 저장소에 비밀값을 커밋하지 않습니다. 로컬 전용 값은 Vite의 `.env.local` 파일에 둡니다.

## 검증과 배포

```bash
npm run lint
npm run test -- --run
npm run build
```

`postbuild`는 생성된 결과를 GitHub Pages용 `docs` 디렉터리에 복사합니다. 이 공개 레포의 배포 경로와 Vite 설정은 원본 레포를 동기화할 때도 유지합니다.

## 결제 UI Preview

현재 결제 흐름은 팀 프로젝트 시연용입니다. 실제 승인 검증을 제공하지 않으며 운영 결제에 사용할 수 없습니다.
