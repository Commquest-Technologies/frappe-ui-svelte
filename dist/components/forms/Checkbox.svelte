<script lang="ts">
	import type { CheckboxProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	interface CheckboxPropsExtended extends CheckboxProps {
		padding?: boolean;
		htmlId?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		size = 'sm',
		label,
		disabled = false,
		padding = false,
		checked = $bindable(false),
		indeterminate = false,
		htmlId,
		class: className,
		onchange
	}: CheckboxPropsExtended = $props();

	const labelClasses = $derived(
		cn(
			'select-none',
			size === 'sm' ? 'text-base font-medium' : 'text-lg font-medium',
			disabled ? 'text-ink-gray-4' : 'text-ink-gray-8'
		)
	);

	const inputClasses = $derived(
		cn(
			'rounded-sm mt-[1px]',
			size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4',
			disabled
				? 'border-outline-gray-2 bg-surface-menu-bar text-ink-gray-3'
				: 'border-outline-gray-4 text-ink-gray-9 hover:border-gray-600 focus:ring-offset-0 focus:border-gray-900 active:border-gray-700 transition accent-black dark:accent-white',
			!disabled &&
				(padding
					? 'focus:ring-0'
					: 'hover:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3 active:bg-surface-gray-2'),
			className
		)
	);

	const wrapperClasses = $derived(
		cn(
			'inline-flex space-x-2 rounded transition',
			padding && size === 'sm' && 'px-2.5 py-1.5',
			padding && size === 'md' && 'px-3 py-2',
			padding &&
				!disabled &&
				'focus-within:bg-surface-gray-2 focus-within:ring-2 focus-within:ring-outline-gray-3 hover:bg-surface-gray-3 active:bg-surface-gray-4'
		)
	);

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		onchange?.(target.checked);
	}
</script>

<div class={wrapperClasses}>
	<input
		class={inputClasses}
		type="checkbox"
		{disabled}
		id={htmlId}
		{checked}
		{indeterminate}
		onchange={handleChange}
		data-testid="checkbox"
	/>
	{#if label}
		<label class={labelClasses} for={htmlId}>
			{label}
		</label>
	{/if}
</div>
