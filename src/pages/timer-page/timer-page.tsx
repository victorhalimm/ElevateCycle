import MainTemplate from "@/templates/main-template";
import PomodoroTimer from "./pomodoro-timer";

const TimerPage = () => {
    return (
        <MainTemplate>
            <div className="p-6">
                <div className="w-full justify-center flex flex-col items-center">
                    <PomodoroTimer />
                </div>
            </div>
        </MainTemplate> 
    )
}

export default TimerPage;