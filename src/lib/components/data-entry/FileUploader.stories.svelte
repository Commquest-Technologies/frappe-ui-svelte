<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUploader from './FileUploader.svelte';

	const { Story } = defineMeta({
		title: 'Data Entry/FileUploader',
		component: FileUploader,
		tags: ['autodocs']
	});
</script>

<Story name="Default">
	<div class="w-96">
		<FileUploader />
	</div>
</Story>

<Story name="Image Only">
	<div class="w-96">
		<FileUploader accept="image/*" />
	</div>
</Story>

<Story name="Multiple Files">
	<div class="w-96">
		<FileUploader multiple />
	</div>
</Story>

<Story name="With Size Limit">
	<div class="w-96">
		<FileUploader maxSize={5 * 1024 * 1024} />
		<p class="mt-2 text-sm text-gray-500">Max file size: 5MB</p>
	</div>
</Story>
