# Site MindUp

Landing page em Next.js para venda de produto encapsulado com:

- Landing page modular (secoes separadas por componente)
- Checkout em pagina dedicada (`/checkout`)
- Calculo de frete por CEP
- Criacao de cobranca PIX na VexusPay via API

## 1) Configurar ambiente

Copie o exemplo e preencha com seus dados:

```bash
cp .env.example .env.local
```

Variaveis principais:

- `VEXUSPAY_CLIENT_ID`: client id da VexusPay
- `VEXUSPAY_CLIENT_SECRET`: client secret da VexusPay
- `VEXUSPAY_API_URL`: `https://api.vexuspay.com`
- `VEXUSPAY_WEBHOOK_URL`: URL publica HTTPS para receber status da transacao. Nao use `localhost`.
- `SITE_URL`: dominio publico do site, usado como fallback para montar o webhook
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
5. Sistema cria a transacao PIX na VexusPay.
6. Frontend exibe o PIX copia-e-cola retornado pela VexusPay.
