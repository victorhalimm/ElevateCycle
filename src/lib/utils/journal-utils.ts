import { DailyJournal } from "../types/journals/daily-journal";
import { WeeklyJournal } from "../types/journals/weekly-journal";

export function instanceOfDailyJournal(object: any): object is DailyJournal {
    return 'daily_gratitude' in object;
}

export function instanceOfWeeklyJournal(object: any): object is WeeklyJournal {
    return 'weekly_objectives' in object;
}