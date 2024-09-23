import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
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
 * @returns {Promise<CertificationMetadataCollection>}
 */
export async function getCertificationMetadata(): Promise<CertificationMetadataCollection> {
    const certifications = await getCollection(
        "certifications",
        (entry) => !entry.data.draft,
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
