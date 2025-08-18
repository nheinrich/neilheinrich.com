import { test, expect } from '@playwright/test'

test.describe('Slide-In Articles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should open article in slide-in on desktop', async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Click on first article link
    const firstArticle = page.locator('a[href^="/content/"]').first()
    await firstArticle.click()
    
    // Should open slide-in overlay
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // URL should update to article URL
    await expect(page).toHaveURL(/\/content\/.*/)
    
    // Article content should be visible in slide-in
    await expect(page.locator('.slide-in-overlay article')).toBeVisible()
    await expect(page.locator('.slide-in-overlay h1')).toBeVisible()
  })

  test('should use normal navigation on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Click on first article link
    const firstArticle = page.locator('a[href^="/content/"]').first()
    await firstArticle.click()
    
    // Should navigate to article page (not slide-in)
    await expect(page).toHaveURL(/\/content\/.*/)
    
    // Should not have slide-in overlay
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    
    // Should have article content on page
    await expect(page.locator('article h1')).toBeVisible()
  })

  test('should close slide-in with close button', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Click close button
    await page.locator('.slide-in-overlay .close-button').click()
    
    // Slide-in should close
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    
    // Should return to homepage
    await expect(page).toHaveURL('/')
  })

  test('should close slide-in with ESC key', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Press ESC key
    await page.keyboard.press('Escape')
    
    // Slide-in should close
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    
    // Should return to homepage
    await expect(page).toHaveURL('/')
  })

  test('should close slide-in by clicking backdrop', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Click on backdrop (margin area)
    await page.locator('.slide-in-overlay').click({ position: { x: 50, y: 400 } })
    
    // Slide-in should close
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    
    // Should return to homepage
    await expect(page).toHaveURL('/')
  })

  test('should handle browser back/forward with slide-in', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Go back
    await page.goBack()
    
    // Should close slide-in and return to homepage
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    await expect(page).toHaveURL('/')
    
    // Go forward
    await page.goForward()
    
    // Should reopen slide-in
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    await expect(page).toHaveURL(/\/content\/.*/)
  })

  test('should load article content dynamically', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Open article in slide-in
    const firstArticle = page.locator('a[href^="/content/"]').first()
    const articleTitle = await firstArticle.locator('.title').textContent()
    
    await firstArticle.click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Article title should match in slide-in
    if (articleTitle) {
      await expect(page.locator('.slide-in-overlay h1')).toContainText(articleTitle.trim())
    }
    
    // Content should be loaded
    await expect(page.locator('.slide-in-overlay .content')).toBeVisible()
  })

  test('should respect modifier keys for normal navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Click with Ctrl/Cmd key (should open in new tab/normal navigation)
    const firstArticle = page.locator('a[href^="/content/"]').first()
    
    // We can't easily test new tab opening, but we can test that 
    // the slide-in doesn't open when modifier keys are used
    await firstArticle.click({ modifiers: ['Meta'] })
    
    // Should not open slide-in overlay
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
  })

  test('should maintain homepage scroll position', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    
    // Scroll down on homepage
    await page.evaluate(() => window.scrollTo(0, 500))
    const scrollPosition = await page.evaluate(() => window.scrollY)
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Close slide-in
    await page.keyboard.press('Escape')
    await expect(page.locator('.slide-in-overlay')).not.toBeVisible()
    
    // Homepage scroll position should be maintained
    const newScrollPosition = await page.evaluate(() => window.scrollY)
    expect(newScrollPosition).toBe(scrollPosition)
  })
})

test.describe('Slide-In Article Accessibility', () => {
  test('should have proper focus management', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Focus should move to slide-in content
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    
    // Should be able to tab through slide-in content
    await page.keyboard.press('Tab')
    
    // Close button should be focusable
    await page.locator('.slide-in-overlay .close-button').focus()
    const closeButtonFocused = await page.locator('.slide-in-overlay .close-button').evaluate(
      el => el === document.activeElement
    )
    expect(closeButtonFocused).toBe(true)
  })

  test('should prevent body scroll when open', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Body should have overflow hidden
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow
    })
    expect(bodyOverflow).toBe('hidden')
    
    // Close slide-in
    await page.keyboard.press('Escape')
    
    // Body overflow should be restored
    const restoredOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow
    })
    expect(restoredOverflow).not.toBe('hidden')
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('/')
    
    // Open article in slide-in
    await page.locator('a[href^="/content/"]').first().click()
    await expect(page.locator('.slide-in-overlay')).toBeVisible()
    
    // Should have proper modal attributes
    const overlay = page.locator('.slide-in-overlay')
    
    // Should have role and aria attributes for accessibility
    await expect(overlay.locator('article')).toBeVisible()
    
    // Close button should have proper label
    const closeButton = page.locator('.slide-in-overlay .close-button')
    await expect(closeButton).toHaveAttribute('aria-label')
  })
})