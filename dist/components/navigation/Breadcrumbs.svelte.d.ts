import type { BreadcrumbsProps, BreadcrumbItem } from '../../types/index.js';
import type { Snippet } from 'svelte';
interface BreadcrumbItemExtended extends BreadcrumbItem {
    onclick?: () => void;
    prefixIcon?: Snippet;
    suffixIcon?: Snippet;
}
interface BreadcrumbsPropsExtended extends BreadcrumbsProps {
    items: BreadcrumbItemExtended[];
}
declare const Breadcrumbs: import("svelte").Component<BreadcrumbsPropsExtended, {}, "">;
type Breadcrumbs = ReturnType<typeof Breadcrumbs>;
export default Breadcrumbs;
