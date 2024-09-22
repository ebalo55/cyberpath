// 1. Import utilities from `astro:content`
import {
    defineCollection,
    z,
} from "astro:content";
import { CareerPathsList } from "src/lib/career-paths.ts";

// 2. Define your collection(s)
const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      acronym: z.string(),
      last_updated_at: z.date(),
      image: image(),
      reference: z.string(),
      aliases: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
        career_paths: z.array(z.enum(CareerPathsList)),
      price: z.string(),
      currency: z.string(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  certifications: blogCollection,
};
