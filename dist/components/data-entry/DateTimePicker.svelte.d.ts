import type { Placement } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface DateTimePickerProps {
    value?: string;
    placeholder?: string;
    label?: string;
    clearable?: boolean;
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
declare const DateTimePicker: import("svelte").Component<DateTimePickerProps, {}, "value">;
type DateTimePicker = ReturnType<typeof DateTimePicker>;
export default DateTimePicker;
