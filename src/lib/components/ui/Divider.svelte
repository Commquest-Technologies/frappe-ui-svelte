<script lang="ts">
	import type { DividerProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import Button from './Button.svelte';

	let { orientation = 'horizontal', position = 'center', flexItem = false, action }: DividerProps =
		$props();

	const spacerDimensionClasses = $derived(
		orientation === 'horizontal' ? 'border-t w-full' : 'border-l'
	);

	const flexClasses = $derived(flexItem ? 'self-stretch h-auto' : 'h-full');

	const alignmentClasses = $derived([spacerDimensionClasses, flexClasses]);

	const actionAlignmentClasses = $derived(
		{
			horizontal: {
				center: 'left-1/2 top-0 -translate-y-1/2 -translate-x-1/2',
				start: 'left-0 top-0 -translate-y-1/2 ml-4',
				end: 'right-0 top-0 -translate-y-1/2 mr-4'
			},
			vertical: {
				center: '-translate-x-1/2 top-1/2 left-0 -translate-y-1/2',
				start: '-translate-x-1/2 top-0 mt-4 left-0',
				end: '-translate-x-1/2 bottom-0 mb-4 left-0'
			}
		}[orientation][position]
	);
</script>

{#if action}
	<div
		class={cn('relative whitespace-nowrap border-0 border-outline-gray-2', alignmentClasses)}
	>
		<span class={cn('absolute', actionAlignmentClasses)}>
			<Button
				label={action.label}
				loading={action.loading}
				size="sm"
				variant="outline"
				onclick={action.handler}
			/>
		</span>
	</div>
{:else}
	<hr
		class={cn('relative whitespace-nowrap border-0 border-outline-gray-2', alignmentClasses)}
	/>
{/if}
