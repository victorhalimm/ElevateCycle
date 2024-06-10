import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { EditorContent } from "@tiptap/react";
import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import "@/lib/styles/tiptap-editor.css"
import { useTiptapEditor } from "@/contexts/tiptap-editor-context";
import { isSameWeekAsToday } from "@/lib/utils/date-utils";
import useDebounce from "@/lib/hooks/use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { WeeklyJournal } from "@/lib/types/journals/weekly-journal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";


export default function WeeklyJournalPage() {

    const [journal, setJournal] = useState<WeeklyJournal | null>(null);

    const {id} = useParams();
    const user = useUser();

    const { editor, setSaving } = useTiptapEditor();
    const [weekFocus, setWeekFocus] = useState<string[]>(['', '', '', '', '']);
    const refList = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    const changeWeekFocus = (value: string, index: number) => {
        const newWeekFocus = [...weekFocus];
        newWeekFocus[index] = value;
        setWeekFocus(newWeekFocus);
    }

    const handleKeyFocus = (key : string, index : number) => {

        if(key === 'Enter' || key === 'Tab' || key === 'ArrowDown') {
            //@ts-ignore
            refList[index+1 > 4 ? 0 : index+1].current.focus();
        }
        else if(key === 'ArrowUp') {
            //@ts-ignore
            refList[index-1 < 0 ? 4 : index-1].current.focus();
        }
    }

    const defaultContent = `
        <h1>Weekly Review</h1>
        <p><em>Review the completion of your previous weekly goals</em></p>
        <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ol>
        <p></p>
        <h1>Weekly Advancements</h1>
        <p><em>Write down progress and wins that you've made on the previous week</em></p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <p></p>
        <h1>Things to be Improved</h1>
        <p><em>Write down every improvement and refinement that can be made</em></p>
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
            weekly_review: '',
            weekly_objectives: ['', '', '', '', ''],
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
            const docRef = await addDoc(collection(db, 'weeklyJournals'), {
                ...journal,
                date: Timestamp.fromDate(journal.date),
                weekly_review: editor?.getHTML(),
                weekly_objectives: weekFocus,
            });
            setJournal({ ...journal, id: docRef.id });
        }
        else {
            // Update existing journal
            await updateDoc(doc(db, 'weeklyJournals', journal.id), {
                ...journal,
                weekly_review: editor?.getHTML(),
                weekly_objectives: weekFocus,
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
                collection(db, 'weeklyJournals'), 
                where('uid', "==", user.uid),
            );
            (async () => {
                const docSnap = await getDocs(q);

                if (!docSnap.empty) {
                    let found = false;

                    // If this week's journal exists, use that journal
                    docSnap.docs.every(doc => {
                        if(isSameWeekAsToday(doc.data().date.toDate())) {
                            // @ts-ignore
                            setJournal({ id: doc.id, ...doc.data(), date: doc.data().date.toDate() });
                            setWeekFocus(doc.data().weekly_objectives);
                            found = true;
                            return false;
                        }
                        return true;
                    })

                    if(!found) createNewJournal();
                } else {
                    // If week's journal does not exist, create a new journal
                    createNewJournal();
                }
            })()
        }
        // If past journal
        else {
            
            (async () => {
                const docSnap = await getDoc(doc(db, 'weeklyJournals', id));
                if (!docSnap.exists()) {
                    console.log('No such document!');
                    return;
                }
                // @ts-ignore
                setJournal({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() });
                setWeekFocus(docSnap.data().weekly_objectives);
            })()
        }

        return () => {
            saveJournal();
        }
    }, [user])
    
    useEffect(() => {
        if(journal?.weekly_review === undefined || journal?.weekly_review === ""){
            editor?.commands.setContent(defaultContent)
        }
        else {
            // editor?.commands.setContent(defaultContent)
            editor?.commands.setContent(journal?.weekly_review)
        }
    }, [editor, journal])

    useDebounce(() => {
        saveJournal();
      }, [editor?.getHTML(), weekFocus], 800
    );

    return (
        <TooltipProvider>
            {
                journal === null ? (
                    <div className="flex flex-col gap-2 opacity-20">
                        <div className="flex gap-24 w-full justify-between mt-10">
                            <div className="flex flex-col gap-2 w-[65%]">
                                <Skeleton className="h-10 w-24"/>
                                <Skeleton className="h-5 w-96"/>
                                <Skeleton className="h-5 w-72"/>
                                <Skeleton className="h-5 w-80"/>
                                <Skeleton className="h-10 w-24 mt-4"/>
                                <Skeleton className="h-5 w-80"/>
                                <Skeleton className="h-5 w-72"/>
                                <Skeleton className="h-10 w-24 mt-4"/>
                                <Skeleton className="h-5 w-80"/>
                                <Skeleton className="h-5 w-72"/>
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

                    <div className="text-pageCream flex gap-10 justify-between w-full relative">

                        <EditorContent editor={editor} className="PromiseMirror tiptap text-pageCream break-words text-wrap w-[60%]"/>
                        
                        <div className="w-[35%] flex justify-end">
                            <div className="flex flex-col fixed md:w-[calc(60px+16vw)] w-[calc(60px+10vw)]">
                                <div className="w-full bg-zinc-700 bg-opacity-40 p-5">
                                    <div className="mb-5 flex items-center gap-4">
                                        <h1 className="text-xl"><em>Your week's focus</em></h1>
                                        
                                        <Tooltip delayDuration={200}>
                                            <TooltipTrigger>
                                                <IoMdInformationCircleOutline className="mt-1 opacity-20 cursor-pointer hover:opacity-100"/>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-sm">List down 5 <b><em>actionable</em></b> micro goals that will lead you to your macro goal.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <ol className="list-decimal pl-6">
                                    {
                                        Array.from({length: 5}, (_, i) => i).map((i) => {
                                            return (
                                                <li>
                                                    <input 
                                                        type="text" placeholder="Type here..." ref={refList[i]}
                                                        className="ml-2 w-full bg-transparent placeholder:text-neutral-500 focus:outline-none text-pageCream" 
                                                        value={weekFocus[i]} onChange={(e) => changeWeekFocus(e.target.value, i)} onKeyDown={(e) => handleKeyFocus(e.key, i)}
                                                    />
                                                </li>
                                            )
                                        })
                                    }
                                    </ol>
                                </div>
                            </div>

                        </div>

                    </div>
                    </>
                )
            }
        </TooltipProvider>
    )
}