import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

/**
 * Dynamically generate robots.txt
 * @param param0 Astro API route
 * @returns {Response} Response object
 */
export const GET: APIRoute = ({ site }) => {
    const sitemapURL = new URL("sitemap-index.xml", site);
    return new Response(getRobotsTxt(sitemapURL));
};
