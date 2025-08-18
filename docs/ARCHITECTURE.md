# SvelteKit Architecture

**Framework**: SvelteKit 2+ with Svelte 5 runes  
**Last Updated**: 2025-01-18  
**Status**: Production Ready  

## Project Structure

```text
/src/
├── lib/
│   ├── components/           # Reusable Svelte components
│   │   ├── Header.svelte
│   │   ├── FilterBar.svelte
│   │   ├── SlideInArticle.svelte
│   │   └── Icon.svelte
│   ├── content/             # Blog content in MDX
│   │   └── posts/
│   │       └── <slug>/
│   │           └── index.mdx
│   ├── styles/              # Global CSS
│   │   ├── global.css
│   │   └── reset.css
│   ├── content.ts           # Content collection utilities
│   ├── filters.ts           # Filter logic and state management
│   └── format.ts            # Content formatting utilities
├── routes/
│   ├── +layout.svelte       # Global layout
│   ├── +page.svelte         # Homepage
│   ├── content/[slug]/      # Article pages
│   │   ├── +page.js         # Article data loading
│   │   └── +page.svelte     # Article template
│   └── information/         # About page
│       └── +page.svelte
└── app.html                 # HTML template
```

## Core Architecture Patterns

### 1. Island Architecture (Preserved from Astro)

**Principle**: Ship zero JavaScript to users who don't need interactivity

**Implementation**:
- Homepage renders as static HTML/CSS
- Interactive components load only when needed
- Filter system loads on first interaction
- Slide-in articles load on first article click

**Benefits**:
- 100/100 Lighthouse Performance score
- Instant page loads for content consumption
- Progressive enhancement for all users

### 2. Shallow Routing (SvelteKit Feature)

**Use Case**: Slide-in articles with URL synchronization

**Implementation**:
```typescript
import { pushState, preloadData } from '$app/navigation'

async function openArticle(slug: string) {
  const result = await preloadData(`/content/${slug}`)
  if (result.type === 'loaded') {
    pushState(`/content/${slug}`, { 
      slideOpen: true, 
      article: result.data 
    })
  }
}
```

**Benefits**:
- Real URLs that work with browser back/forward
- No custom state management required
- SEO-friendly with shareable links
- Native browser behavior

### 3. Svelte 5 Runes Pattern

**State Management**:
```typescript
// Simple reactive state
let isOpen = $state(false)

// Complex derived state  
const filteredPosts = $derived.by(() => {
  return posts.filter(post => 
    matchesCollections(post, selectedCollections) &&
    matchesTopics(post, selectedTopics)
  )
})

// Effect with cleanup
$effect(() => {
  function handleEscape(e) {
    if (e.key === 'Escape') closeSlideIn()
  }
  
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
})
```

**Benefits**:
- Excellent performance with fine-grained reactivity
- Clear separation of state, derivations, and effects
- Proper cleanup prevents memory leaks
- Type-safe with TypeScript

## Data Flow Architecture

### Content Loading Strategy

**MDX with mdsvex**:
- Posts written in MDX with frontmatter metadata
- Svelte components can be imported directly into MDX
- Server-side rendering for SEO and performance
- Dynamic imports for code splitting

**Content Collections**:
```typescript
// src/lib/content.ts
export interface Post {
  slug: string
  title: string
  summary: string
  date: string
  collections: string[]
  topics: string[]
  format: 'Essay' | 'Experiment' | 'Note'
}

export async function getAllPosts(): Promise<Post[]> {
  // Dynamic import all posts from content directory
}
```

### Filter State Management

**URL-First Architecture**:
- URL search params as source of truth
- Reactive derivations from URL state
- Automatic synchronization with browser history

**Implementation Pattern**:
```typescript
// Reactive URL state
$: collections = url.searchParams.getAll('collections')
$: topics = url.searchParams.getAll('topics')

// Derived filtered content
const filteredPosts = $derived.by(() => {
  return posts.filter(post => matchesFilters(post, { collections, topics }))
})

// URL updates
function updateFilters(newFilters) {
  goto(`?${new URLSearchParams(newFilters).toString()}`, { replaceState: true })
}
```

