<script lang="ts">
  import NewIcon from '$lib/components/NewIcon.svelte';
  
  // Icon examples for testing
  const customIcons = ['diamond', 'burst', 'arrow', 'github', 'instagram', 'linkedin', 'mail', 'twitter'];
  const lucideIcons = ['Filter', 'X', 'Check', 'BookOpen', 'Flask', 'StickyNote', 'Home', 'Settings', 'Search', 'Menu', 'Download', 'Upload'];
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  const colors = [
    { name: 'Default', class: '' },
    { name: 'Yellow', class: 'text-yellow' },
    { name: 'Scarlet', class: 'text-scarlet' },
    { name: 'Tan', class: 'text-tan' },
    { name: 'Green', class: 'text-green' },
    { name: 'White', class: 'text-white' }
  ];
</script>

<svelte:head>
  <title>Icon System Test - Neil Heinrich</title>
  <meta name="description" content="Testing the consolidated icon system with Lucide integration" />
</svelte:head>

<article class="container">
  <header class="header">
    <h1>Icon System Test</h1>
    <p class="subtitle">
      Testing the new consolidated icon system with custom icons, Lucide integration, 
      consistent sizing, CSS colorization, and squircle variants.
    </p>
  </header>

  <!-- Size Demonstration -->
  <section class="section">
    <h2>Icon Sizes</h2>
    <p class="description">Standard icon sizes: xs (16px), sm (20px), md (24px), lg (32px), xl (48px)</p>
    
    <div class="size-grid">
      {#each sizes as size}
        <div class="size-demo">
          <div class="size-label">{size} ({size === 'xs' ? '16px' : size === 'sm' ? '20px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '48px'})</div>
          <div class="icon-row">
            <NewIcon name="diamond" {size} />
            <NewIcon name="Filter" {size} />
            <NewIcon name="github" {size} />
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Color Demonstration -->
  <section class="section">
    <h2>CSS Colorization</h2>
    <p class="description">All icons respect CSS color properties and CSS custom properties</p>
    
    <div class="color-grid">
      {#each colors as color}
        <div class="color-demo">
          <div class="color-label">{color.name}</div>
          <div class="icon-row {color.class}">
            <NewIcon name="burst" size="md" />
            <NewIcon name="Check" size="md" />
            <NewIcon name="mail" size="md" />
          </div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Custom Icons -->
  <section class="section">
    <h2>Custom Icons</h2>
    <p class="description">Brand-specific icons with consistent styling</p>
    
    <div class="icon-showcase">
      {#each customIcons as iconName}
        <div class="icon-demo">
          <NewIcon name={iconName} size="lg" />
          <span class="icon-name">{iconName}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Lucide Icons -->
  <section class="section">
    <h2>Lucide Icons</h2>
    <p class="description">1000+ icons from the Lucide icon library</p>
    
    <div class="icon-showcase">
      {#each lucideIcons as iconName}
        <div class="icon-demo">
          <NewIcon name={iconName} size="lg" />
          <span class="icon-name">{iconName}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- Squircle Variants -->
  <section class="section">
    <h2>Squircle Backgrounds</h2>
    <p class="description">Any icon can be wrapped in a squircle background</p>
    
    <div class="squircle-demos">
      <!-- Plain Squircles -->
      <div class="squircle-group">
        <h3>Plain Squircles</h3>
        <div class="icon-row">
          <NewIcon name="github" size="xl" variant="squircle" />
          <NewIcon name="instagram" size="xl" variant="squircle" />
          <NewIcon name="linkedin" size="xl" variant="squircle" />
          <NewIcon name="mail" size="xl" variant="squircle" />
          <NewIcon name="twitter" size="xl" variant="squircle" />
        </div>
      </div>

      <!-- Filled Squircles -->
      <div class="squircle-group">
        <h3>Filled Squircles</h3>
        <div class="icon-row">
          <NewIcon name="diamond" size="xl" variant="squircle" filled />
          <NewIcon name="burst" size="xl" variant="squircle" filled />
          <NewIcon name="BookOpen" size="xl" variant="squircle" filled />
          <NewIcon name="Flask" size="xl" variant="squircle" filled />
          <NewIcon name="Settings" size="xl" variant="squircle" filled />
        </div>
      </div>

      <!-- Colored Squircles -->
      <div class="squircle-group">
        <h3>Colored Squircles</h3>
        <div class="icon-row">
          <NewIcon name="Filter" size="xl" variant="squircle" filled class="text-black bg-yellow" />
          <NewIcon name="Check" size="xl" variant="squircle" filled class="text-white bg-scarlet" />
          <NewIcon name="Home" size="xl" variant="squircle" filled class="text-black bg-tan" />
          <NewIcon name="Search" size="xl" variant="squircle" filled class="text-white bg-green" />
        </div>
      </div>

      <!-- Dark & Elegant -->
      <div class="squircle-group">
        <h3>Dark & Elegant</h3>
        <div class="icon-row">
          <NewIcon name="github" size="xl" variant="squircle" filled class="text-tan bg-black" />
          <NewIcon name="instagram" size="xl" variant="squircle" filled class="text-tan bg-black" />
          <NewIcon name="linkedin" size="xl" variant="squircle" filled class="text-tan bg-black" />
          <NewIcon name="mail" size="xl" variant="squircle" filled class="text-tan bg-black" />
          <NewIcon name="twitter" size="xl" variant="squircle" filled class="text-tan bg-black" />
        </div>
      </div>

      <!-- Brand Accent -->
      <div class="squircle-group">
        <h3>Brand Accent</h3>
        <div class="icon-row">
          <NewIcon name="diamond" size="xl" variant="squircle" filled class="bg-yellow text-black" />
          <NewIcon name="burst" size="xl" variant="squircle" filled class="bg-yellow text-black" />
          <NewIcon name="BookOpen" size="xl" variant="squircle" filled class="bg-yellow text-black" />
          <NewIcon name="Beaker" size="xl" variant="squircle" filled class="bg-yellow text-black" />
          <NewIcon name="Settings" size="xl" variant="squircle" filled class="bg-yellow text-black" />
        </div>
      </div>

      <!-- Subtle Contrast -->
      <div class="squircle-group">
        <h3>Subtle Contrast</h3>
        <div class="icon-row">
          <NewIcon name="Filter" size="xl" variant="squircle" filled class="bg-tan text-green" />
          <NewIcon name="Search" size="xl" variant="squircle" filled class="bg-tan text-green" />
          <NewIcon name="Download" size="xl" variant="squircle" filled class="bg-tan text-green" />
          <NewIcon name="Upload" size="xl" variant="squircle" filled class="bg-tan text-green" />
          <NewIcon name="Menu" size="xl" variant="squircle" filled class="bg-tan text-green" />
        </div>
      </div>

      <!-- Bold Statement -->
      <div class="squircle-group">
        <h3>Bold Statement</h3>
        <div class="icon-row">
          <NewIcon name="Check" size="xl" variant="squircle" filled class="bg-scarlet text-white" />
          <NewIcon name="arrow" size="xl" variant="squircle" filled class="bg-scarlet text-white" />
          <NewIcon name="StickyNote" size="xl" variant="squircle" filled class="bg-scarlet text-white" />
          <NewIcon name="Home" size="xl" variant="squircle" filled class="bg-scarlet text-white" />
          <NewIcon name="X" size="xl" variant="squircle" filled class="bg-scarlet text-white" />
        </div>
      </div>

      <!-- Mixed Sizes -->
      <div class="squircle-group">
        <h3>Multiple Sizes</h3>
        <div class="icon-row items-end">
          <NewIcon name="Menu" size="sm" variant="squircle" filled class="text-yellow" />
          <NewIcon name="Download" size="md" variant="squircle" filled class="text-yellow" />
          <NewIcon name="Upload" size="lg" variant="squircle" filled class="text-yellow" />
          <NewIcon name="Settings" size="xl" variant="squircle" filled class="text-yellow" />
        </div>
      </div>
    </div>
  </section>

  <!-- Error Handling -->
  <section class="section">
    <h2>Error Handling</h2>
    <p class="description">Non-existent icons show a helpful error indicator</p>
    
    <div class="icon-row">
      <NewIcon name="nonexistent" size="md" />
      <NewIcon name="fakeLucide" size="md" />
      <NewIcon name="missingIcon" size="md" variant="squircle" />
    </div>
  </section>

  <!-- Usage Examples -->
  <section class="section">
    <h2>Usage Examples</h2>
    <p class="description">How to use the new Icon component in your code</p>
    
    <div class="code-examples">
      <div class="code-block">
        <h4>Basic Usage</h4>
        <pre><code>&lt;NewIcon name="diamond" size="md" /&gt;
&lt;NewIcon name="Filter" size="sm" /&gt;
&lt;NewIcon name="github" size="lg" /&gt;</code></pre>
      </div>

      <div class="code-block">
        <h4>With Squircles</h4>
        <pre><code>&lt;NewIcon name="Settings" variant="squircle" /&gt;
&lt;NewIcon name="github" variant="squircle" filled /&gt;
&lt;NewIcon name="Filter" variant="squircle" size="xl" /&gt;</code></pre>
      </div>

      <div class="code-block">
        <h4>With Colors & Backgrounds</h4>
        <pre><code>&lt;NewIcon name="Check" class="text-yellow" /&gt;
&lt;NewIcon name="diamond" class="text-scarlet" /&gt;
&lt;NewIcon name="Settings" variant="squircle" filled 
         class="bg-yellow text-black" /&gt;
&lt;NewIcon name="github" variant="squircle" filled 
         class="bg-black text-tan" /&gt;</code></pre>
      </div>
    </div>
  </section>
</article>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    color: var(--color-tan);
    background: var(--color-green);
    min-height: 100vh;
  }

  .header {
    text-align: center;
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-yellow);
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    color: rgba(214, 210, 189, 0.8);
    max-width: 600px;
    margin: 0 auto;
  }

  .section {
    margin-bottom: 4rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-yellow);
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-tan);
    margin-bottom: 1rem;
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-yellow);
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 1rem;
    color: rgba(214, 210, 189, 0.7);
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  /* Size Grid */
  .size-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }

  .size-demo {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
  }

  .size-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-yellow);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Color Grid */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .color-demo {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
  }

  .color-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-tan);
    margin-bottom: 1rem;
  }

  /* Icon Showcase */
  .icon-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1.5rem;
  }

  .icon-demo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    transition: background 200ms ease-out;
  }

  .icon-demo:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .icon-name {
    font-size: 0.75rem;
    color: rgba(214, 210, 189, 0.6);
    text-align: center;
    font-family: monospace;
  }

  /* Icon Rows */
  .icon-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  .icon-row.items-end {
    align-items: flex-end;
  }

  /* Squircle Demos */
  .squircle-demos {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .squircle-group {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 2rem;
  }

  /* Code Examples */
  .code-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .code-block {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 1.5rem;
  }

  pre {
    margin: 0;
    font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(214, 210, 189, 0.9);
    overflow-x: auto;
  }

  code {
    font-family: inherit;
  }

  /* Color utilities */
  .text-yellow { color: var(--color-yellow); }
  .text-scarlet { color: var(--color-scarlet); }
  .text-tan { color: var(--color-tan); }
  .text-green { color: var(--color-green); }
  .text-white { color: white; }
  .text-black { color: #000000; }

  /* Background color utilities for squircles - these set the squircle background color */
  :global(.bg-black .squircle.filled::before) { background: #000000 !important; }
  :global(.bg-white .squircle.filled::before) { background: #ffffff !important; }
  :global(.bg-yellow .squircle.filled::before) { background: var(--color-yellow) !important; }
  :global(.bg-scarlet .squircle.filled::before) { background: var(--color-scarlet) !important; }
  :global(.bg-tan .squircle.filled::before) { background: var(--color-tan) !important; }
  :global(.bg-green .squircle.filled::before) { background: var(--color-green) !important; }

  /* Force icon colors in squircles */
  :global(.text-black .squircle svg) { color: #000000 !important; }
  :global(.text-black .squircle svg path) { fill: #000000 !important; }
  :global(.text-white .squircle svg) { color: #ffffff !important; }
  :global(.text-white .squircle svg path) { fill: #ffffff !important; }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    .size-grid {
      grid-template-columns: 1fr;
    }
    
    .color-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .icon-showcase {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .code-examples {
      grid-template-columns: 1fr;
    }
  }
</style>