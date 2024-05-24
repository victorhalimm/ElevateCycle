import useTimer from "@/components/hooks/timer-hooks";
import { Button } from "@/components/ui/button";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";

const PomodoroTimer = ({ className }: { className?: string }) => {
  const { timeLeft, startTimer, pauseTimer, resetTimer, isActive } = useTimer(
    25 * 60
  );

  const timerFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const size = 350;
  const strokeWidth = 5; 
  const radius = (size - strokeWidth) / 2; 
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = -1 * (circumference - ((timeLeft / (25 * 60)) * circumference));

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
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
      <div className="space-x-4 mt-4">
        <Button
          onClick={startTimer}
          disabled={isActive}
          className="border-pageCream border-2 text-pageCream px-4 py-2"
        >
        <CiPlay1 />
          Start
        </Button>
        <Button
          onClick={pauseTimer}
          disabled={!isActive}
          className="border-pageCream border-2 text-pageCream px-4 py-2"
        >
          <CiPause1 />  
          Pause
        </Button>
        <Button
          onClick={resetTimer}
          className="border-pageCream border-2 text-pageCream px-4 py-2"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
export default PomodoroTimer;
