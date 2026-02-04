<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Switch from './Switch.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Switch',
		component: Switch,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'Enable notifications', size: 'sm' }} />

<Story name="Checked">
	<Switch label="Dark mode" checked />
</Story>

<Story name="Sizes">
	<div class="space-y-4">
		<Switch label="Small switch" size="sm" />
		<Switch label="Medium switch" size="md" />
	</div>
</Story>

<Story name="With Description">
	<div class="w-80">
		<Switch
			label="Email notifications"
			description="Receive email notifications when someone mentions you"
			size="md"
		/>
	</div>
</Story>

<Story name="With Icon">
	<Switch label="Show sidebar" icon="sidebar" />
</Story>

<Story name="Disabled">
	<div class="space-y-4">
		<Switch label="Disabled off" disabled />
		<Switch label="Disabled on" disabled checked />
	</div>
</Story>

<Story name="Settings Panel">
	<div class="w-80 space-y-4">
		<Switch label="Push notifications" description="Get notified on your device" />
		<Switch label="Email digest" description="Weekly summary of your activity" checked />
		<Switch label="Marketing emails" description="Receive promotional content" />
	</div>
</Story>
