export const CHECKOUT_PAYMENT_STORAGE_KEY = "mindup.checkout.payment";

export type CheckoutPaymentResult = {
  paymentId: string;
  status: string;
  billingType: string;
  invoiceUrl?: string | null;
  bankSlipUrl?: string | null;
  pixCopyPaste?: string | null;
  pixQrCodeImage?: string | null;
};

export type CheckoutPaymentTotals = {
  productCents: number;
  freightCents: number;
  totalCents: number;
};

export type CheckoutPaymentPayload = {
  payment: CheckoutPaymentResult;
  totals: CheckoutPaymentTotals;
  productName: string;
  quantity: number;
  customerName: string;
  createdAt: string;
};
