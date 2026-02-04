<script lang="ts">
	import type { FormControlProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import FormLabel from '../ui/FormLabel.svelte';
	import ErrorMessage from '../feedback/ErrorMessage.svelte';

	let {
		label,
		description,
		error,
		required = false,
		class: className,
		children
	}: FormControlProps = $props();
</script>

<div class={cn('space-y-1.5', className)}>
	{#if label}
		<FormLabel {label} {required} />
	{/if}
	{#if description}
		<p class="text-xs text-ink-gray-4">{description}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
	{#if error}
		<ErrorMessage message={error} />
	{/if}
</div>
