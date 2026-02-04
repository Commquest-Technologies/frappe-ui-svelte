<script lang="ts">
	import type { BadgeProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	let {
		theme = 'gray',
		size = 'md',
		variant = 'subtle',
		label,
		class: className,
		prefix,
		suffix,
		children
	}: BadgeProps = $props();

	const solidClasses: Record<string, string> = {
		gray: 'text-ink-white bg-surface-gray-7',
		blue: 'text-ink-blue-1 bg-surface-blue-2',
		green: 'text-ink-green-1 bg-surface-green-3',
		orange: 'text-ink-amber-1 bg-surface-amber-2',
		red: 'text-ink-red-1 bg-surface-red-4'
	};

	const subtleClasses: Record<string, string> = {
		gray: 'text-ink-gray-6 bg-surface-gray-2',
		blue: 'text-ink-blue-2 bg-surface-blue-1',
		green: 'text-ink-green-3 bg-surface-green-2',
		orange: 'text-ink-amber-3 bg-surface-amber-1',
		red: 'text-ink-red-4 bg-surface-red-1'
	};

	const outlineClasses: Record<string, string> = {
		gray: 'text-ink-gray-6 bg-transparent border border-outline-gray-1',
		blue: 'text-ink-blue-2 bg-transparent border border-outline-blue-1',
		green: 'text-ink-green-3 bg-transparent border border-outline-green-2',
		orange: 'text-ink-amber-3 bg-transparent border border-outline-amber-2',
		red: 'text-ink-red-4 bg-transparent border border-outline-red-2'
	};

	const ghostClasses: Record<string, string> = {
		gray: 'text-ink-gray-6 bg-transparent',
		blue: 'text-ink-blue-2 bg-transparent',
		green: 'text-ink-green-3 bg-transparent',
		orange: 'text-ink-amber-3 bg-transparent',
		red: 'text-ink-red-4 bg-transparent'
	};

	const variantClassMap: Record<string, Record<string, string>> = {
		subtle: subtleClasses,
		solid: solidClasses,
		outline: outlineClasses,
		ghost: ghostClasses
	};

	const sizeClasses: Record<string, string> = {
		sm: 'h-4 text-xs px-1.5',
		md: 'h-5 text-xs px-1.5',
		lg: 'h-6 text-sm px-2'
	};

	const classes = $derived(
		cn(
			'inline-flex select-none items-center gap-1 rounded-full',
			variantClassMap[variant][theme],
			sizeClasses[size],
			className
		)
	);

	const slotSizeClass = $derived(size === 'lg' ? 'max-h-6' : 'max-h-4');
</script>

<div class={classes}>
	{#if prefix}
		<div class={slotSizeClass}>
			{@render prefix()}
		</div>
	{/if}
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
	{#if suffix}
		<div class={slotSizeClass}>
			{@render suffix()}
		</div>
	{/if}
</div>
