<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AutoComplete from './AutoComplete.svelte';

	const { Story } = defineMeta({
		title: 'Data Entry/AutoComplete',
		component: AutoComplete,
		tags: ['autodocs']
	});

	const suggestions = [
		'JavaScript',
		'TypeScript',
		'Python',
		'Java',
		'C++',
		'Ruby',
		'Go',
		'Rust',
		'Swift',
		'Kotlin'
	];

	const userSuggestions = [
		{ label: 'John Doe', value: 'john' },
		{ label: 'Jane Smith', value: 'jane' },
		{ label: 'Bob Wilson', value: 'bob' },
		{ label: 'Alice Johnson', value: 'alice' }
	];
</script>

<Story name="Default">
	<div class="w-64">
		<AutoComplete options={suggestions} placeholder="Search languages..." />
	</div>
</Story>

<Story name="With Objects">
	<div class="w-64">
		<AutoComplete options={userSuggestions} placeholder="Search users..." />
	</div>
</Story>

<Story name="With Initial Value">
	<div class="w-64">
		<AutoComplete options={suggestions} value="TypeScript" />
	</div>
</Story>
