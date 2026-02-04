import type { Action } from 'svelte/action';
export interface PortalParameters {
    /**
     * Target element or selector to portal to
     * Defaults to document.body
     */
    target?: HTMLElement | string;
}
/**
 * Svelte action that moves an element to a different location in the DOM
 *
 * @example
 * <div use:portal>
 *   This will be moved to document.body
 * </div>
 *
 * <div use:portal={{ target: '#modal-container' }}>
 *   This will be moved to #modal-container
 * </div>
 */
export declare const portal: Action<HTMLElement, PortalParameters | undefined>;
