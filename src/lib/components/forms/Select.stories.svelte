<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Select from './Select.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Select',
		component: Select,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			variant: {
				control: 'select',
				options: ['subtle', 'outline']
			}
		}
	});

	const options = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
		{ label: 'Option 3', value: '3' }
	];

	const countryOptions = [
		{ label: 'United States', value: 'us' },
		{ label: 'United Kingdom', value: 'uk' },
		{ label: 'Canada', value: 'ca' },
		{ label: 'Australia', value: 'au' },
		{ label: 'Germany', value: 'de' }
	];
</script>

<Story name="Default" args={{ options, placeholder: 'Select an option' }} />

<Story name="Variants">
	<div class="w-64 space-y-4">
		<Select {options} placeholder="Subtle" variant="subtle" />
		<Select {options} placeholder="Outline" variant="outline" />
	</div>
</Story>

<Story name="Sizes">
	<div class="w-64 space-y-4">
		<Select {options} placeholder="Small" size="sm" />
		<Select {options} placeholder="Medium" size="md" />
		<Select {options} placeholder="Large" size="lg" />
	</div>
</Story>

<Story name="With Selected Value">
	<div class="w-64">
		<Select options={countryOptions} value="us" />
	</div>
</Story>

<Story name="Disabled">
	<div class="w-64">
		<Select {options} disabled value="1" />
	</div>
</Story>
