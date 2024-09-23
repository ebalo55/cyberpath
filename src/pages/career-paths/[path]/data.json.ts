import type { APIRoute } from "astro";
import {
    dash,
    zipToObject,
} from "radash";
import {
    CAREER_PATH_SPECIAL_HIDDEN,
    type CareerPathCollection,
    CareerPathsList,
} from "src/lib/career-paths.ts";
import { getCertificationMetadata } from "src/pages/database/data.json.ts";

/**
 * Get the paths for the static site generation.
 */
export function getStaticPaths() {
    const career_paths: CareerPathCollection = CareerPathsList.filter((entry) => {
        return entry !== CAREER_PATH_SPECIAL_HIDDEN;
    });

    const kebab_career_paths = career_paths.map((career_path) => {
        return dash(career_path);
    });

    return kebab_career_paths.map((path) => ({
        params: {
            path,
        },
    }));
}

export function makeCareerPathLookupTable() {
    const career_paths: CareerPathCollection = CareerPathsList.filter((entry) => {
        return entry !== CAREER_PATH_SPECIAL_HIDDEN;
    });

    const kebab_career_paths = career_paths.map((career_path) => {
        return dash(career_path);
    });

    return zipToObject(kebab_career_paths, career_paths);
}

/**
 * Dynamically generate a json with all the metadata from the certifications
 */
export const GET: APIRoute = async ({ params }) => {
    const lookup_table = makeCareerPathLookupTable();

    return Response.json(await getCertificationMetadata(
        (entry) => entry.data.career_paths.includes(lookup_table[params.path as string]),
    ));
};