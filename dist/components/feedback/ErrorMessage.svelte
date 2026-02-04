<script lang="ts">
	import type { ErrorMessageProps, MessageError } from '../../types/index.js';

	let { message }: ErrorMessageProps = $props();

	const errorMessage = $derived.by(() => {
		if (!message) {
			return '';
		}

		if (message instanceof Error) {
			return (message as MessageError).messages || message.message;
		}

		return message;
	});
</script>

{#if message}
	<div class="whitespace-pre-line text-sm text-ink-red-4" role="alert">
		{@html errorMessage}
	</div>
{/if}
