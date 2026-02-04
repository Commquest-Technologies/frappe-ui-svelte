<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Checkbox from './Checkbox.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Checkbox',
		component: Checkbox,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Accept terms and conditions', size: 'sm' }} />

<Story name="Checked">
	<Checkbox label="This is checked" checked />
</Story>

<Story name="Sizes">
	<div class="space-y-4">
		<Checkbox label="Small checkbox" size="sm" />
		<Checkbox label="Medium checkbox" size="md" />
	</div>
</Story>

<Story name="With Padding">
	<div class="space-y-2">
		<Checkbox label="Option A" padding />
		<Checkbox label="Option B" padding />
		<Checkbox label="Option C" padding />
	</div>
</Story>

<Story name="Disabled">
	<div class="space-y-4">
		<Checkbox label="Disabled unchecked" disabled />
		<Checkbox label="Disabled checked" disabled checked />
	</div>
</Story>

<Story name="Indeterminate">
	<Checkbox label="Indeterminate state" indeterminate />
</Story>

<Story name="Checkbox Group">
	<div class="space-y-2">
		<p class="mb-2 text-sm font-medium">Select your interests:</p>
		<Checkbox label="Technology" />
		<Checkbox label="Design" />
		<Checkbox label="Business" />
		<Checkbox label="Marketing" />
	</div>
</Story>
