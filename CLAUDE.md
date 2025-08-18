# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Product Overview

A minimalist, performance-focused personal blog built with SvelteKit and Svelte 5. The site serves as both a creative outlet and professional portfolio, showcasing learnings, experiments, and ideas through a mysterious, artistic lens.

## Vision

Provide a home for publishing personal learnings, notes, and ideas that have historically stayed private — as a step toward building confidence in sharing publicly.

---

## Technology Stack

- **Framework**: SvelteKit 2+ (latest stable version - SSR with client-side routing)
- **Interactive Components**: Svelte 5+ (latest stable version with runes)
- **Styling**: Plain CSS with global styles and CSS custom properties
- **Content**: MDX (Markdown + Components via mdsvex)
- **Hosting**: Vercel (global CDN)
- **Package Manager**: pnpm

**IMPORTANT**: Always use the latest stable versions of all dependencies. Check Context7 MCP server documentation for current best practices and version information before implementing features.

---

## Structure

### Application

```text
├── docs/                             # Project documentation
│   ├── DESIGN.md                     # Design system, colors, typography, UI patterns
│   ├── PROCESS.md                    # Development process and documentation workflow
│   ├── ARCHITECTURE.md               # SvelteKit-specific technical patterns
│   └── features/                     # Feature documentation (PRDs + status)
│       ├── slide-in-articles.md
│       ├── advanced-filters.md
│       └── log.md                    # Implementation timeline and decisions
├── src/
│   ├── lib/
│   │   ├── components/               # Reusable Svelte components
│   │   ├── content/
│   │   │   └── posts/                # Blog posts in MDX
│   │   │       └── <slug>/
│   │   │           └── index.mdx
│   │   ├── styles/                   # Global CSS styles
│   │   ├── content.ts                # Content collection utilities
│   │   ├── filters.ts                # Filter logic and state management
│   │   └── format.ts                 # Content formatting utilities
│   ├── routes/
│   │   ├── +layout.svelte            # Global layout
│   │   ├── +page.svelte              # Homepage
│   │   ├── content/[slug]/           # Article pages
│   │   │   ├── +page.js              # Article data loading
│   │   │   └── +page.svelte          # Article template
│   │   └── information/              # About page
│   │       └── +page.svelte
│   └── app.html                      # HTML template
└── static/                           # Static assets (fonts, favicon, etc.)
```

### Project Documentation

Documentation is available in the `/docs/` directory:

