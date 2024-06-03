import { Quote } from "@/lib/types/quote";
import { fetchQuote } from "@/services/quote-service";
import { Checkbox } from "@/components/ui/checkbox"; 
import { useEffect, useState } from "react";
import MainTemplate from "@/templates/main-template";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useUser } from "@/contexts/user-context";
import { Task } from "@/lib/types/task";
import HomeTaskSection from "./home-task-section";
import homeDecor from "@/assets/images/home-decor.png"

export const HomePage = () => {

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]); 
    const user = useUser();

    useEffect(() => {
        const getQuote = async () => {

            const category = 'inspirational';
            try {
                const fetchedQuote = await fetchQuote(category);
                setQuotes(fetchedQuote);

                console.log(fetchedQuote);
            } catch (error) {
                console.error('Error fetching quote', error);
            }
        };


        if(quotes.length === 0) {
            getQuote();
        }
            
    }, [quotes])

    useEffect(() => {
        
        let unsubscribeFirestore = () => {};
        
        if(user !== null) {
            // const q = query(collection(db, 'tasks'), orderBy('completed'), where('uid', "==", user.uid));
            const q = query(collection(db, 'tasks'), where('uid', "==", user.uid));
            unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
                let tasksResult : Task[] = [];
                querySnapshot.forEach((doc) => {
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
        <MainTemplate>
            <div className="bg-pageBlack w-full p-6 flex gap-3 h-screen">
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-lightBlue w-full h-[23%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S FOCUS HOUR</p>
                        <p className="font-chakra text-pageCream text-4xl font-medium">20.0</p>
                    </div>
                    <div className="bg-darkBlue gap-1 w-full h-[23%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S COMPLETED TASK</p>
                        <p className="font-chakra text-pageCream text-4xl font-medium">69 / 69</p>
                    </div>
                    <div className="bg-darkBlue gap-1 w-full h-[54%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S REMAINING TASK</p>
                        <div className="flex flex-col gap-2 pt-3">
                        </div>
                    </div>
                </div>
                
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-darkBlue gap-1 w-full h-[calc(46%+1rem)] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">TODAY'S COMPLETED TASK</p>
                        <p className="font-chakra text-pageCream text-4xl font-medium">69 / 69</p>
                    </div>
                    <div className="bg-lightBlue gap-1 w-full h-[54%] px-4 py-6 flex-col flex justify-end relative">
                        <img src={homeDecor} className="absolute top-0 right-0 w-36"/>
                        <p className="font-chakra text-pageCream text-4xl font-medium z-10">QUOTE OF THE DAY</p>
                        {
                            quotes && quotes.length > 0 ? (
                                <p className="font-chakra text-pageCream text-sm">{quotes[0].quote}</p>
                            ) : (
                                <p className="font-chakra text-pageCream text-sm">Loading...</p>
                            )
                        }
                        
                    </div>
                </div>
                
                <HomeTaskSection tasks={tasks}/>
                
            </div>
        </MainTemplate>
    )
}

export default HomePage;