import { SyntheticEvent, useRef, useState } from "react";

const VideoPlayer = (props: any) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOnTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    //I don't know if the progress  percentage is required to be strictly correct or not.
    //If it is, progress should be calculated with different method(like using requestAnimationFrame).
    const { duration, currentTime } = e.currentTarget;
    const time = Math.round((currentTime / duration) * 100);
    setProgress(time);
  };
  return (
    <video
      width="100%"
      controls
      ref={videoRef}
      onTimeUpdate={handleOnTimeUpdate}
      autoPlay={false}
    >
      <source src={props.src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
