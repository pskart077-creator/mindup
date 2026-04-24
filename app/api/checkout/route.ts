import { NextResponse } from "next/server";
import {
  normalizeCheckoutPayload,
  validateCheckoutPayload
} from "@/lib/checkout-schema";
import { calculateFreight } from "@/lib/freight";
import {
  createVexusPixTransaction,
  getVexusWebhookUrl
} from "@/lib/vexuspay";

function getProductConfig() {
  const name = process.env.PRODUCT_NAME ?? "Encapsulado MindUp";
  const priceCents = Number(process.env.PRODUCT_PRICE_CENTS ?? "5790");

  if (!Number.isFinite(priceCents) || priceCents <= 0) {
    throw new Error("PRODUCT_PRICE_CENTS invalido.");
  }

  return { name, priceCents };
}

function validateDocument(document: string) {
  return document.length === 11 || document.length === 14;
}

function createTransactionId() {
  return `mindup-${Date.now()}-${globalThis.crypto.randomUUID()}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsedPayload = validateCheckoutPayload(body);

    if (!parsedPayload.success) {
      return NextResponse.json(
        { error: "Dados invalidos para checkout." },
        { status: 400 }
      );
    }

    const payload = normalizeCheckoutPayload(parsedPayload.data);

    if (!validateDocument(payload.cpfCnpj)) {
      return NextResponse.json(
        { error: "CPF/CNPJ invalido. Use 11 ou 14 digitos." },
        { status: 400 }
      );
    }

    const product = getProductConfig();
    const freightData = await calculateFreight({
      cep: payload.cep,
      quantity: payload.quantity
    });
    const freightOption = freightData.options.find(
      (option) => option.id === payload.freightOptionId
    );

    if (!freightOption) {
      return NextResponse.json(
        { error: "Opcao de frete nao encontrada." },
        { status: 400 }
      );
    }

    const productTotalCents = payload.quantity * product.priceCents;
    const totalCents = productTotalCents + freightOption.priceCents;
    const totalValue = Number((totalCents / 100).toFixed(2));

    const transaction = await createVexusPixTransaction({
      amount: totalValue,
      payerName: payload.fullName,
      payerDocument: payload.cpfCnpj,
      payerEmail: payload.email,
      transactionId: createTransactionId(),
      description: `${product.name} (${payload.quantity}x)`,
      projectWebhook: getVexusWebhookUrl(request.url)
    });

    return NextResponse.json(
      {
        payment: {
          paymentId: transaction.transactionId,
          status: transaction.status,
          billingType: "PIX",
          invoiceUrl: null,
          bankSlipUrl: null,
          pixCopyPaste: transaction.qrcode,
          pixQrCodeImage: transaction.qrcodeImage
        },
        totals: {
          productCents: productTotalCents,
          freightCents: freightOption.priceCents,
          totalCents
        }
      },
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado no checkout.";
    const isClientError =
      /cpf|cnpj|cep|invalido|nao encontrada|dados invalidos/i.test(message);

    return NextResponse.json({ error: message }, { status: isClientError ? 400 : 500 });
  }
}
