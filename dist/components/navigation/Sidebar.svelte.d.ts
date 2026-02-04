import type { Snippet } from 'svelte';
export interface SidebarMenuItem {
    label: string;
    icon?: string;
    href?: string;
    onclick?: () => void;
    active?: boolean;
    badge?: string | number;
    children?: SidebarMenuItem[];
}
export interface SidebarSection {
    label: string;
    items: SidebarMenuItem[];
    collapsible?: boolean;
}
export interface SidebarHeaderConfig {
    title: string;
    subtitle?: string;
    logo?: string;
    menuItems?: SidebarMenuItem[];
}
export interface SidebarProps {
    header?: SidebarHeaderConfig;
    sections?: SidebarSection[];
    collapsed?: boolean;
    class?: string;
    oncollapse?: (collapsed: boolean) => void;
    headerLogo?: Snippet;
    footerItems?: Snippet;
}
declare const Sidebar: import("svelte").Component<SidebarProps, {}, "collapsed">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
