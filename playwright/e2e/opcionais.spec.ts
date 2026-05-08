import { test, expect } from '../support/fixtures';

test.describe('Configuração do Veículo - Opcionais', () => {

  test.beforeEach(async ({ app }) => {
    await app.configurator.open()
  })

  test('deve atualizar o preço dinamicamente ao adicionar e remover opcionais (CT03)', async ({ app, page }) => {
    // CT03 - Validação do estado inicial: Preço base R$ 40.000,00
    await app.configurator.validatePrice('R$ 40.000,00');
    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')

    // CT03 - Passo 1: Marcar o checkbox do opcional "Precision Park"
    // O preço deve ser acrescido de R$ 5.500,00 (Total: R$ 45.500,00)
    await app.configurator.toggleOptional('Precision Park');
    await app.configurator.validatePrice('R$ 45.500,00');
    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')

    // CT03 - Passo 2: Marcar o checkbox do opcional "Flux Capacitor"
    // O preço deve ser acrescido de R$ 5.000,00 (Total: R$ 50.500,00)
    await app.configurator.toggleOptional('Flux Capacitor');
    await app.configurator.validatePrice('R$ 50.500,00');
    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')

    // CT03 - Passo 3: Desmarcar os opcionais para voltar ao preço base
    // Desmarcando Precision Park
    await app.configurator.toggleOptional('Precision Park');
    await app.configurator.validatePrice('R$ 45.000,00');
    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')

    // Desmarcando Flux Capacitor
    await app.configurator.toggleOptional('Flux Capacitor');
    await app.configurator.validatePrice('R$ 40.000,00');
    await app.configurator.validateCarImage('/src/assets/glacier-blue-aero-wheels.png')

    // CT03 - Passo 4: Clicar no botão "Monte o Seu" (Checkout)
    await app.configurator.submit();

    // Validação: Redirecionamento para a página de checkout (/order) com os valores persistidos
    await expect(page).toHaveURL(/\/order/);

    // No checkout, validamos o total no resumo
    await app.checkout.validateTotal('R$ 40.000,00');
  });
});
