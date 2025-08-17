<script>
  /** @type {import('./$types').PageProps} */
  let { data } = $props();
  
  // Extract post data using Svelte 5 runes
  let post = $derived(data.post);
</script>

<svelte:head>
  <title>{post.frontmatter.title}</title>
  <meta name="description" content={post.frontmatter.summary} />
</svelte:head>

<div class="container">
  <article>
    <header>
      <h1>{post.frontmatter.title}</h1>
      <div class="meta">
        <time datetime={post.frontmatter.date}>
          {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long', 
            day: 'numeric'
          })}
        </time>
        {#if post.frontmatter.updated && post.frontmatter.updated !== post.frontmatter.date}
          <span class="updated">
            Updated {new Date(post.frontmatter.updated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        {/if}
      </div>
      
      <div class="tags">
        {#if post.frontmatter.collections}
          {#each post.frontmatter.collections as collection}
            <span class="tag collection">{collection}</span>
          {/each}
        {/if}
        {#each post.frontmatter.topics as topic}
          <span class="tag topic">{topic}</span>
        {/each}
        <span class="tag format">{post.frontmatter.format}</span>
      </div>
    </header>
    
    <div class="content">
      <!-- Render the MDX content - in Svelte 5 runes mode, components are dynamic by default -->
      <post.content />
    </div>
  </article>
</div>

<style>
  .meta {
    margin-bottom: 1rem;
    color: var(--color-tan);
    font-size: var(--font-size-small);
  }
  
  .updated {
    margin-left: 1rem;
    font-style: italic;
  }
  
  .tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .tag {
    padding: 0.2rem 0.6rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .tag.collection {
    background: var(--color-lilac);
    color: var(--color-green);
  }
  
  .tag.topic {
    background: var(--color-yellow);
    color: var(--color-green);
  }
  
  .tag.format {
    background: var(--color-scarlet);
    color: var(--color-cream);
  }
  
  .content {
    line-height: 1.6;
  }
  
  /* MDX content styling */
  .content :global(h2) {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
  }
  
  .content :global(a) {
    color: var(--color-yellow);
    text-decoration: underline;
  }
  
  .content :global(a:hover) {
    color: var(--color-scarlet);
  }
</style>