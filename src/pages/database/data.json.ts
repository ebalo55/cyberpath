import type { APIRoute } from "astro";
import {
    type CollectionEntry,
    getCollection,
} from "astro:content";
import {
    omit,
    title,
} from "radash";

export interface CertificationMetadata {
    image: string;
    provider: string;
    title: string;
    acronym: string;
    last_updated_at: Date;
    reference: string;
    aliases?: string[] | undefined;
    career_paths: string[];
    price: string;
    currency: string;
    slug: string;
}

export type CertificationMetadataCollection = CertificationMetadata[];

/**
 * Get all the certifications metadata
 * @param {function} filter A function to filter the certifications
 * @returns {Promise<CertificationMetadataCollection>}
 */
export async function getCertificationMetadata(filter?: (entry: CollectionEntry<"certifications">) => boolean): Promise<CertificationMetadataCollection> {
    const certifications = await getCollection(
        "certifications",
        (entry) => {
            const reponse = !entry.data.draft;
            if (filter) {
                return reponse && filter(entry);
            }
            return reponse;
        },
    );

    return certifications.map(
        (certification) =>
            ({
                ...omit(certification.data, [ "draft" ]),
                image:    certification.data.image.src,
                provider: title(certification.slug.split("/")[0]),
                slug:     certification.slug,
            }) as CertificationMetadata,
    ) as CertificationMetadataCollection;
}

/**
 * Dynamically generate a json with all the metadata from the certifications
 */
export const GET: APIRoute = async () => {
    return Response.json(await getCertificationMetadata());
};
