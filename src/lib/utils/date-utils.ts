export function isSameDay(date : Date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

export function startOfDay(date : Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

export function endOfDay(date : Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
}

export function formatDate(date : Date) {
    date = new Date(date)
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    // Adding the ordinal suffix to the day
    const dayWithSuffix = (day) => {
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