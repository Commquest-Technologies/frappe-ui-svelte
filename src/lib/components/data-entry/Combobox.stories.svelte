<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Combobox from './Combobox.svelte';

	const { Story } = defineMeta({
		title: 'Data Entry/Combobox',
		component: Combobox,
		tags: ['autodocs']
	});

	const fruits = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Cherry', value: 'cherry' },
		{ label: 'Date', value: 'date' },
		{ label: 'Elderberry', value: 'elderberry' }
	];

	const countries = [
		{ label: 'United States', value: 'us' },
		{ label: 'United Kingdom', value: 'uk' },
		{ label: 'Canada', value: 'ca' },
		{ label: 'Australia', value: 'au' },
		{ label: 'Germany', value: 'de' },
		{ label: 'France', value: 'fr' },
		{ label: 'Japan', value: 'jp' },
		{ label: 'South Korea', value: 'kr' }
	];

	const groupedOptions = [
		{
			group: 'Fruits',
			options: [
				{ label: 'Apple', value: 'apple' },
				{ label: 'Banana', value: 'banana' }
			]
		},
		{
			group: 'Vegetables',
			options: [
				{ label: 'Carrot', value: 'carrot' },
				{ label: 'Broccoli', value: 'broccoli' }
			]
		}
	];
</script>

<Story name="Default">
	<div class="w-64">
		<Combobox options={fruits} placeholder="Select a fruit..." />
	</div>
</Story>

<Story name="With Initial Value">
	<div class="w-64">
		<Combobox options={fruits} value="apple" />
	</div>
</Story>

<Story name="Many Options">
	<div class="w-64">
		<Combobox options={countries} placeholder="Select a country..." />
	</div>
</Story>

<Story name="Grouped Options">
	<div class="w-64">
		<Combobox options={groupedOptions} placeholder="Select food..." />
	</div>
</Story>

<Story name="Not Searchable">
	<div class="w-64">
		<Combobox options={fruits} searchable={false} placeholder="Select..." />
	</div>
</Story>

<Story name="Disabled">
	<div class="w-64">
		<Combobox options={fruits} disabled value="apple" />
	</div>
</Story>

<Story name="With Disabled Options">
	<div class="w-64">
		<Combobox
			options={[
				{ label: 'Available', value: 'available' },
				{ label: 'Unavailable', value: 'unavailable', disabled: true },
				{ label: 'Another Available', value: 'another' }
			]}
			placeholder="Select..."
		/>
	</div>
</Story>
