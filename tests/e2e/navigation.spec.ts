import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to post pages from homepage', async ({ page }) => {
    await page.goto('/')

    // Click on the first post (force click to bypass header interception)
    const firstPostLink = page.locator('a[href^="/content/"]').first()
    // Get the actual post title (not including star indicator)
    const postTitle = await firstPostLink.locator('.text-white').first().textContent()
    
    await firstPostLink.click({ force: true })

    // Should be on a post page
    await expect(page).toHaveURL(/\/content\/.*/)
    
    // Post page should have the title in article header (more specific)
    if (postTitle) {
      await expect(page.locator('article header h1')).toContainText(postTitle.trim())
    }

    // Should have related posts section or back navigation
    await expect(page.locator('article')).toBeVisible()
  })

  test('should navigate to information page', async ({ page }) => {
    await page.goto('/')

    // Click on Info link in header
    await page.locator('header').getByRole('link', { name: /Info/ }).click()

    // Should be on information page
    await expect(page).toHaveURL('/information')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should navigate to collection pages', async ({ page }) => {
    await page.goto('/')

    // Navigate to a Mabel collection page directly (since footer doesn't have collection links)
    await page.goto('/collections/mabel')

    // Should be on mabel collection page
    await expect(page).toHaveURL('/collections/mabel')
    // Look for the main Mabel heading (first one)
    await expect(page.locator('main h1').first()).toBeVisible()
    await expect(page.locator('main h1').first()).toContainText('Mabel')
  })

  test('should handle 404 page', async ({ page }) => {
    // Go to a non-existent page
    await page.goto('/this-page-does-not-exist')

    // Should show 404 page
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible()
    await expect(page.getByText('404')).toBeVisible()
    
    // Should have link back to home
    await expect(page.getByRole('link', { name: /Back to Home/ })).toBeVisible()
  })

  test('should have working external links', async ({ page }) => {
    await page.goto('/')

    // SvelteKit version may not have email links in header, check footer
    const footerEmailLink = page.locator('footer a[href^="mailto:"]')
    await expect(footerEmailLink.first()).toBeVisible()
  })

  test('should have external links with proper attributes', async ({ page }) => {
    await page.goto('/')

    // Check GitHub link (footer icons don't have text labels)
    const githubLink = page.locator('footer a[href="https://github.com/nheinrich"]')
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('target', '_blank')

    // Check LinkedIn link
    const linkedinLink = page.locator('footer a[href="https://www.linkedin.com/in/nheinrich/"]')
    await expect(linkedinLink).toBeVisible()
    await expect(linkedinLink).toHaveAttribute('target', '_blank')
  })
})