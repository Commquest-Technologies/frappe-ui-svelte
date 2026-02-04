import type { Snippet } from 'svelte';
import type { Placement } from '../../types/index.js';
type Option = {
    label: string;
    value: string | number;
    disabled?: boolean;
    description?: string;
};
type OptionGroup = {
    group: string;
    items: (string | Option)[];
    hideLabel?: boolean;
};
interface AutoCompleteProps {
    value?: string | number | (string | number)[] | null;
    options?: (string | Option | OptionGroup)[];
    multiple?: boolean;
    label?: string;
    placeholder?: string;
    loading?: boolean;
    hideSearch?: boolean;
    showFooter?: boolean;
    maxOptions?: number;
    placement?: Placement;
    bodyClasses?: string;
    class?: string;
    onchange?: (value: string | number | (string | number)[] | null) => void;
    prefix?: Snippet<[Option | Option[] | null]>;
    suffix?: Snippet<[Option | Option[] | null]>;
    itemPrefix?: Snippet<[Option]>;
    itemSuffix?: Snippet<[Option]>;
}
declare const AutoComplete: import("svelte").Component<AutoCompleteProps, {}, "value">;
type AutoComplete = ReturnType<typeof AutoComplete>;
export default AutoComplete;
