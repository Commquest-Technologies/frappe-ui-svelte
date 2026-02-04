import type { Placement } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface DateRangePickerProps {
    value?: [string, string];
    placeholder?: string;
    label?: string;
    placement?: Placement;
    class?: string;
    formatter?: (from: string, to: string) => string;
    onchange?: (value: [string, string]) => void;
    trigger?: Snippet<[{
        toggle: () => void;
        isOpen: boolean;
        displayValue: string;
    }]>;
}
declare const DateRangePicker: import("svelte").Component<DateRangePickerProps, {}, "value">;
type DateRangePicker = ReturnType<typeof DateRangePicker>;
export default DateRangePicker;
