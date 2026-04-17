import { NextResponse } from "next/server";
import {
  createAsaasCustomer,
  createAsaasPayment,
  getAsaasPixQrCode
} from "@/lib/asaas";
import {
  normalizeCheckoutPayload,
  validateCheckoutPayload
} from "@/lib/checkout-schema";
import { calculateFreight } from "@/lib/freight";

function getProductConfig() {
  const name = process.env.PRODUCT_NAME ?? "Encapsulado DopaWay";
  const priceCents = Number(process.env.PRODUCT_PRICE_CENTS ?? "12990");

  if (!Number.isFinite(priceCents) || priceCents <= 0) {
    throw new Error("PRODUCT_PRICE_CENTS invalido.");
  }

  return { name, priceCents };
}

function getDueDate(daysAhead = 1) {
  const now = new Date();
  now.setDate(now.getDate() + daysAhead);
  return now.toISOString().slice(0, 10);
}

function validateDocument(document: string) {
  return document.length === 11 || document.length === 14;
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
    const billingType = (process.env.ASAAS_BILLING_TYPE ?? "PIX").toUpperCase();

    const customerId = await createAsaasCustomer({
      name: payload.fullName,
      cpfCnpj: payload.cpfCnpj,
      email: payload.email,
      phone: payload.phone,
      postalCode: payload.cep,
      address: payload.street,
      addressNumber: payload.addressNumber,
      complement: payload.complement,
      province: payload.district
    });

    const payment = await createAsaasPayment({
      customer: customerId,
      billingType,
      value: totalValue,
      dueDate: getDueDate(1),
      description: `${product.name} (${payload.quantity}x)`,
      externalReference: `site-${Date.now()}`
    });

    const pixData =
      payment.billingType === "PIX"
        ? await getAsaasPixQrCode(payment.id)
        : null;

    return NextResponse.json(
      {
        payment: {
          paymentId: payment.id,
          status: payment.status,
          billingType: payment.billingType,
          invoiceUrl: payment.invoiceUrl ?? null,
          bankSlipUrl: payment.bankSlipUrl ?? null,
          pixCopyPaste: pixData?.payload ?? null
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
