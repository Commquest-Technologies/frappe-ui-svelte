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
declare const FileUploader: import("svelte").Component<FileUploaderProps, {}, "">;
type FileUploader = ReturnType<typeof FileUploader>;
export default FileUploader;
