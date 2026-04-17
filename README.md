# Site DopaWay

Landing page em Next.js para venda de produto encapsulado com:

- Landing page modular (secoes separadas por componente)
- Checkout em pagina dedicada (`/checkout`)
- Calculo de frete por CEP
- Criacao de cobranca na Asaas via API

## 1) Configurar ambiente

Copie o exemplo e preencha com seus dados:

```bash
cp .env.example .env.local
```

Variaveis principais:

- `ASAAS_API_KEY`: chave da API Asaas
- `ASAAS_API_URL`: `https://api-sandbox.asaas.com` (teste) ou producao
- `ASAAS_BILLING_TYPE`: `PIX`, `BOLETO` ou `CREDIT_CARD`
- `PRODUCT_NAME`: nome do produto
- `PRODUCT_PRICE_CENTS`: preco unitario em centavos

## 2) Instalar dependencias

```bash
npm install
```

## 3) Rodar local

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Fluxo de checkout

1. Cliente navega na landing (`/`) e escolhe um kit.
2. Pagamento acontece na pagina dedicada (`/checkout`).
3. API `/api/freight` calcula opcoes de envio por CEP.
4. API `/api/checkout` valida e recalcula frete no servidor.
5. Sistema cria cliente e pagamento na Asaas.
6. Frontend exibe link de pagamento/PIX.
