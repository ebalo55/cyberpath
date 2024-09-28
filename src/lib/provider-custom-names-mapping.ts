/**
 * Mapping of provider names to custom names, if needed.
 *
 * This is used in the `ColCertification` component to display custom names for providers.
 * This is useful when the provider name cannot be correctly displayed using kebab-case or when the conversion from
 * kebab-case to title-case does not produce the desired result.
 */
export const providerCustomNamesMapping = {
    "Isc2": "(ISC)2",
} as const;