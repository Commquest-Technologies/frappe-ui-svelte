export declare function formatLabel(name: string): string;
export declare function formatValue(value: number, precision?: number, shorten?: boolean, locale?: string): string;
export type TimeGrain = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
export declare function formatDate(date: string, format?: string, grain?: TimeGrain): string;
export declare function isObject(item: unknown): item is Record<string, unknown>;
export declare function mergeDeep<T extends Record<string, unknown>>(target: T, ...sources: T[]): T;
