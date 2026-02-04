<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormLabel from './FormLabel.svelte';
	import TextInput from '../forms/TextInput.svelte';

	const { Story } = defineMeta({
		title: 'UI/FormLabel',
		component: FormLabel,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ label: 'Email Address' }} />

<Story name="Required">
	<FormLabel label="Username" required />
</Story>

<Story name="With Input">
	<div class="w-64 space-y-1">
		<FormLabel label="Full Name" required />
		<TextInput placeholder="Enter your full name" />
	</div>
</Story>

<Story name="With Description">
	<div class="w-64 space-y-1">
		<FormLabel label="Password" required />
		<TextInput type="password" placeholder="Enter password" />
		<p class="text-xs text-gray-500">Must be at least 8 characters</p>
	</div>
</Story>
