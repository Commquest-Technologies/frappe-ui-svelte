import type { Component } from 'svelte';
export interface CommandPaletteItem {
    name: string;
    title: string;
    description?: string;
    icon?: Component<{
        class?: string;
    }>;
    disabled?: boolean;
}
export interface CommandPaletteGroup {
    title: string;
    hideTitle?: boolean;
    items: CommandPaletteItem[];
}
interface CommandPaletteProps {
    show?: boolean;
    searchQuery?: string;
    groups?: CommandPaletteGroup[];
    class?: string;
    onshowchange?: (show: boolean) => void;
    onsearchquerychange?: (query: string) => void;
    onselect?: (item: CommandPaletteItem) => void;
}
declare const CommandPalette: Component<CommandPaletteProps, {}, "show" | "searchQuery">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;
