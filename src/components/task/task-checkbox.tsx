import { Task } from "@/lib/types/task";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { RxCross2 } from "react-icons/rx";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

type props = {
    task: Task
    className?: string
    checkboxClassName?: string
}

const TaskCheckbox = ({task, className="", checkboxClassName=""} : props) => {

    const [checked, setChecked] = useState<boolean>(task.completed);
    const [hovered, setHovered] = useState<boolean>(false);
    const [animateDelete, setAnimateDelete] = useState<boolean>(true);

    useEffect(() => {
        setChecked(task.completed)
        setAnimateDelete(false)
    }, [task])

    const changeChecked = (checked : boolean) => {
        if(!task.id) {
            return;
        }

        const docRef = doc(db, "tasks", task.id);
        updateDoc(docRef, {
            completed: checked
        })

        setChecked(checked);
    }

    const deleteTask = async () => {
        if(!task.id) {
            return;
        }

        setAnimateDelete(true)
        await new Promise((resolve) => setTimeout(resolve, 300));

        const docRef = doc(db, "tasks", task.id);
        await deleteDoc(docRef);
        setAnimateDelete(false)
    }
    
    return (
        <div key={task.id} className={`text-pageCream text-sm flex items-center justify-between w-full cursor-pointer transition-all duration-300 ${className}`} style={animateDelete ? {transform: "translateY(10%)", opacity: "0%" } : {}} 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center gap-4">
                <Checkbox id={task.id} onCheckedChange={(e: boolean) => changeChecked(e)} checked={checked} className={checkboxClassName}/>
                <div 
                    className={`w-fit relative flex items-center transition-all duration-100 ${checked ? "opacity-40" : "opacity-100"}`}
                >
                    <div className={`absolute h-[1px] bg-slate-300 transition-all duration-200 ${checked ? "w-full" : "w-0"}`}></div>
                    <label className={`cursor-pointer w-full truncate overflow-hidden select-none ${hovered ? "max-w-[calc(40px+14vw)]" : "max-w-[calc(60px+14vw)]"}`} htmlFor={task.id}>{task.title}</label>
                </div>
            </div>
            <div className={`flex justify-end flex-shrink-0 items-center transition-all duration-300 text-neutral-500 text-lg ${hovered ? "w-10" : "w-0"}`}>
                <RxCross2 onClick={deleteTask}/>
            </div>
        </div>
    )
}

export default TaskCheckbox;