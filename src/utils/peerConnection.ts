const servers = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302'],
    },
  ],
};

export const peerConnection = async () => {
  const pc = new RTCPeerConnection(servers);
  pc.onicecandidate = (event) => {
    console.log(event);
  };
  pc.ontrack = (event) => {
    console.log(event);
  };

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  return pc;
};
