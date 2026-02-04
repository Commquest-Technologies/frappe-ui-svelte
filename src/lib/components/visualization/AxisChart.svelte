<script lang="ts">
	import ChartWrapper from './ChartWrapper.svelte';
	import { formatValue, formatDate, mergeDeep } from './chart-helpers.js';
	import type {
		AxisChartConfig,
		BarSeriesConfig,
		LineSeriesConfig,
		AreaSeriesConfig
	} from './chart-types.js';
	import type { EChartsOption } from 'echarts';

	interface AxisChartProps {
		config: AxisChartConfig;
	}

	let { config }: AxisChartProps = $props();

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

	function getBarSeriesOptions(cfg: AxisChartConfig, series: BarSeriesConfig) {
		const roundedCorners = cfg.swapXY ? [0, 2, 2, 0] : [2, 2, 0, 0];
		const idx = cfg.series.findIndex((s) => s.name === series.name);
		const lastBarSeriesIdx = cfg.series
			.slice()
			.reverse()
			.findIndex((s) => s.type === 'bar');
		const isLastBar = lastBarSeriesIdx === idx;

		return {
			stack: cfg.stacked ? 'stack' : undefined,
			barMaxWidth: 60,
			itemStyle: {
				borderRadius: cfg.stacked ? (isLastBar ? roundedCorners : 0) : roundedCorners
			}
		};
	}

	function getLineSeriesOptions(cfg: AxisChartConfig, series: LineSeriesConfig) {
		const showSymbol = series.showDataPoints || series.showDataLabels;
		return {
			connectNulls: true,
			symbol: 'circle',
			symbolSize: 7,
			showSymbol: showSymbol,
			emphasis: {},
			lineStyle: {
				width: series.lineWidth || 2,
				type: series.lineType
			}
		};
	}

	function getAreaSeriesOptions(cfg: AxisChartConfig, series: AreaSeriesConfig) {
		return {
			type: 'line',
			showSymbol: series.showDataPoints,
			areaStyle: {
				color: series.color,
				opacity: series.fillOpacity || 0.5
			}
		};
	}

	function getBaseOptions(cfg: AxisChartConfig) {
		const swapXY = cfg.swapXY;

		const xAxisOptions = {
			type: swapXY ? 'value' : cfg.xAxis.type,
			name: cfg.xAxis.title,
			nameLocation: 'center' as const,
			nameGap: 25,
			nameTextStyle: {
				color: 'var(--color-ink-gray-6)',
				fontSize: 11
			},
			axisLabel: {
				color: 'var(--color-ink-gray-6)',
				fontSize: 11,
				hideOverlap: true,
				formatter:
					cfg.xAxis.type === 'time'
						? (value: string) => formatDate(value, undefined, cfg.xAxis.timeGrain)
						: undefined
			},
			axisTick: { show: false },
			axisLine: {
				lineStyle: { type: 'solid', color: 'var(--color-outline-gray-2)' }
			},
			splitLine: { show: false }
		};

		const yAxisOptions = [
			{
				show: true,
				type: swapXY ? 'category' : 'value',
				name: cfg.yAxis.title,
				nameLocation: 'center' as const,
				nameGap: 40,
				nameTextStyle: {
					color: 'var(--color-ink-gray-6)',
					fontSize: 11
				},
				min: cfg.yAxis.yMin,
				max: cfg.yAxis.yMax,
				axisLabel: {
					color: 'var(--color-ink-gray-6)',
					fontSize: 11,
					formatter: (value: number) => formatValue(value, 1, true)
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: {
					lineStyle: { type: 'dashed', color: 'var(--color-outline-gray-2)' }
				}
			},
			{
				show: false,
				type: 'value',
				name: cfg.y2Axis?.title,
				min: cfg.y2Axis?.yMin,
				max: cfg.y2Axis?.yMax,
				axisLabel: {
					color: 'var(--color-ink-gray-6)',
					fontSize: 11,
					formatter: (value: number) => formatValue(value, 1, true)
				},
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false }
			}
		];

		return {
			animation: true,
			animationDuration: 700,
			color: cfg.colors || [
				'#4F46E5',
				'#10B981',
				'#F59E0B',
				'#EF4444',
				'#8B5CF6',
				'#EC4899'
			],
			textStyle: { fontFamily: 'InterVar, sans-serif' },
			title: getTitleOptions(cfg.title, cfg.subtitle),
			grid: {
				top: cfg.title ? 60 : 30,
				left: 50,
				right: cfg.y2Axis ? 50 : 20,
				bottom: 50
			},
			xAxis: xAxisOptions,
			yAxis: yAxisOptions,
			legend: {
				show: true,
				bottom: 0,
				left: 'center',
				padding: [0, 10, 10, 10],
				orient: 'horizontal',
				type: 'scroll',
				itemGap: 12,
				textStyle: { color: 'var(--color-ink-gray-8)' }
			},
			tooltip: {
				trigger: 'axis',
				confine: true,
				appendToBody: false
			},
			series: [] as Record<string, unknown>[]
		};
	}

	const chartResult = $derived.by((): { options: Record<string, unknown>; error: string | null } => {
		const data = config.data || [];
		const baseOptions = getBaseOptions(config) as Record<string, unknown> & { series: Record<string, unknown>[]; yAxis: Record<string, unknown>[] };

		if (config.xAxis.type === 'time' && config.swapXY) {
			return {
				options: {},
				error: 'Swap axes is not supported for time series data'
			};
		}

		if (config.series.find((s) => s.axis === 'y2' || s.type !== 'bar') && config.swapXY) {
			return {
				options: {},
				error: 'Swap axes is not supported for non-bar series or y2 axis'
			};
		}

		const swapXY = config.swapXY;
		const lastBarSeriesIdx = config.series
			.slice()
			.reverse()
			.findIndex((s) => s.type === 'bar');
		const hasY2 = config.series.some((s) => s.axis === 'y2');

		if (hasY2 && baseOptions.yAxis) {
			baseOptions.yAxis[1].show = true;
		}

		baseOptions.series = config.series.map((s, idx) => {
			let labelPosition: string = 'top';
			if (s.type == 'bar' && config.stacked) {
				labelPosition = idx == lastBarSeriesIdx ? 'top' : 'inside';
			}
			if (s.type == 'bar' && swapXY) {
				labelPosition = 'right';
			}

			const standardSeriesOptions = {
				type: s.type === 'area' ? 'line' : s.type,
				name: s.name,
				data: data.map((row) => {
					let x, y;
					if (swapXY) {
						x = row[s.name];
						y = row[config.xAxis.key];
					} else {
						x = row[config.xAxis.key];
						y = row[s.name];
					}
					return [x, y];
				}),
				yAxisIndex: s.axis === 'y2' ? 1 : 0,
				label: {
					show: s.showDataLabels,
					position: labelPosition,
					formatter: (params: { value?: unknown[] }) => {
						const _val = swapXY ? params.value?.[0] : params.value?.[1];
						return formatValue(_val as number, 1, true);
					},
					fontSize: 11
				},
				labelLayout: { hideOverlap: true },
				itemStyle: {
					color: s.color
				}
			};

			let seriesTypeOptions = {};
			if (s.type === 'bar') {
				seriesTypeOptions = getBarSeriesOptions(config, s);
			}
			if (s.type === 'line') {
				seriesTypeOptions = getLineSeriesOptions(config, s);
			}
			if (s.type === 'area') {
				seriesTypeOptions = getAreaSeriesOptions(config, s);
			}

			return mergeDeep(
				standardSeriesOptions as Record<string, unknown>,
				seriesTypeOptions as Record<string, unknown>,
				(s.echartOptions as Record<string, unknown>) || {}
			);
		});

		return {
			options: mergeDeep(
				baseOptions as Record<string, unknown>,
				(config.echartOptions as Record<string, unknown>) || {}
			) as EChartsOption,
			error: null
		};
	});
</script>

<ChartWrapper options={chartResult.options as EChartsOption} error={chartResult.error ?? ''} />
