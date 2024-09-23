import type { APIRoute } from "astro";
import Fuse, { type IFuseOptions } from "fuse.js";
import {
    type CertificationMetadata,
    getCertificationMetadata,
} from "./data.json";

export const FuseConfig: IFuseOptions<CertificationMetadata> = {
    keys:              [
        {
            name:   "title",
            weight: 0.7,
        },
        {
            name:   "acronym",
            weight: 0.6,
        },
        {
            name:   "aliases",
            weight: 0.5,
        },
        {
            name:   "provider",
            weight: 0.4,
        },
        {
            name:   "career_paths",
            weight: 0.3,
        },
    ],
    isCaseSensitive:   false,
    useExtendedSearch: true,
};

/**
 * Dynamically generate a json with all the metadata from the certifications
 * @param param0 Astro API route
 */
export const GET: APIRoute = async () => {
    const index = Fuse.createIndex(
        FuseConfig.keys!,
        await getCertificationMetadata(),
    );

    return Response.json(index.toJSON());
};
