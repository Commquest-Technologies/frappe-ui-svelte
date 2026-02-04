<script lang="ts">
	import type { ComboboxProps, ComboboxOption } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import { clickOutside } from '../../actions/click-outside.js';
	import { portal } from '../../actions/portal.js';
	import { Check, ChevronDown } from 'lucide-svelte';

	type SimpleOption = string | ComboboxOption;
	type GroupedOption = { group: string; options: SimpleOption[] };
	type Option = SimpleOption | GroupedOption;

	interface ComboboxPropsExtended extends ComboboxProps {
		onchange?: (value: string | number | null, option: ComboboxOption | null) => void;
	}

	let {
		options = [],
		value = $bindable(),
		placeholder = 'Select...',
		disabled = false,
		searchable = true,
		multiple = false,
		class: className,
		onchange
	}: ComboboxPropsExtended = $props();

	let inputElement: HTMLInputElement | null = $state(null);
	let triggerElement: HTMLElement | null = $state(null);
	let dropdownElement: HTMLElement | null = $state(null);
	let isOpen = $state(false);
	let query = $state('');

	const getLabel = (option: SimpleOption): string =>
		typeof option === 'string' ? option : option.label;

	const getValue = (option: SimpleOption): string | number =>
		typeof option === 'string' ? option : option.value;

	const isDisabledOption = (option: SimpleOption): boolean =>
		typeof option === 'object' && !!option.disabled;

	const allOptionsFlat = $derived.by((): ComboboxOption[] => {
		const flat: ComboboxOption[] = [];
		(options as Option[]).forEach((opt) => {
			if (typeof opt === 'object' && 'group' in opt) {
				flat.push(
					...opt.options.map((o) =>
						typeof o === 'string' ? { label: o, value: o } : o
					)
				);
			} else if (typeof opt === 'string') {
				flat.push({ label: opt, value: opt });
			} else {
				flat.push(opt);
			}
		});
		return flat;
	});

	const selectedOption = $derived(
		value ? allOptionsFlat.find((opt) => opt.value === value) ?? null : null
	);

	const filteredOptions = $derived.by(() => {
		if (!query || (selectedOption && query === selectedOption.label)) {
			return options;
		}

		const lowerQuery = query.toLowerCase();
		return (options as Option[])
			.map((opt) =>
				typeof opt === 'object' && 'group' in opt
					? {
							...opt,
							options: opt.options.filter((o) =>
								getLabel(o).toLowerCase().includes(lowerQuery)
							)
						}
					: opt
			)
			.filter((opt) => {
				if (typeof opt === 'string') {
					return opt.toLowerCase().includes(lowerQuery);
				}
				if ('group' in opt) {
					return opt.options.length > 0;
				}
				return opt.label.toLowerCase().includes(lowerQuery);
			});
	});

	function handleSelect(option: SimpleOption) {
		if (isDisabledOption(option)) return;

		const newValue = getValue(option);
		value = newValue;
		query = getLabel(option);
		isOpen = false;

		const selectedOpt =
			typeof option === 'string' ? { label: option, value: option } : option;
		onchange?.(newValue, selectedOpt);
	}

	function handleInputChange(e: Event) {
		query = (e.target as HTMLInputElement).value;
		if (!isOpen) {
			isOpen = true;
		}
	}

	function handleInputFocus() {
		query = selectedOption ? selectedOption.label : '';
		isOpen = true;
	}

	function handleClickOutside() {
		isOpen = false;
		query = selectedOption ? selectedOption.label : '';
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<div class={cn('relative w-full', className)}>
	<div bind:this={triggerElement} class="relative w-full">
		<input
			bind:this={inputElement}
			type="text"
			class={cn(
				'w-full bg-surface-gray-2 border border-surface-gray-2 rounded',
				'pl-2 pr-6 py-1 min-h-[25px] text-base',
				'placeholder-ink-gray-4 text-ink-gray-8',
				'outline-none focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3',
				'transition-colors',
				disabled && 'bg-surface-gray-1 text-ink-gray-5 cursor-not-allowed'
			)}
			{placeholder}
			{disabled}
			value={query || (selectedOption ? selectedOption.label : '')}
			readonly={!searchable}
			oninput={handleInputChange}
			onfocus={handleInputFocus}
			onkeydown={handleKeyDown}
			autocomplete="off"
		/>
		<button
			type="button"
			class="absolute inset-y-0 right-0 flex items-center pr-2 text-ink-gray-4"
			onclick={() => (isOpen = !isOpen)}
			{disabled}
		>
			<ChevronDown class="h-4 w-4" />
		</button>
	</div>

	{#if isOpen}
		<div
			bind:this={dropdownElement}
			use:portal
			use:floating={{
				reference: triggerElement,
				placement: 'bottom-start',
				offset: 4,
				open: isOpen
			}}
			use:clickOutside={{ handler: handleClickOutside, enabled: true }}
			class="absolute z-[100] mt-1 px-1.5 py-1.5 w-full bg-surface-white border border-surface-gray-2 rounded-lg shadow-xl min-w-[160px] max-h-52 overflow-y-auto"
		>
			{#if filteredOptions.length === 0}
				<div class="px-2 py-2 text-ink-gray-5 text-base text-center">
					No results found{query ? ` for "${query}"` : ''}
				</div>
			{:else}
				{#each filteredOptions as opt}
					{#if typeof opt === 'object' && 'group' in opt}
						<div>
							<div class="p-2 text-xs text-ink-gray-5 font-semibold">
								{opt.group}
							</div>
							{#each opt.options as option}
								<button
									type="button"
									class={cn(
										'text-ink-gray-8 flex items-center gap-2 px-2.5 py-1.5 text-base cursor-pointer truncate rounded w-full text-left',
										isDisabledOption(option) && 'opacity-50 cursor-not-allowed',
										'hover:bg-surface-gray-3'
									)}
									disabled={isDisabledOption(option)}
									onclick={() => handleSelect(option)}
								>
									<span class="flex-1">{getLabel(option)}</span>
									{#if selectedOption && getValue(option) === selectedOption.value}
										<Check class="w-4 h-4 text-ink-gray-5" />
									{/if}
								</button>
							{/each}
						</div>
					{:else}
						<button
							type="button"
							class={cn(
								'text-ink-gray-8 flex items-center gap-2 px-2.5 py-1.5 text-base cursor-pointer truncate rounded w-full text-left',
								isDisabledOption(opt as SimpleOption) && 'opacity-50 cursor-not-allowed',
								'hover:bg-surface-gray-3'
							)}
							disabled={isDisabledOption(opt as SimpleOption)}
							onclick={() => handleSelect(opt as SimpleOption)}
						>
							<span class="flex-1">{getLabel(opt as SimpleOption)}</span>
							{#if selectedOption && getValue(opt as SimpleOption) === selectedOption.value}
								<Check class="w-4 h-4 text-ink-gray-5" />
							{/if}
						</button>
					{/if}
				{/each}
			{/if}
		</div>
	{/if}
</div>
