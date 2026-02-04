import { getContext, setContext } from 'svelte';
const CONFIG_KEY = Symbol('frappe-ui-config');
const defaultConfig = {
    baseUrl: '',
    iconSet: 'lucide',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    dateTimeFormat: 'YYYY-MM-DD HH:mm'
};
/**
 * Set the Frappe UI configuration in the component context
 */
export function setFrappeUIConfig(config = {}) {
    const mergedConfig = { ...defaultConfig, ...config };
    setContext(CONFIG_KEY, mergedConfig);
    return mergedConfig;
}
/**
 * Get the Frappe UI configuration from the component context
 */
export function getFrappeUIConfig() {
    return getContext(CONFIG_KEY) ?? defaultConfig;
}
