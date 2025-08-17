<script>
  import { preloadData, pushState, goto } from '$app/navigation';
  
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

<div class="container">
  <header class="page-header">
    <h1>Latest Posts</h1>
    <p>Building, learning, and creating — one post at a time.</p>
  </header>
  
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
  
  <div class="posts-grid">
    {#each posts as post}
      <article class="post-card">
        <header>
          <h2>
            <a 
              href="/content/{post.slug}"
              onclick={(e) => openArticleInSlideIn(e, post.slug)}
              data-sveltekit-preload-data
            >
              {post.frontmatter.title}
            </a>
          </h2>
          <time datetime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </header>
        
        <p class="summary">{post.frontmatter.summary}</p>
        
        <div class="post-meta">
          <span class="format">{post.frontmatter.format}</span>
          {#if post.frontmatter.collections}
            {#each post.frontmatter.collections as collection}
              <span class="collection">{collection}</span>
            {/each}
          {/if}
        </div>
      </article>
    {/each}
  </div>
  
  {#if posts.length === 0}
    <div class="empty-state">
      <h2>No posts found</h2>
      <p>Try adjusting your filters or <a href="/">view all posts</a>.</p>
    </div>
  {/if}
</div>

<style>
  .page-header {
    margin-bottom: 3rem;
    text-align: center;
  }
  
  .page-header p {
    color: var(--color-tan);
    font-size: var(--font-size-copy);
    margin-top: 1rem;
  }
  
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
  
  .posts-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .post-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    transition: transform var(--transition-duration) ease-out;
  }
  
  .post-card:hover {
    transform: translateY(-2px);
  }
  
  .post-card h2 {
    margin: 0 0 0.5rem 0;
    font-size: var(--font-size-subheading);
    line-height: 1.2;
  }
  
  .post-card h2 a {
    color: var(--color-yellow);
    text-decoration: none;
  }
  
  .post-card h2 a:hover {
    color: var(--color-scarlet);
  }
  
  .post-card time {
    color: var(--color-tan);
    font-size: var(--font-size-small);
  }
  
  .summary {
    margin: 1rem 0;
    color: var(--color-tan);
    line-height: 1.5;
  }
  
  .post-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .post-meta span {
    padding: 0.2rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .post-meta .format {
    background: var(--color-scarlet);
    color: var(--color-cream);
  }
  
  .post-meta .collection {
    background: var(--color-lilac);
    color: var(--color-green);
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--color-tan);
  }
  
  .empty-state h2 {
    color: var(--color-yellow);
    margin-bottom: 1rem;
  }
  
  .empty-state a {
    color: var(--color-yellow);
    text-decoration: underline;
  }
  
  .empty-state a:hover {
    color: var(--color-scarlet);
  }
</style>
