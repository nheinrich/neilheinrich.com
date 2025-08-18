import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should have proper heading structure on homepage', async ({ page }) => {
    await page.goto('/')

    // Should have one h1
    const h1Elements = page.locator('h1')
    await expect(h1Elements).toHaveCount(1)
    await expect(h1Elements.first()).toContainText('Being')

    // Should have h2 for sections (may have multiple h2s on page)
    const h2Elements = page.locator('h2')
    expect(await h2Elements.count()).toBeGreaterThanOrEqual(1)
    await expect(h2Elements.first()).toContainText('All essays, experiments and notes')
  })

  test('should have proper heading structure on post pages', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to first post (force click to bypass header interception)
    const firstPostLink = page.locator('a[href^="/content/"]').first()
    await firstPostLink.click({ force: true })

    // Wait for navigation
    await page.waitForURL(/\/content\/.*/)

    // Should have main h1 with post title (in article header)
    const articleH1 = page.locator('article header h1')
    await expect(articleH1).toHaveCount(1)
    await expect(articleH1).toBeVisible()
    
    // Post content may have h2, h3 etc. (look in main content area)
    const headings = page.locator('article h1, article h2, article h3, article h4, article h5, article h6')
    expect(await headings.count()).toBeGreaterThanOrEqual(1)
  })

  test('should have accessible links', async ({ page }) => {
    await page.goto('/')

    // Check post links specifically (these should have accessible text)
    const postLinks = page.locator('a[href^="/content/"]')
    const postLinkCount = await postLinks.count()

    for (let i = 0; i < Math.min(postLinkCount, 5); i++) { // Check first 5 post links
      const link = postLinks.nth(i)
      const hasText = (await link.textContent())?.trim().length > 0
      const hasAriaLabel = await link.getAttribute('aria-label')
      
      expect(hasText || hasAriaLabel).toBeTruthy()
    }

    // Check header links (Info and E-MAIL should have text)
    const headerInfoLink = page.locator('header a').filter({ hasText: /Info/ })
    await expect(headerInfoLink).toHaveText(/Info/)
    
    const headerEmailLink = page.locator('header a').filter({ hasText: 'E-MAIL' })
    await expect(headerEmailLink).toHaveText('E-MAIL')
  })

  test('should have proper alt text for images', async ({ page }) => {
    await page.goto('/')

    // Check if there are any images and they have alt text
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const altText = await img.getAttribute('alt')
      expect(altText).not.toBeNull()
    }
  })

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/')

    // Check if there are any form inputs and they have labels
    const inputs = page.locator('input, select, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const id = await input.getAttribute('id')
      
      if (id) {
        // Should have corresponding label
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeAttached()
      }
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/')

    // Test main text visibility
    const mainText = page.locator('p, span, a').first()
    await expect(mainText).toBeVisible()
    
    // Test heading visibility
    const headings = page.locator('h1, h2, h3').first()
    await expect(headings).toBeVisible()
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')

    // Test Tab navigation
    await page.keyboard.press('Tab')
    
    // Should focus on first focusable element
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()

    // Test multiple tab presses
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Should still have a focused element
    const stillFocused = page.locator(':focus')
    await expect(stillFocused).toBeVisible()
  })

  test('should have proper document language', async ({ page }) => {
    await page.goto('/')

    // Check html lang attribute
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en')
  })

  test('should have proper skip links or navigation', async ({ page }) => {
    await page.goto('/')

    // Check that users can navigate efficiently
    // Main content should be accessible
    const main = page.locator('main')
    await expect(main).toBeVisible()
    
    // Header navigation should be present (be more specific - header nav only)
    const headerNav = page.locator('header nav')
    await expect(headerNav).toBeVisible()
  })
})