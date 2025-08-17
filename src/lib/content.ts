/**
 * SvelteKit Native Content Management System
 * 
 * This module provides utilities for loading and filtering blog posts
 * using SvelteKit's native patterns instead of custom solutions.
 */

import { error } from '@sveltejs/kit';

// Content taxonomy from existing system
export const COLLECTIONS = ['Mabel', 'Skelly'] as const;
export const TOPICS = ['AI', 'Design', 'Dev', 'Discovery', 'Mind', 'Teams'] as const;
export const FORMATS = ['Essay', 'Experiment', 'Note'] as const;

export type Collection = typeof COLLECTIONS[number];
export type Topic = typeof TOPICS[number];
export type Format = typeof FORMATS[number];

// Post frontmatter interface
export interface PostFrontmatter {
  title: string;
  slug: string;
  summary: string;
  date: string;
  updated?: string;
  context: 'being' | 'building';
  collections?: Collection[];
  topics: Topic[];
  format: Format;
  pinned?: boolean;
  layout?: 'default' | 'wide' | 'custom';
  status: 'draft' | 'active' | 'archived';
}

// Post with content
export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: any; // MDX component
}

// Filter state
export interface FilterState {
  collections: Collection[];
  topics: Topic[];
  format: Format | 'all';
}

/**
 * Get all available post slugs by scanning the content directory
 */
export async function getAllPostSlugs(): Promise<string[]> {
  // Start with our test post to verify the system works
  return [
    'test-post'
    // TODO: Add the rest of the posts once we fix MDX processing
    // 'canon-post',
    // 'drowning-in-architectural-decisions',
    // 'hello-world',
    // 'learning-vs-doing',
    // 'mabel-ai-friend',
    // 'mabel-backend',
    // 'mabel-memory-architecture',
    // 'mabel-user-research',
    // 'managing-from-bottom',
    // 'perfection-is-task-dependent',
    // 'product-maestro',
    // 'quantum-work',
    // 'skeleton-notion-template',
    // 'smaller-teams-are-better',
    // 'structuring-async-teams',
    // 'temporal-fidelity'
  ];
}

/**
 * Load a single post by slug using dynamic import
 */
export async function loadPost(slug: string): Promise<Post> {
  try {
    // Dynamic import of MDX file - SvelteKit optimizes this automatically
    const module = await import(`./content/posts/${slug}/index.mdx`);
    
    return {
      slug,
      frontmatter: module.metadata,
      content: module.default
    };
  } catch (e) {
    throw error(404, `Post "${slug}" not found`);
  }
}

/**
 * Load all posts with frontmatter
 */
export async function loadAllPosts(): Promise<Post[]> {
  const slugs = await getAllPostSlugs();
  const posts: Post[] = [];
  
  for (const slug of slugs) {
    try {
      const post = await loadPost(slug);
      // Only include active posts in production
      if (post.frontmatter.status === 'active') {
        posts.push(post);
      }
    } catch (e) {
      // Skip posts that fail to load
      console.warn(`Failed to load post: ${slug}`);
    }
  }
  
  // Sort by date (most recent first)
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Filter posts based on collections, topics, and format
 */
export function filterPosts(posts: Post[], filters: FilterState): Post[] {
  return posts.filter(post => {
    const { collections, topics, format } = filters;
    const { frontmatter } = post;
    
    // Collection filter (OR logic)
    if (collections.length > 0) {
      const hasCollection = frontmatter.collections?.some(c => 
        collections.includes(c)
      ) ?? false;
      if (!hasCollection) return false;
    }
    
    // Topic filter (OR logic)
    if (topics.length > 0) {
      const hasTopic = frontmatter.topics.some(t => 
        topics.includes(t)
      );
      if (!hasTopic) return false;
    }
    
    // Format filter
    if (format !== 'all' && frontmatter.format !== format) {
      return false;
    }
    
    return true;
  });
}

/**
 * Parse filter parameters from URL search params
 */
export function parseFiltersFromURL(searchParams: URLSearchParams): FilterState {
  const collections = searchParams.getAll('collections')
    .flatMap(c => c.split(','))
    .map(c => c.trim())
    .filter((c): c is Collection => COLLECTIONS.includes(c as Collection));
    
  const topics = searchParams.getAll('topics')
    .flatMap(t => t.split(','))
    .map(t => t.trim())
    .filter((t): t is Topic => TOPICS.includes(t as Topic));
    
  const formatParam = searchParams.get('format');
  const format = (formatParam && FORMATS.includes(formatParam as Format)) 
    ? formatParam as Format 
    : 'all';
    
  return { collections, topics, format };
}

/**
 * Load filtered posts for a given URL (server-side filtering)
 */
export async function loadFilteredPosts(searchParams: URLSearchParams): Promise<{
  posts: Post[];
  filters: FilterState;
}> {
  const filters = parseFiltersFromURL(searchParams);
  const allPosts = await loadAllPosts();
  const filteredPosts = filterPosts(allPosts, filters);
  
  return {
    posts: filteredPosts,
    filters
  };
}