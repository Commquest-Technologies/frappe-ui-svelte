<script lang="ts">
	import { Command, ArrowUp, Option } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { cn } from '../../utils/cn.js';

	interface KeyboardShortcutProps {
		meta?: boolean;
		ctrl?: boolean;
		shift?: boolean;
		alt?: boolean;
		bg?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		meta = false,
		ctrl = false,
		shift = false,
		alt = false,
		bg = false,
		class: className,
		children
	}: KeyboardShortcutProps = $props();

	const isMac = $derived.by(() => {
		if (typeof window !== 'undefined') {
			return navigator.userAgent.includes('Mac');
		}
		return false;
	});

	const wrapperClasses = $derived(
		cn(
			'inline-flex items-center gap-0.5 text-sm',
			bg ? 'bg-surface-gray-2 rounded-sm text-ink-gray-5 py-0.5 px-1' : 'text-ink-gray-4',
			className
		)
	);
</script>

<div class={wrapperClasses}>
	{#if ctrl || meta}
		<span class="flex items-center">
			{#if isMac}
				<Command class="h-3 w-3" />
			{:else}
				<span>Ctrl</span>
			{/if}
		</span>
	{/if}
	{#if shift}
		<span class="flex items-center">
			<ArrowUp class="h-3 w-3" />
		</span>
	{/if}
	{#if alt}
		<span class="flex items-center">
			<Option class="h-3 w-3" />
		</span>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</div>
