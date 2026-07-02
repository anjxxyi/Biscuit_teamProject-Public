# Biscuit frontend

React 18과 Vite로 구성된 Biscuit 공개 웹 클라이언트입니다.

## 실행

Node.js 18 이상에서 다음 명령을 사용합니다.

```bash
npm install
npm run dev:preview
```

## 환경변수

| 이름 | 설명 |
|---|---|
| `VITE_UI_PREVIEW_MODE` | 예시 데이터로 실행하는 UI Preview 활성화 여부 |
| `VITE_BASE_PATH` | BrowserRouter 및 정적 배포의 기준 경로 |
| `VITE_API_HOST` | 브라우저에서 요청할 API 서버 주소 |
| `VITE_NAVER_MAP_CLIENT_ID` | 실제 API 모드에서 사용하는 공개 지도 client ID |

공개 저장소에 비밀값을 커밋하지 않습니다. 로컬 전용 값은 Vite의 `.env.local` 파일에 둡니다.

## 검증과 배포

```bash
npm run lint
npm run test:run
npm run build:preview
npm run serve:preview
```

UI Preview는 백엔드 없이 예시 데이터로 실행합니다. 실제 백엔드 연결 절차는 [재연결 가이드](../docs/BACKEND_RECONNECT.md)를 따릅니다.

`build:preview`는 루트 경로(`/`)용 정적 파일을 `dist`에 생성합니다. `serve:preview`는 해당 결과를 로컬에서 확인합니다. 일반 `build`의 `postbuild`는 기존 GitHub Pages용 복사 작업이므로 별도 흐름입니다.

UI Preview는 이 프로젝트의 화면 확인용 버전을 뜻합니다. Vercel의 Preview/Production 배포 환경 구분과는 별개이며, UI Preview를 Production 환경에 배포할 수도 있습니다.

## 결제 UI Preview

현재 결제 흐름은 팀 프로젝트 시연용입니다. 실제 승인 검증을 제공하지 않으며 운영 결제에 사용할 수 없습니다.
