<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextInput from './TextInput.svelte';
	import FeatherIcon from '../ui/FeatherIcon.svelte';

	const { Story } = defineMeta({
		title: 'Forms/TextInput',
		component: TextInput,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			variant: {
				control: 'select',
				options: ['subtle', 'outline', 'ghost']
			},
			type: {
				control: 'select',
				options: ['text', 'email', 'password', 'number', 'tel', 'url']
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter text...', size: 'sm', variant: 'subtle' }} />

<Story name="Variants">
	<div class="w-64 space-y-4">
		<TextInput placeholder="Subtle variant" variant="subtle" />
		<TextInput placeholder="Outline variant" variant="outline" />
		<TextInput placeholder="Ghost variant" variant="ghost" />
	</div>
</Story>

<Story name="Sizes">
	<div class="w-64 space-y-4">
		<TextInput placeholder="Small" size="sm" />
		<TextInput placeholder="Medium" size="md" />
		<TextInput placeholder="Large" size="lg" />
	</div>
</Story>

<Story name="With Prefix">
	<div class="w-64">
		<TextInput placeholder="Search...">
			{#snippet prefix()}
				<FeatherIcon name="search" class="h-4 w-4" />
			{/snippet}
		</TextInput>
	</div>
</Story>

<Story name="With Suffix">
	<div class="w-64">
		<TextInput placeholder="Email" type="email">
			{#snippet suffix()}
				<FeatherIcon name="mail" class="h-4 w-4" />
			{/snippet}
		</TextInput>
	</div>
</Story>

<Story name="Disabled">
	<div class="w-64">
		<TextInput placeholder="Disabled input" disabled value="Cannot edit" />
	</div>
</Story>

<Story name="Input Types">
	<div class="w-64 space-y-4">
		<TextInput placeholder="Text" type="text" />
		<TextInput placeholder="Email" type="email" />
		<TextInput placeholder="Number" type="number" />
		<TextInput placeholder="Phone" type="tel" />
	</div>
</Story>
