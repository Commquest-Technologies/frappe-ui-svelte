<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dropdown from './Dropdown.svelte';
	import Button from '../ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'Overlay/Dropdown',
		component: Dropdown,
		tags: ['autodocs'],
		argTypes: {
			placement: {
				control: 'select',
				options: ['bottom-start', 'bottom-end', 'top-start', 'top-end']
			}
		}
	});

	const basicOptions = [
		{ label: 'Edit', value: 'edit', icon: 'edit-2' },
		{ label: 'Duplicate', value: 'duplicate', icon: 'copy' },
		{ label: 'Archive', value: 'archive', icon: 'archive' },
		{ separator: true, label: '', value: '' },
		{ label: 'Delete', value: 'delete', icon: 'trash-2', theme: 'red' as const }
	];
</script>

<Story name="Default">
	<Dropdown options={basicOptions} button={{ label: 'Actions' }} />
</Story>

<Story name="Button Variants">
	<div class="flex gap-4">
		<Dropdown options={basicOptions} button={{ label: 'Ghost', variant: 'ghost' }} />
		<Dropdown options={basicOptions} button={{ label: 'Outline', variant: 'outline' }} />
		<Dropdown options={basicOptions} button={{ label: 'Subtle', variant: 'subtle' }} />
		<Dropdown options={basicOptions} button={{ label: 'Solid', variant: 'solid' }} />
	</div>
</Story>

<Story name="With Click Handlers">
	<Dropdown
		options={[
			{ label: 'View', value: 'view', icon: 'eye', onclick: () => alert('View clicked') },
			{ label: 'Edit', value: 'edit', icon: 'edit-2', onclick: () => alert('Edit clicked') },
			{ label: 'Share', value: 'share', icon: 'share-2', onclick: () => alert('Share clicked') }
		]}
		button={{ label: 'More Actions' }}
	/>
</Story>

<Story name="Custom Trigger">
	<Dropdown options={basicOptions}>
		{#snippet trigger()}
			<Button icon="more-vertical" label="More" size="sm" variant="ghost" />
		{/snippet}
	</Dropdown>
</Story>

<Story name="With Disabled Items">
	<Dropdown
		options={[
			{ label: 'Active', value: 'active' },
			{ label: 'Disabled', value: 'disabled', disabled: true },
			{ label: 'Another Active', value: 'another' }
		]}
		button={{ label: 'Options' }}
	/>
</Story>

<Story name="Placement">
	<div class="flex justify-center gap-4 pt-40">
		<Dropdown options={basicOptions} button={{ label: 'Bottom Start' }} placement="bottom-start" />
		<Dropdown options={basicOptions} button={{ label: 'Bottom End' }} placement="bottom-end" />
	</div>
</Story>
