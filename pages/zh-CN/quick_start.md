# 快速开始

你需要先在 [IMKIT Dashboard](https://dashboard.imkit.io/) 建立一组帐号，并且建立一个 Chat Server (Application) 以获得 Client Key 与 API Key 来使用 IMKIT Platform API。

## 步骤一：建立帐户

1. 前往 IMKIT Dashboard 的[注册画面](https://dashboard.imkit.io/sign_up)，依照指示完成帐号注册。除了 Email 外，也可用 Apple ID 进行注册。

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. 完成帐号注册后，请至注册的信箱收取验证信，同样依照指示完成验证。

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## 步骤二：建立 Chat Server

1. 点击下方 `Add Application` 

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. 输入 Application 的名称（可以是您的网站或 App 的名称）

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. 选择对应的 SDK 环境

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. 点击 `Complete` 完成 Chat Server 建立

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## 步骤三：获得 Chat Server 相关 Key 值与参数

1. **Client Key**：由 SDK 端呼叫后端 API 时使用的 Key，于 API 文件中会标示为 `IM-CLIENT-KEY` 

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **Backend API Key**：由 Admin 呼叫后端 API 时使用的 Key，权限最高，于 API 文件中会标示为 `IM-API-KEY` 

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**：此 Application 的 Chat Server 实际网址，网址会是 `https://[YourApplicationName].imkit.io` 

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)

## 步骤四：使用 Postman 测试 API（可选）

获得 Key 值后，可以导入我们提供的 Postman Collection，立即对 Chat Server 进行 API 测试，无需编写任何代码。

### 下载

- [IMKit API Collection](/collections/IMKit-API.postman_collection.json)（51 个 API request）
- [IMKit API Environment](/collections/IMKit-API.postman_environment.json)（环境变量模板）

### 导入步骤

1. 打开 Postman，点击左上角 **Import**，分别导入上方两个 JSON 文件
2. 切换至右上角的 Environment 菜单，选择 **IMKit API**，点击 **Edit** 填入以下变量：

| 变量 | 对应值（来自步骤三） |
|------|---------------------|
| `domain` | Chat Server URL（如 `https://myapp.imkit.io`） |
| `apiKey` | Backend API Key |
| `clientKey` | Client Key |
| `token` | 调用「Create or Update User」后获得的 Access Token |

3. 保存后即可选择任一 request 点击 **Send** 开始测试
