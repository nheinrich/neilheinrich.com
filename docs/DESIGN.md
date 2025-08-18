# Design Reference

## Technology Stack

**Framework**: SvelteKit 2+ (latest stable version - SSR with client-side routing)  
**Interactive Components**: Svelte 5+ (latest stable version with runes)  
**Styling**: Plain CSS with global styles and CSS custom properties  
**Content**: MDX (Markdown + Components via mdsvex)  
**Hosting**: Vercel (global CDN)  

## Color Palette
Based on current site aesthetic:
- **Primary Background**: Black (#000000)
- **Dark Teal/Pine**: #0F4C3A to #1A5E4A range (for section backgrounds)
- **Burgundy/Maroon**: #4A1A2C to #5D2E3F range (for alternate sections)
- **Yellow Accent**: #FFD700 or similar (for headings, highlights)
- **Text Primary**: White (#FFFFFF)
- **Text Secondary**: Light gray (#9CA3AF)
- **Borders/Dividers**: Zinc-800 (#27272A)

## Typography
- **Font**: Sans-serif grotesque (system fonts or Inter/Geist)
- **Hierarchy**: Strong contrast between heading sizes
- **Body**: Clean, readable, generous line-height

## UI Elements
- **Arrows**: → for navigation and links
- **Hover states**: Subtle color transitions
- **Buttons**: Minimal, outlined style
- **Dividers**: Thin lines to separate sections

## Layout Patterns

### Homepage Structure
1. **Header**: Minimal with logo/name and E-MAIL button
2. **Hero Section**: Large title with tagline
3. **Content List**: Clean table-like layout with:
   - Date (Year or full date)
   - Title
   - Tags/Context
   - Summary (optional)
   - Arrow indicator on hover

### Content List Style (from reference)
```
Year    Title                   Context       Tags
2024    Post Title Here         Canon         philosophy, life    →
2024    Another Post           AI            technology, future   →
```

## Interaction Patterns
- **Hover**: Subtle highlight with arrow appearance
- **Active**: Slightly brighter accent color
- **Transitions**: Smooth, 200ms duration
- **Loading**: Minimal, no spinners, use subtle fade-ins

## Design Principles
1. **Minimalism**: Every element must justify its existence
2. **Readability**: Content first, decoration never
3. **Mystery**: Dark palette creates intimate, focused atmosphere
4. **Performance**: No unnecessary animations or effects
5. **Consistency**: Reuse patterns throughout

## Reference Sites

- **Current portfolio**: https://neilheinrich.com - Dark teal to burgundy gradient sections
- **Lauren Dorman site**: https://laurendorman.io - Ultra-minimal content list with table layout

## Notes
- Dark mode only (no light theme)
- Mobile-first responsive design
- Accessibility: Ensure sufficient contrast ratios
- Performance: Aim for 100 Lighthouse score