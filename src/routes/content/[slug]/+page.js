/**
 * Post Page Load Function
 * 
 * Loads individual post content using dynamic MDX imports.
 * This provides automatic code splitting and caching.
 */

import { loadPost } from '$lib/content.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  // Load post using our content system
  const post = await loadPost(params.slug);
  
  return {
    post
  };
}