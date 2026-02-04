<script lang="ts">
	import type { PopoverProps, Placement } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import { clickOutside } from '../../actions/click-outside.js';
	import { portal } from '../../actions/portal.js';
	import type { Snippet } from 'svelte';

	interface PopoverPropsExtended extends PopoverProps {
		show?: boolean;
		triggerEvent?: 'click' | 'hover';
		hoverDelay?: number;
		leaveDelay?: number;
		hideOnBlur?: boolean;
		onopen?: () => void;
		onclose?: () => void;
		target?: Snippet<[{ open: () => void; close: () => void; toggle: () => void; isOpen: boolean }]>;
		body?: Snippet<[{ open: () => void; close: () => void; toggle: () => void; isOpen: boolean }]>;
	}

	let {
		open = $bindable(false),
		placement = 'bottom',
		offset = 8,
		triggerEvent = 'click',
		hoverDelay = 0,
		leaveDelay = 0,
		hideOnBlur = true,
		class: className,
		trigger,
		children,
		target,
		body,
		onopen,
		onclose
	}: PopoverPropsExtended = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let popoverElement: HTMLElement | null = $state(null);
	let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
	let leaveTimeout: ReturnType<typeof setTimeout> | null = null;
	let pointerOverTarget = false;

	function openPopover() {
		open = true;
		onopen?.();
	}

	function closePopover() {
		open = false;
		onclose?.();
	}

	function togglePopover() {
		if (open) {
			closePopover();
		} else {
			openPopover();
		}
	}

	const slotProps = $derived({
		open: openPopover,
		close: closePopover,
		toggle: togglePopover,
		isOpen: open
	});

	function handleClick() {
		if (triggerEvent === 'click') {
			togglePopover();
		}
	}

	function handleMouseEnter() {
		pointerOverTarget = true;
		if (leaveTimeout) {
			clearTimeout(leaveTimeout);
			leaveTimeout = null;
		}
		if (triggerEvent === 'hover') {
			if (hoverDelay) {
				hoverTimeout = setTimeout(() => {
					if (pointerOverTarget) {
						openPopover();
					}
				}, hoverDelay * 1000);
			} else {
				openPopover();
			}
		}
	}

	function handleMouseLeave() {
		pointerOverTarget = false;
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
		if (triggerEvent === 'hover') {
			if (leaveDelay) {
				leaveTimeout = setTimeout(() => {
					if (!pointerOverTarget) {
						closePopover();
					}
				}, leaveDelay * 1000);
			} else {
				closePopover();
			}
		}
	}

	function handleClickOutside() {
		if (hideOnBlur && open) {
			closePopover();
		}
	}
</script>

<div class={cn('relative', className)}>
	<div
		bind:this={triggerElement}
		class="flex w-full"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && handleClick()}
	>
		{#if trigger}
			{@render trigger()}
		{:else if target}
			{@render target(slotProps)}
		{/if}
	</div>

	{#if open}
		<div
			bind:this={popoverElement}
			use:portal
			use:floating={{
				reference: triggerElement,
				placement,
				offset,
				open
			}}
			use:clickOutside={{ handler: handleClickOutside, enabled: hideOnBlur }}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			class="absolute z-[100] pointer-events-auto"
			role="tooltip"
		>
			<div class="transition duration-150 ease-out">
				{#if children}
					{@render children()}
				{:else if body}
					{@render body(slotProps)}
				{/if}
			</div>
		</div>
	{/if}
</div>
