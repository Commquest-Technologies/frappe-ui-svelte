<script lang="ts">
	import ChartWrapper from './ChartWrapper.svelte';
	import { formatValue } from './chart-helpers.js';
	import type { FunnelChartConfig } from './chart-types.js';
	import type { EChartsOption } from 'echarts';

	interface FunnelChartProps {
		config: FunnelChartConfig;
	}

	let { config }: FunnelChartProps = $props();

	const PADDING_TOP = 12;
	const TITLE_HEIGHT = 20;
	const SUBTITLE_HEIGHT = 16;
	const TITLE_BOTTOM = 8;

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

	const blueGradient = [
		'#2d87d6',
		'#4393da',
		'#589fdf',
		'#6dace3',
		'#83b8e7',
		'#98c4eb',
		'#c3dcf3',
		'#d8e9f7',
		'#edf5fc',
		'#ffffff'
	];

	const options = $derived.by(() => {
		const _data = config.data || [];
		const hasSubtitle = config.subtitle ? 1 : 0;

		const labels = _data.map((row) => row[config.categoryColumn] as string);
		const values = _data.map((row) => row[config.valueColumn] as number);
		const total = values[0];
		const colors = config.colors || blueGradient;

		return {
			animation: true,
			animationDuration: 700,
			color: colors,
			textStyle: { fontFamily: 'InterVar, sans-serif' },
			title: getTitleOptions(config.title, config.subtitle),
			series: [
				{
					name: 'Funnel',
					type: 'funnel',
					orient: 'vertical',
					funnelAlign: 'center',
					top: PADDING_TOP + TITLE_HEIGHT + SUBTITLE_HEIGHT * hasSubtitle + TITLE_BOTTOM,
					left: 'center',
					width: '60%',
					height: '75%',
					minSize: '10px',
					maxSize: '100%',
					sort: 'descending',
					label: {
						show: true,
						position: 'inside',
						lineHeight: 16,
						formatter: (params: { name: string }) => {
							const index = labels.indexOf(params.name);
							const value = formatValue(values[index], 1, true);
							if (!config.showPercentages) {
								return value;
							}
							const percentage = Number((values[index] / total) * 100).toFixed(0);
							return `${value} (${percentage}%)`;
						}
					},
					labelLine: { show: false },
					gap: 6,
					data: values.map((value, index) => ({
						name: labels[index],
						value: value,
						itemStyle: {
							color: colors[index % colors.length],
							borderColor: colors[index % colors.length],
							borderWidth: 4,
							borderCap: 'round',
							borderJoin: 'round'
						},
						emphasis: {
							itemStyle: {
								color: colors[index % colors.length],
								borderColor: colors[index % colors.length],
								borderWidth: 6,
								borderCap: 'round',
								borderJoin: 'round'
							}
						}
					}))
				}
			],
			tooltip: {
				trigger: 'item',
				confine: true,
				appendToBody: false,
				formatter: function (params: unknown) {
					const p = params as { value: number; name: string };
					const value = p.value;
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
