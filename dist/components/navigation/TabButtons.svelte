<script lang="ts">
	import type { TabButtonsProps, TabItem } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import Button from '../ui/Button.svelte';

	interface TabButtonItem {
		label: string;
		value: string | number;
		disabled?: boolean;
		hideLabel?: boolean;
		onclick?: () => void;
	}

	interface TabButtonsPropsExtended extends TabButtonsProps {
		buttons?: TabButtonItem[];
		onchange?: (value: string | number) => void;
	}

	let {
		items = [],
		buttons,
		value = $bindable(),
		size = 'sm',
		class: className,
		onchange
	}: TabButtonsPropsExtended = $props();

	// Support both items (new API) and buttons (legacy API)
	const buttonItems = $derived.by((): TabButtonItem[] => {
		if (buttons && buttons.length > 0) {
			return buttons;
		}
		return items.map((item) => ({
			label: item.label,
			value: item.id,
			disabled: item.disabled,
			hideLabel: false,
			onclick: undefined
		}));
	});

	function handleClick(button: TabButtonItem) {
		value = String(button.value);
		button.onclick?.();
		onchange?.(button.value);
	}
</script>

<div class={cn('inline-flex', className)} role="group">
	<div
		class="flex space-x-0.5 rounded-md bg-surface-gray-2 h-7 items-center px-[1px] text-sm border border-gray-200"
	>
		{#each buttonItems as button}
			<button
				type="button"
				role="radio"
				aria-checked={value === button.value}
				disabled={button.disabled}
				class={cn(
					'h-6.5 px-2 rounded text-base transition-colors focus:outline-none focus-visible:ring focus-visible:ring-outline-gray-2',
					value === button.value
						? 'bg-surface-white text-ink-gray-9 shadow'
						: 'bg-transparent text-ink-gray-5 hover:text-ink-gray-7',
					button.disabled && 'opacity-50 cursor-not-allowed'
				)}
				onclick={() => handleClick(button)}
			>
				{#if !button.hideLabel && button.label}
					<span class="flex h-4 items-center">{button.label}</span>
				{/if}
			</button>
		{/each}
	</div>
</div>
