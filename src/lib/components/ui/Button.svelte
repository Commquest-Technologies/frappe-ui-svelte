<script lang="ts">
	import type { ButtonProps, ButtonThemeVariant, Theme, Variant, ButtonSize } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import LoadingIndicator from './LoadingIndicator.svelte';
	import FeatherIcon from './FeatherIcon.svelte';

	let {
		theme = 'gray',
		size = 'sm',
		variant = 'subtle',
		label,
		icon,
		iconLeft,
		iconRight,
		loading = false,
		loadingText,
		disabled = false,
		link,
		class: className,
		children,
		onclick,
		...restProps
	}: ButtonProps = $props();

	const isIconButton = $derived(Boolean(icon));
	const isDisabled = $derived(disabled || loading);

	// Theme-based classes
	const solidClasses: Record<Theme, string> = {
		gray: 'text-ink-white bg-surface-gray-7 hover:bg-surface-gray-6 active:bg-surface-gray-5',
		blue: 'text-ink-white bg-blue-500 hover:bg-surface-blue-3 active:bg-blue-700',
		green: 'text-ink-white bg-surface-green-3 hover:bg-green-700 active:bg-green-800',
		red: 'text-ink-white bg-surface-red-5 hover:bg-surface-red-6 active:bg-surface-red-7'
	};

	const subtleClasses: Record<Theme, string> = {
		gray: 'text-ink-gray-8 bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4',
		blue: 'text-ink-blue-3 bg-surface-blue-2 hover:bg-blue-200 active:bg-blue-300',
		green: 'text-green-800 bg-surface-green-2 hover:bg-green-200 active:bg-green-300',
		red: 'text-red-700 bg-surface-red-2 hover:bg-surface-red-3 active:bg-surface-red-4'
	};

	const outlineClasses: Record<Theme, string> = {
		gray: 'text-ink-gray-8 bg-surface-white border border-outline-gray-2 hover:border-outline-gray-3 active:border-outline-gray-3 active:bg-surface-gray-4',
		blue: 'text-ink-blue-3 bg-surface-white border border-outline-blue-1 hover:border-blue-400 active:border-blue-400 active:bg-blue-300',
		green: 'text-green-800 bg-surface-white border border-outline-green-2 hover:border-green-500 active:border-green-500 active:bg-green-300',
		red: 'text-red-700 bg-surface-white border border-outline-red-1 hover:border-outline-red-2 active:border-outline-red-2 active:bg-surface-red-3'
	};

	const ghostClasses: Record<Theme, string> = {
		gray: 'text-ink-gray-8 bg-transparent hover:bg-surface-gray-3 active:bg-surface-gray-4',
		blue: 'text-ink-blue-3 bg-transparent hover:bg-blue-200 active:bg-blue-300',
		green: 'text-green-800 bg-transparent hover:bg-green-200 active:bg-green-300',
		red: 'text-red-700 bg-transparent hover:bg-surface-red-3 active:bg-surface-red-4'
	};

	const focusClasses: Record<Theme, string> = {
		gray: 'focus-visible:ring focus-visible:ring-outline-gray-3',
		blue: 'focus-visible:ring focus-visible:ring-blue-400',
		green: 'focus-visible:ring focus-visible:ring-outline-green-2',
		red: 'focus-visible:ring focus-visible:ring-outline-red-2'
	};

	const variantClassMap: Record<Variant, Record<Theme, string>> = {
		subtle: subtleClasses,
		solid: solidClasses,
		outline: outlineClasses,
		ghost: ghostClasses
	};

	const disabledClassesMap: Record<ButtonThemeVariant, string> = {
		'gray-solid': 'bg-surface-gray-2 text-ink-gray-4',
		'gray-subtle': 'bg-surface-gray-2 text-ink-gray-4',
		'gray-outline': 'bg-surface-gray-2 text-ink-gray-4 border border-outline-gray-2',
		'gray-ghost': 'text-ink-gray-4',
		'blue-solid': 'bg-blue-300 text-ink-white',
		'blue-subtle': 'bg-surface-blue-2 text-ink-blue-link',
		'blue-outline': 'bg-surface-blue-2 text-ink-blue-link border border-outline-blue-1',
		'blue-ghost': 'text-ink-blue-link',
		'green-solid': 'bg-surface-green-2 text-ink-green-2',
		'green-subtle': 'bg-surface-green-2 text-ink-green-2',
		'green-outline': 'bg-surface-green-2 text-ink-green-2 border border-outline-green-2',
		'green-ghost': 'text-ink-green-2',
		'red-solid': 'bg-surface-red-2 text-ink-red-2',
		'red-subtle': 'bg-surface-red-2 text-ink-red-2',
		'red-outline': 'bg-surface-red-2 text-ink-red-2 border border-outline-red-1',
		'red-ghost': 'text-ink-red-2'
	};

	const baseSizeClasses: Record<ButtonSize, string> = {
		sm: 'h-7 text-base px-2 rounded',
		md: 'h-8 text-base font-medium px-2.5 rounded',
		lg: 'h-10 text-lg font-medium px-3 rounded-md',
		xl: 'h-11.5 text-xl font-medium px-3.5 rounded-lg',
		'2xl': 'h-13 text-2xl font-medium px-3.5 rounded-xl'
	};

	const iconSizeClasses: Record<ButtonSize, string> = {
		sm: 'h-7 w-7 rounded',
		md: 'h-8 w-8 rounded',
		lg: 'h-10 w-10 rounded-md',
		xl: 'h-11.5 w-11.5 rounded-lg',
		'2xl': 'h-13 w-13 rounded-xl'
	};

	const slotClasses: Record<ButtonSize, string> = {
		sm: 'h-4',
		md: 'h-4.5',
		lg: 'h-5',
		xl: 'h-6',
		'2xl': 'h-6'
	};

	const loadingIndicatorSize: Record<ButtonSize, string> = {
		sm: 'h-3 w-3',
		md: 'h-[13.5px] w-[13.5px]',
		lg: 'h-[15px] w-[15px]',
		xl: 'h-4.5 w-4.5',
		'2xl': 'h-4.5 w-4.5'
	};

	const themeVariant = $derived(`${theme}-${variant}` as ButtonThemeVariant);
	const sizeClasses = $derived(isIconButton ? iconSizeClasses[size] : baseSizeClasses[size]);
	const variantClasses = $derived(variantClassMap[variant][theme]);
	const disabledClasses = $derived(disabledClassesMap[themeVariant]);

	const buttonClasses = $derived(
		cn(
			'inline-flex items-center justify-center gap-2 transition-colors focus:outline-none',
			isDisabled ? disabledClasses : variantClasses,
			focusClasses[theme],
			sizeClasses,
			className
		)
	);

	function handleClick(e: MouseEvent) {
		if (link) {
			window.open(link, '_blank');
			return;
		}
		onclick?.(e as MouseEvent & { currentTarget: HTMLButtonElement });
	}
</script>

<button
	class={buttonClasses}
	onclick={handleClick}
	disabled={isDisabled}
	aria-label={isIconButton ? label : undefined}
	{...restProps}
>
	{#if loading}
		<LoadingIndicator class={loadingIndicatorSize[size]} />
	{/if}

	{#if !loading && iconLeft}
		<FeatherIcon name={iconLeft} class={slotClasses[size]} />
	{/if}

	{#if loading && loadingText}
		{loadingText}
	{:else if isIconButton && !loading}
		<FeatherIcon name={icon ?? ''} class={slotClasses[size]} />
		<span class="sr-only">{label}</span>
	{:else}
		<span class={cn(isIconButton ? 'sr-only' : 'truncate')}>
			{#if children}
				{@render children()}
			{:else}
				{label}
			{/if}
		</span>
	{/if}

	{#if iconRight}
		<FeatherIcon name={iconRight} class={slotClasses[size]} />
	{/if}
</button>
