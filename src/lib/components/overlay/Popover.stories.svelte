<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Popover from './Popover.svelte';
	import Button from '../ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'Overlay/Popover',
		component: Popover,
		tags: ['autodocs'],
		argTypes: {
			placement: {
				control: 'select',
				options: [
					'top',
					'bottom',
					'left',
					'right',
					'top-start',
					'top-end',
					'bottom-start',
					'bottom-end'
				]
			}
		}
	});
</script>

<script lang="ts">
	let open1 = $state(false);
	let open2 = $state(false);
</script>

<Story name="Default">
	<Popover bind:open={open1}>
		{#snippet trigger()}
			<Button label="Open Popover" onclick={() => (open1 = !open1)} />
		{/snippet}
		<div class="w-64 p-4">
			<h3 class="mb-2 font-semibold">Popover Title</h3>
			<p class="text-sm text-gray-600">This is the popover content. You can put anything here.</p>
		</div>
	</Popover>
</Story>

<Story name="With Form">
	<Popover bind:open={open2}>
		{#snippet trigger()}
			<Button label="Edit Profile" onclick={() => (open2 = !open2)} />
		{/snippet}
		<div class="w-72 space-y-3 p-4">
			<h3 class="font-semibold">Edit Profile</h3>
			<div>
				<label class="text-sm font-medium">Name</label>
				<input class="mt-1 w-full rounded border px-2 py-1 text-sm" value="John Doe" />
			</div>
			<div>
				<label class="text-sm font-medium">Email</label>
				<input class="mt-1 w-full rounded border px-2 py-1 text-sm" value="john@example.com" />
			</div>
			<div class="flex justify-end gap-2">
				<Button label="Cancel" size="sm" variant="outline" onclick={() => (open2 = false)} />
				<Button
					label="Save"
					size="sm"
					theme="blue"
					variant="solid"
					onclick={() => (open2 = false)}
				/>
			</div>
		</div>
	</Popover>
</Story>
