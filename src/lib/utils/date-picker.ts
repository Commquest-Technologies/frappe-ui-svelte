import { dayjs } from './dayjs.js';

type DateConstructorParam = string | number | Date;

export function getDate(...args: DateConstructorParam[]) {
	if (args.length === 0) {
		return new Date();
	}
	return new Date(...(args as [DateConstructorParam]));
}

export function getDateValue(date: Date | string) {
	if (!date || date.toString() === 'Invalid Date') return '';
	const d = dayjs(date);
	if (d.hour() !== 0 || d.minute() !== 0 || d.second() !== 0 || d.millisecond() !== 0) {
		return d.format('YYYY-MM-DD HH:mm:ss');
	}
	return d.format('YYYY-MM-DD');
}

export function getDateTimeValue(date: Date | string) {
	if (!date || date.toString() === 'Invalid Date') return '';
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export function formatDateTime12h(date: Date | string) {
	if (!date || date.toString() === 'Invalid Date') return '';
	return dayjs(date).format('YYYY-MM-DD h:mm a');
}

export function getDatesAfter(date: Date, count: number) {
	let incrementer = 1;
	if (count < 0) {
		incrementer = -1;
		count = Math.abs(count);
	}
	const dates: Date[] = [];
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

export function getDaysInMonth(monthIndex: number, year: number) {
	const daysInMonthMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const daysInMonth = daysInMonthMap[monthIndex];
	if (monthIndex === 1 && isLeapYear(year)) {
		return 29;
	}
	return daysInMonth;
}

export function isLeapYear(year: number) {
	if (year % 400 === 0) return true;
	if (year % 100 === 0) return false;
	if (year % 4 === 0) return true;
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

export function formatTime12h(hours: number, minutes: number): string {
	const period = hours >= 12 ? 'pm' : 'am';
	const h = hours % 12 || 12;
	return `${h}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function parseTimeValue(timeStr: string): { hours: number; minutes: number } {
	if (!timeStr) return { hours: 0, minutes: 0 };
	const [time, period] = timeStr.split(' ');
	const [h, m] = time.split(':').map(Number);
	let hours = h;
	const periodLower = period?.toLowerCase();
	if (periodLower === 'pm' && h !== 12) hours += 12;
	if (periodLower === 'am' && h === 12) hours = 0;
	return { hours, minutes: m };
}

export function generateTimeOptions(): string[] {
	const options: string[] = [];
	for (let h = 0; h < 24; h++) {
		for (let m = 0; m < 60; m += 15) {
			options.push(formatTime12h(h, m));
		}
	}
	return options;
}

export type DatePickerViewMode = 'date' | 'month' | 'year';

export function getCalendarDates(currentYear: number, currentMonth: number) {
	if (!(currentYear && currentMonth)) return [];
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

export function getCalendarWeeks(dates: Date[]): Date[][] {
	const weeks: Date[][] = [];
	const all = dates.slice();
	while (all.length) {
		weeks.push(all.splice(0, 7));
	}
	return weeks;
}
