import { test, expect } from '../support/fixtures'
import { generateOrderCode } from '../support/helpers'

import type { OrderDetails } from '../support/types/order'

import { insertOrder, deleteOrderByNumber } from '../support/database/orderRepository'
import crypto from 'crypto'

// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    console.log('beforeEach: roda antes de cada teste.')
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {
    //const code = generateOrderCode()
    const order: OrderDetails = {
      number: 'VLO-SE4R01',
      status: 'APROVADO' as const,
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fernando Papito',
        email: 'papito@velo.dev',
      },
      payment: 'À Vista',
    }

    await deleteOrderByNumber(order.number)

    await insertOrder({
      id: crypto.randomUUID(),
      order_number: order.number,
      color: 'glacier-blue',
      wheel_type: 'aero',
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: '(11) 99999-9999',
      customer_cpf: '780.228.290-05',
      payment_method: 'avista',
      total_price: '40000',
      status: order.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: [],
    })

    await app.orderLookup.searchOrder(order.number)

    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {
    //const code = generateOrderCode()
    const order: OrderDetails = {
      number: 'VLO-SE4R02',
      status: 'REPROVADO' as const,
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista',
    }

    await deleteOrderByNumber(order.number)

    await insertOrder({
      id: crypto.randomUUID(),
      order_number: order.number,
      color: 'midnight-black',
      wheel_type: 'sport',
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: '(11) 99999-9999',
      customer_cpf: '780.228.290-05',
      payment_method: 'avista',
      total_price: '40000',
      status: order.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: [],
    })

    await app.orderLookup.searchOrder(order.number)

    await app.orderLookup.validateOrderDetails(order)

    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {
    //const code = generateOrderCode()
    const order: OrderDetails = {
      number: 'VLO-SE4R03',
      status: 'EM_ANALISE' as const,
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev',
      },
      payment: 'À Vista',
    }

    await deleteOrderByNumber(order.number)

    await insertOrder({
      id: crypto.randomUUID(),
      order_number: order.number,
      color: 'lunar-white',
      wheel_type: 'aero',
      customer_name: order.customer.name,
      customer_email: order.customer.email,
      customer_phone: '(11) 99999-9999',
      customer_cpf: '780.228.290-05',
      payment_method: 'avista',
      total_price: '40000',
      status: order.status,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      optionals: [],
    })

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
