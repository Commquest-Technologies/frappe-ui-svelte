<script lang="ts">
	import type { TextAreaProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';
	import { debounce } from '../../utils/debounce.js';

	let {
		size = 'sm',
		variant = 'subtle',
		disabled = false,
		value = $bindable(''),
		label,
		description,
		rows = 3,
		debounce: debounceTime,
		class: className,
		oninput,
		placeholder,
		...restProps
	}: TextAreaProps = $props();

	let textareaElement: HTMLTextAreaElement;

	const sizeClasses: Record<string, string> = {
		sm: 'text-base rounded',
		md: 'text-base rounded',
		lg: 'text-lg rounded-md'
	};

	const paddingClasses: Record<string, string> = {
		sm: 'py-1.5 px-2',
		md: 'py-1.5 px-2.5',
		lg: 'py-1.5 px-3'
	};

	const variantClasses: Record<string, string> = {
		subtle:
			'border border-surface-gray-2 bg-surface-gray-2 placeholder-ink-gray-4 hover:border-outline-gray-modals hover:bg-surface-gray-3 focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3',
		outline:
			'border border-outline-gray-2 bg-surface-white placeholder-ink-gray-4 hover:border-outline-gray-3 hover:shadow-sm focus:bg-surface-white focus:border-outline-gray-4 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-outline-gray-3'
	};

	const disabledClasses = $derived(
		`border bg-surface-gray-1 placeholder-ink-gray-3 ${variant === 'outline' ? 'border-outline-gray-2' : 'border-transparent'}`
	);

	const textColor = $derived(disabled ? 'text-ink-gray-5' : 'text-ink-gray-8');

	const textareaClasses = $derived(
		cn(
			'resize-y transition-colors w-full block outline-none',
			sizeClasses[size],
			paddingClasses[size],
			disabled ? disabledClasses : variantClasses[variant],
			textColor
		)
	);

	const labelClasses = $derived(
		cn('block text-ink-gray-5', {
			'text-xs': size === 'sm',
			'text-base': size === 'md',
			'text-lg': size === 'lg'
		})
	);

	const emitChange = (newValue: string) => {
		value = newValue;
		if (oninput) {
			const syntheticEvent = {
				target: { value: newValue },
				currentTarget: textareaElement
			} as unknown as Event & { currentTarget: HTMLTextAreaElement };
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
		const target = e.target as HTMLTextAreaElement;
		debouncedEmitChange(target.value);
	}

	const inputId = `textarea-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class={cn('space-y-1.5', className)}>
	{#if label}
		<label for={inputId} class={labelClasses}>
			{label}
		</label>
	{/if}
	<textarea
		bind:this={textareaElement}
		id={inputId}
		{rows}
		{placeholder}
		class={textareaClasses}
		{disabled}
		{value}
		oninput={handleInput}
		data-testid="textarea"
		{...restProps}
	></textarea>
</div>
