import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert 

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Teste Data

  const order = 'VLO-AGJAZC'

  // Arrange
  await page.goto('http://localhost:5173/');
  // checkpoint
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  // checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');


  // Act
  await page.getByTestId('search-order-id').fill(order);
  await page.getByTestId('search-order-button').click();

  // Assert

  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-AGJAZC"]');
  // await expect(orderCode).toBeVisible();

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

  await expect(containerPedido).toContainText(order, { timeout: 10_000 });


  const containerAprovado = page.getByText('APROVADO')
    .filter({ hasText: /^APROVADO$/ })
    .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

  await expect(containerAprovado).toBeVisible();


});

test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
  // Teste Data

  const order = 'VLO-AGJAZ2'

  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByTestId('search-order-id').fill(order);
  await page.getByTestId('search-order-button').click();


  //Assert

  // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 })
  // await expect(title).toBeVisible()

  // const msg = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
  // await expect(msg).toBeVisible()

  const hMensagem = 'Pedido não encontrado'
  const pMensagem = 'Verifique o número do pedido e tente novamente'

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "${hMensagem}" [level=3]
    - paragraph: ${pMensagem}
    `);

})