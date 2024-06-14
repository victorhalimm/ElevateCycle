import DaysTasks from "@/components/task/days-tasks";
import { Task } from "@/lib/types/task";
import { startOfWeek } from "@/lib/utils/date-utils";

type props = {
    selectedDate: Date;
    tasks: Task[];
}

const WeeklyTaskPage = ({selectedDate, tasks} : props) => {

    const sunday = startOfWeek(selectedDate);
    const monday = startOfWeek(selectedDate);
    monday.setDate(monday.getDate() + 1);
    const tuesday = startOfWeek(selectedDate);
    tuesday.setDate(tuesday.getDate() + 2);
    const wednesday = startOfWeek(selectedDate);
    wednesday.setDate(wednesday.getDate() + 3);
    const thursday = startOfWeek(selectedDate);
    thursday.setDate(thursday.getDate() + 4);
    const friday = startOfWeek(selectedDate);
    friday.setDate(friday.getDate() + 5);
    const saturday = startOfWeek(selectedDate);
    saturday.setDate(saturday.getDate() + 6);

    return (
        <>
        <p className="text-neutral-500 mt-4 font-semibold">SUNDAY</p>
        <DaysTasks date={sunday} tasks={tasks}/>

        <p className="text-neutral-500 mt-4 font-semibold">MONDAY</p>
        <DaysTasks date={monday} tasks={tasks}/>

        <p className="text-neutral-500 mt-4 font-semibold">TUESDAY</p>
        <DaysTasks date={tuesday} tasks={tasks}/>
        
        <p className="text-neutral-500 mt-4 font-semibold">WEDNESDAY</p>
        <DaysTasks date={wednesday} tasks={tasks}/>

        <p className="text-neutral-500 mt-4 font-semibold">THURSDAY</p>
        <DaysTasks date={thursday} tasks={tasks}/>
        
        <p className="text-neutral-500 mt-4 font-semibold">FRIDAY</p>
        <DaysTasks date={friday} tasks={tasks}/>
        
        <p className="text-neutral-500 mt-4 font-semibold">SATURDAY</p>
        <DaysTasks date={saturday} tasks={tasks}/>
        </>
    )
}

export default WeeklyTaskPage;