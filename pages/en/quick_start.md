# Quick Start

You need to first create an account on [IMKIT Dashboard](https://dashboard.imkit.io/) and create a Chat Server (Application) to obtain the Client Key and API Key to use the IMKIT Platform API.

## Step 1: Create Account

1. Go to the [registration page](https://dashboard.imkit.io/sign_up) on IMKIT Dashboard and follow the instructions to complete account registration. Besides Email, you can also register with Apple ID.

![signup1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup1.png)

2. After completing account registration, please check your registered email for a verification email and follow the instructions to complete verification.

![signup2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup2.png)
![signup3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_signup3.png)

## Step 2: Create Chat Server

1. Click `Add Application` below

![application1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application1.png)

2. Enter the Application name (can be your website or App name)

![application2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application2.png)

3. Select the corresponding SDK environment

![application3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application3.png)

4. Click `Complete` to finish creating the Chat Server

![application4](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_application4.png)

## Step 3: Obtain Chat Server Related Keys and Parameters

1. **Client Key**: Key used by the SDK side when calling backend APIs, marked as `IM-CLIENT-KEY` in API documentation

![key1](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key1.png)

2. **Backend API Key**: Key used by Admin when calling backend APIs, with highest permissions, marked as `IM-API-KEY` in API documentation

![key2](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key2.png)

3. **Chat Server URL**: The actual URL of this Application's Chat Server, the URL will be `https://[YourApplicationName].imkit.io`

![key3](https://raw.githubusercontent.com/imkit/api-doc/refs/heads/main/images/dashboard_key3.png)