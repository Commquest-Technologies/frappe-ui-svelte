<script lang="ts">
	import type { AvatarProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	let {
		size = 'md',
		shape = 'circle',
		image,
		label,
		alt = 'Avatar',
		class: className,
		indicator,
		children
	}: AvatarProps = $props();

	let imgFetchError = $state(false);

	const shapeClasses: Record<string, string | Record<string, string>> = {
		circle: 'rounded-full',
		square: {
			xs: 'rounded-[4px]',
			sm: 'rounded-[5px]',
			md: 'rounded-[5px]',
			lg: 'rounded-[6px]',
			xl: 'rounded-[6px]',
			'2xl': 'rounded-[8px]',
			'3xl': 'rounded-[10px]'
		}
	};

	const sizeClasses: Record<string, string> = {
		xs: 'w-4 h-4',
		sm: 'w-5 h-5',
		md: 'w-6 h-6',
		lg: 'w-7 h-7',
		xl: 'w-8 h-8',
		'2xl': 'w-10 h-10',
		'3xl': 'w-11.5 h-11.5'
	};

	const labelSizeClasses: Record<string, string> = {
		xs: 'text-2xs',
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-base',
		xl: 'text-lg',
		'2xl': 'text-xl',
		'3xl': 'text-2xl'
	};

	const indicatorContainerClasses: Record<string, string> = {
		xs: '-mr-[.1rem] -mb-[.1rem] h-2 w-2',
		sm: '-mr-[.1rem] -mb-[.1rem] h-[9px] w-[9px]',
		md: '-mr-[.1rem] -mb-[.1rem] h-2.5 w-2.5',
		lg: '-mr-[.1rem] -mb-[.1rem] h-3 w-3',
		xl: '-mr-[.1rem] -mb-[.1rem] h-3 w-3',
		'2xl': '-mr-[.1rem] -mb-[.1rem] h-3.5 w-3.5',
		'3xl': '-mr-[.2rem] -mb-[.2rem] h-4 w-4'
	};

	const indicatorSizeClasses: Record<string, string> = {
		xs: 'h-1 w-1',
		sm: 'h-[5px] w-[5px]',
		md: 'h-1.5 w-1.5',
		lg: 'h-2 w-2',
		xl: 'h-2 w-2',
		'2xl': 'h-2.5 w-2.5',
		'3xl': 'h-3 w-3'
	};

	const iconClasses: Record<string, string> = {
		xs: 'h-2.5 w-2.5',
		sm: 'h-3 w-3',
		md: 'h-4 w-4',
		lg: 'h-4 w-4',
		xl: 'h-4 w-4',
		'2xl': 'h-5 w-5',
		'3xl': 'h-5 w-5'
	};

	const getShapeClass = $derived(() => {
		if (shape === 'square') {
			return (shapeClasses.square as Record<string, string>)[size];
		}
		return shapeClasses[shape] as string;
	});

	function handleImageError() {
		imgFetchError = true;
	}
</script>

<div
	class={cn(
		'relative inline-block shrink-0',
		sizeClasses[size],
		getShapeClass(),
		className
	)}
>
	{#if image && !imgFetchError}
		<img
			src={image}
			{alt}
			class={cn(getShapeClass(), 'h-full w-full object-cover')}
			onerror={handleImageError}
		/>
	{:else}
		<div
			class={cn(
				'flex h-full w-full items-center justify-center bg-surface-gray-2 uppercase text-ink-gray-5 select-none font-medium',
				labelSizeClasses[size],
				getShapeClass()
			)}
		>
			{#if children}
				<div class={iconClasses[size]}>
					{@render children()}
				</div>
			{:else if label}
				{label[0]}
			{/if}
		</div>
	{/if}
	{#if indicator}
		<div
			class={cn(
				'absolute bottom-0 right-0 grid place-items-center rounded-full bg-surface-white',
				indicatorContainerClasses[size]
			)}
		>
			<div class={indicatorSizeClasses[size]}>
				{@render indicator()}
			</div>
		</div>
	{/if}
</div>
