import TaskCheckbox from "@/components/task/task-checkbox"
import { Input } from "@/components/ui/input"
import { useUser } from "@/contexts/user-context"
import { db } from "@/firebase/firebaseConfig"
import { Task } from "@/lib/types/task"
import { addDoc, collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa"

type props = {
    tasks: Task[]
}

const HomeTaskSection = ({tasks} : props) => {

    console.log(tasks)

    const [newTask, setNewTask] = useState('')
    const user = useUser();

    const createTask = async () => {

        if(user === null) return console.error('User not logged in')

        const task : Task = {
            title: newTask,
            uid: user.uid,
            completed: false
        }

        setNewTask('')
        await addDoc(collection(db, "tasks"), task);
    }

    return (
        <div className="flex-col flex gap-3 h-full w-[40%]">
            <div className="bg-darkBlue gap-1 w-full h-[80%] px-4 py-6 flex-col flex justify-between">
                <p className="font-chakra text-pageCream text-sm">TODAY'S TASK LIST</p>
                <div className="flex flex-col gap-2 pt-3 h-full w-full overflow-hidden">
                    {
                        tasks.map((task) => (
                            <TaskCheckbox task={task} />
                        ))
                    }
                </div>
            </div>
            
            <div className="bg-darkCream gap-1 w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                <p className="font-chakra text-pageCream text-sm">ADD TASK</p>
                <div className="w-full flex justify-between relative font-chakra">
                    <Input 
                        className="bg-transparent rounded-sm border-pageCream border-opacity-60 placeholder:text-pageCream placeholder:text-opacity-60 focus-visible:ring-0 transition-all duration-300 text-white focus:bg-black focus:bg-opacity-15" 
                        placeholder="Add New Tasks" value={newTask}
                        onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => {e.key === 'Enter' && createTask()}}
                    />
                    <div className="absolute right-3 h-full flex items-center">
                        <FaArrowRight className="text-lg text-pageCream cursor-pointer" onClick={createTask}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTaskSection