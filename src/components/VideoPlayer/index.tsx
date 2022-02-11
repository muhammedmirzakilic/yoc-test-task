import { useRef } from "react";

const VideoPlayer = (props: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <video width="100%" controls ref={videoRef} autoPlay={false}>
      <source src={props.src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
