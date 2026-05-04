import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers'

import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage';

// AAA - Arrange, Act, Assert 

test.describe("Consulta de Pedido", () => {

  test.beforeAll(async () => {
    console.log('beforeAll: roda uma vez antes de todos os testes.')
  })

  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: roda antes de cada teste.')

    // Arrange
    await page.goto('http://localhost:5173/');
    // checkpoint
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    // checkpoint
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })

  test.afterEach(async () => {
    console.log('afterEach: roda depois de cada teste.')
  })

  test.afterAll(async () => {
    console.log('afterAll: roda uma vez depois de todos os testes.')
  })


  test('deve consultar um pedido aprovado', async ({ page }) => {
    // Teste Data

    //const order = VLO-AGJAZC

    const order: OrderDetails = {
      number: 'VLO-AGJAZC',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fernando Papito',
        email: 'papito@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-AGJAZC"]');
    // await expect(orderCode).toBeVisible();

    // comentado para usar snapshoot
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerPedido).toContainText(order, { timeout: 10_000 });


    // const containerAprovado = page.getByText('APROVADO')
    //   .filter({ hasText: /^APROVADO$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerAprovado).toBeVisible();

    await orderLockupPage.validateOrderDetails(order)
    // await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    //   - img
    //   - paragraph: Pedido
    //   - paragraph: ${order.number}
    //   - status:
    //     - img
    //     - text: ${order.status}
    //   - img "Velô Sprint"
    //   - paragraph: Modelo
    //   - paragraph: Velô Sprint
    //   - paragraph: Cor
    //   - paragraph: ${order.color}
    //   - paragraph: Interior
    //   - paragraph: cream
    //   - paragraph: Rodas
    //   - paragraph: ${order.wheels}
    //   - heading "Dados do Cliente" [level=4]
    //   - paragraph: Nome
    //   - paragraph: ${order.customer.name}
    //   - paragraph: Email
    //   - paragraph: ${order.customer.email}
    //   - paragraph: Loja de Retirada
    //   - paragraph
    //   - paragraph: Data do Pedido
    //   - paragraph: /\\d+\\/\\d+\\/\\d+/
    //   - heading "Pagamento" [level=4]
    //   - paragraph: ${order.payment}
    //   - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    //   `);

    // const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    // await expect(statusBadge).toHaveClass(/bg-green-100/)
    // await expect(statusBadge).toHaveClass(/text-green-700/)

    // const statusIcon = statusBadge.locator('svg')
    // await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)

    //await expect(statusBadge).toContainClass('bg-amber-100')

    // validacao da badge
    await orderLockupPage.validateStatusBadge(order.status)
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {
    // Teste Data

    //const order = 'VLO-SMJO5I'

    const order: OrderDetails = {
      number: 'VLO-SMJO5I',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-AGJAZC"]');
    // await expect(orderCode).toBeVisible();

    // comentado para usar snapshoot
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerPedido).toContainText(order, { timeout: 10_000 });


    // const containerAprovado = page.getByText('APROVADO')
    //   .filter({ hasText: /^APROVADO$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerAprovado).toBeVisible();

    await orderLockupPage.validateOrderDetails(order)

    // const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    // await expect(statusBadge).toHaveClass(/bg-red-100/)
    // await expect(statusBadge).toHaveClass(/text-red-700/)

    // const statusIcon = statusBadge.locator('svg')
    // await expect(statusIcon).toHaveClass(/lucide-circle-x/)

    await orderLockupPage.validateStatusBadge(order.status)
  });

  test('deve consultar um pedido em analise', async ({ page }) => {
    // Teste Data

    const order: OrderDetails = {
      number: 'VLO-FXSJL2',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text()="VLO-AGJAZC"]');
    // await expect(orderCode).toBeVisible();

    // comentado para usar snapshoot
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerPedido).toContainText(order, { timeout: 10_000 });


    // const containerAprovado = page.getByText('APROVADO')
    //   .filter({ hasText: /^APROVADO$/ })
    //   .locator('..') // sobe para o elemento pai (a div que agrupa ambos)

    // await expect(containerAprovado).toBeVisible();

    await orderLockupPage.validateOrderDetails(order)
    // const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    // await expect(statusBadge).toHaveClass(/bg-amber-100/)
    // await expect(statusBadge).toHaveClass(/text-amber-700/)

    // const statusIcon = statusBadge.locator('svg')
    // await expect(statusIcon).toHaveClass(/lucide-clock/)

    await orderLockupPage.validateStatusBadge(order.status)

  });

  test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
    // Teste Data

    const order = generateOrderCode()


    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)


    //Assert

    // const title = page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 })
    // await expect(title).toBeVisible()

    // const msg = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
    // await expect(msg).toBeVisible()

    await orderLockupPage.validateOrderNotFound()

  })

  test('deve exibir mensagem de erro quando o codigo do pedido esta fora do padrão', async ({ page }) => {
    // Teste Data

    const order = "XYZ-999-INVALIDO"


    // Act
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)


    //Assert

    await orderLockupPage.validateOrderNotFound()

  })
})

