<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Password from './Password.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Password',
		component: Password,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['sm', 'md', 'lg']
			},
			variant: {
				control: 'select',
				options: ['subtle', 'outline']
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter password...' }} />

<Story name="Variants">
	<div class="w-64 space-y-4">
		<Password placeholder="Subtle variant" variant="subtle" />
		<Password placeholder="Outline variant" variant="outline" />
	</div>
</Story>

<Story name="Sizes">
	<div class="w-64 space-y-4">
		<Password placeholder="Small" size="sm" />
		<Password placeholder="Medium" size="md" />
		<Password placeholder="Large" size="lg" />
	</div>
</Story>

<Story name="Without Toggle">
	<div class="w-64">
		<Password placeholder="No visibility toggle" showToggle={false} />
	</div>
</Story>

<Story name="Disabled">
	<div class="w-64">
		<Password placeholder="Disabled" disabled value="secretpassword" />
	</div>
</Story>
