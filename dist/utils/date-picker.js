import { dayjs } from './dayjs.js';
export function getDate(...args) {
    if (args.length === 0) {
        return new Date();
    }
    return new Date(...args);
}
export function getDateValue(date) {
    if (!date || date.toString() === 'Invalid Date')
        return '';
    const d = dayjs(date);
    if (d.hour() !== 0 || d.minute() !== 0 || d.second() !== 0 || d.millisecond() !== 0) {
        return d.format('YYYY-MM-DD HH:mm:ss');
    }
    return d.format('YYYY-MM-DD');
}
export function getDateTimeValue(date) {
    if (!date || date.toString() === 'Invalid Date')
        return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}
export function formatDateTime12h(date) {
    if (!date || date.toString() === 'Invalid Date')
        return '';
    return dayjs(date).format('YYYY-MM-DD h:mm a');
}
export function getDatesAfter(date, count) {
    let incrementer = 1;
    if (count < 0) {
        incrementer = -1;
        count = Math.abs(count);
    }
    const dates = [];
    while (count) {
        date = getDate(date.getFullYear(), date.getMonth(), date.getDate() + incrementer);
        dates.push(date);
        count--;
    }
    if (incrementer === -1) {
        return dates.reverse();
    }
    return dates;
}
export function getDaysInMonth(monthIndex, year) {
    const daysInMonthMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysInMonth = daysInMonthMap[monthIndex];
    if (monthIndex === 1 && isLeapYear(year)) {
        return 29;
    }
    return daysInMonth;
}
export function isLeapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0)
        return true;
    return false;
}
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
export function formatTime12h(hours, minutes) {
    const period = hours >= 12 ? 'pm' : 'am';
    const h = hours % 12 || 12;
    return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
}
export function parseTimeValue(timeStr) {
    if (!timeStr)
        return { hours: 0, minutes: 0 };
    const [time, period] = timeStr.split(' ');
    const [h, m] = time.split(':').map(Number);
    let hours = h;
    const periodLower = period?.toLowerCase();
    if (periodLower === 'pm' && h !== 12)
        hours += 12;
    if (periodLower === 'am' && h === 12)
        hours = 0;
    return { hours, minutes: m };
}
export function generateTimeOptions() {
    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            options.push(formatTime12h(h, m));
        }
    }
    return options;
}
export function getCalendarDates(currentYear, currentMonth) {
    if (!(currentYear && currentMonth))
        return [];
    const monthIndex = currentMonth - 1;
    const year = currentYear;
    const firstDayOfMonth = getDate(year, monthIndex, 1);
    const lastDayOfMonth = getDate(year, monthIndex + 1, 0);
    const leftPaddingCount = firstDayOfMonth.getDay();
    const rightPaddingCount = 6 - lastDayOfMonth.getDay();
    const leftPadding = getDatesAfter(firstDayOfMonth, -leftPaddingCount);
    const rightPadding = getDatesAfter(lastDayOfMonth, rightPaddingCount);
    const daysInMonth = getDaysInMonth(monthIndex, year);
    const datesInMonth = getDatesAfter(firstDayOfMonth, daysInMonth - 1);
    return [...leftPadding, firstDayOfMonth, ...datesInMonth, ...rightPadding];
}
export function getCalendarWeeks(dates) {
    const weeks = [];
    const all = dates.slice();
    while (all.length) {
        weeks.push(all.splice(0, 7));
    }
    return weeks;
}
