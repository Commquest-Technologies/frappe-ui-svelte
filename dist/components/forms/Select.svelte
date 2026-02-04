<script lang="ts">
	import type { SelectProps, SelectOption } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import type { Snippet } from 'svelte';

	interface SelectPropsExtended extends SelectProps {
		htmlId?: string;
		prefix?: Snippet;
		onchange?: (e: Event) => void;
	}

	let {
		size = 'sm',
		variant = 'subtle',
		disabled = false,
		value = $bindable(),
		placeholder,
		options,
		htmlId,
		prefix,
		class: className,
		onchange
	}: SelectPropsExtended = $props();

	const selectOptions = $derived(
		options
			?.map((option) => {
				if (typeof option === 'string') {
					return { label: option, value: option } as SelectOption;
				}
				return option as SelectOption;
			})
			.filter(Boolean) || []
	);

	const textColor = $derived(disabled ? 'text-ink-gray-4' : 'text-ink-gray-8');

	const fontSizeClasses: Record<string, string> = {
		sm: 'text-base',
		md: 'text-base',
		lg: 'text-lg'
	};

	const paddingClasses = $derived.by(() => {
		const map: Record<string, string> = {
			sm: prefix ? 'pl-8 pr-5' : 'pl-2 pr-5',
			md: prefix ? 'pl-9 pr-5.5' : 'pl-2.5 pr-5.5',
			lg: prefix ? 'pl-10 pr-6' : 'pl-3 pr-6'
		};
		return map[size];
	});

	const sizeClasses: Record<string, string> = {
		sm: 'rounded h-7',
		md: 'rounded h-8',
		lg: 'rounded-md h-10'
	};

	const variantClasses: Record<string, string> = {
		subtle:
			'border border-surface-gray-2 bg-surface-gray-2 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
		outline:
			'border border-outline-gray-2 bg-surface-white hover:border-outline-gray-3 focus:border-outline-gray-4 focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3'
	};

	const disabledClasses = $derived(
		`border bg-surface-gray-1 ${variant === 'outline' ? 'border-outline-gray-2' : 'border-transparent'}`
	);

	const selectClasses = $derived(
		cn(
			sizeClasses[size],
			fontSizeClasses[size],
			paddingClasses,
			disabled ? disabledClasses : variantClasses[variant],
			textColor,
			'transition-colors w-full py-0 truncate appearance-none cursor-pointer focus:outline-none'
		)
	);

	const prefixClasses: Record<string, string> = {
		sm: 'pl-2',
		md: 'pl-2.5',
		lg: 'pl-3'
	};

	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		value = target.value;
		onchange?.(e);
	}
</script>

<div class={cn('relative flex items-center', className)}>
	{#if prefix}
		<div
			class={cn(
				'absolute inset-y-0 left-0 flex items-center pointer-events-none',
				textColor,
				prefixClasses[size]
			)}
		>
			{@render prefix()}
		</div>
	{/if}
	{#if placeholder && !value}
		<div
			class={cn(
				'pointer-events-none absolute text-ink-gray-4 truncate w-full',
				fontSizeClasses[size],
				paddingClasses
			)}
		>
			{placeholder}
		</div>
	{/if}
	<select
		class={selectClasses}
		{disabled}
		id={htmlId}
		{value}
		onchange={handleChange}
		data-testid="select"
	>
		{#if placeholder && !value}
			<option value=""></option>
		{/if}
		{#each selectOptions as option}
			<option value={option.value} disabled={option.disabled} selected={option.value === value}>
				{option.label}
			</option>
		{/each}
	</select>
</div>
