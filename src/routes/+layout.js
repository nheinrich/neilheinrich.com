/**
 * Root Layout Load Function
 * 
 * Implements server-side filtering and content loading for SEO and performance.
 * This load function runs on both server and client, providing filtered posts
 * based on URL parameters.
 */

import { loadFilteredPosts } from '$lib/content.js';

/** @type {import('./$types').LayoutLoad} */
export async function load({ url }) {
  // Server-side filtering based on URL parameters
  const { posts, filters } = await loadFilteredPosts(url.searchParams);
  
  return {
    posts,
    filters,
    // Pass URL for client-side reactivity
    url: url.href
  };
}