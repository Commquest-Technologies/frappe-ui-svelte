type DateConstructorParam = string | number | Date;
export declare function getDate(...args: DateConstructorParam[]): Date;
export declare function getDateValue(date: Date | string): string;
export declare function getDateTimeValue(date: Date | string): string;
export declare function formatDateTime12h(date: Date | string): string;
export declare function getDatesAfter(date: Date, count: number): Date[];
export declare function getDaysInMonth(monthIndex: number, year: number): number;
export declare function isLeapYear(year: number): boolean;
export declare const MONTHS: string[];
export declare function formatTime12h(hours: number, minutes: number): string;
export declare function parseTimeValue(timeStr: string): {
    hours: number;
    minutes: number;
};
export declare function generateTimeOptions(): string[];
export type DatePickerViewMode = 'date' | 'month' | 'year';
export declare function getCalendarDates(currentYear: number, currentMonth: number): Date[];
export declare function getCalendarWeeks(dates: Date[]): Date[][];
export {};
