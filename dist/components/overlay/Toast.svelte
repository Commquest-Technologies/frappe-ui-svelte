<script lang="ts" module>
	import { toast as sonnerToast, type ExternalToast } from 'svelte-sonner';

	export interface ToastOptions {
		type?: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		description?: string;
		duration?: number;
		dismissible?: boolean;
	}

	export function toast(options: ToastOptions | string) {
		const opts: ToastOptions = typeof options === 'string' ? { title: options } : options;
		const { type = 'info', title = '', description, duration = 4000 } = opts;

		const toastOptions: ExternalToast = {
			description,
			duration
		};

		switch (type) {
			case 'success':
				return sonnerToast.success(title, toastOptions);
			case 'warning':
				return sonnerToast.warning(title, toastOptions);
			case 'error':
				return sonnerToast.error(title, toastOptions);
			default:
				return sonnerToast.info(title, toastOptions);
		}
	}

	export const dismissToast = sonnerToast.dismiss;
</script>

<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	interface Props {
		position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
		richColors?: boolean;
		expand?: boolean;
		closeButton?: boolean;
	}

	let {
		position = 'bottom-right',
		richColors = true,
		expand = false,
		closeButton = true
	}: Props = $props();
</script>

<Toaster {position} {richColors} {expand} {closeButton} />
