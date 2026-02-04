<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Card from './Card.svelte';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'UI/Card',
		component: Card,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ title: 'Card Title' }}>
	<p class="text-gray-600">This is the card content. You can put any content here.</p>
</Story>

<Story name="With Subtitle">
	<Card title="Card Title" subtitle="This is a helpful subtitle">
		<p class="text-gray-600">Card content goes here.</p>
	</Card>
</Story>

<Story name="With Actions">
	<Card title="Card with Actions">
		{#snippet actions()}
			<Button label="Edit" size="sm" variant="outline" />
			<Button label="Delete" size="sm" theme="red" variant="ghost" />
		{/snippet}
		<p class="text-gray-600">This card has action buttons in the header.</p>
	</Card>
</Story>

<Story name="Loading State">
	<Card title="Loading Card" loading />
</Story>

<Story name="Complex Card">
	<Card title="User Profile" subtitle="Manage your account settings">
		{#snippet actions()}
			<Button label="Save" size="sm" theme="blue" variant="solid" />
		{/snippet}
		<div class="space-y-4">
			<div>
				<label class="text-sm font-medium text-gray-700">Name</label>
				<p class="text-gray-900">John Doe</p>
			</div>
			<div>
				<label class="text-sm font-medium text-gray-700">Email</label>
				<p class="text-gray-900">john@example.com</p>
			</div>
		</div>
	</Card>
</Story>
