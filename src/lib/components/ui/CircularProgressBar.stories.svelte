<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CircularProgressBar from './CircularProgressBar.svelte';

	const { Story } = defineMeta({
		title: 'UI/CircularProgressBar',
		component: CircularProgressBar,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl']
			},
			theme: {
				control: 'select',
				options: ['black', 'red', 'green', 'blue', 'orange']
			},
			variant: {
				control: 'select',
				options: ['solid', 'outline']
			}
		}
	});
</script>

<Story name="Default" args={{ step: 2, totalSteps: 4, size: 'md', theme: 'black' }} />

<Story name="Progress Steps">
	<div class="flex items-center gap-4">
		<CircularProgressBar step={1} totalSteps={4} />
		<CircularProgressBar step={2} totalSteps={4} />
		<CircularProgressBar step={3} totalSteps={4} />
		<CircularProgressBar step={4} totalSteps={4} />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-4">
		<CircularProgressBar step={2} totalSteps={4} size="xs" />
		<CircularProgressBar step={2} totalSteps={4} size="sm" />
		<CircularProgressBar step={2} totalSteps={4} size="md" />
		<CircularProgressBar step={2} totalSteps={4} size="lg" />
		<CircularProgressBar step={2} totalSteps={4} size="xl" />
	</div>
</Story>

<Story name="Themes">
	<div class="flex items-center gap-4">
		<CircularProgressBar step={2} totalSteps={4} theme="black" />
		<CircularProgressBar step={2} totalSteps={4} theme="blue" />
		<CircularProgressBar step={2} totalSteps={4} theme="green" />
		<CircularProgressBar step={2} totalSteps={4} theme="red" />
		<CircularProgressBar step={2} totalSteps={4} theme="orange" />
	</div>
</Story>

<Story name="Show Percentage">
	<div class="flex items-center gap-4">
		<CircularProgressBar step={1} totalSteps={4} showPercentage />
		<CircularProgressBar step={2} totalSteps={4} showPercentage />
		<CircularProgressBar step={3} totalSteps={4} showPercentage />
		<CircularProgressBar step={4} totalSteps={4} showPercentage />
	</div>
</Story>

<Story name="Outline Variant">
	<div class="flex items-center gap-4">
		<CircularProgressBar step={2} totalSteps={4} variant="outline" theme="blue" />
		<CircularProgressBar step={4} totalSteps={4} variant="outline" theme="green" />
	</div>
</Story>
