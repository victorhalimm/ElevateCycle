import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { Task } from "@/lib/types/task";
import { isSameDay } from "@/lib/utils/date-utils";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import DailyTaskTableRow from "./daily-task-table-row";

const DailyTaskTable = ({date} : {date : Date}) => {

    const user = useUser();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        
        let unsubscribeFirestore = () => {};
        
        if(user !== null) {
            // const q = query(collection(db, 'tasks'), orderBy('completed'), where('uid', "==", user.uid));
            const q = query(
                collection(db, 'tasks'),
                where('uid', "==", user.uid),
            );
            unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
                let tasksResult : Task[] = [];
                querySnapshot.forEach((doc) => {
                    let docDate = doc.data().date.toDate()
                    if(isSameDay(docDate, date))
                        //@ts-ignore
                        tasksResult.push({ id: doc.id, ...doc.data() });
                });
                // tasksResult.sort((a,b) => (a.completed > b.completed) ? 1 : ((b.completed > a.completed) ? -1 : 0))
                setTasks(tasksResult);
            });
        }

        return () => {
            unsubscribeFirestore();
        }
    }, [user]);

    return (
        <div className="w-[55%]">
            <h1 className="mb-5 text-xl"><em>What do you want to do today?</em></h1>
                
        <table className="table-auto text-left align-top w-full">
            <thead>
                    <tr>
                        <th className="p-2 align-top border border-darkCream border-opacity-30 bg-zinc-700 bg-opacity-40 w-[25%]">Time</th>
                        <th className="p-2 align-top border border-darkCream border-opacity-30 bg-zinc-700 bg-opacity-40 w-[75%]">Task</th>
                    </tr>
                </thead>
                <tbody>
                    <DailyTaskTableRow date={date} timeStart={6} timeEnd={9} tasks={tasks} />
                    <DailyTaskTableRow date={date} timeStart={9} timeEnd={12} tasks={tasks} />
                    <DailyTaskTableRow date={date} timeStart={13} timeEnd={16} tasks={tasks} />
                    <DailyTaskTableRow date={date} timeStart={16} timeEnd={19} tasks={tasks} />
                    <DailyTaskTableRow date={date} timeStart={19} timeEnd={22} tasks={tasks} />
                </tbody>
            </table>
        </div>
    )
}

export default DailyTaskTable;