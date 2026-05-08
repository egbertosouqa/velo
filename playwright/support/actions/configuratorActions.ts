import { Page, expect } from '@playwright/test'

export function createConfiguratorActions(page: Page) {
  return {
    async open() {
      await page.goto('/configure')
      await page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
      await page.reload()
    },

    async selectColor(colorName: string | RegExp) {
      await page.getByRole('button', { name: colorName }).click()
    },

    async selectWheels(wheelName: string | RegExp) {
      await page.getByRole('button', { name: wheelName }).click()
    },

    async validatePrice(expectedPrice: string) {
      const priceElement = page.getByTestId('total-price')
      await expect(priceElement).toBeVisible()
      await expect(priceElement).toHaveText(expectedPrice)
    },

    async validateCarImage(expectedSrc: string) {
      const carImage = page.locator('img[alt^="Velô Sprint"]')

      await expect(carImage).toHaveAttribute('src', expectedSrc)
    },

    async toggleOptional(optionalName: string) {
      await page.locator('text=' + optionalName).click()
    },

    async submit() {
      await page.getByRole('button', { name: 'Monte o Seu' }).click()
    }
  }
}
