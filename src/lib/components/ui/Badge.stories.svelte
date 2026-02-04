<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'UI/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			theme: {
				control: 'select',
				options: ['gray', 'blue', 'green', 'orange', 'red']
			},
			variant: {
				control: 'select',
				options: ['solid', 'subtle', 'outline', 'ghost']
			},
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Badge', theme: 'gray', variant: 'subtle', size: 'md' }} />

<Story name="Themes">
	<div class="flex gap-2">
		<Badge label="Gray" theme="gray" />
		<Badge label="Blue" theme="blue" />
		<Badge label="Green" theme="green" />
		<Badge label="Orange" theme="orange" />
		<Badge label="Red" theme="red" />
	</div>
</Story>

<Story name="Solid Variant">
	<div class="flex gap-2">
		<Badge label="Gray" theme="gray" variant="solid" />
		<Badge label="Blue" theme="blue" variant="solid" />
		<Badge label="Green" theme="green" variant="solid" />
		<Badge label="Orange" theme="orange" variant="solid" />
		<Badge label="Red" theme="red" variant="solid" />
	</div>
</Story>

<Story name="Outline Variant">
	<div class="flex gap-2">
		<Badge label="Gray" theme="gray" variant="outline" />
		<Badge label="Blue" theme="blue" variant="outline" />
		<Badge label="Green" theme="green" variant="outline" />
		<Badge label="Orange" theme="orange" variant="outline" />
		<Badge label="Red" theme="red" variant="outline" />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-center gap-2">
		<Badge label="Small" size="sm" />
		<Badge label="Medium" size="md" />
		<Badge label="Large" size="lg" />
	</div>
</Story>

<Story name="Status Badges">
	<div class="flex gap-2">
		<Badge label="Active" theme="green" variant="subtle" />
		<Badge label="Pending" theme="orange" variant="subtle" />
		<Badge label="Inactive" theme="gray" variant="subtle" />
		<Badge label="Error" theme="red" variant="subtle" />
	</div>
</Story>