## Component Architecture

### 1. Layout Components

**Global Layout** (`+layout.svelte`):
- HTML structure and meta tags
- Global styles and CSS custom properties
- Slide-in article container
- No JavaScript by default

**Header Component**:
- Static navigation links
- Logo and branding
- No interactive JavaScript

### 2. Interactive Components

**Filter System**:
- `FilterBar.svelte`: Main filter interface
- `Filter.svelte`: Advanced multi-select dropdowns
- `ActiveFilters.svelte`: Chip display for active filters
- Loads only when filter button is clicked

**Slide-In Articles**:
- `SlideInArticle.svelte`: Main overlay component
- Uses SvelteKit shallow routing for state
- Dynamic content loading with `preloadData()`
- Hardware-accelerated animations

### 3. Content Components

**Article Pages**:
- Server-side rendered with SvelteKit
- MDX content with embedded Svelte components
- Load functions for data fetching
- SEO optimized with meta tags

## Performance Architecture

### Bundle Splitting Strategy

**Homepage Bundle**:
- Zero JavaScript (HTML/CSS only)
- Critical CSS inlined
- Progressive enhancement approach

**Feature Bundles** (Loaded on Demand):
- Filter system: ~5KB compressed
- Slide-in articles: ~20KB compressed
- Individual article components: Variable size

**Total Bundle Size**: 162KB (significantly under 500KB target)

### Optimization Techniques

**CSS Custom Properties**:
- Color system defined as CSS variables
- Consistent theming across components
- Efficient style inheritance

**Hardware Acceleration**:
```css
.slide-panel {
  transform: translateX(100%);
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform; /* Only during animation */
}
```

**Efficient Reactivity**:
- `$derived.by()` for complex computations
- Minimal re-renders with precise dependency tracking
- Proper cleanup with `$effect()` return functions

## SEO & Accessibility Architecture

### SEO Strategy

**Server-Side Rendering**:
- All content rendered on server for crawlers
- Meta tags generated from frontmatter
- Structured URLs for content hierarchy

**URL Structure**:
- `/` - Homepage
- `/content/[slug]` - Individual articles
- `/information` - About page
- Query params for filter state (crawler-friendly)

### Accessibility Implementation

**ARIA Patterns**:
- Modal dialogs for slide-in articles
- Combobox pattern for filter dropdowns
- Proper heading hierarchy
- Semantic HTML structure

**Keyboard Navigation**:
- Tab order management
- Focus trapping in modals
- ESC key handling
- Custom focus indicators

**Screen Reader Support**:
- Descriptive labels and announcements
- State changes communicated
- Alternative text for visual elements

## Deployment Architecture

### Build Process

**SvelteKit Build**:
- Static site generation where possible
- Server-side rendering for dynamic content
- Automatic code splitting and optimization
- CSS and JavaScript minification

**Vercel Integration**:
- Automatic deployments from Git
- Edge function support for dynamic features
- Global CDN for static assets
- Preview deployments for pull requests

### Environment Configuration

**Development**:
- Hot module replacement
- Source maps for debugging
- TypeScript checking
- ESLint and Prettier integration

**Production**:
- Optimized bundles
- Compressed assets
- Security headers
- Performance monitoring ready

---

## Migration Benefits

### From Astro to SvelteKit

**What We Gained**:
- Native support for complex client-side interactions
- Built-in shallow routing for slide-in articles
- Excellent TypeScript integration
- Modern reactive patterns with Svelte 5

**What We Preserved**:
- Island architecture philosophy
- Zero JavaScript on homepage
- Exceptional performance scores
- SEO-friendly content rendering

**Technical Debt Eliminated**:
- Custom state management for URL synchronization
- Manual content hydration systems
- Complex component loading patterns
- Browser history management

This architecture enables sophisticated user interactions while maintaining the performance and SEO benefits of a static site, representing the best of both worlds for a modern content-focused application.