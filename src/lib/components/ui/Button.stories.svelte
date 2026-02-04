<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Button',
		component: Button,
		tags: ['autodocs'],
		argTypes: {
			theme: {
				control: 'select',
				options: ['gray', 'blue', 'green', 'red']
			},
			variant: {
				control: 'select',
				options: ['solid', 'subtle', 'outline', 'ghost']
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg', 'xl', '2xl']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Button', theme: 'gray', variant: 'subtle', size: 'sm' }} />

<Story name="Solid">
	<div class="flex gap-2">
		<Button label="Gray" theme="gray" variant="solid" />
		<Button label="Blue" theme="blue" variant="solid" />
		<Button label="Green" theme="green" variant="solid" />
		<Button label="Red" theme="red" variant="solid" />
	</div>
</Story>

<Story name="Subtle">
	<div class="flex gap-2">
		<Button label="Gray" theme="gray" variant="subtle" />
		<Button label="Blue" theme="blue" variant="subtle" />
		<Button label="Green" theme="green" variant="subtle" />
		<Button label="Red" theme="red" variant="subtle" />
	</div>
</Story>

<Story name="Outline">
	<div class="flex gap-2">
		<Button label="Gray" theme="gray" variant="outline" />
		<Button label="Blue" theme="blue" variant="outline" />
		<Button label="Green" theme="green" variant="outline" />
		<Button label="Red" theme="red" variant="outline" />
	</div>
</Story>

<Story name="Ghost">
	<div class="flex gap-2">
		<Button label="Gray" theme="gray" variant="ghost" />
		<Button label="Blue" theme="blue" variant="ghost" />
		<Button label="Green" theme="green" variant="ghost" />
		<Button label="Red" theme="red" variant="ghost" />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-2">
		<Button label="Small" size="sm" />
		<Button label="Medium" size="md" />
		<Button label="Large" size="lg" />
		<Button label="XL" size="xl" />
		<Button label="2XL" size="2xl" />
	</div>
</Story>

<Story name="With Icons">
	<div class="flex gap-2">
		<Button label="Left Icon" iconLeft="plus" />
		<Button label="Right Icon" iconRight="arrow-right" />
		<Button label="Both Icons" iconLeft="settings" iconRight="chevron-down" />
	</div>
</Story>

<Story name="Icon Only">
	<div class="flex gap-2">
		<Button icon="plus" label="Add" size="sm" />
		<Button icon="settings" label="Settings" size="md" />
		<Button icon="trash-2" label="Delete" size="lg" theme="red" />
	</div>
</Story>

<Story name="Loading">
	<div class="flex gap-2">
		<Button label="Loading" loading />
		<Button label="Loading with text" loading loadingText="Please wait..." />
	</div>
</Story>

<Story name="Disabled">
	<div class="flex gap-2">
		<Button label="Disabled Subtle" disabled />
		<Button label="Disabled Solid" variant="solid" disabled />
		<Button label="Disabled Outline" variant="outline" disabled />
	</div>
</Story>
