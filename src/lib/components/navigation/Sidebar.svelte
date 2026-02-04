<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface SidebarMenuItem {
		label: string;
		icon?: string;
		href?: string;
		onclick?: () => void;
		active?: boolean;
		badge?: string | number;
		children?: SidebarMenuItem[];
	}

	export interface SidebarSection {
		label: string;
		items: SidebarMenuItem[];
		collapsible?: boolean;
	}

	export interface SidebarHeaderConfig {
		title: string;
		subtitle?: string;
		logo?: string;
		menuItems?: SidebarMenuItem[];
	}

	export interface SidebarProps {
		header?: SidebarHeaderConfig;
		sections?: SidebarSection[];
		collapsed?: boolean;
		class?: string;
		oncollapse?: (collapsed: boolean) => void;
		headerLogo?: Snippet;
		footerItems?: Snippet;
	}
</script>

<script lang="ts">
	import { cn } from '../../utils/cn.js';
	import { PanelRightOpen, ChevronDown, ChevronRight } from 'lucide-svelte';
	import FeatherIcon from '../ui/FeatherIcon.svelte';

	let {
		header,
		sections = [],
		collapsed = $bindable(false),
		class: className,
		oncollapse,
		headerLogo,
		footerItems
	}: SidebarProps = $props();

	let collapsedSections = $state<Record<string, boolean>>({});
	let isMobile = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(max-width: 640px)');
			isMobile = mediaQuery.matches;

			const handler = (e: MediaQueryListEvent) => {
				isMobile = e.matches;
				if (e.matches && !collapsed) {
					collapsed = true;
					oncollapse?.(true);
				}
			};

			mediaQuery.addEventListener('change', handler);
			return () => mediaQuery.removeEventListener('change', handler);
		}
	});

	const shouldCollapse = $derived(collapsed || isMobile);

	function toggleCollapse() {
		if (!isMobile) {
			collapsed = !collapsed;
			oncollapse?.(collapsed);
		}
	}

	function toggleSection(label: string) {
		collapsedSections[label] = !collapsedSections[label];
	}

	function handleItemClick(item: SidebarMenuItem) {
		if (item.onclick) {
			item.onclick();
		} else if (item.href) {
			window.location.href = item.href;
		}
	}
</script>

<div
	class={cn(
		'flex h-full flex-col flex-shrink-0 overflow-y-auto overflow-x-hidden border-r border-outline-gray-1 bg-surface-menu-bar transition-all duration-300 ease-in-out p-2',
		shouldCollapse ? 'w-12' : 'w-60',
		className
	)}
>
	<!-- Header -->
	{#if header}
		<div class="flex items-center gap-2 px-2 py-2 mb-2">
			{#if headerLogo}
				{@render headerLogo()}
			{:else if header.logo}
				<img src={header.logo} alt={header.title} class="h-8 w-8 rounded" />
			{/if}
			{#if !shouldCollapse}
				<div class="flex flex-col overflow-hidden">
					<span class="text-sm font-semibold text-ink-gray-8 truncate">{header.title}</span>
					{#if header.subtitle}
						<span class="text-xs text-ink-gray-5 truncate">{header.subtitle}</span>
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	<!-- Sections -->
	{#each sections as section}
		<div class="mb-2">
			{#if !shouldCollapse && section.label}
				<button
					type="button"
					class="flex w-full items-center justify-between px-2 py-1 text-xs font-medium text-ink-gray-5 uppercase tracking-wider"
					onclick={() => section.collapsible && toggleSection(section.label)}
				>
					{section.label}
					{#if section.collapsible}
						{#if collapsedSections[section.label]}
							<ChevronRight class="h-3 w-3" />
						{:else}
							<ChevronDown class="h-3 w-3" />
						{/if}
					{/if}
				</button>
			{/if}

			{#if !section.collapsible || !collapsedSections[section.label]}
				<div class="flex flex-col gap-0.5">
					{#each section.items as item}
						<button
							type="button"
							class={cn(
								'flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors',
								'hover:bg-surface-gray-3',
								item.active ? 'bg-surface-gray-3 text-ink-gray-9' : 'text-ink-gray-7',
								shouldCollapse && 'justify-center'
							)}
							onclick={() => handleItemClick(item)}
							title={shouldCollapse ? item.label : undefined}
						>
							{#if item.icon}
								<FeatherIcon name={item.icon} class="h-4 w-4 flex-shrink-0" />
							{/if}
							{#if !shouldCollapse}
								<span class="truncate flex-1 text-left">{item.label}</span>
								{#if item.badge !== undefined}
									<span class="text-xs bg-surface-gray-4 px-1.5 py-0.5 rounded">{item.badge}</span>
								{/if}
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/each}

	<!-- Footer -->
	<div class="mt-auto flex flex-col gap-2">
		{#if footerItems}
			{@render footerItems()}
		{/if}

		<!-- Collapse toggle -->
		<button
			type="button"
			class={cn(
				'flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors',
				'hover:bg-surface-gray-3 text-ink-gray-7',
				shouldCollapse && 'justify-center'
			)}
			onclick={toggleCollapse}
			title={shouldCollapse ? 'Expand' : 'Collapse'}
		>
			<span
				class={cn(
					'transition-transform duration-300 ease-in-out',
					shouldCollapse && 'rotate-180'
				)}
			>
				<PanelRightOpen class="h-4 w-4 text-ink-gray-6" />
			</span>
			{#if !shouldCollapse}
				<span class="truncate">{shouldCollapse ? 'Expand' : 'Collapse'}</span>
			{/if}
		</button>
	</div>
</div>
