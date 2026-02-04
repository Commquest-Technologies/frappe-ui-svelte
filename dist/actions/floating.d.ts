import type { Action } from 'svelte/action';
import { type Placement, type Middleware } from '@floating-ui/dom';
export interface FloatingParameters {
    /**
     * The reference element to position against
     */
    reference: HTMLElement | null;
    /**
     * Placement of the floating element
     */
    placement?: Placement;
    /**
     * Offset from the reference element
     */
    offset?: number;
    /**
     * Arrow element for positioning
     */
    arrowElement?: HTMLElement | null;
    /**
     * Arrow padding
     */
    arrowPadding?: number;
    /**
     * Whether the floating element is open/visible
     */
    open?: boolean;
    /**
     * Additional middleware to apply
     */
    middleware?: Middleware[];
}
/**
 * Svelte action for floating UI positioning
 *
 * @example
 * <div
 *   bind:this={floating}
 *   use:floating={{
 *     reference: triggerElement,
 *     placement: 'bottom',
 *     offset: 8
 *   }}
 * >
 *   Floating content
 * </div>
 */
export declare const floating: Action<HTMLElement, FloatingParameters>;
