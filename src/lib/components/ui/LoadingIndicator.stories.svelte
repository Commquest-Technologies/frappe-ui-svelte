<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import LoadingIndicator from './LoadingIndicator.svelte';

	const { Story } = defineMeta({
		title: 'UI/LoadingIndicator',
		component: LoadingIndicator,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<LoadingIndicator class="h-6 w-6" />
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<LoadingIndicator class="h-4 w-4" />
		<LoadingIndicator class="h-6 w-6" />
		<LoadingIndicator class="h-8 w-8" />
		<LoadingIndicator class="h-12 w-12" />
	</div>
</Story>

<Story name="With Colors">
	<div class="flex items-center gap-4">
		<LoadingIndicator class="h-6 w-6 text-gray-500" />
		<LoadingIndicator class="h-6 w-6 text-blue-500" />
		<LoadingIndicator class="h-6 w-6 text-green-500" />
		<LoadingIndicator class="h-6 w-6 text-red-500" />
	</div>
</Story>
