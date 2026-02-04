import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes, HTMLInputAttributes } from 'svelte/elements';
export type Size = 'sm' | 'md' | 'lg';
export type ExtendedSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Theme = 'gray' | 'blue' | 'green' | 'red';
export type ExtendedTheme = 'gray' | 'blue' | 'green' | 'orange' | 'red';
export type Variant = 'solid' | 'subtle' | 'outline' | 'ghost';
export type Orientation = 'horizontal' | 'vertical';
export type Position = 'start' | 'center' | 'end';
export type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export type TextInputType = 'date' | 'datetime-local' | 'email' | 'file' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'range';
export interface BadgeProps {
    theme?: ExtendedTheme;
    size?: Size;
    variant?: Variant;
    label?: string;
    class?: string;
    prefix?: Snippet;
    suffix?: Snippet;
    children?: Snippet;
}
export type ButtonThemeVariant = `${Theme}-${Variant}`;
export interface ButtonProps extends Omit<HTMLButtonAttributes, 'class'> {
    theme?: Theme;
    size?: ButtonSize;
    variant?: Variant;
    label?: string;
    icon?: string;
    iconLeft?: string;
    iconRight?: string;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    link?: string;
    class?: string;
    children?: Snippet;
}
export interface SpinnerProps {
    class?: string;
}
export interface DividerAction {
    label: string;
    handler: () => void;
    loading?: boolean;
}
export interface DividerProps {
    orientation?: Orientation;
    position?: Position;
    flexItem?: boolean;
    action?: DividerAction;
}
export interface CardProps {
    title?: string;
    subtitle?: string;
    loading?: boolean;
    class?: string;
    actionsLeft?: Snippet;
    actions?: Snippet;
    children?: Snippet;
}
export interface ProgressProps {
    value: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    label?: string;
    hint?: Snippet;
    intervals?: boolean;
    intervalCount?: number;
    class?: string;
}
export interface AvatarProps {
    size?: ExtendedSize;
    shape?: 'circle' | 'square';
    image?: string;
    label?: string;
    alt?: string;
    class?: string;
    indicator?: Snippet;
    children?: Snippet;
}
export interface LoadingIndicatorProps {
    class?: string;
}
export interface LoadingTextProps {
    text?: string;
}
export interface MessageError extends Error {
    messages?: string;
}
export interface ErrorMessageProps {
    message?: string | Error | MessageError | null;
}
export interface FormLabelProps {
    label?: string;
    required?: boolean;
    class?: string;
    children?: Snippet;
}
export interface FeatherIconProps {
    name: string;
    color?: string;
    strokeWidth?: number;
    class?: string;
}
export interface KeyboardShortcutProps {
    keys: string[];
    class?: string;
}
export interface CircularProgressBarProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    showValue?: boolean;
    class?: string;
}
export interface TextInputProps extends Omit<HTMLInputAttributes, 'class' | 'size' | 'prefix'> {
    type?: TextInputType;
    size?: Size;
    variant?: 'outline' | 'subtle';
    label?: string;
    description?: string;
    debounce?: number;
    class?: string;
    prefix?: Snippet;
    suffix?: Snippet;
}
export interface TextAreaProps extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'class'> {
    value?: string;
    size?: Size;
    variant?: 'outline' | 'subtle';
    label?: string;
    description?: string;
    rows?: number;
    debounce?: number;
    disabled?: boolean;
    class?: string;
}
export interface CheckboxProps {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    size?: Size;
    label?: string;
    class?: string;
}
export interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    size?: Size;
    label?: string;
    description?: string;
    class?: string;
}
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface SelectProps {
    options: SelectOption[];
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    variant?: 'outline' | 'subtle';
    class?: string;
}
export interface PasswordProps extends Omit<TextInputProps, 'type'> {
    showToggle?: boolean;
}
export interface RatingProps {
    value?: number;
    max?: number;
    size?: Size;
    readonly?: boolean;
    class?: string;
}
export interface FormControlProps {
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    class?: string;
    children?: Snippet;
}
export type AlertTheme = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps {
    theme?: AlertTheme;
    title?: string;
    dismissible?: boolean;
    class?: string;
    icon?: string;
    children?: Snippet;
}
export interface TabItem {
    id: string;
    label: string;
    disabled?: boolean;
    icon?: string;
}
export interface TabsProps {
    items: TabItem[];
    value?: string;
    class?: string;
}
export interface TabButtonsProps {
    items: TabItem[];
    value?: string;
    size?: Size;
    class?: string;
}
export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: string;
}
export interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: string;
    class?: string;
}
export interface TooltipProps {
    text: string;
    placement?: Placement;
    delay?: number;
    class?: string;
    children?: Snippet;
}
export interface PopoverProps {
    open?: boolean;
    placement?: Placement;
    offset?: number;
    class?: string;
    trigger?: Snippet;
    children?: Snippet;
}
export interface DropdownItem {
    label: string;
    value?: string;
    icon?: string;
    disabled?: boolean;
    separator?: boolean;
}
export interface DropdownProps {
    items: DropdownItem[];
    placement?: Placement;
    class?: string;
    trigger?: Snippet;
}
export interface DialogProps {
    open?: boolean;
    title?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    class?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
}
export type ToastType = 'info' | 'success' | 'warning' | 'error';
export interface ToastProps {
    type?: ToastType;
    title?: string;
    description?: string;
    duration?: number;
    dismissible?: boolean;
}
export interface ComboboxOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    searchable?: boolean;
    multiple?: boolean;
    class?: string;
}
export interface AutoCompleteProps extends Omit<ComboboxProps, 'searchable'> {
    minChars?: number;
    debounce?: number;
}
export interface DatePickerProps {
    value?: string | Date;
    placeholder?: string;
    format?: string;
    minDate?: string | Date;
    maxDate?: string | Date;
    disabled?: boolean;
    class?: string;
}
export interface DateRangePickerProps {
    startDate?: string | Date;
    endDate?: string | Date;
    placeholder?: string;
    format?: string;
    minDate?: string | Date;
    maxDate?: string | Date;
    disabled?: boolean;
    class?: string;
}
export interface DateTimePickerProps extends DatePickerProps {
    timeFormat?: string;
    minuteStep?: number;
}
export interface CommandItem {
    id: string;
    label: string;
    description?: string;
    icon?: string;
    shortcut?: string[];
    group?: string;
    action?: () => void;
}
export interface CommandPaletteProps {
    open?: boolean;
    items: CommandItem[];
    placeholder?: string;
    class?: string;
}
export interface ChartData {
    labels?: string[];
    datasets: {
        name?: string;
        data: number[];
        color?: string;
    }[];
}
export interface AxisChartProps {
    data: ChartData;
    type?: 'line' | 'bar' | 'area';
    height?: number;
    showLegend?: boolean;
    showGrid?: boolean;
    class?: string;
}
export interface DonutChartProps {
    data: ChartData;
    height?: number;
    showLegend?: boolean;
    innerRadius?: number;
    class?: string;
}
export interface FunnelChartProps {
    data: ChartData;
    height?: number;
    showLegend?: boolean;
    class?: string;
}
export interface NumberChartProps {
    value: number;
    label?: string;
    prefix?: string;
    suffix?: string;
    trend?: number;
    trendLabel?: string;
    class?: string;
}
export interface CalendarEvent {
    id: string;
    title: string;
    start: Date | string;
    end?: Date | string;
    allDay?: boolean;
    color?: string;
}
export interface CalendarProps {
    events?: CalendarEvent[];
    view?: 'daily' | 'weekly' | 'monthly';
    date?: Date | string;
    class?: string;
}
export interface SidebarItem {
    id: string;
    label: string;
    icon?: string;
    href?: string;
    children?: SidebarItem[];
    badge?: string | number;
}
export interface SidebarProps {
    items: SidebarItem[];
    collapsed?: boolean;
    class?: string;
}
export interface TreeNode {
    id: string;
    label: string;
    icon?: string;
    children?: TreeNode[];
    expanded?: boolean;
    selected?: boolean;
}
export interface TreeProps {
    nodes: TreeNode[];
    selectable?: boolean;
    expandable?: boolean;
    class?: string;
}
export interface ListColumn {
    key: string;
    label: string;
    width?: string;
    sortable?: boolean;
    render?: Snippet<[unknown]>;
}
export interface ListViewProps {
    columns: ListColumn[];
    data: Record<string, unknown>[];
    selectable?: boolean;
    sortable?: boolean;
    class?: string;
}
export interface FileUploaderProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    disabled?: boolean;
    class?: string;
}
export interface GridItem {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    content?: Snippet;
}
export interface GridLayoutProps {
    items: GridItem[];
    cols?: number;
    rowHeight?: number;
    gap?: number;
    draggable?: boolean;
    resizable?: boolean;
    class?: string;
}
export interface TextEditorProps {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    class?: string;
}
