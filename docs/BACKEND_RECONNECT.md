# 백엔드 재연결 가이드

이 문서의 UI Preview는 예시 데이터를 사용하는 화면 확인용 버전입니다. Vercel의 Preview 배포 환경과는 별개입니다.

이 공개 가이드는 Private 저장소의 인프라 정보를 노출하지 않고 프론트엔드와 API의 연결 경계만 설명합니다. 백엔드 원본, 운영 설정, 비밀값 교체 절차는 Private 저장소에서 관리합니다.

## 저장소별 책임

| 저장소 | 담당 범위 | 포함하면 안 되는 정보 |
| --- | --- | --- |
| Public | UI Preview, mock adapter, 공개 API 계약, 비밀값 없는 예시 | 인증 정보, 서명 키, 비공개 주소, 개인 정보 |
| Private | 백엔드 원본, 운영 절차, 필요한 환경변수 목록 | Git에 커밋된 실제 비밀값 |

Preview adapter는 삭제 대상이 아니라 장애 및 운영 종료에 대비한 fallback입니다. `VITE_UI_PREVIEW_MODE=true`이면 Axios가 `src/preview/adapter.js`를 사용하고, 그 외에는 `src/api/client.js`를 통해 실제 HTTP API를 호출합니다.

## 로컬 재연결

1. 먼저 Private 저장소에서 백엔드를 복구하고 테스트합니다.
2. `deploy/ui-preview`에서 `integrate/backend`와 같은 프론트엔드 통합 브랜치를 만듭니다.
3. 공개 예시를 로컬 설정으로 복사합니다. 생성된 로컬 파일은 커밋하지 않습니다.

   ```powershell
   cd frontend
   Copy-Item .env.example .env.local
   ```

4. 브라우저에 공개되어도 되는 다음 값만 설정합니다.

   ```dotenv
   VITE_UI_PREVIEW_MODE=false
   VITE_API_HOST=
   VITE_BASE_PATH=/
   ```

   `VITE_API_HOST`를 비우면 로컬 개발에서 Vite의 `/api` proxy를 사용합니다. 원격 HTTPS 백엔드를 직접 호출할 때만 `https://api.example.com`처럼 공개 API origin을 지정합니다.

5. `npm run dev:preview`가 아닌 `npm run dev`를 실행합니다.
6. 실제 응답은 `src/preview/fixtures.js`, 실제 route는 `src/preview/adapter.js`와 비교합니다. UI가 사용하는 응답 필드를 유지하거나 API 계약과 프론트엔드를 함께 변경합니다.

## 운영 전환

다음 순서로 확인합니다.

- 백엔드를 HTTPS로 배포하고 health, DB migration, upload, log를 확인합니다.
- CORS에는 정확한 프론트엔드 Production 및 Preview origin만 허용합니다. Credential 요청과 wildcard origin을 함께 사용하지 않습니다.
- DB 인증 정보, JWT 서명 키, Cloud credential, 결제 API secret은 백엔드 hosting secret store에만 저장합니다.
- 프론트엔드 배포 환경에는 `VITE_UI_PREVIEW_MODE=false`, `VITE_API_HOST=https://api.example.com`, `VITE_BASE_PATH=/`처럼 공개 가능한 값만 설정합니다.
- 실제 연동 브랜치에서 `frontend/vercel.json`의 `npm run build:preview`를 `npm run build`로 변경합니다. `.env.preview`는 수정하거나 삭제하지 않고 rollback 경로로 유지합니다.
- 지도용 client identifier는 허용 domain을 제한합니다. Provider secret은 절대 `VITE_*`에 넣지 않습니다.
- Preview guard만 제거해 실제 결제를 활성화하지 않습니다. 백엔드가 결제 상태, 주문 ID, 금액, 통화, 중복 요청, 취소 및 환불 상태를 독립적으로 검증해야 합니다.

배포 환경변수를 변경한 뒤에는 기존 build에 반영되지 않으므로 새로 배포합니다.

## 인수 테스트

- 비로그인 및 로그인 요청이 의도한 API origin으로 전달됩니다.
- 로그인, token 만료, logout, 권한 오류가 정상 동작합니다.
- SPA 하위 URL 직접 접근과 새로고침이 동작합니다.
- 파일 형식, 크기, 소유권, 저장 경로를 백엔드에서 검증합니다.
- 서버 결제 검증 전에는 결제가 비활성화되어 있습니다.
- Git history, browser source, build log, screenshot 어디에도 비밀값이 없습니다.
- `npm run build:preview`로 되돌리면 서버 없는 UI Preview가 다시 동작합니다.

## 보안 참고 자료

- [Vite 환경변수와 mode](https://vite.dev/guide/env-and-mode.html)
- [Vercel 환경변수](https://vercel.com/docs/environment-variables)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
