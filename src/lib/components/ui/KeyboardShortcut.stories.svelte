<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import KeyboardShortcut from './KeyboardShortcut.svelte';

	const { Story } = defineMeta({
		title: 'UI/KeyboardShortcut',
		component: KeyboardShortcut,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ shortcut: '⌘K' }} />

<Story name="Common Shortcuts">
	<div class="space-y-2">
		<div class="flex w-48 items-center justify-between">
			<span>Save</span>
			<KeyboardShortcut shortcut="⌘S" />
		</div>
		<div class="flex w-48 items-center justify-between">
			<span>Copy</span>
			<KeyboardShortcut shortcut="⌘C" />
		</div>
		<div class="flex w-48 items-center justify-between">
			<span>Paste</span>
			<KeyboardShortcut shortcut="⌘V" />
		</div>
		<div class="flex w-48 items-center justify-between">
			<span>Undo</span>
			<KeyboardShortcut shortcut="⌘Z" />
		</div>
	</div>
</Story>

<Story name="Multi-Key Shortcuts">
	<div class="space-y-2">
		<div class="flex w-64 items-center justify-between">
			<span>Command Palette</span>
			<KeyboardShortcut shortcut="⌘⇧P" />
		</div>
		<div class="flex w-64 items-center justify-between">
			<span>Find in Files</span>
			<KeyboardShortcut shortcut="⌘⇧F" />
		</div>
	</div>
</Story>
