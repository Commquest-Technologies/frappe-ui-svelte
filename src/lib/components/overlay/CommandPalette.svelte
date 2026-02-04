<script lang="ts">
	import { cn } from '../../utils/cn.js';
	import { portal } from '../../actions/portal.js';
	import { Search } from 'lucide-svelte';
	import type { Component } from 'svelte';

	export interface CommandPaletteItem {
		name: string;
		title: string;
		description?: string;
		icon?: Component<{ class?: string }>;
		disabled?: boolean;
	}

	export interface CommandPaletteGroup {
		title: string;
		hideTitle?: boolean;
		items: CommandPaletteItem[];
	}

	interface CommandPaletteProps {
		show?: boolean;
		searchQuery?: string;
		groups?: CommandPaletteGroup[];
		class?: string;
		onshowchange?: (show: boolean) => void;
		onsearchquerychange?: (query: string) => void;
		onselect?: (item: CommandPaletteItem) => void;
	}

	let {
		show = $bindable(false),
		searchQuery = $bindable(''),
		groups = [],
		class: className,
		onshowchange,
		onsearchquerychange,
		onselect
	}: CommandPaletteProps = $props();

	let inputElement: HTMLInputElement | null = $state(null);
	let focusedIndex = $state(-1);

	const allItems = $derived(groups.flatMap((g) => g.items));
	const enabledItems = $derived(allItems.filter((item) => !item.disabled));

	function handleSelect(item: CommandPaletteItem) {
		if (!item || item.disabled) return;
		onselect?.(item);
		show = false;
		onshowchange?.(false);
	}

	function handleClose() {
		show = false;
		onshowchange?.(false);
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			handleClose();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			focusedIndex = Math.min(focusedIndex + 1, enabledItems.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			focusedIndex = Math.max(focusedIndex - 1, 0);
		} else if (e.key === 'Enter' && focusedIndex >= 0) {
			e.preventDefault();
			handleSelect(enabledItems[focusedIndex]);
		}
	}

	function handleInputChange(e: Event) {
		const newQuery = (e.target as HTMLInputElement).value;
		searchQuery = newQuery;
		onsearchquerychange?.(newQuery);
		focusedIndex = enabledItems.length > 0 ? 0 : -1;
	}

	$effect(() => {
		if (show && inputElement) {
			requestAnimationFrame(() => {
				inputElement?.focus();
			});
		}
	});

	$effect(() => {
		const keydownHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && show) {
				e.preventDefault();
				handleClose();
			}

			if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
				const target = e.target as HTMLElement;
				if (
					target.nodeName !== 'INPUT' &&
					target.nodeName !== 'TEXTAREA' &&
					!target.isContentEditable
				) {
					e.preventDefault();
					show = true;
					onshowchange?.(true);
				}
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', keydownHandler);
			return () => {
				window.removeEventListener('keydown', keydownHandler);
			};
		}
	});
</script>

{#if show}
	<div
		use:portal
		class={cn('fixed inset-0 z-[200] overflow-y-auto', className)}
		role="dialog"
		aria-modal="true"
		aria-label="Command palette"
		tabindex="-1"
		onkeydown={handleKeyDown}
	>
		<!-- Overlay -->
		<div
			class="fixed inset-0 bg-black/50"
			onclick={handleOverlayClick}
			aria-hidden="true"
		></div>

		<!-- Dialog -->
		<div class="fixed inset-x-0 top-[15vh] mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl">
			<div class="relative">
				<Search
					class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
					aria-hidden="true"
				/>
				<input
					bind:this={inputElement}
					type="text"
					placeholder="Search"
					class="w-full border-none bg-transparent py-3 pl-11 pr-4 text-base text-ink-gray-8 placeholder-ink-gray-4 focus:ring-0 focus:outline-none"
					value={searchQuery}
					oninput={handleInputChange}
					autocomplete="off"
				/>
			</div>

			<div class="max-h-96 overflow-y-auto border-t border-gray-100 py-2">
				{#each groups as group}
					<div class="mb-2 last:mb-0">
						{#if !group.hideTitle}
							<div class="mb-2 px-4 text-base text-ink-gray-5">
								{group.title}
							</div>
						{/if}
						<div class="px-2.5">
							{#each group.items as item, itemIndex}
								{@const globalIndex = allItems.findIndex((i) => i.name === item.name)}
								{@const enabledIndex = enabledItems.findIndex((i) => i.name === item.name)}
								{@const isFocused = enabledIndex === focusedIndex}
								<button
									type="button"
									class={cn(
										'flex w-full min-w-0 items-center rounded px-2 py-2 text-base font-medium text-ink-gray-8 text-left',
										isFocused && 'bg-surface-gray-3',
										item.disabled && 'opacity-50 cursor-not-allowed'
									)}
									disabled={item.disabled}
									onclick={() => handleSelect(item)}
									onmouseenter={() => {
										if (!item.disabled) focusedIndex = enabledIndex;
									}}
								>
									{#if item.icon}
										{@const IconComponent = item.icon}
										<IconComponent class="mr-3 h-4 w-4 shrink-0 text-ink-gray-7" />
									{/if}
									<span class="overflow-hidden text-ellipsis whitespace-nowrap">
										{item.title}
									</span>
									{#if item.description}
										<span class="ml-auto whitespace-nowrap pl-2 text-ink-gray-5">
											{item.description}
										</span>
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/each}

				{#if groups.length === 0 || allItems.length === 0}
					<div class="px-4 py-8 text-center text-ink-gray-5">
						No results found
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
