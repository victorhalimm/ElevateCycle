import { Task } from "../task";
import { Journal } from "./journal";

export interface DailyJournal extends Journal {
    daily_gratitude: string,
}