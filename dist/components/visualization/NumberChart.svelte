<script lang="ts">
	import { formatValue } from './chart-helpers.js';
	import type { NumberChartConfig } from './chart-types.js';
	import type { Snippet } from 'svelte';

	interface RenderPropHelpers {
		formatValue: typeof formatValue;
	}

	interface NumberChartProps {
		config: NumberChartConfig;
		body?: Snippet;
		title?: Snippet;
		subtitle?: Snippet<[RenderPropHelpers]>;
		delta?: Snippet<[RenderPropHelpers]>;
	}

	let { config, body, title, subtitle, delta }: NumberChartProps = $props();

	const hasDelta = $derived(config.delta != null);
	const isDeltaPositive = $derived(hasDelta && config?.delta !== undefined && config.delta >= 0);

	const deltaColorClass = $derived.by(() => {
		if (config.negativeIsBetter) {
			return isDeltaPositive ? 'text-ink-red-3' : 'text-green-500';
		}
		return isDeltaPositive ? 'text-ink-green-2' : 'text-ink-red-3';
	});

	const helpers: RenderPropHelpers = { formatValue };
</script>

<div
	class="flex max-h-[140px] items-center gap-2 overflow-hidden bg-surface-gray-1 px-6 pt-5 text-ink-gray-8 {hasDelta
		? 'pb-6'
		: 'pb-3'}"
>
	{#if body}
		{@render body()}
	{:else}
		<div class="flex w-full flex-col">
			{#if title}
				{@render title()}
			{:else}
				<span class="truncate text-sm font-medium text-ink-gray-5">
					{config.title}
				</span>
			{/if}

			{#if subtitle}
				{@render subtitle(helpers)}
			{:else}
				<div
					class="flex-1 flex-shrink-0 truncate text-[24px] font-semibold leading-10 text-ink-gray-6"
				>
					{config.prefix ?? ''}{formatValue(config.value, 1, true)}{config.suffix ?? ''}
				</div>
			{/if}

			{#if delta}
				{@render delta(helpers)}
			{:else if hasDelta}
				<div class="flex items-center gap-0.5 text-xs font-medium {deltaColorClass}">
					<span>{isDeltaPositive ? '↑' : '↓'}</span>
					<span>
						{config.deltaPrefix ?? ''}{config.delta !== undefined
							? formatValue(config.delta, 1, true)
							: ''}{config.deltaSuffix ?? ''}
					</span>
				</div>
			{/if}
		</div>
	{/if}
</div>
