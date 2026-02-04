<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Avatar from './Avatar.svelte';

	const { Story } = defineMeta({
		title: 'UI/Avatar',
		component: Avatar,
		tags: ['autodocs'],
		argTypes: {
			size: {
				control: 'select',
				options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
			},
			shape: {
				control: 'select',
				options: ['circle', 'square']
			}
		}
	});
</script>

<Story name="Default" args={{ label: 'John Doe', size: 'md', shape: 'circle' }} />

<Story name="With Image">
	<Avatar image="https://i.pravatar.cc/150?img=1" alt="User avatar" size="xl" />
</Story>

<Story name="With Initials">
	<div class="flex gap-2">
		<Avatar label="John Doe" size="md" />
		<Avatar label="Jane Smith" size="md" />
		<Avatar label="Bob Wilson" size="md" />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-end gap-2">
		<Avatar label="XS" size="xs" />
		<Avatar label="SM" size="sm" />
		<Avatar label="MD" size="md" />
		<Avatar label="LG" size="lg" />
		<Avatar label="XL" size="xl" />
		<Avatar label="2X" size="2xl" />
		<Avatar label="3X" size="3xl" />
	</div>
</Story>

<Story name="Square Shape">
	<div class="flex items-end gap-2">
		<Avatar label="SM" size="sm" shape="square" />
		<Avatar label="MD" size="md" shape="square" />
		<Avatar label="LG" size="lg" shape="square" />
		<Avatar label="XL" size="xl" shape="square" />
	</div>
</Story>

<Story name="Image Gallery">
	<div class="flex gap-2">
		<Avatar image="https://i.pravatar.cc/150?img=1" size="lg" />
		<Avatar image="https://i.pravatar.cc/150?img=2" size="lg" />
		<Avatar image="https://i.pravatar.cc/150?img=3" size="lg" />
		<Avatar image="https://i.pravatar.cc/150?img=4" size="lg" />
	</div>
</Story>
