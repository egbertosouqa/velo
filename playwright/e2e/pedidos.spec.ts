import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert 

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  // checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  // checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');


  // Act
  await page.getByTestId('search-order-id').fill('VLO-AGJAZC');
  await page.getByTestId('search-order-button').click();

  // Assert

  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-AGJAZC"]');
  // await expect(orderCode).toBeVisible();

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

  await expect(containerPedido).toContainText('VLO-AGJAZC', { timeout: 10_000 });


  const containerAprovado = page.getByText('APROVADO')
  .filter({ hasText: /^APROVADO$/ })
  .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

  await expect(containerAprovado).toBeVisible();
  

});