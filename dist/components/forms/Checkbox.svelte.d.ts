import type { CheckboxProps } from '../../types/index.js';
interface CheckboxPropsExtended extends CheckboxProps {
    padding?: boolean;
    htmlId?: string;
    onchange?: (checked: boolean) => void;
}
declare const Checkbox: import("svelte").Component<CheckboxPropsExtended, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
