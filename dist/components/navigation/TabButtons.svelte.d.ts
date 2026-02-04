import type { TabButtonsProps } from '../../types/index.js';
interface TabButtonItem {
    label: string;
    value: string | number;
    disabled?: boolean;
    hideLabel?: boolean;
    onclick?: () => void;
}
interface TabButtonsPropsExtended extends TabButtonsProps {
    buttons?: TabButtonItem[];
    onchange?: (value: string | number) => void;
}
declare const TabButtons: import("svelte").Component<TabButtonsPropsExtended, {}, "value">;
type TabButtons = ReturnType<typeof TabButtons>;
export default TabButtons;
