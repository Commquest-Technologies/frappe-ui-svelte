<script lang="ts">
	import type { BreadcrumbsProps, BreadcrumbItem } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import type { Snippet } from 'svelte';

	interface BreadcrumbItemExtended extends BreadcrumbItem {
		onclick?: () => void;
		prefixIcon?: Snippet;
		suffixIcon?: Snippet;
	}

	interface BreadcrumbsPropsExtended extends BreadcrumbsProps {
		items: BreadcrumbItemExtended[];
	}

	let { items = [], separator = '/', class: className }: BreadcrumbsPropsExtended = $props();

	const filteredItems = $derived((items || []).filter(Boolean));

	function handleClick(item: BreadcrumbItemExtended, e: MouseEvent) {
		if (item.onclick) {
			e.preventDefault();
			item.onclick();
		}
	}
</script>

<nav class={cn('flex min-w-0 items-center', className)} aria-label="Breadcrumb">
	<ol class="flex min-w-0 items-center overflow-hidden text-ellipsis whitespace-nowrap">
		{#each filteredItems as item, i}
			{@const isLast = i === filteredItems.length - 1}
			<li class="flex items-center">
				{#if item.href && !isLast}
					<a
						href={item.href}
						onclick={(e) => handleClick(item, e)}
						class={cn(
							'flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3',
							'text-ink-gray-5 hover:text-ink-gray-7'
						)}
					>
						{#if item.prefixIcon}
							<span class="mr-1">
								{@render item.prefixIcon()}
							</span>
						{/if}
						{#if item.icon}
							<span class="mr-1">
								<!-- Icon rendering placeholder -->
							</span>
						{/if}
						<span>{item.label}</span>
						{#if item.suffixIcon}
							<span class="mr-1">
								{@render item.suffixIcon()}
							</span>
						{/if}
					</a>
				{:else}
					<button
						type="button"
						onclick={(e) => handleClick(item, e)}
						class={cn(
							'flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-outline-gray-3 cursor-pointer',
							isLast ? 'text-ink-gray-9' : 'text-ink-gray-5 hover:text-ink-gray-7'
						)}
					>
						{#if item.prefixIcon}
							<span class="mr-1">
								{@render item.prefixIcon()}
							</span>
						{/if}
						<span>{item.label}</span>
						{#if item.suffixIcon}
							<span class="mr-1">
								{@render item.suffixIcon()}
							</span>
						{/if}
					</button>
				{/if}
				{#if !isLast}
					<span class="mx-0.5 text-base text-ink-gray-4 select-none" aria-hidden="true">
						{separator}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
