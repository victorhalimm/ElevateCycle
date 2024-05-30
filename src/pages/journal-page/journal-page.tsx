import JournalButton from "@/components/journal/journal-button";
import TodayJournalButton from "@/components/journal/today-journal-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { DailyJournal } from "@/lib/types/journals/daily-journal";
import { WeeklyJournal } from "@/lib/types/journals/weekly-journal";
import MainTemplate from "@/templates/main-template";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { useLocation } from "react-router-dom";
import DailyJournalPage from "./daily-journal-page";

const JournalPage = () => {

    const [dailyJournals, setDailyJournals] = useState<DailyJournal[]>([])
    const [weeklyJournals, setWeeklyJournals] = useState<WeeklyJournal[]>([])
    const location = useLocation();

    const user = useUser();

    useEffect(() => {
        (async () => {
            let unsubscribeFirestore = () => {};
        
            if(user !== null) {
                const dailyQuery = query(collection(db, 'dailyJournals'), orderBy('date', 'desc'), where('uid', '==', user.uid))
                const dailyRef = await getDocs(dailyQuery);
                const dailyData = dailyRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // @ts-ignore
                setDailyJournals(dailyData);
                
                const weeklyQuery = query(collection(db, 'weeklyJournals'), orderBy('date', 'desc'), where('uid', '==', user.uid))
                const weeklyRef = await getDocs(weeklyQuery);
                const weeklyData = weeklyRef.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // @ts-ignore
                setWeeklyJournals(weeklyData);
            }

            return () => {
                unsubscribeFirestore();
            }
        })()
    }, [])

    return (
        <MainTemplate>
            <div className="bg-pageBlack w-full p-6 flex gap-3 h-screen">
                <div className="flex-col flex gap-3 h-full w-[20%]">
                    <div className="bg-darkBlue gap-1 w-full h-[80%] px-4 py-6 flex-col flex">
                        <p className="font-chakra text-pageCream text-sm mb-4">JOURNALS</p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-none font-chakra text-pageCream">
                                <AccordionTrigger className="h-10">Daily</AccordionTrigger>
                                <AccordionContent className="">
                                    <ScrollArea className="flex flex-col max-h-[30vh]">
                                        <TodayJournalButton mode="daily"/>
                                        {
                                            dailyJournals.map((journal, index) => (
                                                <JournalButton journal={journal} key={index}/>
                                            ))
                                        }
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-none font-chakra text-pageCream">
                                <AccordionTrigger className="h-10">Weekly</AccordionTrigger>
                                <AccordionContent className="">
                                    <ScrollArea className="flex flex-col max-h-[30vh]">
                                        <TodayJournalButton mode="weekly"/>
                                        {
                                            weeklyJournals.map((journal, index) => (
                                                <JournalButton journal={journal} key={index}/>
                                            ))
                                        }
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="bg-darkBlue w-full h-[20%] px-4 py-6 flex-col flex justify-between">
                        <p className="font-chakra text-pageCream text-sm">ALERTS</p>
                        <p className="font-chakra text-pageCream text-5xl font-medium">20.0</p>
                    </div>
                </div>
                <div className="flex-col flex gap-3 h-full w-[80%]">
                    <div className="bg-darkBlue gap-1 w-full h-full px-8 flex-col flex justify-center">
                        <ScrollArea className="h-[75vh]">
                        {
                            location?.pathname?.includes('daily') ? (
                                <DailyJournalPage />
                            ) : location?.pathname?.includes('weekly') ? (
                                <></>
                            ) : (
                                <></>
                            )
                        }
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </MainTemplate>
    )
}

export default JournalPage;