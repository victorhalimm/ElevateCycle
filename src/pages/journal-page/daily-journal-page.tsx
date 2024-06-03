import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { DailyJournal } from "@/lib/types/journals/daily-journal";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "@/lib/styles/tiptap-editor.css"
import { useTiptapEditor } from "@/contexts/tiptap-editor-context";

export default function DailyJournalPage() {

    const [journal, setJournal] = useState<DailyJournal | null>(null);

    const {id} = useParams();
    const user = useUser();
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const { editor } = useTiptapEditor();

    useEffect(() => {

        if(user === null) return;

        let unsubscribeFirestore = () => {};

        // If today's journal
        if(id === 'today') {
            const q = query(
                collection(db, 'dailyJournals'), 
                where('uid', "==", user.uid),
                where('date', '>=', Timestamp.fromDate(startOfDay)),
                where('date', '<=', Timestamp.fromDate(endOfDay))
            );
            unsubscribeFirestore = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (!querySnapshot.empty) {
                        // If today's journal exists, use that journal
                        const docSnap = querySnapshot.docs[0];
                        //@ts-ignore
                        setJournal({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() });
                      } else {
                        // If today's journal does not exist, create a new journal
                        setJournal({
                            uid: user.uid,
                            daily_gratitude: '',
                            daily_tasks: [],
                            date: new Date(),
                        })
                      }
                });
            });
        }
        // If past journal
        else {
            
        }

        return () => {
            unsubscribeFirestore();
        }
    }, [])
    
    useEffect(() => {
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
        
        editor?.commands.setContent(defaultContent)
    }, [editor, journal])

    console.log(editor?.getHTML())

    return (
        <>
            <EditorContent editor={editor} className="PromiseMirror tiptap text-pageCream focus-visible:outline-none focus:outline-none active:outline-none border-none ring-0"/>
            <div className="min-h-48">
                <h1 onClick={() =>  editor?.chain().focus().toggleHeading({level: 1}).run()} className="text-white">What do you want to do today?</h1>

            </div>
        </>
    )
}