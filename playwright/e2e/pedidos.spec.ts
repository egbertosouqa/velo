import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'

import type { OrderDetails } from '../support/types/order'

// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {
  test.beforeAll(async () => {
    console.log('beforeAll: roda uma vez antes de todos os testes.')
  })

  test.beforeEach(async ({ app }) => {
    console.log('beforeEach: roda antes de cada teste.')
    await app.orderLookup.open()
  })

  test.afterEach(async () => {
    console.log('afterEach: roda depois de cada teste.')
  })

  test.afterAll(async () => {
    console.log('afterAll: roda uma vez depois de todos os testes.')
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-AGJAZC',
      status: 'APROVADO' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fernando Papito',
        email: 'papito@velo.dev',
      },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)

    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-SMJO5I',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)

    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    const order: OrderDetails = {
      number: 'VLO-FXSJL2',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista',
    }

    await app.orderLookup.searchOrder(order.number)

    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({
    app,
  }) => {
    const order = generateOrderCode()

    await app.orderLookup.searchOrder(order)

    await app.orderLookup.validateOrderNotFound()
  })

  test('deve exibir mensagem de erro quando o codigo do pedido esta fora do padrão', async ({
    app,
  }) => {
    const order = 'XYZ-999-INVALIDO'

    await app.orderLookup.searchOrder(order)

    await app.orderLookup.validateOrderNotFound()
  })

  test('deve manter o botão desabilitado com campo vazio ou apenas espaços', async ({ app, page }) => {

    const button = app.orderLookup.elements.searchButton
    await expect(button).toBeDisabled()

    await app.orderLookup.elements.orderInput.fill('        ')
    await expect(button).toBeDisabled()

  })
})
