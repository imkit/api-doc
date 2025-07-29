# Configure chat server

| Key | Environment Variable | Description |
|-----|----------------------|-------------|
| - | NODE_ENV | Specify "development" for sandbox mode |
| mongodb:url | MONGODB_URL | MongoDB URL |
| corsOrigins | CORS_ORIGINS | Allowed CORS Origins Header for socket.io. |
| webhook | WEBHOOK | Room message webhook URL prefix |
| badge | BADGE | External badge service URL |
| auth | AUTH or AUTH_VERIFY_URL | External authorization service URL (token validation). Don't set this variable if you want to use standalone auth mechanism. |
| authSign | AUTH_SIGN | External authentication token generation service URL. Don't set this variable if you want to use standalone authorization mechanism |
| jwtSecret | JWT_SECRET | JWT secret for generating access token in standalone authorization. |
| fcm  | FCM_FILE | FCM credential file path |
| push | PUSH | External push service URL. FCM Format payload to push to single receiver. The Chat Server compute the badge for the receiver |
| pushGeneric | PUSH_GENERIC | Generic Push Service URL (push v2). Message Model + Receiver Array. No badge for each receiver. Rely on the external push api compute badge for each receiver. |
| pushCustomFcmPayload | PUSH_CUSTOM_FCM_PAYLOAD | (URL) Custom FCM Push Payload |
| socket | SOCKET | External socket service URL |
| msgCrypt | MSG_CRYPT | External message encryption/decryption api URL |
| numWorkers  | NUM_WORKERS  | Number of cluster workers |
| jobWorkerOn | JOB_WORKER_ON | Enable job worker. 0=off, 1=on |
| invitationRequired | INVITATION_REQUIRED | Default setting whether invitation required when adding members to a **group** room. 0=off, 1=on |
| socketPingInterval | SOCKET_PING_INTERVAL | [Socket] heartbeat interval |
| socketConnectionLimit | SOCKET_CONNECTION_LIMIT | [Socket] Maximum connections |
| optimizeRoomEventing | OPTIMIZE_ROOM_EVENTING | [Experimental][Socket] Enable optimized room eventing. 0=off, 1=on |
| tokenExpirationDays | TOKEN_EXPIRATION_DAYS | Client access token expiration days. Default 7 days |
| disableLastRead | DISABLE_LAST_READ | Disable tracking last read for better server performance. |
| constantPushBadge | CONSTANT_PUSH_BADGE | Constant badge number for push notification. Set this number would disable counting unread. |
| notificationSoundAndroid | NOTIFICATION_SOUND_ANDROID | Custom notification sound for Android |
| notificationSoundIOS | NOTIFICATION_SOUND_IOS | Custom notification sound for iOS. |
| stickySession | STICKY_SESSION | Sticky session connection. 0=off, 1=on. Default on. |
| aws:bucket    | AWS_BUCKET     | AWS S3 Bucket Name |
| aws:prefix    | AWS_PREFIX | AWS S3 file key prefix |
| aws:endpoint  | AWS_ENDPOINT | AWS Service End Point URL |
| aws:accessKeyId | AWS_ACCESSKEYID | AWS Access Key ID |
| aws:secretAccessKey | AWS_SECRETACCESSKEY | AWS Secret Access Key |
| gcp.apiEndpoint | GCP_API_ENDPOINT | GCP Storage API Endpoint, for GCS Emulator https://github.com/oittaa/gcp-storage-emulator |
| gcp.projectId | GCP_PROJECT_ID | GCP Project ID |
| gcp.bucket    | GCP_BUCKET | GCP Cloud Storage Bucket |
| gcp.credentials | GCP_CREDENTIALS | GCP Credentials (JSON String) |
| platformApiSourceFilter | PLATFORM_API_SOURCE_FILTER | White list of IPs that allowed to access chat server admin APIs with IM-API-KEY (API_KEY), separated by comma. E.g. "10.0.1.2,10.0.1.3" |
| report:url | REPORT_URL | Statistic Data Report URL |
| es:hosts | ELASTIC_SEARCH_HOSTS | Elastic Search hosts for messages, e.g. localhost:9200 |
| elkUrl | ELK_URL | Elastic Search URL for logs. e.g. http://localhost:9200 |
| maxmindAccount | MAXMIND_ACCOUNT | MaxMind account ID |
| maxmindLicenseKey | MAXMIND_LICENSE_KEY | MaxMind license key |

## Apple iOS & APNs

| Key | Environment Variable | Description |
|-----|----------------------|-------------|
| apns:token:key | APNS_KEY | Apple Push Token Key |
| apns:token:keyId | APNS_KEYID | Apple Push Key ID |
| apns:token:teamId | APNS_TEAMID | Apple Developer Team ID |
| apns:appBundleId | APNS_APPBUNDLEID | iOS App Bundle ID |

### Apple iOS VOIP Notification
| Key | Environment Variable | Description |
|-----|----------------------|-------------|
| apns:voipCert | APNS_VOIP_CERT | iOS VOIP notification certificate Path |
| apns:voipKey | APNS_VOIP_KEY | iOS VOIP notification certificate Key |