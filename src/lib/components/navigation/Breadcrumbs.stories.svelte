<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Breadcrumbs from './Breadcrumbs.svelte';

	const { Story } = defineMeta({
		title: 'Navigation/Breadcrumbs',
		component: Breadcrumbs,
		tags: ['autodocs']
	});

	const basicItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Electronics', href: '/products/electronics' },
		{ label: 'Laptops' }
	];

	const shortItems = [{ label: 'Home', href: '/' }, { label: 'Dashboard' }];
</script>

<Story name="Default">
	<Breadcrumbs items={basicItems} />
</Story>

<Story name="Short Path">
	<Breadcrumbs items={shortItems} />
</Story>

<Story name="Custom Separator">
	<div class="space-y-4">
		<Breadcrumbs items={basicItems} separator="/" />
		<Breadcrumbs items={basicItems} separator=">" />
		<Breadcrumbs items={basicItems} separator="→" />
		<Breadcrumbs items={basicItems} separator="|" />
	</div>
</Story>

<Story name="With Click Handler">
	<Breadcrumbs
		items={[
			{ label: 'Home', onclick: () => alert('Home clicked') },
			{ label: 'Settings', onclick: () => alert('Settings clicked') },
			{ label: 'Profile' }
		]}
	/>
</Story>
