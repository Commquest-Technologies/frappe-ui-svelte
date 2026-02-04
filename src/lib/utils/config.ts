import { getContext, setContext } from 'svelte';

const CONFIG_KEY = Symbol('frappe-ui-config');

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

const defaultConfig: FrappeUIConfig = {
	baseUrl: '',
	iconSet: 'lucide',
	dateFormat: 'YYYY-MM-DD',
	timeFormat: 'HH:mm',
	dateTimeFormat: 'YYYY-MM-DD HH:mm'
};

/**
 * Set the Frappe UI configuration in the component context
 */
export function setFrappeUIConfig(config: Partial<FrappeUIConfig> = {}): FrappeUIConfig {
	const mergedConfig = { ...defaultConfig, ...config };
	setContext(CONFIG_KEY, mergedConfig);
	return mergedConfig;
}

/**
 * Get the Frappe UI configuration from the component context
 */
export function getFrappeUIConfig(): FrappeUIConfig {
	return getContext<FrappeUIConfig>(CONFIG_KEY) ?? defaultConfig;
}
