import type { Action } from 'svelte/action';
export interface ClickOutsideParameters {
    enabled?: boolean;
    handler: (event: MouseEvent | TouchEvent) => void;
}
/**
 * Svelte action that triggers a callback when clicking outside the element
 *
 * @example
 * <div use:clickOutside={{ handler: () => console.log('clicked outside') }}>
 *   Content
 * </div>
 */
export declare const clickOutside: Action<HTMLElement, ClickOutsideParameters>;
