export interface ToastOptions {
    type?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    description?: string;
    duration?: number;
    dismissible?: boolean;
}
export declare function toast(options: ToastOptions | string): string | number;
export declare const dismissToast: (id?: number | string) => string | number | undefined;
interface Props {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    richColors?: boolean;
    expand?: boolean;
    closeButton?: boolean;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
