<script lang="ts" module>
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
</script>

<script lang="ts">
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import Tree from './Tree.svelte';

	let {
		node,
		nodeKey,
		options = {
			rowHeight: '25px',
			indentWidth: '20px',
			showIndentationGuides: true,
			defaultCollapsed: true
		},
		renderNode,
		renderIcon,
		renderLabel
	}: TreeProps = $props();

	const defaultCollapsed = $derived(options.defaultCollapsed ?? true);
	let isCollapsed = $state(true);

	$effect(() => {
		isCollapsed = defaultCollapsed;
	});

	const hasChildren = $derived((node.children?.length ?? 0) > 0);
	const linePadding = $derived(options.indentWidth || '20px');

	function toggleCollapsed() {
		isCollapsed = !isCollapsed;
	}
</script>

<div class="flex flex-col">
	{#if renderNode}
		{@render renderNode({ node, hasChildren, isCollapsed, toggleCollapsed })}
	{:else}
		<button
			type="button"
			class="flex items-center cursor-pointer gap-1 w-full text-left"
			style="height: {options.rowHeight}"
			onclick={toggleCollapsed}
		>
			<div class="text-ink-gray-6">
				{#if renderIcon}
					{@render renderIcon({ hasChildren, isCollapsed })}
				{:else if hasChildren && !isCollapsed}
					<ChevronDown class="h-3.5 w-3.5" />
				{:else if hasChildren}
					<ChevronRight class="h-3.5 w-3.5" />
				{/if}
			</div>
			{#if renderLabel}
				{@render renderLabel({ node, hasChildren, isCollapsed })}
			{:else}
				<div class="text-base text-ink-gray-8 truncate {hasChildren ? '' : 'pl-3.5'}">
					{node.label ?? ''}
				</div>
			{/if}
		</button>
	{/if}

	{#if hasChildren && !isCollapsed}
		<div class="flex">
			{#if options.showIndentationGuides}
				<div style="padding-left: {linePadding}" class="border-r border-outline-gray-1"></div>
			{/if}
			<ul class="w-full" style="padding-left: {options.indentWidth}">
				{#each node.children ?? [] as child}
					<li>
						<Tree
							node={child}
							{nodeKey}
							{options}
							{renderNode}
							{renderIcon}
							{renderLabel}
						/>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
