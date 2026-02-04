import type { PopoverProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface PopoverPropsExtended extends PopoverProps {
    show?: boolean;
    triggerEvent?: 'click' | 'hover';
    hoverDelay?: number;
    leaveDelay?: number;
    hideOnBlur?: boolean;
    onopen?: () => void;
    onclose?: () => void;
    target?: Snippet<[{
        open: () => void;
        close: () => void;
        toggle: () => void;
        isOpen: boolean;
    }]>;
    body?: Snippet<[{
        open: () => void;
        close: () => void;
        toggle: () => void;
        isOpen: boolean;
    }]>;
}
declare const Popover: import("svelte").Component<PopoverPropsExtended, {}, "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
