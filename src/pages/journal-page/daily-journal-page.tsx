import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { DailyJournal } from "@/lib/types/journals/daily-journal";
import { EditorContent } from "@tiptap/react";
import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "@/lib/styles/tiptap-editor.css"
import { useTiptapEditor } from "@/contexts/tiptap-editor-context";
import DailyTaskTable from "../../components/task/daily-task-table";
import { endOfDay, startOfDay } from "@/lib/utils/date-utils";
import useDebounce from "@/lib/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";


export default function DailyJournalPage() {

    const [journal, setJournal] = useState<DailyJournal | null>(null);

    const {id} = useParams();
    const user = useUser();

    const { editor, setSaving } = useTiptapEditor();
    const [weeklyFocus, setWeeklyFocus] = useState<string[] | null>(null);

    const defaultContent = `
        <h1>Daily Gratitude</h1>
        <p><em>Today, I am grateful for:</em></p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <p></p>
        <h1>Daily Goals</h1>
        <p><em>Today, I will achieve:</em></p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <p></p>
        `

    const createNewJournal = () => {
        if(user === null) return;
        
        setJournal({
            uid: user.uid,
            daily_gratitude: '',
            date: new Date(),
        })
    }

    const saveJournal = async () => {
        setSaving(true);
        
        if(journal === null || user === null) {
            setSaving(false);
            return;
        }

        if(journal.id === undefined) {
            // Create new journal
            const docRef = await addDoc(collection(db, 'dailyJournals'), {
                ...journal,
                date: Timestamp.fromDate(journal.date),
                daily_gratitude: editor?.getHTML(),
            });
            setJournal({ ...journal, id: docRef.id });
        }
        else {
            // Update existing journal
            await updateDoc(doc(db, 'dailyJournals', journal.id), {
                ...journal,
                daily_gratitude: editor?.getHTML(),
            });
        }
        setSaving(false);
    }
    
    useEffect(() => {

        if(user === null) return;
        if(id === undefined) return;

        // If today's journal
        if(id === 'today') {
            const q = query(
                collection(db, 'dailyJournals'), 
                where('uid', "==", user.uid),
            );
            (async () => {
                const docSnap = await getDocs(q);

                if (!docSnap.empty) {
                    let found = false;

                    // If today's journal exists, use that journal
                    docSnap.docs.every(doc => {
                        if(doc.data().date.toDate() >= startOfDay(new Date()) && doc.data().date.toDate() <= endOfDay(new Date())) {
                            // @ts-ignore
                            setJournal({ id: doc.id, ...doc.data(), date: doc.data().date.toDate() });
                            found = true;
                            return false;
                        }
                        return true;
                    })

                    if(!found) createNewJournal();
                } else {
                    // If today's journal does not exist, create a new journal
                    createNewJournal();
                }
            })()
        }
        // If past journal
        else {
            
            (async () => {
                const docSnap = await getDoc(doc(db, 'dailyJournals', id));
                if (!docSnap.exists()) {
                    console.log('No such document!');
                    return;
                }
                // @ts-ignore
                setJournal({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() });
            })()
        }

        return () => {
            saveJournal();
        }
    }, [user])
    
    useEffect(() => {
        if(journal === null) return;
        if(user === null) return;

        (async () => {
            const q = query(
                collection(db, 'weeklyJournals'), 
                where('uid', "==", user.uid),
            );
            const docSnap = await getDocs(q);
            if (!docSnap.empty) {
                docSnap.forEach(doc => {                   
                    setWeeklyFocus(doc.data().weekly_objectives);
                })
            }
        })();

    }, [journal, user])

    useEffect(() => {
        if(journal?.daily_gratitude === undefined || journal?.daily_gratitude === ""){
            editor?.commands.setContent(defaultContent)
        }
        else {
            editor?.commands.setContent(journal?.daily_gratitude)
        }
    }, [editor, journal])

    useDebounce(() => {
        saveJournal();
      }, [editor?.getHTML()], 1000
    );

    return (
        <TooltipProvider>
            {
                journal === null ? (
                    <div className="flex flex-col gap-2 opacity-20">
                        <Skeleton className="h-10 w-24"/>
                        <Skeleton className="h-5 w-96"/>
                        <Skeleton className="h-5 w-72"/>
                        <Skeleton className="h-5 w-80"/>
                        <Skeleton className="h-10 w-24 mt-4"/>
                        <Skeleton className="h-5 w-80"/>
                        <Skeleton className="h-5 w-72"/>
                        <div className="flex gap-24 w-full justify-between mt-10">
                            <div className="flex flex-col gap-2 w-[65%]">
                                <Skeleton className="h-28 w-full"/>
                                <Skeleton className="h-5 w-96"/>
                                <Skeleton className="h-5 w-80"/>
                            </div>
                            <div className="flex flex-col gap-2 w-[30%]">
                                <Skeleton className="h-28 w-full"/>
                                <Skeleton className="h-5 w-[80%]"/>
                                <Skeleton className="h-5 w-[90%]"/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                   <EditorContent editor={editor} className="PromiseMirror tiptap text-pageCream"/>
                    
                    <div className="text-pageCream mt-12 flex gap-10 justify-between">
                        <DailyTaskTable date={journal ? journal.date : new Date()}/>

                        <div className="flex flex-col w-[30%]">
                            <div className="mb-5 flex items-center gap-4">
                                <h1 className="text-xl"><em>Your week's focus</em></h1>
                                <Tooltip delayDuration={200}>
                                    <TooltipTrigger>
                                        <IoMdInformationCircleOutline className="mt-1 opacity-20 cursor-pointer hover:opacity-100"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="text-sm">Organize your day in accordance to your weekly goals.</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="w-full pb-6 bg-zinc-700 bg-opacity-40 p-4">
                                <ol className="list-decimal pl-6">
                                {
                                    weeklyFocus?.map((focus, index) => (
                                        <li key={index}>{focus}</li>
                                    ))
                                }
                                </ol>
                            </div>
                        </div>
                    </div>
                    </>
                )
            }
        </TooltipProvider>
    )
}