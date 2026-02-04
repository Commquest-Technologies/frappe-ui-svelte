<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Alert from './Alert.svelte';
	import Button from '../ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/Alert',
		component: Alert,
		tags: ['autodocs'],
		argTypes: {
			theme: {
				control: 'select',
				options: ['info', 'success', 'warning', 'error']
			}
		}
	});
</script>

<Story name="Info" args={{ theme: 'info', title: 'Information' }}>
	This is an informational message.
</Story>

<Story name="Success">
	<Alert theme="success" title="Success">Your changes have been saved successfully.</Alert>
</Story>

<Story name="Warning">
	<Alert theme="warning" title="Warning">Please review your input before proceeding.</Alert>
</Story>

<Story name="Error">
	<Alert theme="error" title="Error">An error occurred while processing your request.</Alert>
</Story>

<Story name="Dismissible">
	<Alert theme="info" title="Dismissible Alert" dismissible>
		Click the X button to dismiss this alert.
	</Alert>
</Story>

<Story name="With Actions">
	<Alert theme="warning" title="Confirm Action">
		Are you sure you want to delete this item?
		{#snippet actions()}
			<Button label="Cancel" size="sm" variant="ghost" />
			<Button label="Delete" size="sm" theme="red" variant="solid" />
		{/snippet}
	</Alert>
</Story>

<Story name="All Variants">
	<div class="space-y-4">
		<Alert theme="info" title="Info">Informational message</Alert>
		<Alert theme="success" title="Success">Success message</Alert>
		<Alert theme="warning" title="Warning">Warning message</Alert>
		<Alert theme="error" title="Error">Error message</Alert>
	</div>
</Story>
