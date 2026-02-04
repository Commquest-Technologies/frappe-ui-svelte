<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FormControl from './FormControl.svelte';
	import TextInput from './TextInput.svelte';
	import Select from './Select.svelte';
	import Password from './Password.svelte';

	const { Story } = defineMeta({
		title: 'Forms/FormControl',
		component: FormControl,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<div class="w-64">
		<FormControl label="Email">
			<TextInput placeholder="Enter email" type="email" />
		</FormControl>
	</div>
</Story>

<Story name="Required">
	<div class="w-64">
		<FormControl label="Username" required>
			<TextInput placeholder="Enter username" />
		</FormControl>
	</div>
</Story>

<Story name="With Error">
	<div class="w-64">
		<FormControl label="Password" required error="Password must be at least 8 characters">
			<Password placeholder="Enter password" />
		</FormControl>
	</div>
</Story>

<Story name="With Description">
	<div class="w-64">
		<FormControl label="API Key" description="Your secret API key for authentication">
			<TextInput placeholder="sk_live_..." />
		</FormControl>
	</div>
</Story>

<Story name="Complete Form">
	<div class="w-80 space-y-4">
		<FormControl label="Full Name" required>
			<TextInput placeholder="John Doe" />
		</FormControl>
		<FormControl label="Email" required>
			<TextInput placeholder="john@example.com" type="email" />
		</FormControl>
		<FormControl label="Role">
			<Select
				options={[
					{ label: 'Admin', value: 'admin' },
					{ label: 'User', value: 'user' },
					{ label: 'Guest', value: 'guest' }
				]}
				placeholder="Select role"
			/>
		</FormControl>
		<FormControl label="Password" required description="Must be at least 8 characters">
			<Password placeholder="Enter password" />
		</FormControl>
	</div>
</Story>
