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
export const clickOutside: Action<HTMLElement, ClickOutsideParameters> = (
	node,
	{ enabled = true, handler }
) => {
	const handleClick = (event: MouseEvent | TouchEvent) => {
		if (!enabled) return;

		const target = event.target as Node;
		if (node && !node.contains(target) && !event.defaultPrevented) {
			handler(event);
		}
	};

	if (enabled) {
		document.addEventListener('click', handleClick, true);
		document.addEventListener('touchstart', handleClick, true);
	}

	return {
		update(params: ClickOutsideParameters) {
			enabled = params.enabled ?? true;
			handler = params.handler;

			// Remove old listeners
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('touchstart', handleClick, true);

			// Add new listeners if enabled
			if (enabled) {
				document.addEventListener('click', handleClick, true);
				document.addEventListener('touchstart', handleClick, true);
			}
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
			document.removeEventListener('touchstart', handleClick, true);
		}
	};
};
