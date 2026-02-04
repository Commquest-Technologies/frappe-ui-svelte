type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Theme = 'black' | 'red' | 'green' | 'blue' | 'orange' | {
    primary: string;
    secondary: string;
};
type Variant = 'solid' | 'outline';
interface CircularProgressBarProps {
    step?: number;
    totalSteps?: number;
    showPercentage?: boolean;
    theme?: Theme;
    size?: Size;
    themeComplete?: string;
    variant?: Variant;
    class?: string;
}
declare const CircularProgressBar: import("svelte").Component<CircularProgressBarProps, {}, "">;
type CircularProgressBar = ReturnType<typeof CircularProgressBar>;
export default CircularProgressBar;
