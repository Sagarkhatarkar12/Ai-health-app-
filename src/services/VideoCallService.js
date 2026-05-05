const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
        {
            urls: 'turn:your-turn-server.com:3478',
            username: 'your_username',
            credential: 'your_password',
        },
    ],
};

const peerConnection = new RTCPeerConnection(configuration);