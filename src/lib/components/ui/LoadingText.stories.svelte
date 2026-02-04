<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingText from './LoadingText.svelte';

	const { Story } = defineMeta({
		title: 'UI/LoadingText',
		component: LoadingText,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<LoadingText />
</Story>

<Story name="Custom Text">
	<div class="space-y-2">
		<LoadingText text="Loading..." />
		<LoadingText text="Please wait..." />
		<LoadingText text="Fetching data..." />
		<LoadingText text="Processing..." />
	</div>
</Story>
