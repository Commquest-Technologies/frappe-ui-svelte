<script lang="ts">
	import ChartWrapper from './ChartWrapper.svelte';
	import { formatValue } from './chart-helpers.js';
	import type { DonutChartConfig } from './chart-types.js';
	import type { EChartsOption } from 'echarts';

	interface DonutChartProps {
		config: DonutChartConfig;
	}

	let { config }: DonutChartProps = $props();

	function getTitleOptions(title: string, subtitle?: string) {
		return {
			show: !!title,
			text: title,
			subtext: subtitle || '',
			left: 'center',
			top: 12,
			textStyle: {
				fontSize: 14,
				fontWeight: 500,
				color: 'var(--color-ink-gray-8)'
			},
			subtextStyle: {
				fontSize: 12,
				color: 'var(--color-ink-gray-5)'
			}
		};
	}

	const options = $derived.by(() => {
		let data = config.data || [];

		data = [...data].sort((a, b) => {
			const aValue = a[config.valueColumn] as number;
			const bValue = b[config.valueColumn] as number;
			if (aValue === bValue) return 0;
			return aValue > bValue ? -1 : 1;
		});

		const labels = data.map((row) => row[config.categoryColumn] as string);
		const values = data.map((row) => row[config.valueColumn] as number);
		const total = values.reduce((acc, value) => {
			return isNaN(value) ? acc : acc + value;
		}, 0);

		let radius: [string, string] = ['40%', '70%'];
		let center: [string, string] = ['50%', '48%'];

		if (config.subtitle) {
			radius = ['40%', '70%'];
			center = ['50%', '50%'];
		}

		if (config.showInlineLabels) {
			center = ['50%', '50%'];
		}

		return {
			animation: true,
			animationDuration: 700,
			color: config.colors,
			textStyle: { fontFamily: 'InterVar, sans-serif' },
			title: getTitleOptions(config.title, config.subtitle),
			dataset: {
				source: [
					[config.categoryColumn, config.valueColumn],
					...data.map((r) => [r[config.categoryColumn], r[config.valueColumn]])
				]
			},
			series: [
				{
					type: 'pie',
					name: config.categoryColumn,
					center,
					radius,
					labelLine: {
						show: config.showInlineLabels,
						lineStyle: { width: 2 },
						length: 10,
						length2: 20,
						smooth: true
					},
					label: {
						show: config.showInlineLabels,
						formatter: ({ value, name }: { value: unknown[]; name: string }) => {
							const percentage = total > 0 ? ((value[1] as number) / total) * 100 : 0;
							return `${name} (${percentage.toFixed(0)}%)`;
						}
					},
					emphasis: { scaleSize: 5 }
				}
			],
			legend: !config.showInlineLabels
				? {
						left: 'center',
						bottom: 0,
						padding: [0, 10, 10, 10],
						orient: 'horizontal',
						show: true,
						type: 'scroll',
						itemGap: 12,
						formatter: function (name: string) {
							const labelIndex = labels.indexOf(name);
							const percentage = total > 0 ? (values[labelIndex] / total) * 100 : 0;
							return `${name} (${percentage.toFixed(0)}%)`;
						},
						textStyle: {
							padding: [0, 0, 0, -5],
							color: 'var(--color-ink-gray-8)'
						},
						icon: 'circle',
						pageIconColor: 'var(--color-ink-gray-6)',
						pageInactiveColor: 'var(--color-ink-gray-4)',
						pageIconSize: 10,
						pageTextStyle: {
							color: 'var(--color-ink-gray-6)'
						},
						animationDurationUpdate: 300
					}
				: {},
			tooltip: {
				trigger: 'item',
				confine: true,
				appendToBody: false,
				formatter: function (params: unknown) {
					const p = params as { value: [string, number]; name: string };
					const value = p.value[1];
					const percentage = total > 0 ? (value / total) * 100 : 0;
					const formatted = isNaN(value) ? value : formatValue(value, 1, true);
					const formattedPercentage = percentage.toFixed(0);
					return `
            <div class="flex items-center justify-between gap-5">
              <div>${p.name}</div>
              <div class="font-bold">
                ${formatted} (${formattedPercentage}%)
              </div>
            </div>
          `;
				}
			}
		};
	});
</script>

<ChartWrapper options={options as EChartsOption} />
