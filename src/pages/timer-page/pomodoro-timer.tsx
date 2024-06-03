import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import { MdOutlineReplay } from "react-icons/md";
import TimerSettings from "./timer-settings";
import { useTimerContext } from "@/contexts/timer-context";
import CircularTimer from "@/components/timer/circular-timer";

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
    timerProps: {
      timeLeft,
      startTimer,
      pauseTimer,
      resetTimer,
      isActive,
      countdown,
      isCountdownActive,
    },
    countdownActive,
    setCountdownActive,
  } = useTimerContext();

  const [modeChanged, setModeChanged] = useState(false);

  const size = 350;
  const strokeWidth = 7;


  const handlePomodoroMode = () => {
    console.log("pomodoro clicked");
    setMode(duration.Pomodoro);
    setModeChanged(true);
  };

  const handleShortMode = () => {
    console.log("short clicked");
    setMode(duration.Short);
    setModeChanged(true);
  };

  const handleLongMode = () => {
    console.log("long clicked");
    setMode(duration.Long);
    setModeChanged(true);
  };

  useEffect(() => {
    if (modeChanged) {
      resetTimer();
      setModeChanged(false);
    }
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
      <CircularTimer
        size={size}
        strokeWidth={strokeWidth}
        timeLeft={isCountdownActive ? countdown : timeLeft}
        totalTime={mode}
        countdown={countdown}
        isCountdownActive={isCountdownActive}
      />

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
