import type { Snippet } from 'svelte';
export interface TreeNode {
    [key: string]: unknown;
    label?: string;
    children?: TreeNode[];
}
export interface TreeOptions {
    rowHeight?: string;
    indentWidth?: string;
    showIndentationGuides?: boolean;
    defaultCollapsed?: boolean;
}
export interface RenderNodeArgs {
    node: TreeNode;
    hasChildren: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}
export interface RenderIconArgs {
    hasChildren: boolean;
    isCollapsed: boolean;
}
export interface RenderLabelArgs {
    node: TreeNode;
    hasChildren: boolean;
    isCollapsed: boolean;
}
export interface TreeProps {
    node: TreeNode;
    nodeKey: string;
    options?: TreeOptions;
    renderNode?: Snippet<[RenderNodeArgs]>;
    renderIcon?: Snippet<[RenderIconArgs]>;
    renderLabel?: Snippet<[RenderLabelArgs]>;
}
import Tree from './Tree.svelte';
declare const Tree: import("svelte").Component<TreeProps, {}, "">;
type Tree = ReturnType<typeof Tree>;
export default Tree;
