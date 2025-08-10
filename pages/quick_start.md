# 快速開始

你需要先在 [IMKIT Dashboard](https://dashboard.imkit.io/) 建立一組帳號，並且建立一個 Chat Server (Application) 以獲得 Client Key 與 API Key 來使用 IMKIT Platform API。

## 步驟一：建立帳戶

1. 前往 IMKIT Dashboard 的[註冊畫面](https://dashboard.imkit.io/sign_up)，依照指示完成帳號註冊。除了 Email 外，也可用 Apple ID 進行註冊。

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. 完成帳號註冊後，請至註冊的信箱收取驗證信，同樣依照指示完成驗證。

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## 步驟二：建立 Chat Server

1. 點擊下方 `Add Application` 

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. 輸入 Application 的名稱（可以是您的網站或 App 的名稱）

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. 選擇對應的 SDK 環境

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. 點擊 `Complete` 完成 Chat Server 建立

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## 步驟三：獲得 Chat Server 相關 Key 值與參數

1. **Client Key**：由 SDK 端呼叫後端 API 時使用的 Key，於 API 文件中會標示為 `IM-CLIENT-KEY` 

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **Backend API Key**：由 Admin 呼叫後端 API 時使用的 Key，權限最高，於 API 文件中會標示為 `IM-API-KEY` 

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**：此 Application 的 Chat Server 實際網址，網址會是 `https://[YourApplicationName].imkit.io` 

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)
