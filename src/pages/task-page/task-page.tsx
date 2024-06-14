import Calendar from "@/components/calendar/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { Task } from "@/lib/types/task";
import { isSameDay } from "@/lib/utils/date-utils";
import MainTemplate from "@/templates/main-template";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import DailyTaskPage from "./daily-task-page";
import WeeklyTaskPage from "./weekly-task-page";


const TaskPage = () => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [weeklyMode, setWeeklyMode] = useState<boolean>(false);
    const user = useUser();

    useEffect(() => {
        let unsubscribeFirestore = () => {};
        
        if(user !== null) {
            const q = query(
                collection(db, 'tasks'),
                where('uid', "==", user.uid),
            );
            unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
                let tasksResult : Task[] = [];
                querySnapshot.forEach((doc) => {
                    let docDate = doc.data().date.toDate()
                    if(isSameDay(docDate, selectedDate) || weeklyMode)
                        //@ts-ignore
                        tasksResult.push({ id: doc.id, ...doc.data() });
                });
                setTasks(tasksResult);
            });
        }

        return () => {
            unsubscribeFirestore();
        }

    }, [selectedDate, user, weeklyMode])

    console.log(tasks)
    return (
        <MainTemplate>
            <div className="bg-pageBlack w-full p-6 flex gap-3 h-screen">
                <div className="flex-col flex gap-3 h-full w-[22.5%]">
                    <div className="bg-darkBlue gap-1 w-full px-4 py-6 flex-col flex justify-between">
                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} weeklyMode={weeklyMode}/>
                    </div>
                    <div className="bg-lightBlue w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S REMAINING TASKS</p>
                        <p className="font-chakra text-pageCream text-4xl font-medium">3</p>
                    </div>
                    <div className="bg-darkBlue gap-1 w-full h-[20%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm">TASKS PAST DUE</p>
                        <div className="flex flex-col gap-2 pt-3">
                            <p className="font-chakra text-pageCream text-4xl font-medium">20</p>
                        </div>
                    </div>
                </div>
                <div className="flex-col flex gap-3 h-full w-[72.5%]">
                    <div className="bg-darkBlue w-full h-[10%] px-4 py-6 flex gap-8 items-center">
                        <p 
                            className={`font-chakra text-xl font-medium cursor-pointer select-none transition-all duration-100 hover:underline ${!weeklyMode ? "text-lighterBlue" : "text-pageCream"}`} 
                            onClick={() => setWeeklyMode(false)}
                        >
                            DAILY
                        </p>
                        <p 
                            className={`font-chakra text-xl font-medium cursor-pointer select-none transition-all duration-100 hover:underline ${weeklyMode ? "text-lighterBlue" : "text-pageCream"}`} 
                            onClick={() => setWeeklyMode(true)}
                        >
                            WEEKLY
                        </p>
                    </div>
                    <div className="bg-darkBlue w-full h-full px-4 py-6">
                        <ScrollArea className="h-[60vh]">
                            <div className="flex flex-col gap-4 font-chakra">
                                {
                                    weeklyMode ? (
                                        <WeeklyTaskPage selectedDate={selectedDate} tasks={tasks}/>
                                    ) : (
                                        <DailyTaskPage selectedDate={selectedDate} tasks={tasks}/>
                                    )
                                }
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </MainTemplate>
    )
}

export default TaskPage;