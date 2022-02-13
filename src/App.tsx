import React from "react";
import VideoPlayer from "./components/VideoPlayer";

export const App: React.FunctionComponent = () => (
  <VideoPlayer src="https://cdn.yoc.com/ad/demo/airbnb.mp4" threshold={0.5} />
);
