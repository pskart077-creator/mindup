export type ProductConfig = {
  name: string;
  priceCents: number;
};

const DEFAULT_PRODUCT_NAME = "DopaWay";
const DEFAULT_PRODUCT_PRICE_CENTS = 12990;

export function getProductConfig(): ProductConfig {
  const name = process.env.PRODUCT_NAME?.trim() || DEFAULT_PRODUCT_NAME;
  const rawPrice = Number(
    process.env.PRODUCT_PRICE_CENTS ?? DEFAULT_PRODUCT_PRICE_CENTS
  );

  return {
    name,
    priceCents:
      Number.isFinite(rawPrice) && rawPrice > 0
        ? rawPrice
        : DEFAULT_PRODUCT_PRICE_CENTS,
  };
}

export function formatCurrency(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}