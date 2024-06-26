import { Task } from "@/lib/types/task";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useUser } from "@/contexts/user-context";

type props = {
    className?: string
    checkboxClassName?: string
    unmount: () => void
    date: Date
}

const TaskCheckboxInput = ({className="", checkboxClassName="", unmount, date} : props) => {

    useEffect(() => {
        setAnimateDelete(false)
    }, [])

    const user = useUser();

    const unmountComponent = async () => {
        setAnimateDelete(true)
        await new Promise((resolve) => setTimeout(resolve, 300));
        unmount()
    }

    const addTask = async (withUnmount : boolean) => {
        if(taskValue !== "") {
            if (user === null) return console.error("User not logged in");

            const task: Task = {
                title: taskValue,
                uid: user.uid,
                completed: false,
                // @ts-ignore
                date: Timestamp.fromDate(date),
            };

            if(withUnmount) {
                unmount()
            }
            else {
                setTaskValue("");
            }
            await addDoc(collection(db, "tasks"), task);
            return;
        }
        unmountComponent();
    }

    const handleKey = async(key : string) => {
        if(key === "Enter") {
            await addTask(false);
        }
        else if(key === "Escape") {
            unmountComponent()
        }
    }

    const [taskValue, setTaskValue] = useState<string>("");
    const [hovered, setHovered] = useState<boolean>(false);
    const [animateDelete, setAnimateDelete] = useState<boolean>(true);
    
    return (
        <div className={`text-pageCream text-sm flex items-center justify-between w-full cursor-pointer transition-all duration-300 ${className}`} style={animateDelete ? {transform: "translateY(10%)", opacity: "0%" } : {}} 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center gap-4">
                <Checkbox onCheckedChange={() => {}} checked={false} className={checkboxClassName}/>
                
                <input 
                    className="h-5 bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-zinc-600" 
                    placeholder="Type here..." autoFocus 
                    onBlur={() => addTask(true)} onKeyDown={(e) => handleKey(e.key)}
                    onChange={(e) => setTaskValue(e.target.value)}
                    value={taskValue}
                />
            </div>
            <div className={`flex justify-end flex-shrink-0 items-center transition-all duration-300 text-neutral-500 text-lg ${hovered ? "w-10" : "w-0"}`}>
            </div>
        </div>
    )
}

export default TaskCheckboxInput;