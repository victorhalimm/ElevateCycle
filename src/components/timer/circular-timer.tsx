


interface CircularTimerProps {
  size: number;
  strokeWidth: number;
  timeLeft: number;
  totalTime: number;
  countdown: number;
  isCountdownActive: boolean;
}

const CircularTimer: React.FC<CircularTimerProps> = ({ size, strokeWidth, timeLeft, totalTime, countdown, isCountdownActive }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = -1 * (circumference - (timeLeft / totalTime) * circumference);

  const timerFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
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
        fontSize={size / 7} 
        fontWeight={600}
        fill="#F1F0E1"
      >
        {isCountdownActive ? countdown : timerFormat(timeLeft)}
      </text>
    </svg>
  );
};

export default CircularTimer;