- **DESIGN.md**: Complete design system including color palette, typography, UI patterns, and brand identity guidelines
- **PROCESS.md**: Development process framework with integrated feature documentation workflow
- **ARCHITECTURE.md**: SvelteKit-specific technical patterns and architecture decisions
- **features/**: Feature documentation serving as both PRDs and implementation records
  - **slide-in-articles.md**: Slide-in article overlay system
  - **advanced-filters.md**: Multi-select filter system with URL state management
  - **log.md**: Implementation timeline, technical decisions, and lessons learned

### Content Organization

- **Posts**: MDX files in `/src/lib/content/posts/<slug>/index.mdx`
- **Collections**: Project groupings (Mabel, Skelly, Teams, etc.)
- **Topics**: Subject matter categories (Mind, Discovery, Design, Dev, AI, etc.)
- **Formats**: Content types (Essays, Experiments, Notes)
- **Frontmatter**: Metadata for posts (title, slug, summary, date, collections, topics, format, etc.)

### Content Taxonomy

The blog uses a four-level taxonomy to organize content:

#### 1. Context
High-level domains that represent different spheres of focus:
- **Being**: Spirituality, mindfulness, philosophy, learning, meditation, taoism
- **Building**: Digital products, engineering, craft, experiments

#### 2. Collections
Project groupings and recurring themes:
- **Mabel**: Personal project collection
- **Skelly**: Creative explorations
- **Underworld**: Deep dives and investigations
- **Undercurrent**: Underlying patterns and themes
- **Teams**: Collaborative work and team dynamics
- **Experiments**: Interactive demos and prototypes

#### 3. Topics
Subject matter categories for content:
- **Mind**: Philosophy, learning, cognition
- **Discovery**: Investigations, explorations, discoveries
- **Design**: UX, visual design, product design
- **Dev**: Frontend, backend, architecture
- **Teams**: Process, management, collaboration
- **Motion**: Animation, SVG, CSS transitions
- **AI**: Machine learning, prompt engineering, agents

#### 4. Format
Content presentation types:
- **Essays**: Deliberate, considered long-form writing
- **Experiments**: Interactive demos and explorations
- **Notes**: Fragments, thoughts, quotes, work-in-progress ideas

### Component Architecture

- **Island Architecture**: Homepage ships zero JavaScript (preserved from Astro)
- **Lazy Loading**: Components load only when needed
- **Shallow Routing**: SvelteKit's native routing for slide-in articles
- **Progressive Enhancement**: Works without JavaScript

---

## Code Style

### General Principles

- Keep it minimal and performant
- Prioritize static content over JavaScript
- Use island architecture effectively
- Write self-documenting code
- Avoid unnecessary abstraction

### Formatting

- Use 2 spaces for indentation
- Use single quotes for strings
- Keep files under 200 lines when possible
- Use descriptive variable names
- Add comments only when necessary

### Import Paths

Always use absolute imports with path aliases instead of relative paths:

- `$lib/` → `./src/lib/`
- `$lib/components/` → `./src/lib/components/`
- `$lib/content/` → `./src/lib/content/`
- `$lib/styles/` → `./src/lib/styles/`

Examples:
```typescript
// ✅ Good - absolute imports
import Layout from '$lib/components/Layout.svelte'
import '$lib/styles/global.css'
import { getAllPosts } from '$lib/content'

// ❌ Bad - relative imports
import Layout from '../components/Layout.svelte'
import '../../styles/global.css'
```

### Performance First

- Static pages should achieve Lighthouse score of 100
- First contentful paint <1s globally
- Time to interactive <2s for content pages
- Only load JavaScript when absolutely necessary

### Component Guidelines

- Svelte components should be self-contained
- Use TypeScript for type safety
- Follow SvelteKit best practices for load functions
- Use Svelte 5 runes for reactive state management

---

## Claude Code Rules

When working on tasks:

1. **Use latest versions** - Always verify and use the latest stable versions via Context7 MCP
2. **Follow modern best practices** - Consult current documentation for up-to-date patterns
3. **Prioritize performance** - Every decision should consider impact on load times
4. **Ask before major changes** - Verify approach before restructuring
5. **Follow existing patterns** - Match the codebase style and conventions
6. **Test before committing** - Run build and check locally
7. **Maintain minimalism** - Don't add features or complexity unless requested
8. **Respect the vision** - Dark mode only, mysterious aesthetic, no comments system

### Modern Best Practices

- **Check documentation first**: Use Context7 MCP server to verify current versions and best practices
- **SvelteKit 2+**: Use latest SvelteKit features (shallow routing, load functions, etc.)
- **Svelte 5 Runes**: Use modern reactive patterns:
  - Complex derivations: `$derived.by(() => { ... })` for multi-statement logic
  - Simple derivations: `$derived(expression)` for single expressions  
  - Effects with cleanup: `$effect()` with return function for proper cleanup
  - State management: `$state()` for reactive state
- **CSS Custom Properties**: Use CSS variables for theming and design consistency
- **TypeScript**: Prefer type inference and modern TypeScript features
- **ESM modules**: Use ES modules exclusively, avoid CommonJS

### Debugging and Research Process

When encountering mysterious framework-specific issues:

1. **Pattern Recognition**: If basic operations break unexpectedly (especially with reactivity), suspect API usage issues
2. **Immediate Documentation Check**: Use Context7 MCP server for current framework patterns before trying variations
3. **Version-Specific Behavior**: With cutting-edge features (Svelte 5 runes, SvelteKit shallow routing), always verify syntax against latest docs
4. **Error Escalation**: If small changes break large functionality, stop and research the specific API rather than trial-and-error

*For broader debugging protocols and structured troubleshooting approaches, see [docs/PROCESS.md](docs/PROCESS.md).*

### Important Reminders

- NEVER create files unless explicitly requested
- ALWAYS prefer editing existing files
- NEVER proactively create documentation unless asked
- Do what has been asked; nothing more, nothing less

### Development Process

For complex implementations requiring multiple steps, follow the structured process outlined in [docs/PROCESS.md](docs/PROCESS.md).

**Quick Reference for Task Complexity:**
- **Simple changes**: Single file edits → Make edit → test → commit
- **Complex features**: Multi-component implementations → Use full PROCESS.md workflow
- **Performance-critical work**: Changes affecting Lighthouse scores → Use full PROCESS.md workflow
- **New integrations**: External libraries or dependencies → Use full PROCESS.md workflow

The process provides structured guidelines for planning, implementation, quality gates, and communication protocols to maintain the site's exceptional performance standards.

---

## Common Commands

```bash
# Development
pnpm dev                 # Start development server
pnpm build              # Build for production
pnpm preview            # Preview production build

# Testing
pnpm test               # Run Playwright tests
pnpm test:e2e           # Run E2E tests

# Linting & Formatting
pnpm lint               # Lint code
pnpm format             # Format with Prettier

# Type Checking
pnpm check              # TypeScript + SvelteKit validation

# Dependency Management
pnpm update             # Update dependencies to latest versions
pnpm outdated           # Check for outdated packages
pnpm add <package>      # Add a new dependency
pnpm add -D <package>   # Add a new dev dependency
pnpm install            # Install all dependencies
```

---

## Content Workflow

### Creating a Post

1. Create directory: `/src/lib/content/posts/<slug>/`
2. Add `index.mdx` with frontmatter
3. Add any post-specific Svelte components
4. Test locally with `pnpm dev`
5. Verify all interactive elements work
6. Check performance metrics

### Frontmatter Schema

```yaml
title: string
slug: string
summary: string
date: YYYY-MM-DD
updated: YYYY-MM-DD # Optional, when edited
context: being|building # Primary context
collections: [string] # Associated collections (Mabel, Skelly, etc.)
topics: [string] # Topic categories (Mind, Discovery, Design, etc.)
format: Essay|Experiment|Note # Content format type
pinned: boolean # Featured on homepage
layout: default|wide|custom # Post layout
status: draft|active|archived
```

### Interactive Components

When adding interactive elements:

1. Create component in post directory or `/src/lib/components/`
2. Import in MDX: `import Demo from './Demo.svelte'`
3. Use component in MDX: `<Demo />`
4. Test performance impact
5. Ensure graceful degradation without JS

---

## Design Guidelines

### Brand Identity

- **Voice**: Mysterious, unusual, creative with a touch of beauty
- **Visual**: Bold monochrome, dark mode-first, occasional strong accents
- **Typography**: Sans-serif grotesque for clean, modern feel
- **Layout**: Spacious with generous negative space
- **Motion**: Subtle animations for hover states and transitions

### Dark Mode Only

- No light theme implementation
- Ensure sufficient contrast for readability
- Use subtle color variations for depth

### Color System

Production color palette (defined as CSS custom properties):
- **Background**: `--color-green: #004a39`
- **Accent**: `--color-yellow: #fad714`  
- **Secondary**: `--color-scarlet: #ff3003`
- **Text**: `--color-tan: #d6d2bd`

---

## Security

### Headers Configuration

Ensure these headers are set in deployment:

- Strict-Transport-Security
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: DENY
- Content-Security-Policy (configured for embeds)

### Privacy

- No cookies or tracking in MVP
- No user data collection
- GDPR-compliant when analytics added

---

## Performance Monitoring

```bash
# Performance Testing
pnpm test                  # Full Playwright test suite
pnpm check                 # TypeScript + SvelteKit validation

# Build Analysis
pnpm build                 # Production build (162KB total)
pnpm preview               # Local production testing
```

### Performance Targets (✅ Achieved)
- **Lighthouse Performance**: 100/100
- **Lighthouse Accessibility**: 95/100
- **Lighthouse SEO**: 100/100
- **First Contentful Paint**: <1.5s
- **Bundle Size**: <500KB (achieved: 162KB)
- **JavaScript**: Zero on homepage (island architecture)

---

## Key Features

### Slide-In Articles (✅ Complete)
- **Smooth slide-in overlay** from right edge with URL synchronization
- **SvelteKit shallow routing** using `pushState()` and `preloadData()`
- **Hardware-accelerated animations** with 300ms transitions
- **Full accessibility** with ARIA, keyboard navigation, focus management
- **Progressive enhancement** with fallback to normal navigation

### Advanced Filter System (✅ Complete)
- **Multi-select filtering** by collections and topics with URL state management
- **Professional overlay interface** with smart positioning
- **Active filter chips** with truncation and overflow handling
- **Mobile responsive** with full-screen modal on mobile devices
- **Island architecture** with lazy loading when filters are used

---

## Testing

### Test Configuration
- **Framework**: Playwright
- **Browsers**: Chromium (simplified for development speed)
- **Test Suites**: Homepage, Navigation, Accessibility, Content

### Test Strategy  
- **Component testing**: Interactive component functionality
- **E2E testing**: Full user workflows
- **Performance validation**: Bundle size and Lighthouse scores

---

## Deployment

- **Platform**: Vercel
- **Branch Strategy**: Feature branches with PRs
- **CI/CD**: Automatic deployments from Git
- **Preview**: Branch deploys for PRs
- **Domain**: TBD (currently on Vercel preview URL)

---

## Future Considerations

### Current MVP Scope (Complete)

- ✅ Homepage with content filtering
- ✅ Slide-in article reading experience
- ✅ Multi-select filter system with URL state
- ✅ Full content migration from Astro
- ✅ Performance optimization (162KB bundle)
- ✅ Accessibility compliance

### Post-MVP Roadmap

- Privacy-first analytics (Plausible/Fathom)
- Full-text search functionality
- RSS feed generation
- Auto-generated OG images
- Enhanced mobile experience

---

## Status

✅ **SVELTEKIT MIGRATION COMPLETE & PRODUCTION READY**

All features successfully migrated and enhanced:
- **Performance**: 162KB bundle (68% under 500KB target)
- **Features**: Slide-in articles + advanced filtering operational
- **Architecture**: Modern SvelteKit + Svelte 5 patterns
- **Accessibility**: Full WCAG compliance maintained
- **Development**: Ready for production deployment

**Current Development Server**: http://localhost:3001/ (fully functional)