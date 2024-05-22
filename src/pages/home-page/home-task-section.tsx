import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useUser } from "@/contexts/user-context"
import { db } from "@/firebase/firebaseConfig"
import { Task } from "@/lib/types/task"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"

type props = {
    tasks: Task[]
}

const HomeTaskSection = ({tasks} : props) => {

    const [newTask, setNewTask] = useState('')
    const user = useUser();

    const createTask = async () => {

        if(user === null) return console.error('User not logged in')

        const task : Task = {
            id: '',
            title: newTask,
            uid: user.uid,
            status: 'todo'
        }

        setNewTask('')
        await addDoc(collection(db, "tasks"), task);
    }

    return (
        <div className="flex-col flex gap-3 h-full w-[40%]">
            <div className="bg-darkBlue gap-1 w-full h-[80%] px-4 py-6 flex-col flex justify-between">
                <p className="font-chakra text-pageCream text-sm">TODAY'S TASK LIST</p>
                <div className="flex flex-col gap-2 pt-3 h-full">
                    {
                        tasks.map((task) => (
                            <div key={task.id} className="text-pageCream gap-2 text-sm flex items-center">
                                <Checkbox id={task.id}/>
                                <label htmlFor={task.id}>{task.title}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="bg-darkCream gap-1 w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                <p className="font-chakra text-pageCream text-sm">ADD TASK</p>
                <div className="w-full flex justify-between relative font-chakra">
                    <Input 
                        className="bg-transparent rounded-sm border-pageCream border-opacity-60 placeholder:text-pageCream placeholder:text-opacity-60 focus-visible:ring-0 text-white" 
                        placeholder="Add New Tasks" value={newTask}
                        onChange={(e) => setNewTask(e.target.value)} onKeyDown={(e) => {e.key === 'Enter' && createTask()}}
                    />
                    <div className="absolute right-3 h-full flex items-center">
                        <FaArrowRight className="text-lg text-pageCream" onClick={createTask}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTaskSection