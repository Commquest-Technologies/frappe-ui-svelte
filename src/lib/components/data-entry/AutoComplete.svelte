<script lang="ts">
	import type { ComboboxOption } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import { clickOutside } from '../../actions/click-outside.js';
	import { portal } from '../../actions/portal.js';
	import { Check, ChevronDown, X } from 'lucide-svelte';
	import LoadingIndicator from '../ui/LoadingIndicator.svelte';
	import Button from '../ui/Button.svelte';
	import type { Snippet } from 'svelte';
	import type { Placement } from '../../types/index.js';

	type Option = { label: string; value: string | number; disabled?: boolean; description?: string };
	type OptionGroup = { group: string; items: (string | Option)[]; hideLabel?: boolean };

	interface AutoCompleteProps {
		value?: string | number | (string | number)[] | null;
		options?: (string | Option | OptionGroup)[];
		multiple?: boolean;
		label?: string;
		placeholder?: string;
		loading?: boolean;
		hideSearch?: boolean;
		showFooter?: boolean;
		maxOptions?: number;
		placement?: Placement;
		bodyClasses?: string;
		class?: string;
		onchange?: (value: string | number | (string | number)[] | null) => void;
		prefix?: Snippet<[Option | Option[] | null]>;
		suffix?: Snippet<[Option | Option[] | null]>;
		itemPrefix?: Snippet<[Option]>;
		itemSuffix?: Snippet<[Option]>;
	}

	let {
		value = $bindable(),
		options = [],
		multiple = false,
		label,
		placeholder = 'Select...',
		loading = false,
		hideSearch = false,
		showFooter = false,
		maxOptions = 50,
		placement = 'bottom-start',
		bodyClasses,
		class: className,
		onchange,
		prefix,
		suffix,
		itemPrefix,
		itemSuffix
	}: AutoCompleteProps = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let searchInputElement: HTMLInputElement | null = $state(null);
	let isOpen = $state(false);
	let query = $state('');

	function isOption(opt: string | Option | OptionGroup): opt is Option {
		return typeof opt === 'object' && opt !== null && 'value' in opt;
	}

	function isOptionGroup(opt: string | Option | OptionGroup): opt is OptionGroup {
		return typeof opt === 'object' && opt !== null && 'items' in opt && 'group' in opt;
	}

	function sanitizeOption(opt: string | Option): Option {
		return isOption(opt) ? opt : { label: String(opt), value: opt };
	}

	const processedGroups = $derived.by((): OptionGroup[] => {
		if (!options?.length) return [];

		let groups: OptionGroup[];
		if (options.length > 0 && isOptionGroup(options[0])) {
			groups = options as OptionGroup[];
		} else {
			groups = [{ group: '', items: options as (string | Option)[], hideLabel: true }];
		}

		const lowerQuery = query.trim().toLowerCase();

		return groups
			.map((group) => ({
				...group,
				items: group.items
					.map(sanitizeOption)
					.filter(
						(opt) =>
							!lowerQuery ||
							opt.label.toLowerCase().includes(lowerQuery) ||
							String(opt.value).toLowerCase().includes(lowerQuery)
					)
			}))
			.filter((group) => group.items.length > 0);
	});

	const allOptionsFlat = $derived.by((): Option[] => {
		if (!options?.length) return [];

		let groups: OptionGroup[];
		if (options.length > 0 && isOptionGroup(options[0])) {
			groups = options as OptionGroup[];
		} else {
			groups = [{ group: '', items: options as (string | Option)[], hideLabel: true }];
		}

		return groups.flatMap((group) => group.items.map(sanitizeOption));
	});

	const selectedOptions = $derived.by((): Option[] => {
		if (value === null || value === undefined) return [];

		if (multiple) {
			const values = Array.isArray(value) ? value : [];
			return values
				.map((v) => allOptionsFlat.find((opt) => opt.value === v) ?? { label: String(v), value: v })
				.filter(Boolean) as Option[];
		}

		const found = allOptionsFlat.find((opt) => opt.value === value);
		return found ? [found] : value ? [{ label: String(value), value: value as string | number }] : [];
	});

	const displayValue = $derived(
		selectedOptions.length > 0 ? selectedOptions.map((o) => o.label).join(', ') : ''
	);

	function isSelected(option: Option): boolean {
		if (multiple) {
			return selectedOptions.some((o) => o.value === option.value);
		}
		return selectedOptions.length > 0 && selectedOptions[0].value === option.value;
	}

	function handleSelect(option: Option) {
		if (option.disabled) return;

		if (multiple) {
			const currentValues = Array.isArray(value) ? [...value] : [];
			const index = currentValues.indexOf(option.value);
			if (index === -1) {
				currentValues.push(option.value);
			} else {
				currentValues.splice(index, 1);
			}
			value = currentValues;
			onchange?.(currentValues);
		} else {
			value = option.value;
			onchange?.(option.value);
			isOpen = false;
		}
		query = '';
	}

	function selectAll() {
		if (multiple) {
			const allValues = allOptionsFlat.filter((o) => !o.disabled).map((o) => o.value);
			value = allValues;
			onchange?.(allValues);
		}
	}

	function clearAll(e?: Event) {
		e?.stopPropagation();
		if (multiple) {
			value = [];
			onchange?.([]);
		} else {
			query = '';
		}
	}

	function handleToggle() {
		isOpen = !isOpen;
	}

	function handleClickOutside() {
		isOpen = false;
	}

	$effect(() => {
		if (isOpen && searchInputElement) {
			requestAnimationFrame(() => {
				searchInputElement?.focus();
			});
		}
	});

	const areAllSelected = $derived(
		multiple &&
			allOptionsFlat.length > 0 &&
			allOptionsFlat.filter((o) => !o.disabled).length === selectedOptions.length
	);

	const buttonId = `autocomplete-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class={cn('min-w-24 w-full', className)}>
	{#if label}
		<label for={buttonId} class="block text-xs text-ink-gray-5 mb-1.5">{label}</label>
	{/if}

	<div bind:this={triggerElement}>
		<button
			type="button"
			id={buttonId}
			class={cn(
				'flex h-7 w-full max-w-md items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1',
				'transition-colors hover:bg-surface-gray-3 border border-transparent',
				'focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3 focus:outline-none',
				isOpen && 'bg-surface-gray-3'
			)}
			onclick={handleToggle}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
		>
			<ChevronDown class="h-4 w-4 text-ink-gray-5 shrink-0" />
			<div class="flex items-center overflow-hidden flex-1">
				{#if prefix}
					{@render prefix(multiple ? selectedOptions : selectedOptions[0] ?? null)}
				{/if}
				<span
					class={cn(
						'truncate text-base leading-5',
						displayValue ? 'text-ink-gray-8' : 'text-ink-gray-4'
					)}
				>
					{displayValue || placeholder}
				</span>
				{#if suffix}
					{@render suffix(multiple ? selectedOptions : selectedOptions[0] ?? null)}
				{/if}
			</div>
		</button>
	</div>

	{#if isOpen}
		<div
			use:portal
			use:floating={{
				reference: triggerElement,
				placement,
				offset: 4,
				open: isOpen
			}}
			use:clickOutside={{ handler: handleClickOutside, enabled: true }}
			class={cn(
				'absolute z-[100] min-w-60 max-w-md rounded-lg bg-surface-modal text-base shadow-2xl',
				bodyClasses
			)}
		>
			{#if !hideSearch}
				<div class="sticky top-0 z-[100] flex items-stretch space-x-1.5 bg-surface-modal py-1.5 rounded-lg">
					<div class="relative w-full rounded flex mx-2 border border-surface-gray-2 bg-surface-gray-2 text-base text-ink-gray-8 placeholder-ink-gray-4 transition-colors hover:border-outline-gray-modals hover:bg-surface-gray-3 focus-within:border-outline-gray-4 focus-within:bg-surface-gray-3">
						<input
							bind:this={searchInputElement}
							type="text"
							class="h-7 w-full py-1.5 pl-2 pr-2 outline-none bg-transparent"
							placeholder="Search"
							bind:value={query}
							autocomplete="off"
						/>
						<div class="inline-flex h-7 w-7 items-center justify-center">
							{#if loading}
								<LoadingIndicator class="h-4 w-4 text-ink-gray-5" />
							{:else}
								<button type="button" aria-label="Clear" onclick={clearAll}>
									<X class="w-4 h-4 text-ink-gray-8" />
								</button>
							{/if}
						</div>
					</div>
				</div>
			{/if}

			<div class={cn('max-h-60 overflow-y-auto px-1.5 pb-1.5', hideSearch && 'pt-1.5')}>
				{#if processedGroups.length === 0}
					<div class="rounded-md px-2.5 py-1.5 text-base text-ink-gray-5">No results found</div>
				{:else}
					{#each processedGroups as group}
						<div class={group.items.length === 0 ? 'hidden' : ''}>
							{#if group.group && !group.hideLabel}
								<div class="sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5">
									{group.group}
								</div>
							{/if}
							{#each group.items.slice(0, maxOptions) as option}
								{@const opt = typeof option === 'string' ? sanitizeOption(option) : option as Option}
								<button
									type="button"
									class={cn(
										'flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base w-full text-left',
										'hover:bg-surface-gray-3',
										opt.disabled && 'opacity-50 cursor-not-allowed'
									)}
									disabled={opt.disabled}
									onclick={() => handleSelect(opt)}
								>
									<div class="flex flex-1 gap-2 overflow-hidden items-center">
										{#if itemPrefix}
											<div class="flex flex-shrink-0">
												{@render itemPrefix(opt)}
											</div>
										{:else if multiple}
											<div class="flex flex-shrink-0">
												{#if isSelected(opt)}
													<Check class="h-4 w-4 text-ink-gray-7" />
												{:else}
													<div class="h-4 w-4"></div>
												{/if}
											</div>
										{/if}
										<span class="flex-1 truncate text-ink-gray-7">{opt.label}</span>
									</div>
									{#if itemSuffix}
										<div class="ml-2 flex-shrink-0">
											{@render itemSuffix(opt)}
										</div>
									{/if}
									{#if opt.description}
										<div class="text-sm text-ink-gray-5 ml-2">{opt.description}</div>
									{/if}
								</button>
							{/each}
						</div>
					{/each}
				{/if}
			</div>

			{#if showFooter && multiple}
				<div class="border-t p-1 border-outline-gray-2">
					<div class="flex items-center justify-end">
						{#if !areAllSelected}
							<Button label="Select All" onclick={selectAll} />
						{:else}
							<Button label="Clear All" onclick={clearAll} />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
