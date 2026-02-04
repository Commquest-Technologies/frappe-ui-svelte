/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export function debounce(func, wait) {
    let timeoutId = null;
    return function (...args) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, wait);
    };
}
/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 */
export function throttle(func, wait) {
    let lastTime = 0;
    let timeoutId = null;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastTime = now;
            func.apply(this, args);
        }
        else if (timeoutId === null) {
            timeoutId = setTimeout(() => {
                lastTime = Date.now();
                timeoutId = null;
                func.apply(this, args);
            }, wait - (now - lastTime));
        }
    };
}
