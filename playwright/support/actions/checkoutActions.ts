import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  return {
    async validateTotal(expectedTotal: string) {
      const totalLocator = page.getByTestId('summary-total-price')
      await expect(totalLocator).toBeVisible()
      await expect(totalLocator).toHaveText(expectedTotal)
    }
  }
}
