<script lang="ts">
	import type { LoadingTextProps } from '../../types/index.js';
	import LoadingIndicator from './LoadingIndicator.svelte';

	let { text = 'Loading...' }: LoadingTextProps = $props();
</script>

<div class="flex items-center text-base text-ink-gray-4">
	<LoadingIndicator class="-ml-1 mr-2 h-3 w-3" />
	{text}
</div>
