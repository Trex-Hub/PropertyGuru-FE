'use client';

import { useEffect, useState, useRef } from 'react';

const TwiceRender = ({ children }: { children: React.ReactNode }) => {
  const [times, setTimes] = useState(1);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimes(old => old + 1);
    });
    return () => {
      if (interval.current) {
        clearInterval(interval.current!);
      }
    };
  }, []);
  useEffect(() => {
    if (times >= 3) {
      if (interval.current) {
        clearInterval(interval.current!);
      }
    }
  }, [times]);

  return (
    <>
      <div>{times % 2 == 1 && children}</div>
    </>
  );
};

export default TwiceRender;
