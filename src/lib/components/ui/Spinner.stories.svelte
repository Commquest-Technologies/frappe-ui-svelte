<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Spinner from './Spinner.svelte';

	const { Story } = defineMeta({
		title: 'UI/Spinner',
		component: Spinner,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<Spinner class="h-8 w-8" />
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<Spinner class="h-4 w-4" />
		<Spinner class="h-6 w-6" />
		<Spinner class="h-8 w-8" />
		<Spinner class="h-12 w-12" />
		<Spinner class="h-16 w-16" />
	</div>
</Story>
