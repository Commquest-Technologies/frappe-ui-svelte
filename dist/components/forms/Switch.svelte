<script lang="ts">
	import type { SwitchProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import FeatherIcon from '../ui/FeatherIcon.svelte';

	interface SwitchPropsExtended extends SwitchProps {
		icon?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		size = 'sm',
		label = '',
		description = '',
		icon,
		class: className,
		onchange
	}: SwitchPropsExtended = $props();

	const hasLabelAndDescription = $derived(label && description);
	const hasOnlyLabel = $derived(label && !description);

	const switchClasses = $derived(
		cn(
			'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center',
			'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3',
			'disabled:cursor-not-allowed disabled:bg-surface-gray-3',
			checked
				? 'bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5'
				: 'bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500',
			hasOnlyLabel &&
				(checked ? 'group-hover:enabled:bg-surface-gray-6' : 'group-hover:enabled:bg-gray-400'),
			size === 'md' ? 'h-5 w-8 border-[3px]' : 'h-4 w-[26px] border-2'
		)
	);

	const switchCircleClasses = $derived(
		cn(
			'pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out',
			size === 'md' ? 'h-3.5 w-3.5' : 'h-3 w-3',
			size === 'md'
				? checked
					? 'translate-x-3 rtl:-translate-x-3'
					: 'translate-x-0'
				: checked
					? 'translate-x-2.5 rtl:-translate-x-2.5'
					: 'translate-x-0'
		)
	);

	const switchLabelClasses = $derived(
		cn(
			'font-medium leading-normal',
			disabled && hasOnlyLabel ? 'text-ink-gray-4' : 'text-ink-gray-8',
			size === 'md' ? 'text-lg' : 'text-base'
		)
	);

	const switchGroupClasses = $derived(
		cn(
			'flex justify-between',
			hasOnlyLabel && [
				'group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3',
				disabled ? 'cursor-not-allowed' : 'hover:bg-surface-gray-3 active:bg-surface-gray-4',
				size === 'md' ? 'px-3 py-1.5' : 'px-2.5 py-1.5'
			],
			hasLabelAndDescription && [
				'group items-start',
				size === 'md' ? 'px-3 space-x-3.5' : 'px-2.5 space-x-2.5'
			],
			className
		)
	);

	function handleClick() {
		if (!disabled) {
			checked = !checked;
			onchange?.(checked);
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (hasOnlyLabel && e.code === 'Space' && !disabled) {
			checked = !checked;
			onchange?.(checked);
		}
	}
</script>

<div
	class={switchGroupClasses}
	tabindex={hasOnlyLabel ? 0 : -1}
	role="switch"
	aria-checked={checked}
	onkeyup={handleKeyUp}
>
	<div class="flex flex-col gap-1">
		<div class="flex items-center">
			{#if icon}
				<FeatherIcon name={icon} class="mr-2 h-4 w-4 flex-shrink-0 text-ink-gray-6" />
			{/if}
			{#if label}
				<span class={switchLabelClasses}>{label}</span>
			{/if}
		</div>
		{#if description}
			<span class="max-w-xs text-p-sm text-ink-gray-7">{description}</span>
		{/if}
	</div>
	<button
		type="button"
		class={switchClasses}
		{disabled}
		onclick={handleClick}
		aria-checked={checked}
		aria-label={label || 'Toggle switch'}
		role="switch"
	>
		<span aria-hidden="true" class={switchCircleClasses}></span>
	</button>
</div>
