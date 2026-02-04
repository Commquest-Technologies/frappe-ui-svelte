<script lang="ts">
	import type { Snippet } from 'svelte';

	interface UploadedFile {
		name: string;
		file_name?: string;
		file_url?: string;
		[key: string]: unknown;
	}

	interface FileUploaderRenderArgs {
		file: File | null;
		uploading: boolean;
		progress: number;
		uploaded: number;
		uploadedFile: UploadedFile | null;
		error: string | null;
		total: number;
		success: boolean;
		openFileSelector: () => void;
	}

	interface FileUploaderProps {
		fileTypes?: string | string[];
		uploadUrl?: string;
		uploadArgs?: Record<string, unknown>;
		validateFile?: (file: File) => Promise<string | null | undefined> | string | null | undefined;
		onsuccess?: (data: UploadedFile) => void;
		onfailure?: (error: unknown) => void;
		children: Snippet<[FileUploaderRenderArgs]>;
	}

	let {
		fileTypes,
		uploadUrl,
		uploadArgs,
		validateFile,
		onsuccess,
		onfailure,
		children
	}: FileUploaderProps = $props();

	let inputElement: HTMLInputElement | null = $state(null);
	let file = $state<File | null>(null);
	let uploading = $state(false);
	let uploaded = $state(0);
	let total = $state(0);
	let error = $state<string | null>(null);
	let uploadedFile = $state<UploadedFile | null>(null);
	let finishedUploading = $state(false);

	const progress = $derived(total ? Math.floor((uploaded / total) * 100) : 0);
	const success = $derived(finishedUploading && !error);

	function openFileSelector() {
		inputElement?.click();
	}

	async function onFileAdd(e: Event) {
		error = null;
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0] || null;
		file = selectedFile;

		if (selectedFile && validateFile) {
			try {
				const msg = await validateFile(selectedFile);
				if (msg) {
					error = msg;
					return;
				}
			} catch (err: unknown) {
				if (err && typeof err === 'object' && 'message' in err) {
					error = (err as { message?: string }).message || String(err);
				} else {
					error = String(err);
				}
				return;
			}
		}

		if (!error && selectedFile) {
			uploadFile(selectedFile);
		}
	}

	async function uploadFile(fileToUpload: File) {
		error = null;
		uploaded = 0;
		total = 0;
		finishedUploading = false;
		uploading = true;

		try {
			const formData = new FormData();
			formData.append('file', fileToUpload);

			if (uploadArgs) {
				Object.entries(uploadArgs).forEach(([key, value]) => {
					formData.append(key, String(value));
				});
			}

			const xhr = new XMLHttpRequest();

			xhr.upload.addEventListener('progress', (e) => {
				if (e.lengthComputable) {
					uploaded = e.loaded;
					total = e.total;
				}
			});

			const response = await new Promise<UploadedFile>((resolve, reject) => {
				xhr.onload = () => {
					if (xhr.status >= 200 && xhr.status < 300) {
						try {
							const data = JSON.parse(xhr.responseText);
							resolve(data.message || data);
						} catch {
							resolve({ name: fileToUpload.name });
						}
					} else {
						reject(new Error(`Upload failed with status ${xhr.status}`));
					}
				};

				xhr.onerror = () => reject(new Error('Network error'));

				xhr.open('POST', uploadUrl || '/api/method/upload_file');
				xhr.send(formData);
			});

			uploadedFile = response;
			finishedUploading = true;
			onsuccess?.(response);
		} catch (err: unknown) {
			let errorMessage = 'Error Uploading File';

			if (err && typeof err === 'object' && err !== null && 'message' in err) {
				errorMessage = (err as { message: string }).message;
			}

			error = errorMessage;
			onfailure?.(err);
		} finally {
			uploading = false;
		}
	}

	const acceptTypes = $derived(Array.isArray(fileTypes) ? fileTypes.join(',') : fileTypes);
</script>

<div>
	<input
		bind:this={inputElement}
		type="file"
		accept={acceptTypes}
		class="hidden"
		onchange={onFileAdd}
	/>
	{@render children({
		file,
		uploading,
		progress,
		uploaded,
		uploadedFile,
		error,
		total,
		success,
		openFileSelector
	})}
</div>
