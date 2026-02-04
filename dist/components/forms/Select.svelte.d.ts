import type { SelectProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface SelectPropsExtended extends SelectProps {
    htmlId?: string;
    prefix?: Snippet;
    onchange?: (e: Event) => void;
}
declare const Select: import("svelte").Component<SelectPropsExtended, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
