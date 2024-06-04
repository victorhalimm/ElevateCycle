import { Timestamp } from "firebase/firestore";

export type Task = {
    id?: string;
    uid: string;
    title: string;
    completed: boolean;
    date : Date & Timestamp;
}