import type { TooltipProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface TooltipPropsExtended extends TooltipProps {
    body?: Snippet;
    hoverDelay?: number;
    arrowClass?: string;
    disabled?: boolean;
}
declare const Tooltip: import("svelte").Component<TooltipPropsExtended, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
