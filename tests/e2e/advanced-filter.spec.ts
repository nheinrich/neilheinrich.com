import { test, expect } from '@playwright/test'

test.describe('Advanced Filter System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display advanced filter button', async ({ page }) => {
    // Check that the Filter button is visible
    await expect(page.getByRole('button', { name: /Filter/ })).toBeVisible()
  })

  test('should open filter overlay when clicked', async ({ page }) => {
    // Click the Filter button
    await page.getByRole('button', { name: /Filter/ }).click()
    
    // Filter overlay should be visible
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    await expect(page.getByText('Filter Fieldnotes')).toBeVisible()
    
    // Should show Collections and Topics sections
    await expect(page.getByText('Collections')).toBeVisible()
    await expect(page.getByText('Topics')).toBeVisible()
  })

  test('should close filter overlay with close button', async ({ page }) => {
    // Open filter overlay
    await page.getByRole('button', { name: /Filter/ }).click()
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    
    // Close with close button
    await page.locator('button[aria-label="Close filter"]').click()
    
    // Overlay should be hidden
    await expect(page.locator('[role="dialog"]')).not.toBeVisible()
  })

  test('should close filter overlay with ESC key', async ({ page }) => {
    // Open filter overlay
    await page.getByRole('button', { name: /Filter/ }).click()
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    
    // Close with ESC key
    await page.keyboard.press('Escape')
    
    // Overlay should be hidden
    await expect(page.locator('[role="dialog"]')).not.toBeVisible()
  })

  test('should filter by collection', async ({ page }) => {
    // Open filter overlay
    await page.getByRole('button', { name: /Filter/ }).click()
    
    // Select a collection (e.g., "Mabel")
    await page.getByRole('button', { name: 'Mabel' }).click()
    
    // Close overlay
    await page.locator('button[aria-label="Close filter"]').click()
    
    // URL should contain filter parameter
    await expect(page).toHaveURL(/collections=mabel/)
    
    // Filter button should show active state
    await expect(page.getByRole('button', { name: /filter/ })).toContainText('1 filter')
  })

  test('should filter by topic', async ({ page }) => {
    // Open filter overlay
    await page.getByRole('button', { name: /Filter/ }).click()
    
    // Select a topic (e.g., "AI")
    await page.getByRole('button', { name: 'AI' }).click()
    
    // Close overlay
    await page.locator('button[aria-label="Close filter"]').click()
    
    // URL should contain filter parameter
    await expect(page).toHaveURL(/topics=ai/)
    
    // Filter button should show active state
    await expect(page.getByRole('button', { name: /filter/ })).toContainText('1 filter')
  })

  test('should filter by multiple collections and topics', async ({ page }) => {
    // Open filter overlay
    await page.getByRole('button', { name: /Filter/ }).click()
    
    // Select multiple collections
    await page.getByRole('button', { name: 'Mabel' }).click()
    await page.getByRole('button', { name: 'Teams' }).click()
    
    // Select multiple topics
    await page.getByRole('button', { name: 'AI' }).click()
    await page.getByRole('button', { name: 'Design' }).click()
    
    // Close overlay
    await page.locator('button[aria-label="Close filter"]').click()
    
    // URL should contain multiple filter parameters
    await expect(page).toHaveURL(/collections=.*mabel.*teams|teams.*mabel/)
    await expect(page).toHaveURL(/topics=.*ai.*design|design.*ai/)
    
    // Filter button should show multiple filters
    await expect(page.getByRole('button', { name: /filter/ })).toContainText('4 filters')
  })

  test('should clear all filters', async ({ page }) => {
    // Open filter overlay and select some filters
    await page.getByRole('button', { name: /Filter/ }).click()
    await page.getByRole('button', { name: 'Mabel' }).click()
    await page.getByRole('button', { name: 'AI' }).click()
    
    // Clear all filters
    await page.getByRole('button', { name: 'Clear all filters' }).click()
    
    // Close overlay
    await page.locator('button[aria-label="Close filter"]').click()
    
    // URL should be clean
    await expect(page).toHaveURL('/')
    
    // Filter button should show default text
    await expect(page.getByRole('button', { name: /Filter/ })).toContainText('Filter')
  })

  test('should combine with format filters', async ({ page }) => {
    // Select a format filter first
    await page.getByRole('button', { name: 'essays' }).click()
    
    // Open advanced filter and select collection
    await page.getByRole('button', { name: /Filter/ }).click()
    await page.getByRole('button', { name: 'Mabel' }).click()
    await page.locator('button[aria-label="Close filter"]').click()
    
    // URL should contain both format and collection
    await expect(page).toHaveURL(/format=essay/)
    await expect(page).toHaveURL(/collections=mabel/)
    
    // Both filters should be active
    await expect(page.getByRole('button', { name: 'essays' })).toHaveClass(/active/)
    await expect(page.getByRole('button', { name: /filter/ })).toContainText('1 filter')
  })
})

test.describe('Advanced Filter Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // Focus and open filter with keyboard
    await page.getByRole('button', { name: /Filter/ }).focus()
    await page.keyboard.press('Enter')
    
    // Should open overlay
    await expect(page.locator('[role="dialog"]')).toBeVisible()
    
    // Tab through filter options
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // Skip close button
    
    // Should be able to select with Enter/Space
    await page.keyboard.press('Enter')
    
    // Close with ESC
    await page.keyboard.press('Escape')
    await expect(page.locator('[role="dialog"]')).not.toBeVisible()
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/')
    
    // Check filter button attributes
    const filterButton = page.getByRole('button', { name: /Filter/ })
    await expect(filterButton).toHaveAttribute('aria-expanded', 'false')
    
    // Open overlay
    await filterButton.click()
    await expect(filterButton).toHaveAttribute('aria-expanded', 'true')
    
    // Check dialog attributes
    const dialog = page.locator('[role="dialog"]')
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog).toHaveAttribute('aria-labelledby')
  })
})