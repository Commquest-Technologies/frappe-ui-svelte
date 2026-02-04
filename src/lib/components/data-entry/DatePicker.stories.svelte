<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DatePicker from './DatePicker.svelte';

	const { Story } = defineMeta({
		title: 'Data Entry/DatePicker',
		component: DatePicker,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['subtle', 'outline']
			},
			placement: {
				control: 'select',
				options: ['bottom-start', 'bottom-end', 'top-start', 'top-end']
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Select date...' }} />

<Story name="With Label">
	<div class="w-64">
		<DatePicker label="Start Date" placeholder="Pick a date" />
	</div>
</Story>

<Story name="Variants">
	<div class="w-64 space-y-4">
		<DatePicker placeholder="Subtle variant" variant="subtle" />
		<DatePicker placeholder="Outline variant" variant="outline" />
	</div>
</Story>

<Story name="With Initial Value">
	<div class="w-64">
		<DatePicker value="2024-01-15" />
	</div>
</Story>

<Story name="Not Clearable">
	<div class="w-64">
		<DatePicker value="2024-01-15" clearable={false} />
	</div>
</Story>

<Story name="With Custom Formatter">
	<div class="w-64">
		<DatePicker
			value="2024-01-15"
			formatter={(v) => {
				const d = new Date(v);
				return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
			}}
		/>
	</div>
</Story>
