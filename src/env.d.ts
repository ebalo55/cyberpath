/// <reference path="../.astro/types.d.ts" />

/**
 * Extend the Window object with custom properties.
 * This is restricted to the Window object and will not be available in the global scope.
 */
interface Window {
    /**
     * Mobile related configurations and properties.
     */
    mobile?: {
        /**
         * Whether the mobile menu is open or not.
         */
        is_menu_open: boolean;
    };
}