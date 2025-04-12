import { useEffect, useState } from 'react';



// I created this hook to refresh the habits at midnight so it be easier to track the daily habits

export function useMidnightRerender() {
  const [tick, setTick] = useState(0);
  const [currentDate, setCurrentDate] = useState(() => new Date().toDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toDateString();
      if (now !== currentDate) {
        setCurrentDate(now);
        setTick((prev) => prev + 1);
      }
    }, 6000); // check every 60 seconds

    return () => clearInterval(interval);
  }, [currentDate]);

  return tick;  // just use it to force re-render
}

