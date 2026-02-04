<script lang="ts">
	import type { ProgressProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	let {
		value,
		size = 'sm',
		label = '',
		hint,
		intervals = false,
		intervalCount = 6,
		class: className = ''
	}: ProgressProps = $props();

	const MIN_VALUE = 0;
	const MAX_VALUE = 100;

	const sizeHeight: Record<string, string> = {
		sm: 'h-0.5',
		md: 'h-1',
		lg: 'h-2',
		xl: 'h-3'
	};

	const indicatorContainerClasses = $derived(
		cn(
			sizeHeight[size],
			intervals ? 'flex space-x-1' : 'relative bg-surface-gray-2',
			'overflow-hidden rounded-xl',
			className
		)
	);

	const filledIntervalCount = $derived(
		value > MAX_VALUE ? intervalCount : Math.round((value / MAX_VALUE) * intervalCount)
	);

	const intervalArray = $derived(Array.from({ length: intervalCount }, (_, i) => i));
</script>

<div class="flex w-full flex-col gap-2.5">
	{#if label || hint}
		<div class="flex items-baseline justify-between">
			{#if label}
				<span class="text-base font-medium text-ink-gray-8">{label}</span>
			{:else}
				<span></span>
			{/if}
			{#if hint}
				<span class="self-end">
					{@render hint()}
				</span>
			{/if}
		</div>
	{/if}

	<div
		class={indicatorContainerClasses}
		aria-valuemax={MAX_VALUE}
		aria-valuemin={MIN_VALUE}
		aria-valuenow={value}
		role="progressbar"
	>
		{#if !intervals}
			<div class="h-full bg-surface-gray-7" style="width: {value}%"></div>
		{:else}
			{#each intervalArray as i}
				<div
					class={cn(
						'h-full w-full',
						i < filledIntervalCount ? 'bg-surface-gray-7' : 'bg-surface-gray-2'
					)}
				></div>
			{/each}
		{/if}
	</div>
</div>
