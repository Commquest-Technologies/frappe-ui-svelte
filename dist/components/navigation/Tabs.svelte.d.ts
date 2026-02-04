import type { TabsProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface TabWithSnippet {
    label: string;
    icon?: Snippet;
    content?: Snippet;
    disabled?: boolean;
}
interface TabsPropsExtended extends TabsProps {
    vertical?: boolean;
    tabs?: TabWithSnippet[];
    tabIndex?: number;
    ontabchange?: (index: number) => void;
    children?: Snippet;
}
declare const Tabs: import("svelte").Component<TabsPropsExtended, {}, "value" | "tabIndex">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
