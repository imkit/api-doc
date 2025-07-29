![](https://github.com/FUNTEKco/chat-server-document/blob/master/SocketLifeCycle.jpg)

# Step 0. Establish Connection
SocketIO.connect()

onConnect() {
  // on connect event callback
  config()
}

# Step 1. Configuration (Optional)

Emit event: conf

Arguments: Data config object

| Key | Value | Description |
| --- | ----- | ----------- |
| encoding | base64 | Enable receiving base64-encoded data from socket server, to avoid socket-io parsing issue |


## Java implementation sample
```java
    /**
     * Config socket connection
     */
    private void configSocket() {
        logD(TAG, "[socket] config");
        JSONObject conf = new JSONObject();
        try {
            if (transportCrypt != null) { // Custom transport encoding/decoding
               conf.put("encoding", "custom");
            } else {
               conf.put("encoding", "base64");
            }
        } catch (JSONException e) {
            Log.e(TAG, "create socket config");
        }
        if (mSocket == null || !mSocket.connected()) {
            Log.e(TAG, "[socket] config: mSocket is null or not connected");
            return;
        }
        mSocket.emit(EVENT_CONF, conf, new Ack() {
            @Override
            public void call(Object... args) {
                logD(TAG, "[socket] config ack: " + args[0].toString());
                try {
                    JSONObject result = (JSONObject) convertSocketData(args[0]);
                    logD(TAG, "[socket] config ack result=" + result);
                    auth();
                } catch (Exception e) {
                    Log.e(TAG, "[socket] auth ack", e);
                }
            }
        });
    }
```


# Step 2. Authorization (Required)

Emit event: auth2

Arguments: Token, DeviceId

| Argument | Description |
| --- | ----------- |
| token | Client access token |
| deviceId | Device identity |


## Java implementation sample
```java
    /**
     * Authorize socket connection
     */
    private void auth() {
        logD(TAG, "[socket] auth");
        if (mSocket == null || !mSocket.connected()) {
            Log.e(TAG, "mSocket is null or not connected");
            return;
        }
        JSONObject jsonObject = new JSONObject(getCustomRequestHeader());
        mSocket.emit(EVENT_AUTH, mToken, jsonObject, new Ack() {
            @Override
            public void call(Object... args) {
                try {
                    logD(TAG, "[socket] auth ack " + args[0].toString());
                    JSONObject result = (JSONObject) convertSocketData(args[0]);
                    logD(TAG, "[socket] auth ack result=" + result);
                } catch (Exception e) {
                    Log.e(TAG, "[socket] auth error ", e);
                    triggerReconnect();
                }
            }
        });
    }
```

# Step 3. Observer chat_message event to start receiving messages

## Java implementation sample
```java
    private Emitter.Listener mOnChatMessage = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            logD(TAG, "onChatMessage");

            try {
                if (args.length < 1) {
                    Log.e(TAG, "[socket] mOnChatMessage No data received");
                    return;
                }

                final JSONObject json = (JSONObject) convertSocketData(args[0]);
                if (!(json instanceof JSONObject)) {
                    Log.e(TAG, "[socket] mOnChatMessage Unexpected data received");
                    return;
                }
                logD(TAG, "[socket] onChatMessage:" + json.toString());

                mMainHandler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        handleReceivedMessage(json);
                    }
                }, 300);
            } catch (Exception e) {
                Log.e(TAG, "[socket] onChatMessage", e);
            }
        }
    };

    private Object convertSocketData(Object in) {
        try {
            if (in instanceof JSONObject) {
                return in;
            }
            if (in instanceof String) {
                String decoded;
                String str = (String) in;
                if (transportCrypt != null) { // Custom transport encoding
                    decoded = transportCrypt.decrypt(str);
                } else { // Default base64 encoding
                    byte[] bytes = Base64.decode(str, Base64.DEFAULT);
                    decoded = new String(bytes);
                }
                logD(TAG, "convertSocketData decoded = " + decoded);
                return new JSONObject(decoded);
            }
        } catch (Exception e) {
            Log.e(TAG, "convertSocketData", e);
        }
        return null;
    }
```