# 빠른 시작

IMKIT Platform API를 사용하려면 먼저 [IMKIT Dashboard](https://dashboard.imkit.io/)에서 계정을 생성하고 Chat Server(애플리케이션)를 만들어 Client Key와 API Key를 발급받아야 합니다.

## 1단계: 계정 만들기

1. IMKIT Dashboard의 [회원가입 페이지](https://dashboard.imkit.io/sign_up)에 접속하여 안내에 따라 가입을 완료하세요. 이메일 외에 Apple ID로도 가입할 수 있습니다.

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. 가입 완료 후, 등록한 이메일 받은편지함에서 인증 이메일을 확인하고 안내에 따라 인증을 완료하세요.

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## 2단계: Chat Server 만들기

1. 아래의 `Add Application`을 클릭합니다

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. 애플리케이션 이름을 입력합니다 (웹사이트 또는 앱 이름을 사용할 수 있습니다)

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. 해당 SDK 환경을 선택합니다

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. `Complete`를 클릭하여 Chat Server 생성을 완료합니다

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## 3단계: Chat Server 키 및 파라미터 확인

1. **Client Key**: SDK 측에서 백엔드 API를 호출할 때 사용하는 키로, API 문서에서는 `IM-CLIENT-KEY`로 표기됩니다

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **백엔드 API Key**: 관리자로서 백엔드 API를 호출할 때 사용하는 키로 최고 권한을 가지며, API 문서에서는 `IM-API-KEY`로 표기됩니다

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**: 이 애플리케이션의 Chat Server 실제 URL로, `https://[애플리케이션이름].imkit.io` 형식입니다

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)
