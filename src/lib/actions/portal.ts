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
export const portal: Action<HTMLElement, PortalParameters | undefined> = (node, params = {}) => {
	let targetEl: HTMLElement;

	const getTarget = (target?: HTMLElement | string): HTMLElement => {
		if (!target) {
			return document.body;
		}
		if (typeof target === 'string') {
			const el = document.querySelector(target);
			if (!el) {
				console.warn(`Portal target "${target}" not found, falling back to document.body`);
				return document.body;
			}
			return el as HTMLElement;
		}
		return target;
	};

	const moveToTarget = () => {
		targetEl = getTarget(params?.target);
		targetEl.appendChild(node);
	};

	moveToTarget();

	return {
		update(newParams: PortalParameters | undefined) {
			params = newParams;
			moveToTarget();
		},
		destroy() {
			// Only remove if node is still in the DOM
			if (node.parentNode) {
				node.parentNode.removeChild(node);
			}
		}
	};
};
