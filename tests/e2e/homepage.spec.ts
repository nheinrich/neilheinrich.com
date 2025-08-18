import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load and display essential elements', async ({ page }) => {
    await page.goto('/')

    // Check main heading - now says "Fieldnotes" 
    await expect(page.getByRole('heading', { name: /Fieldnotes/ })).toBeVisible()

    // Check filter section with new structure
    await expect(page.getByText('All essays, experiments and notes')).toBeVisible()
    
    // Check that the Filter button is visible (advanced filtering)
    await expect(page.getByRole('button', { name: /Filter/ })).toBeVisible()

    // Check that posts are visible
    const postLinks = page.locator('a[href^="/content/"]')
    await expect(postLinks.first()).toBeVisible()
    
    // Verify we have multiple posts
    const postCount = await postLinks.count()
    expect(postCount).toBeGreaterThan(10) // We have 16+ posts
  })

  test('should display pinned posts with star indicators', async ({ page }) => {
    await page.goto('/')

    // Check for star indicators (pinned posts)
    const stars = page.locator('span:has-text("★")')
    await expect(stars.first()).toBeVisible()
    
    // Should have multiple pinned posts
    const starCount = await stars.count()
    expect(starCount).toBeGreaterThan(3) // We have 5 pinned posts
  })

  test('should have working navigation in header', async ({ page }) => {
    await page.goto('/')

    // Check header navigation - now has Info link
    await expect(page.locator('header').getByRole('link', { name: /Info/ })).toBeVisible()
    
    // Check logo link (specifically header logo)
    const logoLink = page.locator('header a').first()
    await expect(logoLink).toBeVisible()
  })

  test('should have working footer links', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer to ensure visibility
    await page.locator('footer').scrollIntoViewIfNeeded()

    // Footer has social media icon links (no collection links)
    await expect(page.locator('footer a[href="mailto:neil@synthesishq.com"]')).toBeVisible()
    await expect(page.locator('footer a[href="https://github.com/nheinrich"]')).toBeVisible()
    await expect(page.locator('footer a[href="https://twitter.com/nheinrich"]')).toBeVisible()
    await expect(page.locator('footer a[href="https://instagram.com/nheinrich"]')).toBeVisible()
    await expect(page.locator('footer a[href="https://www.linkedin.com/in/nheinrich/"]')).toBeVisible()

    // Check hidden footer subscribe links (they're in display: none section)
    // These exist but are hidden, so we won't test for visibility
  })

  test('should have hover effects on post links', async ({ page }) => {
    await page.goto('/')

    const firstPost = page.locator('a[href^="/content/"]').first()
    
    // Check that post link is initially visible
    await expect(firstPost).toBeVisible()
    
    // Hover and check for hover state (arrow should become visible)
    await firstPost.hover()
    
    // The hover arrow should be visible after hovering
    const hoverArrow = firstPost.locator('span:has-text("→")').last()
    await expect(hoverArrow).toBeVisible()
  })
})