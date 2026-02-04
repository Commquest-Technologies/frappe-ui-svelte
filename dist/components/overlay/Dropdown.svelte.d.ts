import type { DropdownProps, DropdownItem } from '../../types/index.js';
interface DropdownOption extends DropdownItem {
    onclick?: () => void;
    theme?: 'default' | 'red';
    link?: string;
}
interface DropdownPropsExtended extends DropdownProps {
    options?: DropdownOption[];
    button?: {
        label?: string;
        variant?: 'solid' | 'subtle' | 'outline' | 'ghost';
        theme?: 'gray' | 'blue' | 'green' | 'red';
    };
}
declare const Dropdown: import("svelte").Component<DropdownPropsExtended, {}, "">;
type Dropdown = ReturnType<typeof Dropdown>;
export default Dropdown;
