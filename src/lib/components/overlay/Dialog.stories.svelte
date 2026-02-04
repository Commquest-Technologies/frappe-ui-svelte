<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Dialog from './Dialog.svelte';
	import Button from '../ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'Overlay/Dialog',
		component: Dialog,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
			}
		}
	});
</script>

<script lang="ts">
	let open1 = $state(false);
	let open2 = $state(false);
	let open3 = $state(false);
	let open4 = $state(false);
	let open5 = $state(false);
</script>

<Story name="Default">
	<Button label="Open Dialog" onclick={() => (open1 = true)} />
	<Dialog bind:open={open1} title="Dialog Title">
		<p class="text-gray-600">This is the dialog content. You can put any content here.</p>
		{#snippet actions()}
			<div class="flex justify-end gap-2">
				<Button label="Cancel" variant="outline" onclick={() => (open1 = false)} />
				<Button label="Confirm" theme="blue" variant="solid" onclick={() => (open1 = false)} />
			</div>
		{/snippet}
	</Dialog>
</Story>

<Story name="With Options API">
	<Button label="Open Dialog" onclick={() => (open2 = true)} />
	<Dialog
		bind:open={open2}
		options={{
			title: 'Confirm Delete',
			message: 'Are you sure you want to delete this item? This action cannot be undone.',
			icon: { name: 'trash-2', appearance: 'danger' },
			actions: [
				{ label: 'Cancel', variant: 'outline' },
				{ label: 'Delete', theme: 'red', variant: 'solid' }
			]
		}}
	/>
</Story>

<Story name="Sizes">
	<div class="flex gap-2">
		<Button label="Small" onclick={() => (open3 = true)} />
	</div>
	<Dialog bind:open={open3} title="Small Dialog" size="sm">
		<p class="text-gray-600">This is a small dialog.</p>
	</Dialog>
</Story>

<Story name="Info Dialog">
	<Button label="Show Info" onclick={() => (open4 = true)} />
	<Dialog
		bind:open={open4}
		options={{
			title: 'Information',
			message: 'Your changes have been saved successfully.',
			icon: { name: 'info', appearance: 'info' },
			actions: [{ label: 'Got it', theme: 'blue', variant: 'solid' }]
		}}
	/>
</Story>

<Story name="Warning Dialog">
	<Button label="Show Warning" theme="red" onclick={() => (open5 = true)} />
	<Dialog
		bind:open={open5}
		options={{
			title: 'Warning',
			message: 'You have unsaved changes. Are you sure you want to leave?',
			icon: { name: 'alert-triangle', appearance: 'warning' },
			actions: [
				{ label: 'Stay', variant: 'outline' },
				{ label: 'Leave', theme: 'red', variant: 'solid' }
			]
		}}
	/>
</Story>
