import type { DialogProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
type DialogPosition = 'center' | 'top';
type IconAppearance = 'info' | 'warning' | 'danger' | 'success';
interface DialogAction {
    label: string;
    theme?: 'gray' | 'blue' | 'green' | 'red';
    variant?: 'solid' | 'subtle' | 'outline' | 'ghost';
    loading?: boolean;
    onclick?: () => void | Promise<void>;
}
interface DialogIcon {
    name: string;
    appearance?: IconAppearance;
}
interface DialogPropsExtended extends DialogProps {
    options?: {
        title?: string | Snippet;
        message?: string;
        size?: DialogSize;
        position?: DialogPosition;
        icon?: string | DialogIcon;
        actions?: DialogAction[];
    };
    disableOutsideClickToClose?: boolean;
    onopenchange?: (open: boolean) => void;
    onafterleave?: () => void;
    actions?: Snippet;
}
declare const Dialog: import("svelte").Component<DialogPropsExtended, {}, "open">;
type Dialog = ReturnType<typeof Dialog>;
export default Dialog;
