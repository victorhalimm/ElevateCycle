export enum TimerMode {
    Pomodoro = 1500, // 25 minutes
    ShortBreak = 300, // 5 minutes
    LongBreak = 900, // 15 minutes
}


export function changeSecondToMinute(second : number) {
    return second / 60;
}
  