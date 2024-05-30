import { useUser } from "@/contexts/user-context";
import { db } from "@/firebase/firebaseConfig";
import { DailyJournal } from "@/lib/types/journals/daily-journal";
import { Journal } from "@/lib/types/journals/journal";
import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


export default function DailyJournalPage() {

    const [journal, setJournal] = useState<DailyJournal | null>(null);

    const {id} = useParams();
    const user = useUser();
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

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
            return;
        }
        // If past journal
        else {
            
        }


        return () => {
            unsubscribeFirestore();
        }
    }, [])

    return (
        <>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        </>
    )
}