<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Rating from './Rating.svelte';

	const { Story } = defineMeta({
		title: 'Forms/Rating',
		component: Rating,
		tags: ['autodocs']
	});
</script>

<Story name="Default" args={{ value: 3 }} />

<Story name="Empty">
	<Rating value={0} />
</Story>

<Story name="Full">
	<Rating value={5} />
</Story>

<Story name="Various Ratings">
	<div class="space-y-4">
		<div class="flex items-center gap-2">
			<Rating value={1} />
			<span class="text-sm">1 star</span>
		</div>
		<div class="flex items-center gap-2">
			<Rating value={2} />
			<span class="text-sm">2 stars</span>
		</div>
		<div class="flex items-center gap-2">
			<Rating value={3} />
			<span class="text-sm">3 stars</span>
		</div>
		<div class="flex items-center gap-2">
			<Rating value={4} />
			<span class="text-sm">4 stars</span>
		</div>
		<div class="flex items-center gap-2">
			<Rating value={5} />
			<span class="text-sm">5 stars</span>
		</div>
	</div>
</Story>

<Story name="Read Only">
	<Rating value={4} readonly />
</Story>
