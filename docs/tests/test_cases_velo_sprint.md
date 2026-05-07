# Casos de Teste - Velô Sprint

Este documento descreve os casos de teste para o sistema Velô Sprint - Configurador de Veículo Elétrico, cobrindo funcionalidades de personalização, checkout, análise de crédito e consulta de pedidos.

---

### CT01 - Navegação e Acesso à Landing Page

#### Objetivo
Validar se o usuário consegue acessar a página inicial e navegar para o configurador com sucesso.

#### Pré-Condições
- Navegador atualizado e conexão com internet.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a URL raiz do sistema. | A Landing Page deve carregar exibindo as especificações do Velô Sprint. |
| 2  | Clicar no botão "Configurar Agora" ou similar. | O usuário deve ser redirecionado para a página `/configure`. |

#### Resultados Esperados
- O sistema deve estar acessível e permitir o início do fluxo de compra.

#### Critérios de Aceitação
- A página inicial carrega em menos de 3 segundos.
- O redirecionamento para o configurador funciona sem erros.

---

### CT02 - Configuração do Veículo e Cálculo de Preço

#### Objetivo
Validar se a seleção de cores, rodas e opcionais atualiza o preço final corretamente conforme as regras de negócio.

#### Pré-Condições
- Estar na página `/configure`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar preço base inicial. | O preço exibido deve ser R$ 40.000. |
| 2  | Selecionar rodas "Sport". | O preço deve ser atualizado para R$ 42.000 (+R$ 2.000). |
| 3  | Marcar o opcional "Precision Park". | O preço deve ser atualizado para R$ 47.500 (+R$ 5.500). |
| 4  | Marcar o opcional "Flux Capacitor". | O preço deve ser atualizado para R$ 52.500 (+R$ 5.000). |
| 5  | Alterar a cor externa para "Midnight Black". | A imagem do veículo deve mudar e o preço deve permanecer o mesmo (cor não tem custo). |
| 6  | Clicar em "Continuar para Pagamento". | O usuário deve ser redirecionado para a página `/order` com os itens salvos. |

#### Resultados Esperados
- O cálculo dinâmico deve refletir a soma exata dos itens selecionados.

#### Critérios de Aceitação
- Preço base fixo em R$ 40.000.
- Soma de opcionais reflete os valores: Sport (+2k), Park (+5.5k), Flux (+5k).

---

### CT03 - Configuração do Veículo (Adição de Opcionais) e Cálculo de Preço

#### Objetivo
Validar se a seleção de opcionais ("Precision Park" e "Flux Capacitor") atualiza dinamicamente o preço do veículo.

#### Pré-Condições
- Estar na página `/configure`.
- Veículo sem opcionais selecionados (Preço: R$ 40.000,00).

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Marcar o checkbox do opcional "Precision Park". | O preço de venda deve ser acrescido de R$ 5.500,00. (Total temporário: R$ 45.500,00) |
| 2  | Marcar o checkbox do opcional "Flux Capacitor". | O preço de venda deve ser acrescido de R$ 5.000,00. (Total temporário: R$ 50.500,00) |
| 3  | Desmarcar o checkbox do opcional | O preço total deve subtrair os valores respectivos e voltar a R$ 40.000,00 |
| 4 | Clicar no botão "Monte o Seu" (Checkout) | O usuário é redirecionado para a página de checkout (`/order`) com os valores persistidos. |

#### Resultados Esperados
- O preço total acompanha de forma exata a marcação e desmarcação dos opcionais.
- O redirecionamento leva a configuração e o preço corretos para o Checkout.

#### Critérios de Aceitação
- O opcional "Precision Park" custa +R$ 5.500 e "Flux Capacitor" custa +R$ 5.000.

---

### CT03A - Validação de Campos Obrigatórios no Checkout

#### Objetivo
Garantir que o sistema impeça a finalização do pedido se dados obrigatórios não forem preenchidos.

#### Pré-Condições
- Estar na página `/order` com uma configuração ativa.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar todos os campos do formulário vazios. | N/A |
| 2  | Clicar em "Confirmar Pedido". | O sistema deve exibir mensagens de erro em todos os campos obrigatórios. |
| 3  | Preencher apenas Nome e CPF. | N/A |
| 4  | Clicar em "Confirmar Pedido". | O sistema deve exibir erro para Email, Telefone, Loja e Termos. |
| 5  | Tentar enviar sem marcar o checkbox de Termos de Uso. | O sistema deve exibir erro específico para o aceite dos termos. |

#### Resultados Esperados
- O pedido não deve ser enviado para o backend enquanto houver erros de validação.

#### Critérios de Aceitação
- Mensagens de erro claras e visíveis para cada campo obrigatório.
- O botão de envio deve ser bloqueado ou o processamento interrompido.

---

### CT04 - Finalização de Pedido com Pagamento à Vista (Fluxo Feliz)

#### Objetivo
Validar o fluxo completo de compra à vista com sucesso.

