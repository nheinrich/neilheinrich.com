<script>
  import { preloadData, pushState, goto } from '$app/navigation';
  import FilterBar from '$lib/components/FilterBar.svelte';
  
  /** @type {import('./$types').PageProps} */
  let { data } = $props();
  
  // Extract posts and filters from layout data using Svelte 5 runes
  let posts = $derived(data.posts);
  let filters = $derived(data.filters);
  
  /**
   * Open article in slide-in using SvelteKit's shallow routing
   */
  async function openArticleInSlideIn(event, slug) {
    // Check for modifier keys - if present, allow normal navigation
    if (event.shiftKey || event.metaKey || event.ctrlKey) {
      return; // Let the browser handle normal navigation
    }
    
    // Check for small screens - on mobile, use normal navigation
    if (window.innerWidth < 640) {
      return; // Let the browser handle normal navigation
    }
    
    // Prevent normal navigation
    event.preventDefault();
    
    try {
      // Preload the article data efficiently using SvelteKit
      const result = await preloadData(`/content/${slug}`);
      
      if (result.type === 'loaded' && result.status === 200) {
        // Success! Open in slide-in with shallow routing
        // Only store serializable data, not the component
        pushState(`/content/${slug}`, {
          slideOpen: true,
          articleSlug: slug,
          articleData: {
            post: {
              slug: result.data.post.slug,
              frontmatter: result.data.post.frontmatter
              // Don't serialize the component - we'll load it in the slide-in
            }
          }
        });
      } else {
        // Fallback to normal navigation if preload fails
        goto(`/content/${slug}`);
      }
    } catch (error) {
      // Fallback to normal navigation on any error
      console.warn('Failed to preload article, falling back to navigation:', error);
      goto(`/content/${slug}`);
    }
  }
</script>

<svelte:head>
  <title>Neil Heinrich - Blog</title>
  <meta name="description" content="Personal blog about building, learning, and creating." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="container">
    <h1 class="hero-title">Latest Posts</h1>
    <p class="hero-subtitle">Building, learning, and creating — one post at a time.</p>
  </div>
</section>

<!-- Content Section -->
<section class="content">
  <div class="container">
    <!-- Filter controls -->
    <FilterBar {filters} />
    
    {#if filters.collections.length > 0 || filters.topics.length > 0 || filters.format !== 'all'}
      <div class="filter-summary">
        <p>Showing {posts.length} posts</p>
        <div class="active-filters">
          {#each filters.collections as collection}
            <span class="filter-tag collection">{collection}</span>
          {/each}
          {#each filters.topics as topic}
            <span class="filter-tag topic">{topic}</span>
          {/each}
          {#if filters.format !== 'all'}
            <span class="filter-tag format">{filters.format}</span>
          {/if}
        </div>
      </div>
    {/if}
    
    <!-- Grid Header -->
    <div class="grid header">
      <div class="format">Format</div>
      <div class="title">Title</div>
      <div class="topics">Topics</div>
      <div class="year">Year</div>
    </div>
    
    <!-- Posts List -->
    <div class="list">
      {#each posts as post}
        <a 
          href="/content/{post.slug}" 
          class="link" 
          data-pinned={post.frontmatter.pinned || null}
          onclick={(e) => openArticleInSlideIn(e, post.slug)}
          data-sveltekit-preload-data
        >
          <div class="grid container-grid">
            {#if post.frontmatter.pinned}
              <span class="pin" aria-label="Pinned post">★</span>
            {/if}
            
            <span class="format">
              {post.frontmatter.format.slice(0, 1)}
            </span>
            
            <div class="title">
              {#if post.frontmatter.collections && post.frontmatter.collections.length > 0}
                <span class="collection">
                  {post.frontmatter.collections.join(', ')}
                  →
                </span>
              {/if}
              {post.frontmatter.title}
            </div>
            
            <span class="topics">
              {post.frontmatter.topics.join(', ')}
            </span>
            
            <span class="year">
              {new Date(post.frontmatter.date).getFullYear()}
            </span>
          </div>
        </a>
      {/each}
    </div>
    
    {#if posts.length === 0}
      <p class="empty">No posts found</p>
    {/if}
  </div>
</section>

<style>
  /* Section Layout */
  :root {
    --separator-height: 0.25rem;
  }

  .hero {
    padding-block: 2rem;
  }

  .content {
    padding-bottom: 0;
  }

  /* Hero Components */
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-yellow);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 48rem;
  }

  /* Responsive typography */
  @media (min-width: 768px) {
    .hero-title {
      font-size: 4.5rem;
    }

    .hero-subtitle {
      font-size: 1.5rem;
    }
  }

  /* Filter Summary */
  .filter-summary {
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
  }
  
  .active-filters {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }
  
  .filter-tag {
    padding: 0.2rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .filter-tag.collection {
    background: var(--color-lilac);
    color: var(--color-green);
  }
  
  .filter-tag.topic {
    background: var(--color-yellow);
    color: var(--color-green);
  }
  
  .filter-tag.format {
    background: var(--color-scarlet);
    color: var(--color-cream);
  }

  /* Grid Layout */
  .grid {
    display: grid;
    grid-template-columns:
      2rem /* format */
      1fr /* title */
      12rem /* topics */
      8rem /* year */;
    gap: 1rem;
    padding-block: 0.9rem 1rem;
    align-items: start;
    color: var(--color-tan);
    font-size: var(--font-size-copy);
  }

  .grid > * {
    white-space: nowrap;
  }

  .header {
    display: none;
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .link {
    position: relative;
    text-decoration: none;
    border-top: var(--separator-height) solid var(--color-black);
    transition: background-color 200ms ease-out;
  }

  .link:last-child {
    border-bottom: var(--separator-height) solid var(--color-black);
  }

  .link:hover {
    background-color: var(--color-burgundy);
  }

  .link:hover .grid > *,
  .link:hover .title {
    color: var(--color-cream);
  }

  .link[data-pinned='true'] .pin {
    display: block;
  }

  .pin {
    display: none;
    position: absolute;
    left: -2rem;
    color: var(--color-yellow);
    font-size: 0.75rem;
  }

  .title {
    color: var(--color-tan);
    transition: color 200ms ease-out;
  }

  .format {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: var(--color-scarlet);
    color: var(--color-cream);
    border-radius: 50%;
    font-weight: var(--font-weight-bold);
    font-size: 0.875rem;
  }

  .collection {
    color: var(--color-cream);
    font-weight: var(--font-weight-bold);
    margin-right: 0.5rem;
  }

  .topics {
    overflow: hidden;
  }

  .year {
    text-align: right;
    font-weight: var(--font-weight-bold);
  }

  .empty {
    text-align: center;
    padding-block: 3rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Show header on larger screens */
  @media (min-width: 768px) {
    .header {
      display: grid;
      border-bottom: var(--separator-height) solid var(--color-black);
      font-weight: var(--font-weight-bold);
      color: var(--color-cream);
      text-transform: uppercase;
      font-size: var(--font-size-small);
      letter-spacing: 0.05em;
    }
  }

  /* Mobile responsive */
  @media (max-width: 767px) {
    .grid {
      grid-template-columns: 2rem 1fr;
      gap: 0.75rem;
    }
    
    .topics,
    .year {
      display: none;
    }
    
    .title {
      font-size: var(--font-size-small);
    }
  }
</style>
