import type { ComboboxProps, ComboboxOption } from '../../types/index.js';
interface ComboboxPropsExtended extends ComboboxProps {
    onchange?: (value: string | number | null, option: ComboboxOption | null) => void;
}
declare const Combobox: import("svelte").Component<ComboboxPropsExtended, {}, "value">;
type Combobox = ReturnType<typeof Combobox>;
export default Combobox;
