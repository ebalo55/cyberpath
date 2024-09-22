import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import Fuse from "fuse.js";
import {
    omit,
    title,
} from "radash";
import type {
    CertificationMetadata,
    CertificationMetadataCollection,
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
}

/**
 * Dynamically generate a json with all the metadata from the certifications
 * @param param0 Astro API route
 */
export const GET: APIRoute = async () => {
    const certifications = await getCollection(
        "certifications",
        (entry) => !entry.data.draft,
    );

    const metadata: CertificationMetadataCollection = certifications.map(
        (certification) =>
            ({
                ...omit(certification.data, [ "draft" ]),
                image:    certification.data.image.src,
                provider: title(certification.slug.split("/")[0]),
                slug:     certification.slug,
            }) as CertificationMetadata,
    );

    const index = Fuse.createIndex(
        FuseConfig.keys,
        metadata,
    );

    return Response.json(index.toJSON());
};
