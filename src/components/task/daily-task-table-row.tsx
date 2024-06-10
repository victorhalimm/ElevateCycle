import { Task } from "@/lib/types/task";
import HoursTasks from "./hours-tasks";

type props = {
    timeStart : number;
    timeEnd: number;
    date: Date;
    tasks: Task[];
}

const DailyTaskTableRow = ({timeStart, timeEnd, date, tasks} : props) => {

    return (
        <tr>
            <td className="p-2 align-top border border-darkCream border-opacity-30">{timeStart <= 9 ? '0' : ''}{timeStart}:00 - {timeEnd <= 9 ? '0' : ''}{timeEnd}:00</td>
            <td className="p-2 align-top border border-darkCream border-opacity-30">
                <HoursTasks timeStart={timeStart} timeEnd={timeEnd} date={date} tasks={tasks}/>
            </td>
        </tr>
    )
}

export default DailyTaskTableRow;