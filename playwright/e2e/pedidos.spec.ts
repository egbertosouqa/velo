import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers'

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

    const order = {
      number: 'VLO-AGJAZC',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fernando Papito',
        email: 'papito@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();

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

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  });

  test('deve consultar um pedido reprovado', async ({ page }) => {
    // Teste Data

    //const order = 'VLO-SMJO5I'

    const order = {
      number: 'VLO-SMJO5I',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();

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

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  });
  
  test('deve consultar um pedido em analise', async ({ page }) => {
    // Teste Data

    const order = {
      number: 'VLO-FXSJL2',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act
    await page.getByTestId('search-order-id').fill(order.number);
    await page.getByTestId('search-order-button').click();

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

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - img
      - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);
  });

  test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
    // Teste Data

    const order = generateOrderCode()


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
})

