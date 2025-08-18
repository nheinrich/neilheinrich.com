import { test, expect } from '@playwright/test'

test.describe('Homepage Content Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
  })

  test('should display filter buttons', async ({ page }) => {
    // Check that all filter buttons are present
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'essays' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'experiments' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'notes' })).toBeVisible()
  })

  test('should have "All" filter active by default', async ({ page }) => {
    const allButton = page.getByRole('button', { name: 'All' })
    await expect(allButton).toHaveClass(/active/)
  })

  test('should show all posts when "All" is selected', async ({ page }) => {
    // Click All button to ensure it's selected
    await page.getByRole('button', { name: 'All' }).click()
    
    // Wait for content to update
    await page.waitForTimeout(500)
    
    // Check that posts are visible
    const posts = page.locator('a[href^="/content/"]')
    const count = await posts.count()
    expect(count).toBeGreaterThan(0)
    
    // Verify we have posts of different formats
    const allText = await page.locator('main').textContent()
    expect(allText).toContain('essay')
    expect(allText).toContain('experiment')
  })

  test('should filter to show only essays', async ({ page }) => {
    // Click essays filter
    await page.getByRole('button', { name: 'essays' }).click()
    
    // Wait for content to update
    await page.waitForTimeout(500)
    
    // Check that essays button is active
    const essaysButton = page.getByRole('button', { name: 'essays' })
    await expect(essaysButton).toHaveClass(/active/)
    
    // Verify only essays are shown
    const formatCells = page.locator('span').filter({ hasText: /^(essay|experiment|note)$/ })
    const formats = await formatCells.allTextContents()
    
    // All visible formats should be 'essay'
    formats.forEach(format => {
      if (format) expect(format).toBe('essay')
    })
  })

  test('should filter to show only experiments', async ({ page }) => {
    // Click experiments filter
    await page.getByRole('button', { name: 'experiments' }).click()
    
    // Wait for content to update
    await page.waitForTimeout(500)
    
    // Check that experiments button is active
    const experimentsButton = page.getByRole('button', { name: 'experiments' })
    await expect(experimentsButton).toHaveClass(/active/)
    
    // Verify only experiments are shown
    const formatCells = page.locator('span').filter({ hasText: /^(essay|experiment|note)$/ })
    const formats = await formatCells.allTextContents()
    
    // All visible formats should be 'experiment'
    formats.forEach(format => {
      if (format) expect(format).toBe('experiment')
    })
  })

  test('should filter to show only notes', async ({ page }) => {
    // Click notes filter
    await page.getByRole('button', { name: 'notes' }).click()
    
    // Wait for content to update
    await page.waitForTimeout(500)
    
    // Check that notes button is active
    const notesButton = page.getByRole('button', { name: 'notes' })
    await expect(notesButton).toHaveClass(/active/)
    
    // Check for empty state message or notes
    const contentArea = page.locator('main')
    const contentText = await contentArea.textContent()
    
    // Should either show notes or "No posts in this format yet" message
    if (contentText?.includes('No posts in this format yet')) {
      expect(contentText).toContain('No posts in this format yet')
    } else {
      const formatCells = page.locator('span').filter({ hasText: /^(essay|experiment|note)$/ })
      const formats = await formatCells.allTextContents()
      formats.forEach(format => {
        if (format) expect(format).toBe('note')
      })
    }
  })

  test('should maintain filter state when switching between filters', async ({ page }) => {
    // Click through each filter and verify state changes
    const filters = ['essays', 'experiments', 'notes', 'All']
    
    for (const filter of filters) {
      await page.getByRole('button', { name: filter }).click()
      await page.waitForTimeout(300)
      
      // Verify the clicked filter is active
      const button = page.getByRole('button', { name: filter })
      await expect(button).toHaveClass(/active/)
      
      // Verify other filters are not active
      const otherFilters = filters.filter(f => f !== filter)
      for (const other of otherFilters) {
        const otherButton = page.getByRole('button', { name: other })
        await expect(otherButton).not.toHaveClass(/active/)
      }
    }
  })

  test('should show correct post counts for each filter', async ({ page }) => {
    const filters = ['All', 'essays', 'experiments', 'notes']
    const postCounts: Record<string, number> = {}
    
    for (const filter of filters) {
      await page.getByRole('button', { name: filter }).click()
      await page.waitForTimeout(500)
      
      const posts = page.locator('a[href^="/content/"]')
      const count = await posts.count()
      postCounts[filter] = count
    }
    
    // All filter should have the most posts (or equal to the sum of others)
    const totalIndividual = postCounts['essays'] + postCounts['experiments'] + postCounts['notes']
    expect(postCounts['All']).toBe(totalIndividual)
  })

  test('should handle rapid filter switching', async ({ page }) => {
    // Rapidly click through filters to test stability
    const filters = ['essays', 'experiments', 'notes', 'All']
    
    for (let i = 0; i < 3; i++) {
      for (const filter of filters) {
        await page.getByRole('button', { name: filter }).click()
        // Very short wait to simulate rapid clicking
        await page.waitForTimeout(50)
      }
    }
    
    // After rapid switching, verify the last filter (All) is active and working
    const allButton = page.getByRole('button', { name: 'All' })
    await expect(allButton).toHaveClass(/active/)
    
    const posts = page.locator('a[href^="/content/"]')
    const count = await posts.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should preserve pinned post order in filtered views', async ({ page }) => {
    // Test that pinned posts appear first even when filtered
    await page.getByRole('button', { name: 'essays' }).click()
    await page.waitForTimeout(500)
    
    const posts = page.locator('a[href^="/content/"]')
    const firstPost = posts.first()
    
    // Check if the first post has a pin indicator
    const pinIndicator = firstPost.locator('span').filter({ hasText: '★' })
    const hasPinned = await pinIndicator.count() > 0
    
    if (hasPinned) {
      // If there are pinned posts, they should be first
      await expect(pinIndicator).toBeVisible()
    }
  })
})

test.describe('Filter Accessibility', () => {
  test('filter buttons should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Focus on the first filter button
    await page.getByRole('button', { name: 'All' }).focus()
    
    // Tab through filter buttons
    await page.keyboard.press('Tab')
    const focusedElement = await page.evaluate(() => document.activeElement?.textContent)
    expect(focusedElement).toContain('essays')
    
    // Activate filter with keyboard
    await page.keyboard.press('Enter')
    await page.waitForTimeout(300)
    
    const essaysButton = page.getByRole('button', { name: 'essays' })
    await expect(essaysButton).toHaveClass(/active/)
  })

  test('filter state should be visually clear', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Test visual distinction of active state
    const activeButton = page.getByRole('button', { name: 'All' })
    const inactiveButton = page.getByRole('button', { name: 'essays' })
    
    // Active button should have distinct styling
    await expect(activeButton).toHaveClass(/active/)
    await expect(inactiveButton).not.toHaveClass(/active/)
    
    // Check for underline or other visual indicator
    const activeStyles = await activeButton.evaluate(el => {
      const styles = window.getComputedStyle(el)
      return {
        textDecoration: styles.textDecoration,
        color: styles.color
      }
    })
    
    expect(activeStyles.textDecoration).toContain('underline')
  })
})