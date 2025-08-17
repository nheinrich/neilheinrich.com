<script>
  import { goto } from '$app/navigation';
  import { COLLECTIONS, TOPICS, FORMATS } from '$lib/content.ts';
  
  /** @type {import('$lib/content.ts').FilterState} */
  let { filters = { collections: [], topics: [], format: 'all' } } = $props();
  
  // Local state for filter controls using Svelte 5 runes
  let selectedCollections = $state([...filters.collections]);
  let selectedTopics = $state([...filters.topics]);
  let selectedFormat = $state(filters.format);
  
  // Reactive derived state to check if filters are active
  let hasActiveFilters = $derived(
    selectedCollections.length > 0 || 
    selectedTopics.length > 0 || 
    selectedFormat !== 'all'
  );
  
  /**
   * Update URL with new filter state using SvelteKit navigation
   */
  function updateFilters() {
    const params = new URLSearchParams();
    
    // Add collections as comma-separated values
    if (selectedCollections.length > 0) {
      params.set('collections', selectedCollections.join(','));
    }
    
    // Add topics as comma-separated values  
    if (selectedTopics.length > 0) {
      params.set('topics', selectedTopics.join(','));
    }
    
    // Add format if not 'all'
    if (selectedFormat !== 'all') {
      params.set('format', selectedFormat);
    }
    
    // Navigate with new filter params (server-side filtering)
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    goto(newUrl, { replaceState: true });
  }
  
  /**
   * Clear all filters and return to unfiltered view
   */
  function clearFilters() {
    selectedCollections = [];
    selectedTopics = [];
    selectedFormat = 'all';
    goto('/', { replaceState: true });
  }
  
  /**
   * Toggle collection in the selected collections array
   */
  function toggleCollection(collection) {
    if (selectedCollections.includes(collection)) {
      selectedCollections = selectedCollections.filter(c => c !== collection);
    } else {
      selectedCollections = [...selectedCollections, collection];
    }
    updateFilters();
  }
  
  /**
   * Toggle topic in the selected topics array
   */
  function toggleTopic(topic) {
    if (selectedTopics.includes(topic)) {
      selectedTopics = selectedTopics.filter(t => t !== topic);
    } else {
      selectedTopics = [...selectedTopics, topic];
    }
    updateFilters();
  }
  
  /**
   * Handle format selection change
   */
  function handleFormatChange(event) {
    selectedFormat = event.target.value;
    updateFilters();
  }
</script>

<div class="filter-bar">
  <div class="filter-section">
    <span class="filter-label">Collections</span>
    <div class="filter-group" role="group" aria-label="Filter by collections">
      {#each COLLECTIONS as collection}
        <button
          class="filter-toggle"
          class:active={selectedCollections.includes(collection)}
          onclick={() => toggleCollection(collection)}
          type="button"
          aria-pressed={selectedCollections.includes(collection)}
        >
          {collection}
        </button>
      {/each}
    </div>
  </div>
  
  <div class="filter-section">
    <span class="filter-label">Topics</span>
    <div class="filter-group" role="group" aria-label="Filter by topics">
      {#each TOPICS as topic}
        <button
          class="filter-toggle"
          class:active={selectedTopics.includes(topic)}
          onclick={() => toggleTopic(topic)}
          type="button"
          aria-pressed={selectedTopics.includes(topic)}
        >
          {topic}
        </button>
      {/each}
    </div>
  </div>
  
  <div class="filter-section">
    <label class="filter-label" for="format-select">Format</label>
    <select 
      id="format-select"
      class="format-select"
      bind:value={selectedFormat}
      onchange={handleFormatChange}
    >
      <option value="all">All Formats</option>
      {#each FORMATS as format}
        <option value={format}>{format}</option>
      {/each}
    </select>
  </div>
  
  {#if hasActiveFilters}
    <button 
      class="clear-filters"
      onclick={clearFilters}
      type="button"
      aria-label="Clear all filters"
    >
      Clear Filters
    </button>
  {/if}
</div>

<style>
  .filter-bar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .filter-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .filter-label {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-bold);
    color: var(--color-yellow);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .filter-group {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .filter-toggle {
    padding: 0.5rem 1rem;
    background: transparent;
    border: 2px solid var(--color-tan);
    border-radius: 0.25rem;
    color: var(--color-tan);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-duration) ease-out;
  }
  
  .filter-toggle:hover {
    border-color: var(--color-yellow);
    color: var(--color-yellow);
  }
  
  .filter-toggle.active {
    background: var(--color-yellow);
    border-color: var(--color-yellow);
    color: var(--color-green);
  }
  
  .filter-toggle:focus {
    outline: 2px solid var(--color-yellow);
    outline-offset: 2px;
  }
  
  .format-select {
    padding: 0.5rem;
    background: var(--color-green);
    border: 2px solid var(--color-tan);
    border-radius: 0.25rem;
    color: var(--color-tan);
    font-size: var(--font-size-small);
    cursor: pointer;
    max-width: 200px;
  }
  
  .format-select:hover {
    border-color: var(--color-yellow);
  }
  
  .format-select:focus {
    outline: 2px solid var(--color-yellow);
    outline-offset: 2px;
    border-color: var(--color-yellow);
  }
  
  .clear-filters {
    padding: 0.75rem 1.5rem;
    background: var(--color-scarlet);
    border: none;
    border-radius: 0.25rem;
    color: var(--color-cream);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-bold);
    cursor: pointer;
    align-self: flex-start;
    transition: all var(--transition-duration) ease-out;
  }
  
  .clear-filters:hover {
    background: var(--color-yellow);
    color: var(--color-green);
    transform: translateY(-1px);
  }
  
  .clear-filters:focus {
    outline: 2px solid var(--color-yellow);
    outline-offset: 2px;
  }
  
  /* Mobile responsiveness */
  @media (min-width: 768px) {
    .filter-bar {
      flex-direction: row;
      align-items: flex-end;
      gap: 2rem;
    }
    
    .filter-section {
      flex: 1;
    }
    
    .clear-filters {
      align-self: flex-end;
      margin-bottom: 0.25rem; /* Align with filter buttons */
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .filter-toggle,
    .clear-filters {
      transition: none;
    }
  }
</style>