import { Button } from "@/components/ui/button";
import { useEffect} from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReplay } from "react-icons/md";
import TimerSettings from "./timer-settings";
import { useTimerContext } from "@/contexts/timer-context";

//Should be Pomodoro Settings
export interface DurationProps {
  Pomodoro: number;
  Short: number;
  Long: number;
}

const PomodoroTimer = ({ className }: { className?: string }) => {
  const {
    duration,
    setDuration,
    mode,
    setMode,
    handleSettingsChange,
    timerProps: { timeLeft, startTimer, pauseTimer, resetTimer, isActive, countdown, isCountdownActive },
    countdownActive,
    setCountdownActive
  } = useTimerContext();

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
    -1 * (circumference - (timeLeft / mode) * circumference);

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

  // useEffect(() => {
  //   const storedConfig = getStoredConfig();
  //   if (storedConfig) {
  //     setDuration(storedConfig);
  //     setMode(storedConfig.Pomodoro);
  //   } else {
  //     saveConfig(defaultDuration);
  //     setMode(defaultDuration.Pomodoro);
  //   }
  //   resetTimer();
  // }, []);

  // useEffect(() => {
  //   console.log(isCountdownActive)
  // }, [isCountdownActive])

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
          {
            isCountdownActive ? countdown : timerFormat(timeLeft)
          }
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
        {duration && (
          <TimerSettings
            setDuration={setDuration}
            setCountdownActive={setCountdownActive}
            countdownActive={countdownActive}
            duration={duration}
            handleSettingsChange={handleSettingsChange}
          >
            <Button className="bg-transparent text-pageCream text-4xl">
              <CiSettings />
            </Button>
          </TimerSettings>
        )}
      </div>
    </div>
  );
};
export default PomodoroTimer;
