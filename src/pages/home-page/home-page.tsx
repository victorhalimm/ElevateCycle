import { Quote } from "@/lib/types/quote";
import { fetchQuote } from "@/services/quote-service";
import { useEffect, useState } from "react";
import MainTemplate from "@/templates/main-template";
import { collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useUser } from "@/contexts/user-context";
import { Task } from "@/lib/types/task";
import HomeTaskSection from "./home-task-section";
import homeDecor from "@/assets/images/home-decor.png"
import { isToday } from "@/lib/utils/date-utils";

export const HomePage = () => {

    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]); 
    const user = useUser();

    const fullDays = [55, 54, 50, 49, 124, 125, 131, 126, 125, 132, 133, 135, 124, 123, 6, 7];
    const halfDays = [51, 52, 56, 57, 48, 122, 121, 120, 127, 128, 129, 130, 134, 136, 122, 121, 10, 12, 8, 9, 18];

    useEffect(() => {
        const getQuote = async () => {

            if(quotes.length > 0) return;
           
            const category = 'inspirational';
            try {
                const fetchedQuote = await fetchQuote(category);

                if(fetchedQuote[0].quote.length > 200) {
                    getQuote();
                    return;
                }
                setQuotes(fetchedQuote);
            } catch (error) {
                console.error('Error fetching quote', error);
            }
        };

        getQuote();
            
    }, [quotes])
    
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
                    if(isToday(docDate))
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
                                <p className="font-chakra text-pageCream text-sm z-10">{quotes[0].quote}</p>
                            ) : (
                                <p className="font-chakra text-pageCream text-sm z-10">Loading...</p>
                            )
                        }
                        
                    </div>
                </div>
                
                <div className="flex-col flex gap-3 h-full w-[60%] overflow-hidden">
                    <HomeTaskSection tasks={tasks}/>

                    <div className="bg-darkCream text-pageBlack gap-1 w-full h-[23%] px-4 py-6 flex justify-between relative">
                        <p className="font-chakra text-sm font-bold">PERFORMANCE</p>
                        <div className="absolute justify-self-end right-0">
                            <div className="flex -rotate-90 -translate-y-[40%]">
                                <div className="grid grid-cols-[repeat(6,minmax(0,1fr))] gap-1 w-fit -translate-y-[45%]">
                                    {
                                        Array.from({length: 182}).map((_, index) => (
                                            <>
                                            {
                                                index % 7 === 0 && index % 4 === 0 || halfDays.includes(index) ? (
                                                    <div className="h-2.5 w-2.5 bg-lightBlue bg-opacity-55">
                                                        <div className="w-full h-full bg-stone-500 bg-opacity-20"></div>
                                                    </div>
                                                ) : index % 5 === 0 && index % 3 === 0 || fullDays.includes(index) ? (
                                                    <div className="h-2.5 w-2.5 bg-lightBlue"></div>
                                                ) : (
                                                    <div className="h-2.5 w-2.5 bg-stone-500 bg-opacity-50"></div>
                                                )
                                            }
                                            </>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-col justify-between -translate-y-[45%]">
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">JAN</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">FEB</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">MAR</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">APR</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">MAY</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">JUN</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">JUL</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">AUG</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">SEP</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">OCT</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">NOV</p>
                                    <p className="font-chakra text-xs text-stone-500 font-semibold rotate-90">DEC</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </MainTemplate>
    )
}

export default HomePage;