#### Pré-Condições
- Estar na página `/order`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher todos os dados pessoais corretamente (Nome, Email, CPF, etc). | Campos preenchidos sem erros de formato. |
| 2  | Selecionar uma loja para retirada. | Loja selecionada no dropdown. |
| 3  | Selecionar a forma de pagamento "À Vista". | O valor total deve ser o valor sem juros da configuração. |
| 4  | Marcar o aceite dos Termos de Uso. | Checkbox marcado. |
| 5  | Clicar em "Confirmar Pedido". | O sistema deve processar o pedido e exibir a tela de sucesso. |

#### Resultados Esperados
- O usuário deve ver o número do pedido (VLO-XXXXXX) e o status "APROVADO".

#### Critérios de Aceitação
- Redirecionamento para a página `/success`.
- Exibição do número do pedido para referência futura.

---

### CT05 - Financiamento com Score Alto (Aprovação Automática)

#### Objetivo
Validar a aprovação automática de crédito para clientes com score > 700.

#### Pré-Condições
- Estar na página `/order`.
- Utilizar um CPF de teste configurado para retornar Score > 700.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais e selecionar "Financiamento". | O sistema deve mostrar o cálculo das parcelas (12x com 2% juros). |
| 2  | Clicar em "Confirmar Pedido". | O sistema consulta a API de crédito. |

#### Resultados Esperados
- O pedido deve ser finalizado com status "APROVADO".

#### Critérios de Aceitação
- O valor da parcela deve seguir o cálculo: `(Total / 12) * 1.02`.
- Status final exibido como aprovado.

---

### CT06 - Financiamento com Score Médio (Encaminhamento para Análise)

#### Objetivo
Validar o status de "Em Análise" para clientes com score entre 501 e 700.

#### Pré-Condições
- Estar na página `/order`.
- Utilizar CPF de teste com Score entre 501 e 700.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados e selecionar "Financiamento". | N/A |
| 2  | Clicar em "Confirmar Pedido". | Processamento do crédito. |

#### Resultados Esperados
- O pedido deve ser finalizado com status "EM ANÁLISE".

#### Critérios de Aceitação
- Mensagem informando que a equipe entrará em contato ou que o pedido aguarda revisão.

---

### CT07 - Financiamento com Score Baixo (Reprovação)

#### Objetivo
Validar a reprovação de crédito para score <= 500.

#### Pré-Condições
- Estar na página `/order`.
- Utilizar CPF de teste com Score <= 500.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados e selecionar "Financiamento" com entrada baixa (ex: R$ 0). | N/A |
| 2  | Clicar em "Confirmar Pedido". | Processamento do crédito. |

#### Resultados Esperados
- O pedido deve ser finalizado com status "REPROVADO".

#### Critérios de Aceitação
- Mensagem clara indicando a impossibilidade do financiamento nestas condições.

---

### CT08 - Regra de Exceção: Aprovação por Entrada >= 50%

#### Objetivo
Validar se o pedido é aprovado mesmo com score baixo, desde que a entrada seja >= 50%.

#### Pré-Condições
- Estar na página `/order`.
- Utilizar CPF de teste com Score <= 500.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar "Financiamento". | N/A |
| 2  | Inserir um valor de entrada que seja exatamente 50% do valor total configurado. | N/A |
| 3  | Clicar em "Confirmar Pedido". | O sistema deve priorizar a regra da entrada sobre a regra do score. |

#### Resultados Esperados
- O pedido deve ser finalizado com status "APROVADO".

#### Critérios de Aceitação
- A regra de negócio de entrada alta deve anular a reprovação por score baixo.

---

### CT09 - Consulta de Pedido por Número de Referência

#### Objetivo
Validar se o usuário consegue consultar o status de um pedido já realizado.

#### Pré-Condições
- Possuir um número de pedido válido (ex: VLO-123456).
- Estar na página `/lookup`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir o número do pedido no campo de busca. | N/A |
| 2  | Clicar no botão de busca. | O sistema deve exibir os detalhes do pedido (Cor, Rodas, Status, Valor). |

#### Resultados Esperados
- Os dados exibidos devem ser idênticos aos preenchidos no momento da compra.

#### Critérios de Aceitação
- O sistema deve carregar as informações do banco de dados sem erros.

---

### CT10 - Consulta de Pedido com Número Inválido

#### Objetivo
Validar o comportamento do sistema ao buscar um pedido inexistente ou com formato errado.

#### Pré-Condições
- Estar na página `/lookup`.

#### Passos

| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Inserir um número aleatório (ex: "ABCD-000"). | N/A |
| 2  | Clicar no botão de busca. | O sistema deve exibir uma mensagem informando que o pedido não foi encontrado. |

#### Resultados Esperados
- O sistema não deve quebrar ou exibir dados de outros pedidos.

#### Critérios de Aceitação
- Exibição de mensagem de "Pedido não encontrado" ou "Formato inválido".
