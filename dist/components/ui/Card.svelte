<script lang="ts">
	import type { CardProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import LoadingText from './LoadingText.svelte';

	let {
		title,
		subtitle,
		loading = false,
		class: className,
		actionsLeft,
		actions,
		children
	}: CardProps = $props();
</script>

<div class={cn('flex flex-col rounded-lg border bg-white px-6 py-5 shadow', className)}>
	<div class="flex items-baseline justify-between">
		<div class="flex items-baseline space-x-2">
			{#if actionsLeft}
				<div class="flex items-center space-x-2">
					{@render actionsLeft()}
				</div>
			{/if}
			{#if title}
				<h2 class="text-xl font-semibold">{title}</h2>
			{/if}
		</div>
		{#if actions}
			<div class="flex items-center space-x-2">
				{@render actions()}
			</div>
		{/if}
	</div>
	{#if subtitle}
		<p class="mt-1.5 text-base text-gray-600">{subtitle}</p>
	{/if}
	{#if loading}
		<div class="mt-4 flex flex-auto flex-col items-center justify-center rounded-md">
			<LoadingText />
		</div>
	{:else if children}
		<div class="mt-4 flex-auto overflow-auto">
			{@render children()}
		</div>
	{/if}
</div>
