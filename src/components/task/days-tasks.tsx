import { Task } from "@/lib/types/task";
import { isSameDay } from "@/lib/utils/date-utils";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import TaskCheckbox from "./task-checkbox";
import TaskCheckboxInput from "./task-checkbox-input";

type props = {
    date: Date;
    tasks: Task[];
    className? : string;
}

const DaysTasks = ({date, tasks, className} : props) => {
    
    const dateStart = new Date(date);
    dateStart.setHours(9,0,0,0)

    const [addTask, setAddTask] = useState<boolean>(false);

    const tasksFiltered = tasks.filter(task => {
        return isSameDay(task.date.toDate(), dateStart);
    });

    return (
        <div className={`flex flex-col gap-3 text-pageCream ${className}`}>
            {
                tasksFiltered.map(task => (
                    <TaskCheckbox task={task} checkboxClassName="w-4 h-4 border-zinc-600"/>
                ))
            }
            {
                addTask ? (
                    <TaskCheckboxInput checkboxClassName="w-4 h-4 border-zinc-600" unmount={() => setAddTask(false)} date={dateStart}/>
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
    )
}

export default DaysTasks;