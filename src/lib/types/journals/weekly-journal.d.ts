import { Task } from "../task";
import { Journal } from "./journal";

export interface WeeklyJournal extends Journal {
    weekly_objectives: string[],

}