<script lang="ts">
	import type { TextInputProps, Size } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { debounce } from '../../utils/debounce.js';

	let {
		type = 'text',
		size = 'sm',
		variant = 'subtle',
		disabled = false,
		value = $bindable(''),
		debounce: debounceTime,
		prefix,
		suffix,
		class: className,
		oninput,
		...restProps
	}: TextInputProps = $props();

	let inputElement: HTMLInputElement;

	const textColor = $derived(disabled ? 'text-ink-gray-5' : 'text-ink-gray-8');

	const sizeClasses: Record<string, string> = {
		sm: 'text-base rounded h-7',
		md: 'text-base rounded h-8',
		lg: 'text-lg rounded-md h-10'
	};

	const getPaddingClasses = (size: string, hasPrefix: boolean, hasSuffix: boolean) => {
		const paddingMap: Record<string, string> = {
			sm: `py-1.5 ${hasPrefix ? 'pl-9' : 'pl-2'} ${hasSuffix ? 'pr-8' : 'pr-2'}`,
			md: `py-1.5 ${hasPrefix ? 'pl-10' : 'pl-2.5'} ${hasSuffix ? 'pr-9' : 'pr-2.5'}`,
			lg: `py-1.5 ${hasPrefix ? 'pl-12' : 'pl-3'} ${hasSuffix ? 'pr-10' : 'pr-3'}`
		};
		return paddingMap[size];
	};

	const variantClasses: Record<string, string> = {
		subtle:
			'border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
		outline:
			'border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
		ghost: 'border-0 focus:ring-0 focus-visible:ring-0'
	};

	const disabledClasses = $derived(
		`border ${variant === 'outline' ? 'border-outline-gray-2' : 'border-transparent'} bg-surface-gray-1 placeholder-ink-gray-3`
	);

	const inputClasses = $derived(
		cn(
			sizeClasses[size],
			getPaddingClasses(size, !!prefix, !!suffix),
			disabled ? disabledClasses : variantClasses[variant],
			textColor,
			'transition-colors w-full dark:[color-scheme:dark] outline-none appearance-none'
		)
	);

	const prefixClasses: Record<string, string> = {
		sm: 'pl-2',
		md: 'pl-2.5',
		lg: 'pl-3'
	};

	const suffixClasses: Record<string, string> = {
		sm: 'pr-2',
		md: 'pr-2.5',
		lg: 'pr-3'
	};

	const emitChange = (newValue: string) => {
		value = newValue;
		if (oninput) {
			const syntheticEvent = {
				target: { value: newValue },
				currentTarget: inputElement
			} as unknown as Event & { currentTarget: HTMLInputElement };
			oninput(syntheticEvent);
		}
	};

	const debouncedEmitChange = $derived.by(() => {
		if (debounceTime) {
			return debounce(emitChange, debounceTime);
		}
		return emitChange;
	});

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		debouncedEmitChange(target.value);
	}
</script>

<div class={cn('relative flex items-center', className)}>
	{#if prefix}
		<div class={cn('absolute inset-y-0 left-0 flex items-center', textColor, prefixClasses[size])}>
			{@render prefix()}
		</div>
	{/if}
	<input
		bind:this={inputElement}
		{type}
		{disabled}
		{value}
		oninput={handleInput}
		data-testid="text-input"
		class={inputClasses}
		{...restProps}
	/>
	{#if suffix}
		<div class={cn('absolute inset-y-0 right-0 flex items-center', textColor, suffixClasses[size])}>
			{@render suffix()}
		</div>
	{/if}
</div>
