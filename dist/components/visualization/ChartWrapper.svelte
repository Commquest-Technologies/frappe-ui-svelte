<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ECharts, EChartsOption } from 'echarts';
	import { init } from 'echarts';
	import { debounce } from '../../utils/debounce.js';
	import type { ChartsWrapperProps } from './chart-types.js';

	let {
		options,
		events,
		error = '',
		theme = 'light'
	}: ChartsWrapperProps = $props();

	let chartRef: HTMLDivElement | null = $state(null);
	let chartInstance: ECharts | null = null;
	let resizeObserver: ResizeObserver | null = null;

	const resizeDebounce = debounce(() => {
		chartInstance?.resize({
			animation: {
				duration: 300
			}
		});
	}, 250);

	onMount(() => {
		if (!chartRef) return;

		chartInstance = init(chartRef, theme === 'light' ? 'rainbow' : 'dark', { renderer: 'svg' });

		if (events?.click) {
			chartInstance.on('click', events.click);
		}

		resizeObserver = new ResizeObserver(resizeDebounce);
		resizeObserver.observe(chartRef);

		// Set initial options
		chartInstance.setOption(options, true);
	});

	onDestroy(() => {
		resizeObserver?.disconnect();
		chartInstance?.dispose();
	});

	$effect(() => {
		if (chartInstance && options) {
			chartInstance.setOption(options, true);
		}
	});
</script>

{#if error}
	<div class="flex h-full w-full items-center justify-center text-center text-red-500">
		Error: {error}
	</div>
{:else}
	<div
		bind:this={chartRef}
		class="h-full w-full min-w-[300px] min-h-[300px] px-4 py-2 md:min-w-[400px]"
	></div>
{/if}
