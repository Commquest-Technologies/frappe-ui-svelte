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

	interface DateRangePickerProps {
		value?: [string, string];
		placeholder?: string;
		label?: string;
		placement?: Placement;
		class?: string;
		formatter?: (from: string, to: string) => string;
		onchange?: (value: [string, string]) => void;
		trigger?: Snippet<[{ toggle: () => void; isOpen: boolean; displayValue: string }]>;
	}

	let {
		value = $bindable(['', ''] as [string, string]),
		placeholder = 'Select date range...',
		label,
		placement = 'bottom-start',
		class: className,
		formatter,
		onchange,
		trigger
	}: DateRangePickerProps = $props();

	let triggerElement: HTMLElement | null = $state(null);
	let isOpen = $state(false);
	let view: DatePickerViewMode = $state('date');

	let fromDate = $state(value?.[0] ?? '');
	let toDate = $state(value?.[1] ?? '');

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

	const displayValue = $derived.by(() => {
		const from = fromDate ? fromDate.slice(0, 10) : '';
		const to = toDate ? toDate.slice(0, 10) : '';
		if (formatter) return formatter(from, to);
		if (from && to) return `${from} to ${to}`;
		return from || '';
	});

	$effect(() => {
		if (Array.isArray(value) && value.length === 2) {
			fromDate = value[0] || '';
			toDate = value[1] || '';
		}
	});

	function swapDatesIfNecessary(a: string, b: string) {
		if (!a || !b) return;
		const from = getDate(a);
		from.setHours(0, 0, 0, 0);
		const to = getDate(b);
		to.setHours(0, 0, 0, 0);

		if (from > to) {
			fromDate = getDateValue(to);
			toDate = getDateValue(from);
		}
	}

	function handleDateClick(date: Date): boolean {
		const d = new Date(date);
		d.setHours(0, 0, 0, 0);
		const v = getDateValue(d);

		if (fromDate && toDate) {
			fromDate = v;
			toDate = '';
		} else if (fromDate && !toDate) {
			toDate = v;
			swapDatesIfNecessary(fromDate, v);
			onchange?.([fromDate, toDate]);
			return true;
		} else {
			fromDate = v;
		}
		return false;
	}

	function isInRange(date: Date) {
		if (!fromDate || !toDate) return false;
		const d = new Date(date);
		d.setHours(0, 0, 0, 0);
		return d >= getDate(fromDate) && d <= getDate(toDate);
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
		if (fromDate) {
			const selectedDate = getDate(fromDate);
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

	function handleToday() {
		const d = new Date(today);
		d.setHours(0, 0, 0, 0);
		const todayStr = getDateValue(d);
		fromDate = todayStr;
		toDate = todayStr;
		onchange?.([fromDate, toDate]);
	}

	function clearDates() {
		fromDate = '';
		toDate = '';
		onchange?.(['', '']);
	}

	function toggleOpen() {
		isOpen = !isOpen;
	}

	const inputId = `daterangepicker-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class={cn('relative', className)}>
	<div bind:this={triggerElement}>
		{#if trigger}
			{@render trigger({ toggle: toggleOpen, isOpen, displayValue })}
		{:else}
			<div class="flex w-full flex-col space-y-1.5">
				{#if label}
					<label for={inputId} class="block text-xs text-ink-gray-5">{label}</label>
				{/if}
				<button type="button" id={inputId} class="w-full text-left" onclick={toggleOpen} aria-haspopup="dialog" aria-expanded={isOpen}>
					<TextInput type="text" {placeholder} value={displayValue} readonly>
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
					<Button variant="ghost" onclick={() => { handleToday(); toggleOpen(); }} class="text-xs">
						Today
					</Button>
					<Button class="h-7 w-7" variant="ghost" onclick={next}>
						<ChevronRight class="h-4 w-4" />
					</Button>
				</div>
			</div>

			<!-- Calendar / Month Grid / Year Grid -->
			<div class="p-2">
				{#if view === 'date'}
					<div class="flex flex-col items-center justify-center text-ink-gray-8">
						<div class="flex items-center text-xs font-medium uppercase text-ink-gray-4 mb-1">
							{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as d}
								<div class="flex h-6 w-8 items-center justify-center">{d}</div>
							{/each}
						</div>
						{#each datesAsWeeks as week}
							<div class="flex items-center">
								{#each week as date}
									{@const val = getDateValue(date)}
									{@const todayDate = getDate()}
									{@const isToday =
										date.getDate() === todayDate.getDate() &&
										date.getMonth() === todayDate.getMonth() &&
										date.getFullYear() === todayDate.getFullYear() &&
										date.getMonth() === currentMonth - 1}
									{@const isFromDate = fromDate && getDateValue(date) === fromDate}
									{@const isToDate = toDate && getDateValue(date) === toDate}
									{@const inMonth = date.getMonth() === currentMonth - 1}
									{@const inRange = isInRange(date) && !isFromDate && !isToDate}

									<div
										class={cn(
											'flex h-8 w-8 cursor-pointer items-center justify-center text-sm rounded hover:bg-surface-gray-2',
											!inMonth && 'text-ink-gray-3',
											inMonth && 'text-ink-gray-8',
											isToday && 'font-extrabold text-ink-gray-9',
											inRange && 'rounded-none bg-surface-gray-3',
											(isFromDate || isToDate) && fromDate === toDate && 'rounded bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6',
											isFromDate && fromDate !== toDate && 'rounded-l-md rounded-r-none bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6',
											isToDate && fromDate !== toDate && 'rounded-r-md rounded-l-none bg-surface-gray-6 text-ink-white hover:bg-surface-gray-6'
										)}
										onclick={() => handleDateClick(date) && toggleOpen()}
										role="button"
										tabindex="0"
										onkeydown={(e) => e.key === 'Enter' && handleDateClick(date)}
									>
										{date.getDate()}
									</div>
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
			{#if fromDate && toDate}
				<div class="flex justify-end p-2 gap-1 border-t border-gray-200">
					<Button onclick={() => { clearDates(); toggleOpen(); }} variant="outline">
						Clear
					</Button>
				</div>
			{/if}
		</div>
	{/if}
</div>
