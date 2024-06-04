import { Task } from "@/lib/types/task";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import TaskCheckbox from "./task-checkbox";
import TaskCheckboxInput from "./task-checkbox-input";

type props = {
    timeStart : number;
    timeEnd: number;
    date: Date;
    tasks: Task[];
    toggleAdd?: boolean
}

const DailyTaskTableRow = ({timeStart, timeEnd, date, tasks, toggleAdd} : props) => {

    const dateStart = new Date(date);
    dateStart.setHours(timeStart, 0, 0, 0);
    const dateEnd = new Date(date);
    dateEnd.setHours(timeEnd, 0, 0, 0);
    const newDate = new Date(date);
    const difference = (timeStart + timeEnd) / 2
    newDate.setHours(difference, 0, 0, 0);

    const [addTask, setAddTask] = useState<boolean>(false);

    const tasksFiltered = tasks.filter(task => {
        return task.date.toDate() >= dateStart && task.date.toDate() < dateEnd;
    });

    return (
        <tr>
            <td className="p-2 align-top border border-darkCream border-opacity-30">{timeStart <= 9 ? '0' : ''}{timeStart}:00 - {timeEnd <= 9 ? '0' : ''}{timeEnd}:00</td>
            <td className="p-2 align-top border border-darkCream border-opacity-30">
                <div className="flex flex-col gap-3">
                    {
                        tasksFiltered.map(task => (
                            <TaskCheckbox task={task} checkboxClassName="w-4 h-4 border-zinc-600"/>
                        ))
                    }
                    {
                        addTask ? (
                            <TaskCheckboxInput checkboxClassName="w-4 h-4 border-zinc-600" unmount={() => setAddTask(false)} date={newDate}/>
                        ) : (
                            <></>
                        )
                    }
                    <div 
                        className="flex gap-2 items-center text-sm opacity-20 transition-all duration-200 hover:opacity-40 hover:gap-4 cursor-pointer"
                        onClick={() => setAddTask(true)}
                    >
                        <GoPlus className="text-base" /> Add new
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default DailyTaskTableRow;