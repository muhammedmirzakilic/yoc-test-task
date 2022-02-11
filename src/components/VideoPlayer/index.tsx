import {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIsVisible } from "./hooks";
import { Props } from "./types";

const VideoPlayer: FunctionComponent<Props> = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useIsVisible(videoRef, props.threshold);
  const handleOnTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    //I don't know if the progress  percentage is required to be strictly correct or not.
    //If it is, progress should be calculated with different method(like using requestAnimationFrame).
    const { duration, currentTime } = e.currentTarget;
    const time = Math.round((currentTime / duration) * 100);
    setProgress(time);
  };
  useEffect(() => {
    if (!videoRef || !videoRef.current) return;
    if (isVisible) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    return () => {};
  }, [isVisible]);
  return (
    <video
      width="100%"
      controls
      ref={videoRef}
      onTimeUpdate={handleOnTimeUpdate}
      autoPlay={false}
      muted={true} // to be able to autoplay videoz
    >
      <source src={props.src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
