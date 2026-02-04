<script lang="ts">
	import type { Placement } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { floating } from '../../actions/floating.js';
	import { clickOutside } from '../../actions/click-outside.js';
	import { portal } from '../../actions/portal.js';
	import {
		getDate,
		getDateValue,
		getCalendarDates,
		getCalendarWeeks,
		MONTHS,
		type DatePickerViewMode
	} from '../../utils/date-picker.js';
	import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import Button from '../ui/Button.svelte';
	import TextInput from '../forms/TextInput.svelte';
	import type { Snippet } from 'svelte';

	interface DatePickerProps {
		value?: string;
		placeholder?: string;
		label?: string;
		clearable?: boolean;
		variant?: 'subtle' | 'outline';
		placement?: Placement;
		class?: string;
		formatter?: (value: string) => string;
		onchange?: (value: string) => void;
		trigger?: Snippet<[{ toggle: () => void; isOpen: boolean; displayValue: string }]>;
	}

	let {
		value = $bindable(''),
		placeholder = 'Select date...',
		label,
		clearable = true,
		variant = 'subtle',
		placement = 'bottom-start',
		class: className,
		formatter,
		onchange,
		trigger
	}: DatePickerProps = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let isOpen = $state(false);
	let view: DatePickerViewMode = $state('date');

	const today = getDate();
	let currentYear = $state(today.getFullYear());
	let currentMonth = $state(today.getMonth() + 1);

	const dates = $derived(getCalendarDates(currentYear, currentMonth));
	const datesAsWeeks = $derived(getCalendarWeeks(dates));

	const formattedMonth = $derived.by(() => {
		if (!(currentYear && currentMonth)) return '';
		const date = getDate(currentYear, currentMonth - 1, 1);
		const month = date.toLocaleString('en-US', { month: 'short' });
		return `${month} ${date.getFullYear()}`;
	});

	const yearRangeStart = $derived(currentYear - (currentYear % 12));
	const yearRange = $derived(Array.from({ length: 12 }, (_, i) => yearRangeStart + i));

	const displayValue = $derived(value && formatter ? formatter(value) : value);

	function selectDate(date: Date, close = false) {
		const v = getDateValue(date);
		value = v;
		onchange?.(v);
		if (close) isOpen = false;
	}

	function cycleView() {
		if (view === 'date') view = 'month';
		else if (view === 'month') view = 'year';
		else view = 'date';
	}

	function selectMonth(monthIndex: number) {
		currentMonth = monthIndex + 1;
		view = 'date';
	}

	function selectYear(year: number) {
		currentYear = year;
		view = 'month';
	}

	function prev() {
		if (view === 'date') {
			if (currentMonth === 1) {
				currentYear--;
				currentMonth = 12;
			} else {
				currentMonth--;
			}
		} else if (view === 'month') {
			currentYear--;
		} else {
			currentYear -= 12;
		}
	}

	function next() {
		if (view === 'date') {
			if (currentMonth === 12) {
				currentYear++;
				currentMonth = 1;
			} else {
				currentMonth++;
			}
		} else if (view === 'month') {
			currentYear++;
		} else {
			currentYear += 12;
		}
	}

	function resetView() {
		view = 'date';
		if (value) {
			const selectedDate = getDate(value);
			if (!isNaN(selectedDate.getTime())) {
				currentYear = selectedDate.getFullYear();
				currentMonth = selectedDate.getMonth() + 1;
			}
		}
	}

	function handleOpenChange(open: boolean) {
		isOpen = open;
		if (!open) resetView();
	}

	function handleClickOutside() {
		handleOpenChange(false);
	}

	function selectToday() {
		const todayDate = getDate();
		todayDate.setHours(0, 0, 0, 0);
		selectDate(todayDate, true);
	}

	function selectTomorrow() {
		const tomorrow = getDate();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);
		selectDate(tomorrow, true);
	}

	function clearValue() {
		value = '';
		onchange?.('');
		isOpen = false;
	}

	function toggleOpen() {
		isOpen = !isOpen;
	}

	const inputId = `datepicker-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class={cn('relative', className)}>
	<div bind:this={triggerElement}>
		{#if trigger}
			{@render trigger({ toggle: toggleOpen, isOpen, displayValue: displayValue ?? '' })}
		{:else}
			<div class="flex w-full flex-col space-y-1.5">
				{#if label}
					<label for={inputId} class="block text-xs text-ink-gray-5">{label}</label>
				{/if}
				<button type="button" id={inputId} class="w-full text-left" onclick={toggleOpen} aria-haspopup="dialog" aria-expanded={isOpen}>
					<TextInput
						type="text"
						{placeholder}
						value={displayValue}
						readonly
						{variant}
					>
						{#snippet suffix()}
							<ChevronDown class="w-4 h-4" />
						{/snippet}
					</TextInput>
				</button>
			</div>
		{/if}
	</div>

	{#if isOpen}
		<div
			use:portal
			use:floating={{
				reference: triggerElement,
				placement,
				offset: 8,
				open: isOpen
			}}
			use:clickOutside={{ handler: handleClickOutside, enabled: true }}
			class="absolute min-w-60 z-[100] mt-2 w-fit select-none text-base text-ink-gray-9 rounded-lg bg-surface-modal shadow-2xl border border-gray-200"
		>
			<!-- Month Switcher -->
			<div class="flex items-center justify-between px-2 pt-2 gap-1">
				<Button size="sm" variant="ghost" onclick={cycleView} class="text-sm font-medium text-ink-gray-7">
					{#if view === 'date'}
						{formattedMonth}
					{:else if view === 'month'}
						{currentYear}
					{:else}
						{yearRangeStart} - {yearRangeStart + 11}
					{/if}
				</Button>
				<div class="flex items-center">
					<Button class="h-7 w-7" variant="ghost" onclick={prev}>
						<ChevronLeft class="h-4 w-4" />
					</Button>
					{#if !clearable}
						<Button variant="ghost" onclick={selectToday} class="text-xs">
							Today
						</Button>
					{/if}
					<Button class="h-7 w-7" variant="ghost" onclick={next}>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Calendar / Month Grid / Year Grid -->
			<div class="p-2">
				{#if view === 'date'}
					<div role="grid" aria-label="Calendar dates">
						<div class="flex items-center text-xs font-medium uppercase text-ink-gray-4 mb-1">
							{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as d}
								<div class="flex h-6 w-8 items-center justify-center">{d}</div>
							{/each}
						</div>
						{#each datesAsWeeks as week}
							<div class="flex" role="row">
								{#each week as date}
									{@const val = getDateValue(date)}
									{@const todayDate = getDate()}
									{@const isToday =
										date.getDate() === todayDate.getDate() &&
										date.getMonth() === todayDate.getMonth() &&
										date.getFullYear() === todayDate.getFullYear() &&
										date.getMonth() === currentMonth - 1}
									{@const isSelected = value === val}
									{@const inMonth = date.getMonth() === currentMonth - 1}
									<button
										type="button"
										class={cn(
											'flex h-8 w-8 items-center justify-center rounded cursor-pointer text-sm focus:outline-none focus:ring-2 focus:ring-outline-gray-2',
											inMonth ? 'text-ink-gray-8' : 'text-ink-gray-3',
											isToday && 'font-extrabold text-ink-gray-9',
											isSelected
												? 'bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6'
												: 'hover:bg-surface-gray-2'
										)}
										role="gridcell"
										aria-selected={isSelected}
										onclick={() => selectDate(date, true)}
									>
										{date.getDate()}
									</button>
								{/each}
							</div>
						{/each}
					</div>
				{:else if view === 'month'}
					<div
						class="grid grid-cols-3 gap-1"
						role="listbox"
						aria-label="Select month"
						tabindex="0"
					>
						{#each MONTHS as m, i}
							{@const isSelected = i === currentMonth - 1}
							<button
								type="button"
								class={cn(
									'py-2 text-sm rounded cursor-pointer text-center hover:bg-surface-gray-2 focus:outline-none focus:ring-2 focus:ring-outline-gray-2',
									isSelected && 'bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6'
								)}
								role="option"
								aria-selected={isSelected}
								onclick={() => selectMonth(i)}
							>
								{m.slice(0, 3)}
							</button>
						{/each}
					</div>
				{:else}
					<div
						class="grid grid-cols-3 gap-1"
						role="listbox"
						aria-label="Select year"
						tabindex="0"
					>
						{#each yearRange as y}
							{@const isSelected = y === currentYear}
							<button
								type="button"
								class={cn(
									'py-2 text-sm rounded cursor-pointer text-center hover:bg-surface-gray-2 focus:outline-none focus:ring-2 focus:ring-outline-gray-2',
									isSelected && 'bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6'
								)}
								role="option"
								aria-selected={isSelected}
								onclick={() => selectYear(y)}
							>
								{y}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Actions -->
			{#if clearable}
				<div class="flex justify-between p-2 gap-1 border-t border-gray-200">
					<div class="flex gap-1">
						<Button onclick={selectToday} variant="outline">Today</Button>
						<Button onclick={selectTomorrow} variant="outline">Tomorrow</Button>
					</div>
					<Button onclick={clearValue} variant="outline">Clear</Button>
				</div>
			{/if}
		</div>
	{/if}
</div>
