import MainTemplate from "@/templates/main-template";
import PomodoroTimer from "./pomodoro-timer";

const TimerPage = () => {
    return (
        <MainTemplate>
            <div className="p-6">
                <div className="text-3xl text-pageCream">KNTL</div>
                <div className="w-full justify-center">
                    <PomodoroTimer></PomodoroTimer>
                </div>
            </div>
        </MainTemplate> 
    )
}

export default TimerPage;