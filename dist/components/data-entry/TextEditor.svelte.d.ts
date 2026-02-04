interface TextEditorProps {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    class?: string;
    onchange?: (value: string) => void;
}
declare const TextEditor: import("svelte").Component<TextEditorProps, {}, "value">;
type TextEditor = ReturnType<typeof TextEditor>;
export default TextEditor;
