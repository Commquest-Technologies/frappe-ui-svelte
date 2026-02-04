export interface FrappeUIConfig {
    /**
     * Base URL for API requests
     */
    baseUrl?: string;
    /**
     * Default icon set to use
     */
    iconSet?: 'feather' | 'lucide';
    /**
     * Default date format
     */
    dateFormat?: string;
    /**
     * Default time format
     */
    timeFormat?: string;
    /**
     * Default datetime format
     */
    dateTimeFormat?: string;
}
/**
 * Set the Frappe UI configuration in the component context
 */
export declare function setFrappeUIConfig(config?: Partial<FrappeUIConfig>): FrappeUIConfig;
/**
 * Get the Frappe UI configuration from the component context
 */
export declare function getFrappeUIConfig(): FrappeUIConfig;
