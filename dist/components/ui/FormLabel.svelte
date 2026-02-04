<script lang="ts">
	import type { FormLabelProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	let {
		label,
		required = false,
		class: className,
		children
	}: FormLabelProps = $props();

	const sizeClasses: Record<string, string> = {
		sm: 'text-xs',
		md: 'text-base'
	};

	// Default to sm size
	const labelClasses = $derived(cn('block text-xs text-ink-gray-5', className));
</script>

<label class={labelClasses} data-testid="form-label">
	{#if children}
		{@render children()}
	{:else if label}
		{label}
	{/if}
	{#if required}
		<span class="text-ink-red-3 select-none" aria-hidden="true">*</span>
		<span class="sr-only">(required)</span>
	{/if}
</label>
