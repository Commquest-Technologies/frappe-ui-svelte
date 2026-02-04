<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tabs from './Tabs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Tabs',
		component: Tabs,
		tags: ['autodocs']
	});

	const items = [
		{ id: 'tab1', label: 'Overview' },
		{ id: 'tab2', label: 'Details' },
		{ id: 'tab3', label: 'Settings' }
	];

	const itemsWithIcons = [
		{ id: 'home', label: 'Home', icon: 'home' },
		{ id: 'profile', label: 'Profile', icon: 'user' },
		{ id: 'settings', label: 'Settings', icon: 'settings' }
	];
</script>

<Story name="Default">
	<div class="w-full max-w-md">
		<Tabs {items} />
	</div>
</Story>

<Story name="With Icons">
	<div class="w-full max-w-md">
		<Tabs items={itemsWithIcons} />
	</div>
</Story>

<Story name="Vertical">
	<div class="h-64 w-full max-w-md">
		<Tabs {items} vertical />
	</div>
</Story>

<Story name="With Content">
	<div class="w-full max-w-lg rounded-lg border">
		<Tabs
			tabs={[
				{
					label: 'Account',
					content: () => {
						// This is a simplified version - in real usage you'd use snippets
					}
				},
				{
					label: 'Password'
				},
				{
					label: 'Notifications',
					disabled: true
				}
			]}
		/>
	</div>
</Story>
