<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Progress from './Progress.svelte';

	const { Story } = defineMeta({
		title: 'UI/Progress',
		component: Progress,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl']
			},
			value: {
				control: { type: 'range', min: 0, max: 100, step: 1 }
			}
		}
	});
</script>

<Story name="Default" args={{ value: 60, size: 'md' }} />

<Story name="Various Progress">
	<div class="w-64 space-y-4">
		<Progress value={25} label="25%" />
		<Progress value={50} label="50%" />
		<Progress value={75} label="75%" />
		<Progress value={100} label="Complete" />
	</div>
</Story>

<Story name="Sizes">
	<div class="w-64 space-y-4">
		<Progress value={60} size="sm" label="Small" />
		<Progress value={60} size="md" label="Medium" />
		<Progress value={60} size="lg" label="Large" />
		<Progress value={60} size="xl" label="Extra Large" />
	</div>
</Story>

<Story name="With Intervals">
	<div class="w-64 space-y-4">
		<Progress value={50} intervals intervalCount={6} label="6 Intervals" />
		<Progress value={70} intervals intervalCount={10} label="10 Intervals" />
	</div>
</Story>

<Story name="With Hint">
	<div class="w-64">
		<Progress value={65} label="Upload Progress">
			{#snippet hint()}
				<span class="text-sm text-gray-500">65 of 100 MB</span>
			{/snippet}
		</Progress>
	</div>
</Story>
