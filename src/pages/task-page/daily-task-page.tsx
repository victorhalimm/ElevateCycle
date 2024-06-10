import HoursTasks from "@/components/task/hours-tasks";
import { Task } from "@/lib/types/task";

type props = {
    selectedDate: Date;
    tasks: Task[];
}

const DailyTaskPage = ({selectedDate, tasks} : props) => {
    return (
        <>
        <p className="text-pageCream text-2xl">{selectedDate.toDateString()}</p>

        <p className="text-neutral-500 mt-4 font-semibold">6:00 AM</p>
        <HoursTasks date={selectedDate} tasks={tasks} timeStart={6} timeEnd={9} className="ml-4"/>

        <p className="text-neutral-500 mt-4 font-semibold">9:00 AM</p>
        <HoursTasks date={selectedDate} tasks={tasks} timeStart={9} timeEnd={12} className="ml-4"/>

        <p className="text-neutral-500 mt-4 font-semibold">1:00 PM</p>
        <HoursTasks date={selectedDate} tasks={tasks} timeStart={13} timeEnd={16} className="ml-4"/>

        <p className="text-neutral-500 mt-4 font-semibold">4:00 PM</p>
        <HoursTasks date={selectedDate} tasks={tasks} timeStart={16} timeEnd={19} className="ml-4"/>

        <p className="text-neutral-500 mt-4 font-semibold">7:00 PM</p>
        <HoursTasks date={selectedDate} tasks={tasks} timeStart={19} timeEnd={22} className="ml-4"/>
        </>
    )
}

export default DailyTaskPage;