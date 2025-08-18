import { test, expect } from '@playwright/test'

test.describe('SEO and Meta Tags', () => {
  test('should have proper meta tags on homepage', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle('Being ✦ - Neil Heinrich')

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /Canon for creating a life worth living/)

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', 'Being ✦ - Neil Heinrich')

    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /Canon for creating a life worth living/)

    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute('content', 'website')

    // Check Twitter Card tags
    const twitterCard = page.locator('meta[property="twitter:card"]')
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image')

    const twitterCreator = page.locator('meta[property="twitter:creator"]')
    await expect(twitterCreator).toHaveAttribute('content', '@neilheinrich')
  })

  test('should have proper meta tags on post pages', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to first post
    const firstPostLink = page.locator('a[href^="/content/"]').first()
    await firstPostLink.click()

    // Should have article-specific meta tags
    const ogType = page.locator('meta[property="og:type"]')
    await expect(ogType).toHaveAttribute('content', 'article')

    // Should have article published time
    const publishedTime = page.locator('meta[property="article:published_time"]')
    await expect(publishedTime).toBeAttached()

    // Should have canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toBeAttached()
  })

  test('should have proper meta tags on about page', async ({ page }) => {
    await page.goto('/about')

    // Check title
    await expect(page).toHaveTitle('About | Being ✦ - Neil Heinrich')

    // Should have canonical URL
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /\/about$/)
  })

  test('should have RSS and sitemap links', async ({ page }) => {
    await page.goto('/')

    // Check RSS feed link
    const rssLink = page.locator('link[rel="alternate"][type="application/rss+xml"]')
    await expect(rssLink).toHaveAttribute('href', '/rss.xml')
    await expect(rssLink).toHaveAttribute('title', 'Being ✦ - Neil Heinrich')

    // Check sitemap link
    const sitemapLink = page.locator('link[rel="sitemap"]')
    await expect(sitemapLink).toHaveAttribute('href', '/sitemap-index.xml')
  })

  test('should have proper theme and color scheme', async ({ page }) => {
    await page.goto('/')

    // Check theme color
    const themeColor = page.locator('meta[name="theme-color"]')
    await expect(themeColor).toHaveAttribute('content', '#004a39')

    // Check color scheme
    const colorScheme = page.locator('meta[name="color-scheme"]')
    await expect(colorScheme).toHaveAttribute('content', 'dark')
  })

  test('should have favicon links', async ({ page }) => {
    await page.goto('/')

    // Check SVG favicon
    const svgFavicon = page.locator('link[rel="icon"][type="image/svg+xml"]')
    await expect(svgFavicon).toHaveAttribute('href', '/favicon.svg')

    // Check PNG favicons
    const favicon32 = page.locator('link[rel="icon"][sizes="32x32"]')
    await expect(favicon32).toHaveAttribute('href', '/favicon-32x32.png')

    const favicon16 = page.locator('link[rel="icon"][sizes="16x16"]')
    await expect(favicon16).toHaveAttribute('href', '/favicon-16x16.png')

    // Check apple touch icon
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]')
    await expect(appleTouchIcon).toHaveAttribute('href', '/apple-touch-icon.png')
  })
})