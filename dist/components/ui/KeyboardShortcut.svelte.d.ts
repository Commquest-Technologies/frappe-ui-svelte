import type { Snippet } from 'svelte';
interface KeyboardShortcutProps {
    meta?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    bg?: boolean;
    class?: string;
    children?: Snippet;
}
declare const KeyboardShortcut: import("svelte").Component<KeyboardShortcutProps, {}, "">;
type KeyboardShortcut = ReturnType<typeof KeyboardShortcut>;
export default KeyboardShortcut;
