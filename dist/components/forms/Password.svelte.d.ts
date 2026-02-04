import type { PasswordProps } from '../../types/index.js';
interface PasswordPropsExtended extends PasswordProps {
    showToggle?: boolean;
}
declare const Password: import("svelte").Component<PasswordPropsExtended, {}, "value">;
type Password = ReturnType<typeof Password>;
export default Password;
