<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  // Reactive slide-in state using Svelte 5 runes
  let shouldShow = $derived(!!$page.state?.slideOpen);
  let isOpen = $state(false);
  let articleData = $derived($page.state?.articleData);
  let articleSlug = $derived($page.state?.articleSlug);
  
  // Handle smooth enter/exit animations
  $effect(() => {
    if (shouldShow) {
      // Small delay to ensure DOM is ready before animating in
      setTimeout(() => {
        isOpen = true;
      }, 10);
    } else {
      isOpen = false;
    }
  });
  
  // Dynamic component loading
  let articleComponent = $state(null);
  
  // Load the MDX component when article slug changes
  $effect(() => {
    if (articleSlug) {
      import(`../content/posts/${articleSlug}/index.mdx`)
        .then(module => {
          articleComponent = module.default;
        })
        .catch(error => {
          console.error('Failed to load article component:', error);
          articleComponent = null;
        });
    } else {
      articleComponent = null;
    }
  });
  
  function close() {
    // Use native browser back for natural behavior
    history.back();
  }
  
  function handleBackdropClick(event) {
    // Only close if clicking the backdrop, not the content
    if (event.target === event.currentTarget) {
      close();
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape' && isOpen) {
      close();
    }
  }
  
  // Add global keydown listener when open
  $effect(() => {
    if (shouldShow) {
      document.addEventListener('keydown', handleKeydown);
      // Prevent body scroll when slide-in is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    };
  });
</script>

{#if shouldShow && articleData}
  <!-- Slide-in overlay with 120px margin design -->
  <div 
    class="slide-container" 
    class:open={isOpen}
    onclick={handleBackdropClick}
    onkeydown={handleKeydown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="article-title" 
    aria-describedby="article-content"
    tabindex="-1"
  >
    <!-- Clickable margin area (120px) -->
    <div 
      class="clickable-margin" 
      onclick={close}
      onkeydown={(e) => e.key === 'Enter' && close()}
      role="button"
      tabindex="0"
      aria-label="Close article"
    ></div>
    
    <!-- Main slide panel -->
    <div class="slide-panel">
      <!-- Close button -->
      <button 
        class="close-btn" 
        onclick={close}
        aria-label="Close article"
        type="button"
      >
        ×
      </button>
      
      <!-- Article content -->
      <article id="article-content">
        <header>
          <h1 id="article-title">{articleData.post.frontmatter.title}</h1>
          <div class="meta">
            <time datetime={articleData.post.frontmatter.date}>
              {new Date(articleData.post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}
            </time>
            {#if articleData.post.frontmatter.updated && articleData.post.frontmatter.updated !== articleData.post.frontmatter.date}
              <span class="updated">
                Updated {new Date(articleData.post.frontmatter.updated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            {/if}
          </div>
          
          <div class="tags">
            {#if articleData.post.frontmatter.collections}
              {#each articleData.post.frontmatter.collections as collection}
                <span class="tag collection">{collection}</span>
              {/each}
            {/if}
            {#each articleData.post.frontmatter.topics as topic}
              <span class="tag topic">{topic}</span>
            {/each}
            <span class="tag format">{articleData.post.frontmatter.format}</span>
          </div>
        </header>
        
        <div class="content">
          <!-- Render the dynamically loaded MDX content -->
          {#if articleComponent}
            {@render articleComponent()}
          {:else}
            <p>Loading content...</p>
          {/if}
        </div>
      </article>
    </div>
  </div>
{/if}

<style>
  .slide-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 120px; /* Homepage shows through */
    z-index: 1000;
    pointer-events: none;
    
    /* Hardware acceleration for smooth animations */
    will-change: transform;
  }
  
  .slide-container.open {
    pointer-events: auto;
  }
  
  .clickable-margin {
    position: absolute;
    top: 0;
    left: -120px;
    bottom: 0;
    width: 120px;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
    transition: background var(--transition-duration) ease-out;
  }
  
  .clickable-margin:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .slide-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--color-green);
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
    
    /* Hardware acceleration */
    will-change: transform;
  }
  
  .slide-container.open .slide-panel {
    transform: translateX(0);
  }
  
  .close-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    background: var(--color-scarlet);
    color: var(--color-cream);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    transition: 
      background-color var(--transition-duration) ease-out,
      transform var(--transition-duration) ease-out;
  }
  
  .close-btn:hover {
    background: var(--color-yellow);
    color: var(--color-green);
    transform: scale(1.1);
  }
  
  .close-btn:focus {
    outline: 2px solid var(--color-yellow);
    outline-offset: 2px;
  }
  
  /* Article content styling */
  article {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  article header {
    margin-bottom: 2rem;
  }
  
  article h1 {
    margin-bottom: 1rem;
  }
  
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
    color: var(--color-tan);
  }
  
  /* MDX content styling */
  .content :global(h2) {
    color: var(--color-yellow);
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: var(--font-size-subheading);
  }
  
  .content :global(h3) {
    color: var(--color-lilac);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .content :global(p) {
    margin-bottom: 1rem;
  }
  
  .content :global(a) {
    color: var(--color-yellow);
    text-decoration: underline;
    transition: color var(--transition-duration) ease-out;
  }
  
  .content :global(a:hover) {
    color: var(--color-scarlet);
  }
  
  .content :global(strong) {
    color: var(--color-cream);
    font-weight: var(--font-weight-bold);
  }
  
  .content :global(code) {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: 'Söhne Mono', monospace;
    font-size: 0.9em;
  }
  
  .content :global(ul), .content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }
  
  .content :global(li) {
    margin-bottom: 0.5rem;
    list-style: disc;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .slide-container {
      left: 20px; /* Smaller margin on mobile */
    }
    
    .clickable-margin {
      left: -20px;
      width: 20px;
    }
    
    article {
      padding: 1rem;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .slide-panel {
      transition: none;
    }
    
    .close-btn {
      transition: none;
    }
  }
</style>