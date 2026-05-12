import type { APIRoute } from "astro";

/**
 * Dynamically generate a json with all the metadata from the certifications
 */
export const GET: APIRoute = async({
    redirect,
}) => redirect(`https://certdb.cyberpath-hq.com/database/data.json`, 301);
