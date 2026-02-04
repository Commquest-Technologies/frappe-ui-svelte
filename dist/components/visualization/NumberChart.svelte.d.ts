import { formatValue } from './chart-helpers.js';
import type { NumberChartConfig } from './chart-types.js';
import type { Snippet } from 'svelte';
interface RenderPropHelpers {
    formatValue: typeof formatValue;
}
interface NumberChartProps {
    config: NumberChartConfig;
    body?: Snippet;
    title?: Snippet;
    subtitle?: Snippet<[RenderPropHelpers]>;
    delta?: Snippet<[RenderPropHelpers]>;
}
declare const NumberChart: import("svelte").Component<NumberChartProps, {}, "">;
type NumberChart = ReturnType<typeof NumberChart>;
export default NumberChart;
