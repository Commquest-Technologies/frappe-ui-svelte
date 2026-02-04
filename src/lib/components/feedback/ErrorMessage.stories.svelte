<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ErrorMessage from './ErrorMessage.svelte';

	const { Story } = defineMeta({
		title: 'Feedback/ErrorMessage',
		component: ErrorMessage,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ message: 'This field is required' }} />

<Story name="Various Messages">
	<div class="space-y-2">
		<ErrorMessage message="This field is required" />
		<ErrorMessage message="Please enter a valid email address" />
		<ErrorMessage message="Password must be at least 8 characters" />
		<ErrorMessage message="Username already exists" />
	</div>
</Story>
