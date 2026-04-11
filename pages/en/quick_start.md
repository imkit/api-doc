# Quick Start

You need to first create an account on the [IMKIT Dashboard](https://dashboard.imkit.io/) and create a Chat Server (Application) to obtain the Client Key and API Key for using the IMKIT Platform API.

## Step 1: Create an Account

1. Go to the [registration page](https://dashboard.imkit.io/sign_up) of the IMKIT Dashboard and follow the instructions to complete the registration. In addition to Email, you can also register using an Apple ID.

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. After completing the registration, check your registered email inbox for the verification email, and follow the instructions to complete verification.

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## Step 2: Create a Chat Server

1. Click `Add Application` below

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. Enter the Application name (this can be the name of your website or app)

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. Select the corresponding SDK environment

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. Click `Complete` to finish creating the Chat Server

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## Step 3: Obtain Chat Server Keys and Parameters

1. **Client Key**: The key used when calling backend APIs from the SDK side, labeled as `IM-CLIENT-KEY` in the API documentation

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **Backend API Key**: The key used when calling backend APIs as an Admin, with the highest permissions, labeled as `IM-API-KEY` in the API documentation

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**: The actual URL of this Application's Chat Server, which will be `https://[YourApplicationName].imkit.io`

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)

## Step 4: Test the API with Postman (Optional)

Once you have your keys, import our Postman Collection to start testing the Chat Server APIs immediately — no code required.

### Downloads

- [IMKit API Collection](/collections/IMKit-API.postman_collection.json) (51 API requests)
- [IMKit API Environment](/collections/IMKit-API.postman_environment.json) (environment variable template)

### Import Steps

1. Open Postman, click **Import** in the top-left corner, and import both JSON files
2. Switch to the Environment dropdown in the top-right corner, select **IMKit API**, then click **Edit** to fill in the following variables:

| Variable | Value (from Step 3) |
|----------|---------------------|
| `domain` | Chat Server URL (e.g. `https://myapp.imkit.io`) |
| `apiKey` | Backend API Key |
| `clientKey` | Client Key |
| `token` | Access Token obtained from the "Create or Update User" API |

3. Save and select any request, then click **Send** to start testing
