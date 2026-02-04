import type { SwitchProps } from '../../types/index.js';
interface SwitchPropsExtended extends SwitchProps {
    icon?: string;
    onchange?: (checked: boolean) => void;
}
declare const Switch: import("svelte").Component<SwitchPropsExtended, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
