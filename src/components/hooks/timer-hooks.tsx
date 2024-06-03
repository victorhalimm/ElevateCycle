import { useState, useEffect } from 'react';
import CountdownSound from '@/assets/sound-effects/countdown-sound.mp3';

const useTimer = (initialTime = 25 * 60, enableCountdown = false) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const audio = new Audio(CountdownSound);

  useEffect(() => {
    // @ts-expect-error If the timer is left null
    let timer : NodeJS.Timeout = null;

    if (isCountdownActive && countdown > 0) {
      if (countdown === 3) {
        audio.play().catch(err => console.error("Error playing sound:", err));
      }

      timer = setInterval(() => {
        if (countdown - 1 > 0) {
          setCountdown((c) => c - 1);
        } else {
          setIsActive(true); 
          setIsCountdownActive(false);
          setCountdown(3);

          audio.pause();
          audio.currentTime = 0;
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [countdown, isCountdownActive]);

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

  const startTimer = () => {
    if (enableCountdown) {
      setIsCountdownActive(true);
    } else {
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
    setIsCountdownActive(false);
    audio.pause();
    audio.currentTime = 0;
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(false);
    setIsCountdownActive(false);
    setCountdown(3);
    audio.pause();
    audio.currentTime = 0;
  };

  return { timeLeft, startTimer, pauseTimer, resetTimer, isActive, countdown, isCountdownActive, setIsCountdownActive };
};

export default useTimer;
