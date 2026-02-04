<script lang="ts">
	import type { DropdownProps, DropdownItem, Placement } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import { clickOutside } from '../../actions/click-outside.js';
	import { portal } from '../../actions/portal.js';
	import Button from '../ui/Button.svelte';
	import FeatherIcon from '../ui/FeatherIcon.svelte';
	import type { Snippet } from 'svelte';

	interface DropdownOption extends DropdownItem {
		onclick?: () => void;
		theme?: 'default' | 'red';
		link?: string;
	}

	interface DropdownPropsExtended extends DropdownProps {
		options?: DropdownOption[];
		button?: {
			label?: string;
			variant?: 'solid' | 'subtle' | 'outline' | 'ghost';
			theme?: 'gray' | 'blue' | 'green' | 'red';
		};
	}

	let {
		items = [],
		options,
		placement = 'bottom-start',
		button,
		class: className,
		trigger
	}: DropdownPropsExtended = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let dropdownElement: HTMLElement | null = $state(null);
	let isOpen = $state(false);

	interface DropdownItemInternal {
		label: string;
		value: string;
		icon?: string;
		disabled?: boolean;
		separator?: boolean;
		onclick?: () => void;
		theme?: 'default' | 'red';
		link?: string;
	}

	// Support both items (new API) and options (legacy API)
	const dropdownItems = $derived.by((): DropdownItemInternal[] => {
		if (options && options.length > 0) {
			return options.map((opt) => ({
				label: opt.label,
				value: opt.value ?? opt.label,
				icon: opt.icon,
				disabled: opt.disabled,
				separator: opt.separator,
				onclick: opt.onclick,
				theme: opt.theme,
				link: opt.link
			}));
		}
		return items.map((item) => ({
			label: item.label,
			value: item.value ?? item.label,
			icon: item.icon,
			disabled: item.disabled,
			separator: item.separator,
			onclick: undefined,
			theme: undefined,
			link: undefined
		}));
	});

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function closeDropdown() {
		isOpen = false;
	}

	function handleItemClick(item: (typeof dropdownItems)[number]) {
		if (item.disabled) return;
		if (item.link) {
			window.open(item.link, '_blank');
		} else if (item.onclick) {
			item.onclick();
		}
		closeDropdown();
	}

	function getTextColor(item: (typeof dropdownItems)[number]) {
		return item.theme === 'red' ? 'text-ink-red-3' : 'text-ink-gray-7';
	}

	function getIconColor(item: (typeof dropdownItems)[number]) {
		return item.theme === 'red' ? 'text-ink-red-3' : 'text-ink-gray-6';
	}

	function getHoverColor(item: (typeof dropdownItems)[number]) {
		return item.theme === 'red' ? 'hover:bg-surface-red-3' : 'hover:bg-surface-gray-4';
	}
</script>

<div class={cn('relative', className)}>
	<div bind:this={triggerElement}>
		{#if trigger}
			<button type="button" onclick={toggleDropdown} class="w-full">
				{@render trigger()}
			</button>
		{:else}
			<Button
				variant={button?.variant ?? 'ghost'}
				theme={button?.theme ?? 'gray'}
				onclick={toggleDropdown}
			>
				{button?.label ?? 'Options'}
			</Button>
		{/if}
	</div>

	{#if isOpen}
		<div
			bind:this={dropdownElement}
			use:portal
			use:floating={{
				reference: triggerElement,
				placement,
				offset: 4,
				open: isOpen
			}}
			use:clickOutside={{ handler: closeDropdown, enabled: true }}
			class="absolute z-[100] min-w-40 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-black focus:outline-none border border-outline-gray-1"
		>
			<div class="p-1.5">
				{#each dropdownItems as item, index}
					{#if item.separator}
						<div class="my-1 border-t border-outline-gray-modals"></div>
					{:else}
						<button
							type="button"
							class={cn(
								'group flex h-7 w-full items-center rounded px-2 text-base focus:outline-none',
								getTextColor(item),
								getHoverColor(item),
								item.disabled && 'opacity-50 cursor-not-allowed'
							)}
							disabled={item.disabled}
							onclick={() => handleItemClick(item)}
						>
							{#if item.icon}
								<FeatherIcon
									name={item.icon}
									class={cn('mr-2 h-4 w-4 flex-shrink-0', getIconColor(item))}
								/>
							{/if}
							<span class="whitespace-nowrap">{item.label}</span>
						</button>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
