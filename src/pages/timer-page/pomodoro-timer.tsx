import useTimer from "@/components/hooks/timer-hooks";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReplay } from "react-icons/md";
import TimerSettings from "./timer-settings";

//Should be Pomodoro Settings
export interface DurationProps {
  Pomodoro: number;
  Short: number;
  Long: number;
}

const LOCAL_STORAGE_KEY = "pomodoro-timer-config";

const getStoredConfig = (): DurationProps | null => {
  const storedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedConfig ? JSON.parse(storedConfig) : null;
};

const saveConfig = (config: DurationProps) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
};


const PomodoroTimer = ({ className }: { className?: string }) => {

  const defaultDuration: DurationProps = {
    Pomodoro: 25 * 60, // 25 minutes
    Short: 5 * 60,     // 5 minutes
    Long: 15 * 60      // 15 minutes
  };
  
  const [duration, setDuration] = useState<DurationProps>(defaultDuration);
  
  const [mode, setMode] = useState(duration.Pomodoro);
  
  const { timeLeft, startTimer, pauseTimer, resetTimer, isActive } =
  useTimer(mode);
  
  
  const handleSettingsChange = (newConfig: DurationProps) => {
    setDuration(newConfig);
    setMode(newConfig.Pomodoro);
    saveConfig(newConfig);
  };
  
  const timerFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  const size = 350;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
  -1 * (circumference - (timeLeft / ( mode)) * circumference);
  
  const handlePomodoroMode = () => {
    setMode(duration.Pomodoro);
  };
  
  const handleShortMode = () => {
    setMode(duration.Short);
  };
  
  const handleLongMode = () => {
    setMode(duration.Long);
  };
  


  useEffect(() => {
    resetTimer();
  }, [mode]);
    
    useEffect(() => {
      const storedConfig = getStoredConfig();
      if (storedConfig) {
        setDuration(storedConfig);
        setMode(storedConfig.Pomodoro);
      } else {
        saveConfig(defaultDuration);
        setMode(defaultDuration.Pomodoro);
      }
      resetTimer();
    }, []);

    
    return (
      <div className={`relative flex flex-col gap-6 items-center ${className}`}>
      <div className="flex gap-4 items-center">
        <div className="flex w-full gap-4 items-center">
          <Button
            onClick={handlePomodoroMode}
            className={`${
              mode === duration.Pomodoro &&
              "bg-pageCream text-pageBlack hover:bg-pageCream"
            } transition-colors duration-100  border-pageCream border-2 font-medium text-base flex items-center  p-6 rounded-lg gap-2`}
          >
            Pomodoro
          </Button>
          
          <Button
            onClick={handleShortMode}
            className={`${
              mode === duration.Short &&
              "bg-pageCream text-pageBlack hover:bg-pageCream"
            }border-pageCream border-2 font-medium text-base flex items-center p-6  rounded-lg gap-2`}
          >
            Short Break
          </Button>
          <Button
            onClick={handleLongMode}
            className={`${
              mode === duration.Long &&
              "bg-pageCream text-pageBlack hover:bg-pageCream"
            }border-pageCream border-2 font-medium text-base flex items-center p-6  rounded-lg gap-2
          `}
          >
            Long Break
          </Button>
        </div>
      </div>
      <svg width={size} height={size} className="mx-auto">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#506385"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="lightgray"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />

        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          fontSize="56"
          fontWeight={600}
          fill="#F1F0E1"
        >
          {timerFormat(timeLeft)}
        </text>
      </svg>
      <div className=" mt-4 flex items-center">
        <Button
          onClick={startTimer}
          disabled={isActive}
          className="border-pageCream border-2 text-lg flex items-center text-pageCream  p-6 rounded-lg  gap-2"
        >
          <CiPlay1 />
          Start
        </Button>
        <Button
          onClick={pauseTimer}
          disabled={!isActive}
          className="w-fit bg-transparent text-pageCream text-4xl"
        >
          <CiPause1 />
        </Button>
        <Button
          onClick={resetTimer}
          className="w-fit bg-transparent text-pageCream text-4xl"
        >
          <MdOutlineReplay />
        </Button>
        {duration &&
          <TimerSettings setDuration={setDuration} duration={duration} handleSettingsChange={handleSettingsChange}>
            <Button className="bg-transparent text-pageCream text-4xl">
              <CiSettings />
            </Button>
          </TimerSettings>
        }
      </div>
    </div>
  );
};
export default PomodoroTimer;
