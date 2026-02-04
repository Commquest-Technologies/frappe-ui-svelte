<script lang="ts">
	import type { TooltipProps, Placement } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import type { Snippet } from 'svelte';

	interface TooltipPropsExtended extends TooltipProps {
		body?: Snippet;
		hoverDelay?: number;
		arrowClass?: string;
		disabled?: boolean;
	}

	let {
		text = '',
		body,
		placement = 'top',
		delay = 500,
		hoverDelay = 0.5,
		arrowClass = 'fill-surface-gray-7',
		disabled = false,
		class: className,
		children
	}: TooltipPropsExtended = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let tooltipElement: HTMLElement | null = $state(null);
	let isOpen = $state(false);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

	const delayDuration = $derived((hoverDelay || delay / 1000) * 1000);

	// Convert placement to floating-ui placement
	const floatingPlacement = $derived.by((): Placement => {
		const placementMap: Record<string, Placement> = {
			top: 'top',
			bottom: 'bottom',
			left: 'left',
			right: 'right'
		};
		return placementMap[placement] || 'top';
	});

	function handleMouseEnter() {
		if (disabled) return;
		hoverTimeout = setTimeout(() => {
			isOpen = true;
		}, delayDuration);
	}

	function handleMouseLeave() {
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
		isOpen = false;
	}

	function handleFocus() {
		if (disabled) return;
		isOpen = true;
	}

	function handleBlur() {
		isOpen = false;
	}
</script>

{#if disabled}
	{#if children}
		{@render children()}
	{/if}
{:else}
	<span
		bind:this={triggerElement}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onfocus={handleFocus}
		onblur={handleBlur}
		class="inline-flex"
		role="button"
		tabindex="0"
	>
		{#if children}
			{@render children()}
		{/if}
	</span>

	{#if isOpen && (text || body)}
		<div
			bind:this={tooltipElement}
			use:floating={{
				reference: triggerElement,
				placement: floatingPlacement,
				offset: 8,
				open: isOpen
			}}
			class={cn(
				'z-[100] select-none rounded-lg shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]',
				'animate-in fade-in-0 zoom-in-95',
				className
			)}
			role="tooltip"
		>
			{#if body}
				{@render body()}
			{:else if text}
				<div class="rounded bg-surface-gray-7 px-2 py-1 text-xs text-ink-white shadow-xl">
					{text}
				</div>
			{/if}
		</div>
	{/if}
{/if}
