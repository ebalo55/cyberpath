/**
 * Pads a string with spaces to the left to make it the specified length.
 * @param {string} str The string to pad.
 * @param {number} length The length to pad the string to.
 * @returns {string}
 */
export function padWithSpaces(str: string, length: number): string {
    return str.padStart(length, "\u00A0");
}