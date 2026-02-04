import type { Placement } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface DatePickerProps {
    value?: string;
    placeholder?: string;
    label?: string;
    clearable?: boolean;
    variant?: 'subtle' | 'outline';
    placement?: Placement;
    class?: string;
    formatter?: (value: string) => string;
    onchange?: (value: string) => void;
    trigger?: Snippet<[{
        toggle: () => void;
        isOpen: boolean;
        displayValue: string;
    }]>;
}
declare const DatePicker: import("svelte").Component<DatePickerProps, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
