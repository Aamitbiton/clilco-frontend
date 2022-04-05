export const webRTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
    {
      urls: "turn:52.48.207.110:3478",
      username: "chaim",
      credential: "itserious123",
    },
  ],
  iceCandidatePoolSize: 10,
};
