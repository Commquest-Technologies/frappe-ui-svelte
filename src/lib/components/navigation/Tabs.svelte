<script lang="ts">
	import type { TabsProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import FeatherIcon from '../ui/FeatherIcon.svelte';
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

	let {
		items = [],
		tabs,
		vertical = false,
		value = $bindable(),
		tabIndex = $bindable(0),
		class: className,
		ontabchange,
		children
	}: TabsPropsExtended = $props();

	// Using tabs prop (with Snippets)
	const usingTabsProp = $derived(tabs && tabs.length > 0);

	function handleTabChange(index: number) {
		tabIndex = index;
		if (items[index]) {
			value = items[index].id;
		}
		ontabchange?.(index);
	}
</script>

<div
	class={cn('flex flex-1 overflow-hidden', !vertical && 'flex-col', className)}
>
	{#if children}
		{@render children()}
	{:else if usingTabsProp && tabs}
		<!-- Tab List using tabs prop (with Snippets) -->
		<div
			class={cn(
				'flex border-outline-gray-2',
				vertical ? 'flex-col border-r' : 'border-b'
			)}
			role="tablist"
		>
			{#each tabs as tab, index}
				<button
					type="button"
					role="tab"
					aria-selected={tabIndex === index}
					disabled={tab.disabled}
					class={cn(
						'px-4 py-2 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3',
						tabIndex === index
							? 'text-ink-gray-9 border-b-2 border-surface-gray-7'
							: 'text-ink-gray-5 hover:text-ink-gray-7',
						tab.disabled && 'opacity-50 cursor-not-allowed'
					)}
					onclick={() => handleTabChange(index)}
				>
					{#if tab.icon}
						<span class="mr-2">
							{@render tab.icon()}
						</span>
					{/if}
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Tab Panel -->
		<div class="flex-1 overflow-auto p-4" role="tabpanel">
			{#if tabs[tabIndex]?.content}
				{#each [tabs[tabIndex]] as activeTab}
					{#if activeTab.content}
						{@render activeTab.content()}
					{/if}
				{/each}
			{/if}
		</div>
	{:else}
		<!-- Tab List using items prop (string icons) -->
		<div
			class={cn(
				'flex border-outline-gray-2',
				vertical ? 'flex-col border-r' : 'border-b'
			)}
			role="tablist"
		>
			{#each items as item, index}
				<button
					type="button"
					role="tab"
					aria-selected={tabIndex === index}
					disabled={item.disabled}
					class={cn(
						'px-4 py-2 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3',
						tabIndex === index
							? 'text-ink-gray-9 border-b-2 border-surface-gray-7'
							: 'text-ink-gray-5 hover:text-ink-gray-7',
						item.disabled && 'opacity-50 cursor-not-allowed'
					)}
					onclick={() => handleTabChange(index)}
				>
					{#if item.icon}
						<span class="mr-2">
							<FeatherIcon name={item.icon} class="h-4 w-4" />
						</span>
					{/if}
					{item.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
