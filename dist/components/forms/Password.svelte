<script lang="ts">
	import type { PasswordProps } from '../../types/index.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	import TextInput from './TextInput.svelte';
	import KeyboardShortcut from '../ui/KeyboardShortcut.svelte';

	interface PasswordPropsExtended extends PasswordProps {
		showToggle?: boolean;
	}

	let {
		value = $bindable(''),
		showToggle = true,
		...restProps
	}: PasswordPropsExtended = $props();

	let show = $state(false);
	let inputElement: HTMLInputElement | undefined;

	const showEye = $derived(!value?.includes('*'));

	function handleKeyDown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
			e.preventDefault();
			show = !show;
		}
	}

	function toggleVisibility() {
		show = !show;
	}
</script>

<TextInput
	type={show ? 'text' : 'password'}
	bind:value
	onkeydown={handleKeyDown}
	{...restProps}
>
	{#snippet suffix()}
		{#if showToggle && showEye}
			<button
				type="button"
				class="h-3 w-3 cursor-pointer mr-1 text-ink-gray-5 hover:text-ink-gray-7"
				onclick={toggleVisibility}
				title={show ? 'Hide Password (Ctrl+I)' : 'Show Password (Ctrl+I)'}
				data-testid="eye-icon"
			>
				{#if show}
					<EyeOff class="h-full w-full" />
				{:else}
					<Eye class="h-full w-full" />
				{/if}
			</button>
		{/if}
	{/snippet}
</TextInput>
