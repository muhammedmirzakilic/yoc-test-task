import { RefObject, useEffect, useMemo, useState } from "react";

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
