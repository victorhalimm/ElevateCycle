import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { Task } from "@/lib/types/task";
import { getMonthAbbreviation, isSameWeek } from "@/lib/utils/date-utils";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import CalendarCell from "./calendar-cell";
import CalendarCellDecor from "./calendar-cell-decor";

type CalendarProps = {
    selectedDate : Date;
    setSelectedDate : (date : Date) => void;
    weeklyMode? : boolean;
}

const Calendar = ({selectedDate, setSelectedDate, weeklyMode = false} : CalendarProps) => {

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [tasks, setTasks] = useState<Task[]>([]);

    const user = useUser();

    const monthNext = (forward: boolean) => {
        if(forward) {
            setSelectedMonth(selectedMonth + 1);
            if(selectedMonth >= 11) {
                setSelectedYear(selectedYear + 1);
                setSelectedMonth(0);
            }
        } else {
            setSelectedMonth(selectedMonth - 1);
            if(selectedMonth <= 0) {
                setSelectedYear(selectedYear - 1);
                setSelectedMonth(11);
            }
        }
    }

    const getCalendar = () => {
        let firstdate = new Date(selectedYear, selectedMonth, 1);
        let lastdate = new Date(selectedYear, selectedMonth + 1, 0);
        
        let calendarRows : JSX.Element[] = [];
        let dateNumber = 1;

        for(let i = 0; i < (lastdate.getDate() % 7 === 0 ? lastdate.getDate() / 7 : lastdate.getDate() / 7 + 1); i ++) {
            
            let row : JSX.Element[] = [];

            for(let j = 0; j < 7; j++) {
                if(i === 0 && j < firstdate.getDay()) {
                    row.push(
                        <CalendarCellDecor content=""/>
                    )
                }
                else if(dateNumber > lastdate.getDate()) {
                    row.push(
                        <CalendarCellDecor content=""/>
                    )
                }
                else {

                    if(weeklyMode) {
                        row.push(
                            <CalendarCell 
                                date={dateNumber} month={selectedMonth} year={selectedYear} 
                                onClick={setSelectedDate} 
                                isActive={isSameWeek(selectedDate, new Date(selectedYear, selectedMonth, dateNumber))}
                                tasks={tasks}
                                className="rounded-none"
                            />
                        )
                    }
                    else {
                        row.push(
                            <CalendarCell 
                                date={dateNumber} month={selectedMonth} year={selectedYear} 
                                onClick={setSelectedDate} 
                                isActive={selectedDate.getDate() === dateNumber}
                                tasks={tasks}
                            />
                        )
                    }
                    dateNumber++;
                }
            }

            calendarRows.push(
                <tr key={i}>
                    {
                        row
                    }
                </tr>
            );
        }
        return calendarRows;
    }

    useEffect(() => {
        if(!user) return;

        (async () => {
            const taskQuery = query(collection(db, 'tasks'), orderBy('date', 'desc'), where('uid', '==', user.uid))
            const taskRef = await getDocs(taskQuery);
            const taskData : Array<Task> = [];
            taskRef.forEach(doc => {
                // @ts-ignore
                taskData.push({id: doc.id, ...doc.data()});
            })
            setTasks(taskData);
        })()
    }, [user])

    return (
        <div className="">
            <div className="flex items-center gap-6 justify-center font-chakra">
                <MdArrowBackIos onClick={() => monthNext(false)} className="text-pageCream cursor-pointer"/>
                <h2 className="text-pageCream">{getMonthAbbreviation(selectedMonth)}</h2>
                <MdArrowForwardIos onClick={() => monthNext(true)} className="text-pageCream cursor-pointer" />
            </div>

            <table className="text-sm">
                <thead>
                    <tr>
                        <CalendarCellDecor content="Sun" className="font-bold"/>
                        <CalendarCellDecor content="Mon" className="font-bold"/>
                        <CalendarCellDecor content="Tue" className="font-bold"/>
                        <CalendarCellDecor content="Wed" className="font-bold"/>
                        <CalendarCellDecor content="Thu" className="font-bold"/>
                        <CalendarCellDecor content="Fri" className="font-bold"/>
                        <CalendarCellDecor content="Sat" className="font-bold"/>
                    </tr>
                </thead>
                <tbody>
                    {
                        getCalendar()
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;