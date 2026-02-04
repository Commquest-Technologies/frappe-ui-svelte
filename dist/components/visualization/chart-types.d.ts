import type { EChartsOption } from 'echarts';
import type { TimeGrain } from './chart-helpers.js';
export type AxisChartConfig = {
    data: Record<string, unknown>[];
    title: string;
    subtitle?: string;
    colors?: string[];
    xAxis: {
        key: string;
        type: 'category' | 'time' | 'value';
        timeGrain?: TimeGrain;
        title?: string;
        echartOptions?: Record<string, unknown>;
    };
    yAxis: {
        title?: string;
        yMin?: number;
        yMax?: number;
        echartOptions?: Record<string, unknown>;
    };
    y2Axis?: {
        title?: string;
        yMin?: number;
        yMax?: number;
        echartOptions?: Record<string, unknown>;
    };
    swapXY?: boolean;
    stacked?: boolean;
    series: (BarSeriesConfig | LineSeriesConfig | AreaSeriesConfig)[];
    echartOptions?: Record<string, unknown>;
};
export type SeriesConfig = {
    name: string;
    type: 'bar' | 'line' | 'area';
    color?: string;
    axis?: 'y' | 'y2';
    showDataLabels?: boolean;
    echartOptions?: Record<string, unknown>;
};
export type BarSeriesConfig = SeriesConfig & {
    type: 'bar';
    stackName?: string;
};
export type LineSeriesConfig = SeriesConfig & {
    type: 'line';
    lineType?: 'solid' | 'dashed' | 'dotted';
    lineWidth?: number;
    showDataPoints?: boolean;
};
export type AreaSeriesConfig = SeriesConfig & {
    type: 'area';
    showDataPoints?: boolean;
    fillOpacity?: number;
};
export type DonutChartConfig = {
    data: Record<string, unknown>[];
    title: string;
    subtitle?: string;
    colors?: string[];
    categoryColumn: string;
    valueColumn: string;
    maxSliceCount?: number;
    showInlineLabels?: boolean;
    echartOptions?: Record<string, unknown>;
};
export type FunnelChartConfig = {
    data: Record<string, unknown>[];
    title: string;
    subtitle?: string;
    colors?: string[];
    categoryColumn: string;
    valueColumn: string;
    showPercentages?: boolean;
    echartOptions?: Record<string, unknown>;
};
export type NumberChartConfig = {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    delta?: number;
    deltaPrefix?: string;
    deltaSuffix?: string;
    negativeIsBetter?: boolean;
};
export interface ChartsWrapperProps {
    options: EChartsOption;
    events?: {
        click: (params: unknown) => void;
    };
    error?: string;
    theme?: 'light' | 'dark';
}
