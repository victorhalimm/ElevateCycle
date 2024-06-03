import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import useTimer from "@/components/hooks/timer-hooks";

export interface DurationProps {
  Pomodoro: number;
  Short: number;
  Long: number;
}

export interface TimerContextType {
  duration: DurationProps;
  setDuration: (config: DurationProps) => void;
  mode: number;
  setMode: (mode: number) => void;
  handleSettingsChange: (config: DurationProps) => void;
  timerProps: ReturnType<typeof useTimer>;
  countdownActive: boolean;
    setCountdownActive: (countdownActive: boolean) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const defaultDuration: DurationProps = {
    Pomodoro: 1500, // 25 minutes
    Short: 300,     // 5 minutes
    Long: 900       // 15 minutes
  };

  const [duration, setDuration] = useState<DurationProps>(defaultDuration);
  const [mode, setMode] = useState<number>(duration.Pomodoro);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);

  const timerProps = useTimer(mode, countdownActive);

  useEffect(() => {
    const storedConfig = localStorage.getItem("pomodoro-timer-config");
    if (storedConfig) {
      const config: DurationProps = JSON.parse(storedConfig);
      setDuration(config);
      setMode(config.Pomodoro);
    }
  }, []);

  const handleSettingsChange = (newConfig: DurationProps) => {
    setDuration(newConfig);
    setMode(newConfig.Pomodoro);
    localStorage.setItem("pomodoro-timer-config", JSON.stringify(newConfig));
  };

  return (
    <TimerContext.Provider value={{ duration, setDuration, mode, setMode, handleSettingsChange, timerProps, countdownActive, setCountdownActive }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};
