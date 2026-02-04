import type { AlertProps } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface AlertPropsExtended extends AlertProps {
    actions?: Snippet;
    ondismiss?: () => void;
}
declare const Alert: import("svelte").Component<AlertPropsExtended, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
