import type {
    Thing,
    WithContext,
} from "schema-dts";

/**
 * Make a JSON-LD string from a JSON-LD object.
 * @template T The type of the JSON-LD object.
 * @param {WithContext<T>} json The JSON-LD object.
 * @returns {string}
 */
export function makeJsonLd<T extends Thing>(json: WithContext<T>): string {
    return JSON.stringify(json);
}