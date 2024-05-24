import { useState, useEffect } from 'react';

const useTimer = (initialTime = 25 * 60) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // @ts-expect-error If the timer is left null
    let timer : NodeJS.Timeout = null;

    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((time) => (time > 0 ? time - 1 : initialTime));
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft, initialTime]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
  };

  return { timeLeft, startTimer, pauseTimer, resetTimer, isActive };
};

export default useTimer;
