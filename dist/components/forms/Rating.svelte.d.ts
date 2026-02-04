import type { RatingProps } from '../../types/index.js';
interface RatingPropsExtended extends RatingProps {
    ratingFrom?: number;
    label?: string;
    onchange?: (value: number) => void;
}
declare const Rating: import("svelte").Component<RatingPropsExtended, {}, "value">;
type Rating = ReturnType<typeof Rating>;
export default Rating;
