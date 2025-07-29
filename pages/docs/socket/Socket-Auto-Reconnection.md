Implementation Sample

## Connect and Subscribe events

```java
    /**
     * Connect socket, start receiving real-time messages
     */
    public void connect() {
        logD(TAG, "connect");
        ...
        if (mSocket != null && mSocket.connected()) {
            logD(TAG, "already connected");
            return;
        }
        IO.Options opts = new IO.Options();
        opts.forceNew = true;
        mSocket = IO.socket(url, opts);
        mSocket.on(Socket.EVENT_CONNECT, mOnConnect);
        mSocket.on(Socket.EVENT_RECONNECT, mOnReconnect);
        mSocket.on(Socket.EVENT_DISCONNECT, mOnDisconnect);
        mSocket.on(Socket.EVENT_ERROR, mOnError);
        mSocket.on(Socket.EVENT_PING, mOnPing);
        ... // Other custom events

        mSocket.connect();
    }
```

## Connection Lifecycle Events

Start heartbeat monitor and perform socket auth

```java
    private Emitter.Listener mOnConnect = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            logD(TAG, "[socket] onConnect");

            startHeartBeat();
            auth();
        }
    };

    private Emitter.Listener mOnReconnect= new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            logD(TAG, "[socket] onReconnect");
            startHeartBeat();
            auth()
            getBadge();
        }
    };

    private Emitter.Listener mOnDisconnect = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            Log.w(TAG, "[socket] onDisconnect");
            //stopHeartBeat();
        }
    };
```

## On Ping Event

```java
    private Emitter.Listener mOnPing= new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            logD(TAG, "[socket] onPing");
            updateLastPingReceivedTime();
            if (mSocket != null && mSocket.connected()) {
                mSocket.emit(Socket.EVENT_PONG);
                logD(TAG, "[socket] pong");
            } else {
                connect();
            }
        }
    };
```

## On Error Event
```java
    private Emitter.Listener mOnError = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            Log.e(TAG, "[socket] mOnError");
            try {
                if (args != null && args.length > 0) {
                    Log.e(TAG, args[0].toString());
                }
                disconnect();
                if (!TextUtils.isEmpty(getToken())) {
                    mMainHandler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            Log.w(TAG, "mOnError trigger reconnect");
                            disconnect();
                            connect();
                        }
                    }, 5000);
                }
            } catch (Exception e) {
                Log.e(TAG, "[socket] mOnError", e);
            }
        }
    };
```

## HeartBeat Monitor

```java
    private void startHeartBeat() {
        try {
            if (heartBeatTimer != null) {
                heartBeatTimer.cancel();
            }
        } catch (Exception e) {
            Log.e(TAG, "startHeartBeat", e);
        }
        heartBeatTimer = new Timer();
        updateLastPingReceivedTime();
        heartBeatTimer.scheduleAtFixedRate(new CheckHeartBeatTask(), 5000, 5000);
    }

    private void stopHeartBeat() {
        try {
            if (heartBeatTimer != null) {
                heartBeatTimer.cancel();
            }
            heartBeatTimer = null;
        } catch (Exception e) {
            Log.e(TAG, "stopHeartBeat", e);
        }
    }

    private void updateLastPingReceivedTime() {
        lastPingReceivedTime = System.currentTimeMillis();
    }

    private class CheckHeartBeatTask extends TimerTask {

        @Override
        public void run() {
            long elapsedTimeToLastPing = System.currentTimeMillis() - lastPingReceivedTime;
            logD(TAG, "[socket] check heartbeat: elapsedTimeToLastPing = " + elapsedTimeToLastPing + "ms");
            if (elapsedTimeToLastPing > maxHeartBeatInterval && !TextUtils.isEmpty(getToken())) {
                Log.w(TAG, "elapsedTimeToLastPing = " + elapsedTimeToLastPing + ", trigger reconnect");
                disconnect();
                connect();
            }
        }
    }

```