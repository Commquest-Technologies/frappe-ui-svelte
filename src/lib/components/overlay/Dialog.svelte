<script lang="ts">
	import type { DialogProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { portal } from '../../actions/portal.js';
	import { X } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import FeatherIcon from '../ui/FeatherIcon.svelte';
	import type { Snippet } from 'svelte';

	type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
	type DialogPosition = 'center' | 'top';
	type IconAppearance = 'info' | 'warning' | 'danger' | 'success';

	interface DialogAction {
		label: string;
		theme?: 'gray' | 'blue' | 'green' | 'red';
		variant?: 'solid' | 'subtle' | 'outline' | 'ghost';
		loading?: boolean;
		onclick?: () => void | Promise<void>;
	}

	interface DialogIcon {
		name: string;
		appearance?: IconAppearance;
	}

	interface DialogPropsExtended extends DialogProps {
		options?: {
			title?: string | Snippet;
			message?: string;
			size?: DialogSize;
			position?: DialogPosition;
			icon?: string | DialogIcon;
			actions?: DialogAction[];
		};
		disableOutsideClickToClose?: boolean;
		onopenchange?: (open: boolean) => void;
		onafterleave?: () => void;
		actions?: Snippet;
	}

	let {
		open = $bindable(false),
		title,
		description,
		size = 'lg',
		options,
		disableOutsideClickToClose = false,
		class: className,
		header,
		footer,
		actions,
		children,
		onopenchange,
		onafterleave
	}: DialogPropsExtended = $props();

	// Support both direct props and options object
	const dialogTitle = $derived(options?.title ?? title);
	const dialogMessage = $derived(options?.message ?? description);
	const dialogSize = $derived((options?.size ?? size) as DialogSize);
	const dialogPosition = $derived(options?.position ?? 'center');
	const dialogIcon = $derived.by((): DialogIcon | null => {
		const iconProp = options?.icon;
		if (!iconProp) return null;
		return typeof iconProp === 'string' ? { name: iconProp } : iconProp;
	});
	const dialogActions = $derived(options?.actions ?? []);

	const sizeClasses: Record<DialogSize, string> = {
		xs: 'max-w-xs',
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl',
		'2xl': 'max-w-2xl',
		'3xl': 'max-w-3xl',
		'4xl': 'max-w-4xl',
		'5xl': 'max-w-5xl',
		'6xl': 'max-w-6xl',
		'7xl': 'max-w-7xl',
		full: 'max-w-full'
	};

	const iconBgClasses: Record<IconAppearance, string> = {
		info: 'bg-surface-gray-2',
		warning: 'bg-surface-amber-2',
		danger: 'bg-surface-red-2',
		success: 'bg-surface-green-2'
	};

	const iconTextClasses: Record<IconAppearance, string> = {
		info: 'text-ink-blue-3',
		warning: 'text-ink-amber-3',
		danger: 'text-ink-red-4',
		success: 'text-ink-green-3'
	};

	function closeDialog() {
		open = false;
		onopenchange?.(false);
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget && !disableOutsideClickToClose) {
			closeDialog();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeDialog();
		}
	}

	async function handleActionClick(action: DialogAction) {
		if (action.onclick) {
			await action.onclick();
		}
		closeDialog();
	}
</script>

{#if open}
	<div
		use:portal
		class="fixed inset-0 z-[11] overflow-y-auto"
		role="dialog"
		aria-modal="true"
		aria-labelledby="dialog-title"
		tabindex="-1"
		onkeydown={handleKeyDown}
	>
		<!-- Overlay -->
		<div
			class="fixed inset-0 bg-black-overlay-200 backdrop-blur-[12px]"
			onclick={handleOverlayClick}
			onkeydown={(e) => e.key === 'Escape' && handleKeyDown(e)}
			role="presentation"
		></div>

		<!-- Dialog container -->
		<div
			class={cn(
				'flex min-h-screen flex-col items-center px-4 py-4 text-center',
				dialogPosition === 'center' ? 'justify-center' : 'pt-[20vh]'
			)}
			onclick={handleOverlayClick}
			onkeydown={(e) => e.key === 'Escape' && handleKeyDown(e)}
			role="presentation"
		>
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<!-- Dialog content -->
			<div
				class={cn(
					'my-8 inline-block w-full transform overflow-hidden rounded-xl bg-surface-modal text-left align-middle shadow-xl',
					sizeClasses[dialogSize],
					className
				)}
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
				role="document"
			>
				<div class="bg-surface-modal px-4 pb-6 pt-5 sm:px-6">
					<div class="flex">
						<div class="w-full flex-1">
							<!-- Header -->
							<div class="mb-6 flex items-center justify-between">
								<div class="flex items-center space-x-2">
									{#if dialogIcon}
										<div
											class={cn(
												'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
												iconBgClasses[dialogIcon.appearance ?? 'info']
											)}
										>
											<FeatherIcon
												name={dialogIcon.name}
												class={cn('h-4 w-4', iconTextClasses[dialogIcon.appearance ?? 'info'])}
											/>
										</div>
									{/if}
									{#if header}
										{@render header()}
									{:else if dialogTitle}
										{#if typeof dialogTitle === 'string'}
											<h3
												class="text-2xl font-semibold leading-6 text-ink-gray-9"
												data-testid="dialog-title"
											>
												{dialogTitle}
											</h3>
										{:else}
											{@render dialogTitle()}
										{/if}
									{/if}
								</div>
								<Button variant="ghost" onclick={closeDialog} data-testid="dialog-close">
									<X class="h-4 w-4 text-ink-gray-9" />
								</Button>
							</div>

							<!-- Content -->
							{#if children}
								{@render children()}
							{:else if dialogMessage}
								<p class="text-p-base text-ink-gray-7" data-testid="dialog-description">
									{dialogMessage}
								</p>
							{/if}
						</div>
					</div>
				</div>

				<!-- Footer/Actions -->
				{#if footer || actions || dialogActions.length > 0}
					<div class="px-4 pb-7 pt-4 sm:px-6">
						{#if footer}
							{@render footer()}
						{:else if actions}
							{@render actions()}
						{:else}
							<div class="space-y-2">
								{#each dialogActions as action}
									<Button
										theme={action.theme ?? 'gray'}
										variant={action.variant ?? 'subtle'}
										loading={action.loading}
										onclick={() => handleActionClick(action)}
										class="w-full"
									>
										{action.label}
									</Button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
