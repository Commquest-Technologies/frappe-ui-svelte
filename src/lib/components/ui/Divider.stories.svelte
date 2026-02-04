<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Divider from './Divider.svelte';

	const { Story } = defineMeta({
		title: 'UI/Divider',
		component: Divider,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<div class="w-64">
		<p class="mb-4">Content above</p>
		<Divider />
		<p class="mt-4">Content below</p>
	</div>
</Story>

<Story name="In a List">
	<div class="w-64 space-y-2">
		<p>Item 1</p>
		<Divider />
		<p>Item 2</p>
		<Divider />
		<p>Item 3</p>
	</div>
</Story>
