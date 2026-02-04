<script lang="ts">
	import feather from 'feather-icons';
	import type { FeatherIconProps } from '../../types/index.js';
	import { cn } from '../../utils/cn.js';

	let {
		name,
		color = 'currentColor',
		strokeWidth = 1.5,
		class: className = ''
	}: FeatherIconProps = $props();

	const validIcons = Object.keys(feather.icons);

	const iconName = $derived.by(() => {
		if (validIcons.includes(name)) {
			return name as keyof typeof feather.icons;
		}
		console.warn(
			`[frappe-ui] Invalid icon name "${name}". Using "circle" as fallback. Valid icons:`,
			validIcons
		);
		return 'circle' as keyof typeof feather.icons;
	});

	const icon = $derived(feather.icons[iconName]);
	const svgContent = $derived(icon.contents);
</script>

<svg
	viewBox={icon.attrs.viewBox}
	width={icon.attrs.width}
	height={icon.attrs.height}
	fill="none"
	stroke="currentColor"
	{color}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={strokeWidth}
	class={cn('shrink-0', className)}
>
	{@html svgContent}
</svg>
