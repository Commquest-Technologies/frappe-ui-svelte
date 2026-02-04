<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FeatherIcon from './FeatherIcon.svelte';

	const { Story } = defineMeta({
		title: 'UI/FeatherIcon',
		component: FeatherIcon,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ name: 'home' }} />

<Story name="Common Icons">
	<div class="flex items-center gap-4">
		<FeatherIcon name="home" class="h-6 w-6" />
		<FeatherIcon name="user" class="h-6 w-6" />
		<FeatherIcon name="settings" class="h-6 w-6" />
		<FeatherIcon name="search" class="h-6 w-6" />
		<FeatherIcon name="bell" class="h-6 w-6" />
		<FeatherIcon name="mail" class="h-6 w-6" />
		<FeatherIcon name="calendar" class="h-6 w-6" />
		<FeatherIcon name="file" class="h-6 w-6" />
	</div>
</Story>

<Story name="Sizes">
	<div class="flex items-end gap-4">
		<FeatherIcon name="star" class="h-4 w-4" />
		<FeatherIcon name="star" class="h-5 w-5" />
		<FeatherIcon name="star" class="h-6 w-6" />
		<FeatherIcon name="star" class="h-8 w-8" />
		<FeatherIcon name="star" class="h-10 w-10" />
	</div>
</Story>

<Story name="Colors">
	<div class="flex items-center gap-4">
		<FeatherIcon name="heart" class="h-6 w-6 text-gray-500" />
		<FeatherIcon name="heart" class="h-6 w-6 text-red-500" />
		<FeatherIcon name="heart" class="h-6 w-6 text-blue-500" />
		<FeatherIcon name="heart" class="h-6 w-6 text-green-500" />
		<FeatherIcon name="heart" class="h-6 w-6 text-orange-500" />
	</div>
</Story>

<Story name="Action Icons">
	<div class="flex items-center gap-4">
		<FeatherIcon name="edit-2" class="h-5 w-5" />
		<FeatherIcon name="trash-2" class="h-5 w-5" />
		<FeatherIcon name="copy" class="h-5 w-5" />
		<FeatherIcon name="download" class="h-5 w-5" />
		<FeatherIcon name="upload" class="h-5 w-5" />
		<FeatherIcon name="share-2" class="h-5 w-5" />
	</div>
</Story>

<Story name="Navigation Icons">
	<div class="flex items-center gap-4">
		<FeatherIcon name="arrow-left" class="h-5 w-5" />
		<FeatherIcon name="arrow-right" class="h-5 w-5" />
		<FeatherIcon name="arrow-up" class="h-5 w-5" />
		<FeatherIcon name="arrow-down" class="h-5 w-5" />
		<FeatherIcon name="chevron-left" class="h-5 w-5" />
		<FeatherIcon name="chevron-right" class="h-5 w-5" />
	</div>
</Story>
