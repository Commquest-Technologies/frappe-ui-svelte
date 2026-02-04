import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
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
export const floating = (node, params) => {
    let cleanup;
    let currentParams = params;
    const updatePosition = async () => {
        const { reference, placement = 'bottom', offset: offsetValue = 8, arrowElement, arrowPadding = 8, middleware: additionalMiddleware = [] } = currentParams;
        if (!reference || !currentParams.open) {
            node.style.display = 'none';
            return;
        }
        node.style.display = '';
        const middlewareList = [
            offset(offsetValue),
            flip(),
            shift({ padding: 8 }),
            ...additionalMiddleware
        ];
        if (arrowElement) {
            middlewareList.push(arrow({ element: arrowElement, padding: arrowPadding }));
        }
        const { x, y, placement: finalPlacement, middlewareData } = await computePosition(reference, node, {
            placement,
            middleware: middlewareList
        });
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
            }[finalPlacement.split('-')[0]];
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
        update(newParams) {
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
