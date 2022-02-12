import { RefObject, useEffect, useMemo, useRef, useState } from "react";

export const useIsVisible = (
  ref: RefObject<HTMLElement>,
  threshold: number[]
) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    setIsVisible(entry.isIntersecting);
  };
  const observer = useMemo(
    () => new IntersectionObserver(handleIntersection, { threshold }),
    [ref, threshold]
  );
  useEffect(() => {
    if (ref && ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isVisible;
};

export const useVisibilityTime = (
  ref: RefObject<HTMLElement>,
  threshold: number[]
) => {
  const [visibilityTime, setVisibilityTime] = useState(0);
  const isVisible = useIsVisible(ref, threshold);

  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);
  const visibilityRef = useRef(false);

  const addTime = (time: number) => {
    if (previousTimeRef.current !== undefined && visibilityRef.current) {
      const deltaTime = time - previousTimeRef.current;
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setVisibilityTime(
        (prevTime) => Math.round((prevTime + deltaTime) * 100) / 100
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(addTime);
  };
  useEffect(() => {
    visibilityRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(addTime);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  return visibilityTime;
};
