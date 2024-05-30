import useTimer from "@/components/hooks/timer-hooks";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";

enum TimerMode {
  Pomodoro = 1500, // 25 minutes
  ShortBreak = 300, // 5 minutes
  LongBreak = 900, // 15 minutes
}

const PomodoroTimer = ({ className }: { className?: string }) => {
  const [mode, setMode] = useState(TimerMode.Pomodoro);

  const { timeLeft, startTimer, pauseTimer, resetTimer, isActive } =
    useTimer(mode);

  const timerFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const size = 350;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const handlePomodoroMode = () => {
    setMode(TimerMode.Pomodoro);
  };

  const handleShortMode = () => {
    setMode(TimerMode.ShortBreak);
  };

  const handleLongMode = () => {
    setMode(TimerMode.LongBreak);
  };

  const handleSettings = () => {

  }

  useEffect(() => {
    resetTimer(); 
  }, [mode]);

  const strokeDashoffset =
    -1 * (circumference - (timeLeft / (25 * 60)) * circumference);

  return (
    <div className={`relative flex flex-col gap-6 items-center ${className}`}>
      <div className="flex gap-4 items-center">
        <div className="flex w-full gap-4 items-center">
          <Button
            onClick={handlePomodoroMode}
            className={`${mode === TimerMode.Pomodoro && 'bg-pageCream text-pageBlack'} transition-colors duration-100  border-pageCream border-2 font-medium text-sm flex items-center  p-4 rounded-lg gap-2`}
          >
            Pomodoro
          </Button>
          <Button
            onClick={handleShortMode}
            className="border-pageCream border-2 font-medium text-sm flex items-center text-pageCream p-4 rounded-lg gap-2"
          >
            Short Break
          </Button>
          <Button
            onClick={handleLongMode}
            className="border-pageCream border-2 font-medium text-sm flex items-center text-pageCream p-4 rounded-lg gap-2"
          >
            Long Break
          </Button>
        </div>
        <Button className="bg-transparent text-pageCream text-4xl">
          <CiSettings />
        </Button>
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
      <div className="space-x-4 mt-4 flex">
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
          className="border-pageCream border-2 text-lg flex items-center text-pageCream p-6 rounded-lg gap-2"
        >
          <CiPause1 />
          Pause
        </Button>
        <Button
          onClick={resetTimer}
          className="border-pageCream border-2 text-lg text-pageCream p-6 rounded-lg"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
export default PomodoroTimer;
