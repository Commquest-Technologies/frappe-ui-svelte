<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TextArea from './TextArea.svelte';

	const { Story } = defineMeta({
		title: 'Forms/TextArea',
		component: TextArea,
		tags: ['autodocs'],
		argTypes: {
			variant: {
				control: 'select',
				options: ['subtle', 'outline']
			}
		}
	});
</script>

<Story name="Default" args={{ placeholder: 'Enter your message...' }} />

<Story name="Variants">
	<div class="w-80 space-y-4">
		<TextArea placeholder="Subtle variant" variant="subtle" />
		<TextArea placeholder="Outline variant" variant="outline" />
	</div>
</Story>

<Story name="With Rows">
	<div class="w-80 space-y-4">
		<TextArea placeholder="3 rows" rows={3} />
		<TextArea placeholder="6 rows" rows={6} />
	</div>
</Story>

<Story name="Disabled">
	<div class="w-80">
		<TextArea placeholder="Cannot edit" disabled value="This textarea is disabled" />
	</div>
</Story>
