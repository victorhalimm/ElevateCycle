import { Task } from "@/lib/types/task";

type params = {
    date: number;
    month : number;
    year : number;
    onClick : any;
    isActive : boolean;
    tasks? : Task[] | undefined;
    className? : string;
}

const CalendarCell = ({date, month, year, onClick, isActive, tasks, className} : params) => {

    let status = 0;

    if(tasks) {
        tasks.forEach(task => {
            let taskDate = task.date.toDate();
            if(taskDate.getDate() === date && taskDate.getMonth() === month && taskDate.getFullYear() === year) {
                if(date < new Date().getDate()) {
                    status = 2
                }
                else if(date >= new Date().getDate()) {
                    status = 1
                }
            }
        })
    }
    
    return (
        <td 
            key={date} onClick={() => onClick(new Date(year, month, date))}
            className={`w-12 h-12 text-pageCream  text-center align-middle font-chakra select-none cursor-pointer relative rounded-md ${className}
                ${isActive ? 'bg-neutral-700 bg-opacity-80' : ''}`} 
        >
            {date}
            <div className="absolute h-full w-full top-0 left-0 pointer-events-none flex justify-center items-center">
                {
                    status === 1 ? (
                        <div className="absolute bg-lightBlue w-1.5 h-1.5 rounded-full mt-8"></div>
                    ) : status === 2 ? (
                        <div className="absolute bg-red-400 w-1.5 h-1.5 rounded-full mt-8"></div>
                    ) : <></>
                }
            </div>
        </td>
    )
}

export default CalendarCell;