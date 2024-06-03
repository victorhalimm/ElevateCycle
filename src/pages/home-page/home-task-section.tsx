import TaskCheckbox from "@/components/task/task-checkbox";
import CircularTimer from "@/components/timer/circular-timer";
import { Input } from "@/components/ui/input";
import { useTimerContext } from "@/contexts/timer-context";
import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { Task } from "@/lib/types/task";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

type props = {
  tasks: Task[];
};

const HomeTaskSection = ({ tasks }: props) => {
  console.log(tasks);

  const [newTask, setNewTask] = useState("");
  const user = useUser();

  const createTask = async () => {
    if (user === null) return console.error("User not logged in");

    const task: Task = {
      title: newTask,
      uid: user.uid,
      completed: false,
      date: new Date(),
    };

    setNewTask("");
    await addDoc(collection(db, "tasks"), task);
  };

  const {
    mode,
    timerProps: {
      timeLeft,
      countdown,
      isCountdownActive,
    },
  } = useTimerContext();

  const size = 290;
  const strokeWidth = 5;

  return (
    <div className="flex-col flex gap-3 h-full w-[60%]">
      <div className="flex h-[77%] w-full gap-3">
        <div className="bg-darkBlue gap-1 w-[50%] px-4 py-6 flex-col flex justify-between">
          <p className="font-chakra text-pageCream text-sm">
            TODAY'S TASK LIST
          </p>
          <div className="flex flex-col gap-2 pt-3 h-full w-full overflow-hidden">
            {tasks.map((task) => (
              <TaskCheckbox task={task} />
            ))}
          </div>
        </div>

        <div className="h-full w-[50%] flex gap-3 flex-col">
          <div className="bg-darkBlue w-full h-full px-4 py-6">
            <p className="font-chakra text-pageCream text-sm">ONGOING TIMER</p>
            <div className="flex h-full items-center">
                <CircularTimer
                size={size}
                strokeWidth={strokeWidth}
                timeLeft={isCountdownActive ? countdown : timeLeft}
                totalTime={mode}
                countdown={countdown}
                isCountdownActive={isCountdownActive}
                />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-darkCream text-pageBlack gap-1 w-full h-[23%] px-4 py-6 flex-col flex justify-between">
        <p className="font-chakra text-sm font-bold">ADD TASK</p>
        <div className="w-full flex justify-between relative font-chakra">
          <Input
            className="bg-transparent rounded-sm border-pageBlack border-opacity-60 placeholder:text-pageBlack placeholder:text-opacity-80 focus-visible:ring-0 transition-all duration-300 font-medium text-pageBlack"
            placeholder="Add New Tasks"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && createTask();
            }}
          />
          <div className="absolute right-3 h-full flex items-center">
            <MdKeyboardArrowRight
              className="text-lg cursor-pointer opacity-70"
              onClick={createTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTaskSection;
