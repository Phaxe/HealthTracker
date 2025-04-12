import { useEffect, useState } from 'react';



// I created this hook to refresh the habits at midnight so it be easier to track the daily habits
export function useMidnightRerender() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0, 0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      setTick(prev => prev + 1);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [tick]);

  return tick; // just use it to force re-render
}
