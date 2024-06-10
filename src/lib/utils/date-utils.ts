export function isToday(date : Date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
}

export function isSameDay(dateA : Date, dateB : Date) {
    return dateA >= startOfDay(dateB) && dateA <= endOfDay(dateB);
}

export function isSameWeekAsToday(date: Date): boolean {
    const today = new Date();
    return isSameWeek(date, today);
}

export function isSameWeek(dateA: Date, dateB: Date): boolean {
    const startOfWeekA = startOfWeek(dateA);
    const startOfWeekB = startOfWeek(dateB);
    return startOfWeekA.getTime() === startOfWeekB.getTime();
}
  

export function formatDate(date : Date) {
    date = new Date(date)
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    // Adding the ordinal suffix to the day
    const dayWithSuffix = (day : any) => {
      const j = day % 10;
      const k = day % 100;
      if (j === 1 && k !== 11) {
        return day + "st";
      }
      if (j === 2 && k !== 12) {
        return day + "nd";
      }
      if (j === 3 && k !== 13) {
        return day + "rd";
      }
      return day + "th";
    };
    return `${month} ${dayWithSuffix(day)} ${year}`;
}

export function getMonthAbbreviation(monthIndex: number): string {
    const monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    if (monthIndex < 0 || monthIndex > 11) {
        throw new Error('Invalid month index');
    }
    return monthAbbreviations[monthIndex];
}


/* =========== Util Functions =========== */

function startOfDay(date : Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

function endOfDay(date : Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
}

export function startOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day; // Sunday as the start of the week
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
}

function endOfWeek(date: Date): Date {
    const endOfWeek = startOfWeek(date);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
}
  
  function getWeekNumber(date : Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    // @ts-ignore
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }