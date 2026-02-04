<script lang="ts">
	import type { RatingProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import FeatherIcon from '../ui/FeatherIcon.svelte';

	interface RatingPropsExtended extends RatingProps {
		ratingFrom?: number;
		label?: string;
		onchange?: (value: number) => void;
	}

	let {
		value = $bindable(0),
		max = 5,
		ratingFrom = max,
		size = 'md',
		readonly = false,
		label,
		class: className,
		onchange
	}: RatingPropsExtended = $props();

	let hoveredRating = $state(0);

	const sizeClasses: Record<string, string> = {
		sm: 'size-4',
		md: 'size-5',
		lg: 'size-6'
	};

	const getIconClasses = (index: number) => {
		return cn(
			sizeClasses[size],
			index <= hoveredRating && index > value && '!fill-yellow-200',
			index <= value && '!fill-yellow-500',
			index > value && index > hoveredRating && 'fill-gray-300 dark:fill-gray-900',
			!readonly && 'cursor-pointer',
			'text-transparent mr-0.5'
		);
	};

	function markRating(index: number) {
		if (readonly) return;
		value = index;
		onchange?.(index);
	}

	function handleMouseOver(index: number) {
		if (!readonly) {
			hoveredRating = index;
		}
	}

	function handleMouseLeave() {
		if (!readonly) {
			hoveredRating = 0;
		}
	}

	const starIndexes = $derived(Array.from({ length: ratingFrom }, (_, i) => i + 1));
	const groupId = `rating-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class={cn('space-y-1', className)} role="group" aria-labelledby={label ? groupId : undefined}>
	{#if label}
		<span id={groupId} class="block text-xs text-ink-gray-5">{label}</span>
	{/if}
	<div class="flex text-center" role="radiogroup" aria-label={label || 'Rating'}>
		{#each starIndexes as index}
			<button
				type="button"
				tabindex={readonly ? -1 : 0}
				onmouseenter={() => handleMouseOver(index)}
				onmouseleave={handleMouseLeave}
				onfocus={() => handleMouseOver(index)}
				onblur={handleMouseLeave}
				onclick={() => markRating(index)}
				aria-label={`Rate ${index} out of ${ratingFrom}`}
				aria-pressed={value >= index}
				disabled={readonly}
				class="bg-transparent border-none p-0 cursor-pointer disabled:cursor-default"
			>
				<FeatherIcon name="star" class={getIconClasses(index)} />
			</button>
		{/each}
	</div>
</div>
