<script lang="ts">
	import type { AlertProps, AlertTheme } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface AlertPropsExtended extends AlertProps {
		actions?: Snippet;
		ondismiss?: () => void;
	}

	let {
		theme = 'info',
		title,
		dismissible = false,
		icon,
		class: className,
		actions,
		children,
		ondismiss
	}: AlertPropsExtended = $props();

	let dismissed = $state(false);

	const themeClasses: Record<AlertTheme, string> = {
		info: 'text-ink-gray-7 bg-surface-blue-1',
		success: 'text-ink-gray-7 bg-surface-green-1',
		warning: 'text-ink-gray-7 bg-surface-amber-1',
		error: 'text-ink-gray-7 bg-surface-red-1'
	};

	const iconColors: Record<AlertTheme, string> = {
		info: 'text-blue-500',
		success: 'text-green-500',
		warning: 'text-amber-500',
		error: 'text-red-500'
	};

	function handleDismiss() {
		dismissed = true;
		ondismiss?.();
	}
</script>

{#if !dismissed}
	<div class={cn('block w-full', className)}>
		<div
			class={cn(
				'flex items-start rounded-md px-4 py-3.5 text-base md:px-5',
				themeClasses[theme]
			)}
		>
			{#if theme === 'success'}
				<CheckCircle class={cn('h-6 w-6 flex-shrink-0', iconColors[theme])} />
			{:else if theme === 'warning'}
				<AlertTriangle class={cn('h-6 w-6 flex-shrink-0', iconColors[theme])} />
			{:else if theme === 'error'}
				<XCircle class={cn('h-6 w-6 flex-shrink-0', iconColors[theme])} />
			{:else}
				<Info class={cn('h-6 w-6 flex-shrink-0', iconColors[theme])} />
			{/if}
			<div class="ml-2 w-full">
				<div class="flex flex-col md:flex-row md:items-baseline">
					{#if title}
						<h3 class="text-lg font-medium text-ink-gray-9">{title}</h3>
					{/if}
					{#if children}
						<div class="mt-1 md:ml-2 md:mt-0">
							{@render children()}
						</div>
					{/if}
					{#if actions}
						<div class="mt-3 md:ml-auto md:mt-0">
							{@render actions()}
						</div>
					{/if}
				</div>
			</div>
			{#if dismissible}
				<button
					type="button"
					class="ml-2 flex-shrink-0 text-ink-gray-5 hover:text-ink-gray-7"
					onclick={handleDismiss}
					aria-label="Dismiss"
				>
					<X class="h-5 w-5" />
				</button>
			{/if}
		</div>
	</div>
{/if}
