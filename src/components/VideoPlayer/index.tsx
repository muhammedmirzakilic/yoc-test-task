import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useIsVisible } from "./hooks";
import { Props } from "./types";

const VideoPlayer: FunctionComponent<Props> = (props: Props) => {
  const [progress, setProgress] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(videoContainerRef, props.threshold);
  const handleOnTimeUpdate = (e: Event) => {
    //I don't know if the progress  percentage is required to be strictly correct or not.
    //If it is, progress should be calculated with different method(like using requestAnimationFrame).
    const { duration, currentTime } = e.target as HTMLVideoElement;
    const time = Math.round((currentTime / duration) * 100);
    setProgress(time);
  };
  useEffect(() => {
    if (
      !videoContainerRef ||
      !videoContainerRef.current ||
      !videoContainerRef.current.children.length
    )
      return;
    const videoElement = videoContainerRef.current
      .children[0] as HTMLVideoElement;
    if (isVisible) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [isVisible]);
  useEffect(() => {
    if (!videoContainerRef || !videoContainerRef.current) return;
    const videoElement = videoContainerRef.current
      .children[0] as HTMLVideoElement;
    videoElement.ontimeupdate = handleOnTimeUpdate;
  }, [videoContainerRef]);
  return (
    /**
     * There is an open issue about the video element's attributes: https://github.com/facebook/react/issues/10389
     * React doesn't garantee that all attributes will be written to the actual dom.
     * However, safari prevents autoplaying videos without any user interaction.
     * So video element added to the actual dom directly.
     */
    <div
      ref={videoContainerRef}
      dangerouslySetInnerHTML={{
        __html: `
    <video
      loop
      muted
      autoplay
      playsinline
      preload="metadata"
      width="100%"
    >
    <source src="${props.src}" type="video/mp4" />
    </video>`,
      }}
    />
  );
};

export default VideoPlayer;
