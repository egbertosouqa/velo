import { test, expect } from '../support/fixtures'

test.describe('CT02 - Configuração do veículo e cálculo de preço', () => {
  test('deve atualizar preço e levar os itens para o checkout', async ({ page }) => {
    await page.goto('/configure')

    // Garante isolamento do teste limpando estado persistido.
    await page.evaluate(() => {
      localStorage.clear()
      sessionStorage.clear()
    })
    await page.goto('/configure')

    // Checkpoint 1: preço base inicial
    await expect(page.getByText('Preço de Venda')).toBeVisible()
    await expect(page.getByText('R$ 40.000,00')).toBeVisible()

    // Checkpoint 2: rodas Sport (+R$ 2.000)
    await page.getByRole('button', { name: /Sport Wheels/i }).click()
    await expect(page.getByText('R$ 42.000,00')).toBeVisible()

    // Checkpoint 3: Precision Park (+R$ 5.500)
    await page.getByRole('checkbox', { name: /Precision Park/i }).click()
    await expect(page.getByText('R$ 47.500,00')).toBeVisible()

    // Checkpoint 4: Flux Capacitor (+R$ 5.000)
    await page.getByRole('checkbox', { name: /Flux Capacitor/i }).click()
    await expect(page.getByText('R$ 52.500,00')).toBeVisible()

    // Checkpoint 5: troca de cor não altera preço
    await page.getByRole('button', { name: /Midnight Black/i }).click()
    await expect(
      page.getByRole('img', { name: /midnight-black with sport wheels/i })
    ).toBeVisible()
    await expect(page.getByText('R$ 52.500,00')).toBeVisible()

    // Checkpoint 6: continuar para pagamento e validar resumo em /order
    await page.getByRole('button', { name: 'Monte o Seu' }).click()
    await expect(page).toHaveURL(/\/order$/)

    const summarySection = page.getByRole('heading', { name: 'Resumo' }).locator('..')
    await expect(page.getByRole('heading', { name: 'Resumo' })).toBeVisible()
    await expect(page.getByText('Midnight Black')).toBeVisible()
    await expect(page.getByText('sport Wheels')).toBeVisible()
    await expect(page.getByText('Precision Park')).toBeVisible()
    await expect(page.getByText('Flux Capacitor')).toBeVisible()
    await expect(summarySection.getByText('R$ 52.500,00')).toBeVisible()
  })
})
