import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import Fuse from "fuse.js";
import { omit, title } from "radash";

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
        ...omit(certification.data, ["draft"]),
        image: certification.data.image.src,
        provider: title(certification.slug.split("/")[0]),
        slug: certification.slug,
      }) as CertificationMetadata,
  );

  const index = Fuse.createIndex(
    [
      {
        name: "title",
        weight: 0.7,
      },
      {
        name: "acronym",
        weight: 0.6,
      },
      {
        name: "aliases",
        weight: 0.5,
      },
      {
        name: "provider",
        weight: 0.4,
      },
      {
        name: "career_paths",
        weight: 0.3,
      },
    ],
    metadata,
  );

  return Response.json(index.toJSON());
};
