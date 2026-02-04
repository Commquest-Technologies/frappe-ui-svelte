<script lang="ts">
	import { cn } from '../../utils/cn.js';

	interface TextEditorProps {
		value?: string;
		placeholder?: string;
		readonly?: boolean;
		class?: string;
		onchange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = 'Enter text...',
		readonly = false,
		class: className,
		onchange
	}: TextEditorProps = $props();

	function handleInput(e: Event) {
		const target = e.target as HTMLDivElement;
		value = target.innerHTML;
		onchange?.(value);
	}
</script>

<div
	class={cn(
		'min-h-[200px] w-full rounded-md border border-outline-gray-2 bg-surface-white p-4 text-base text-ink-gray-8',
		'focus:outline-none focus:ring-2 focus:ring-outline-gray-3 focus:border-outline-gray-4',
		readonly && 'bg-surface-gray-1 cursor-not-allowed',
		className
	)}
	contenteditable={!readonly}
	role="textbox"
	aria-multiline="true"
	data-placeholder={placeholder}
	oninput={handleInput}
>
	{#if value}
		{@html value}
	{/if}
</div>

<style>
	[contenteditable]:empty:before {
		content: attr(data-placeholder);
		color: var(--color-ink-gray-4);
		pointer-events: none;
	}
</style>
