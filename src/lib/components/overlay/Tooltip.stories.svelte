<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Tooltip from './Tooltip.svelte';
	import Button from '../ui/Button.svelte';

	const { Story } = defineMeta({
		title: 'Overlay/Tooltip',
		component: Tooltip,
		tags: ['autodocs'],
		argTypes: {
			placement: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right']
			}
		}
	});
</script>

<Story name="Default">
	<Tooltip text="This is a tooltip">
		<Button label="Hover me" />
	</Tooltip>
</Story>

<Story name="Placements">
	<div class="flex items-center justify-center gap-8 p-16">
		<Tooltip text="Top tooltip" placement="top">
			<Button label="Top" />
		</Tooltip>
		<Tooltip text="Bottom tooltip" placement="bottom">
			<Button label="Bottom" />
		</Tooltip>
		<Tooltip text="Left tooltip" placement="left">
			<Button label="Left" />
		</Tooltip>
		<Tooltip text="Right tooltip" placement="right">
			<Button label="Right" />
		</Tooltip>
	</div>
</Story>

<Story name="With Delay">
	<Tooltip text="Appears after 1 second" delay={1000}>
		<Button label="Slow tooltip" />
	</Tooltip>
</Story>

<Story name="Disabled">
	<Tooltip text="You won't see this" disabled>
		<Button label="Tooltip disabled" />
	</Tooltip>
</Story>

<Story name="On Text">
	<p>
		Hover over this
		<Tooltip text="More information here">
			<span class="cursor-help text-blue-600 underline">underlined text</span>
		</Tooltip>
		to see a tooltip.
	</p>
</Story>
