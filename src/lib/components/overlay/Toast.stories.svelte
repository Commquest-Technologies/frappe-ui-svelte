<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Toast from './Toast.svelte';

	const { Story } = defineMeta({
		title: 'Overlay/Toast',
		component: Toast,
		tags: ['autodocs']
	});
</script>

<Story name="Info">
	<p class="mb-4 text-sm text-gray-500">
		Toast notifications are typically shown using the svelte-sonner library. Import and use the
		toast function:
	</p>
	<pre class="mb-4 rounded bg-gray-100 p-4 text-sm">
{`import { toast } from 'svelte-sonner';

// Show a toast
toast.success('Changes saved successfully');
toast.error('Something went wrong');
toast.info('New update available');
toast.warning('Please review your input');`}
	</pre>
	<p class="text-sm text-gray-500">Make sure to add the Toaster component to your layout.</p>
</Story>
