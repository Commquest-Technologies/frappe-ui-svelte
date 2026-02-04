import type { Action } from 'svelte/action';
import {
	computePosition,
	autoUpdate,
	flip,
	shift,
	offset,
	arrow,
	type Placement,
	type Middleware
} from '@floating-ui/dom';

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
export const floating: Action<HTMLElement, FloatingParameters> = (node, params) => {
	let cleanup: (() => void) | undefined;
	let currentParams = params;

	const updatePosition = async () => {
		const { reference, placement = 'bottom', offset: offsetValue = 8, arrowElement, arrowPadding = 8, middleware: additionalMiddleware = [] } = currentParams;

		if (!reference || !currentParams.open) {
			node.style.display = 'none';
			return;
		}

		node.style.display = '';

		const middlewareList: Middleware[] = [
			offset(offsetValue),
			flip(),
			shift({ padding: 8 }),
			...additionalMiddleware
		];

		if (arrowElement) {
			middlewareList.push(arrow({ element: arrowElement, padding: arrowPadding }));
		}

		const { x, y, placement: finalPlacement, middlewareData } = await computePosition(
			reference,
			node,
			{
				placement,
				middleware: middlewareList
			}
		);

		Object.assign(node.style, {
			left: `${x}px`,
			top: `${y}px`,
			position: 'absolute'
		});

		// Handle arrow positioning
		if (arrowElement && middlewareData.arrow) {
			const { x: arrowX, y: arrowY } = middlewareData.arrow;

			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[finalPlacement.split('-')[0]] as string;

			Object.assign(arrowElement.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide]: '-4px'
			});
		}
	};

	const setup = () => {
		if (cleanup) {
			cleanup();
			cleanup = undefined;
		}

		const { reference, open } = currentParams;

		if (!reference || !open) {
			node.style.display = 'none';
			return;
		}

		cleanup = autoUpdate(reference, node, updatePosition);
	};

	setup();

	return {
		update(newParams: FloatingParameters) {
			currentParams = newParams;
			setup();
		},
		destroy() {
			if (cleanup) {
				cleanup();
			}
		}
	};
};
