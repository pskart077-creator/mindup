type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

type AsaasCustomerInput = {
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement?: string;
  province: string;
};

type AsaasPaymentInput = {
  customer: string;
  billingType: string;
  value: number;
  dueDate: string;
  description: string;
  externalReference: string;
};

export type AsaasPayment = {
  id: string;
  status: string;
  billingType: string;
  value: number;
  invoiceUrl?: string | null;
  bankSlipUrl?: string | null;
};

type AsaasPixQrCode = {
  encodedImage?: string;
  payload?: string;
};

function getAsaasEnv() {
  const apiKey = process.env.ASAAS_API_KEY;
  const apiUrl = process.env.ASAAS_API_URL ?? "https://api-sandbox.asaas.com";

  if (!apiKey) {
    throw new Error("Configure a variavel ASAAS_API_KEY no ambiente.");
  }

  return { apiKey, apiUrl };
}

async function asaasRequest<T>(path: string, options: RequestOptions = {}) {
  const { apiKey, apiUrl } = getAsaasEnv();
  const response = await fetch(`${apiUrl}${path}`, {
    method: options.method ?? "POST",
    headers: {
      "Content-Type": "application/json",
      access_token: apiKey
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  const data = (await response.json()) as {
    errors?: Array<{ description?: string }>;
    message?: string;
  } & T;

  if (!response.ok) {
    const errorMessage =
      data.errors?.[0]?.description ??
      data.message ??
      "Falha ao comunicar com a API da Asaas.";
    throw new Error(errorMessage);
  }

  return data;
}

export async function createAsaasCustomer(input: AsaasCustomerInput) {
  const customer = await asaasRequest<{ id: string }>("/v3/customers", {
    method: "POST",
    body: input
  });

  return customer.id;
}

export async function createAsaasPayment(input: AsaasPaymentInput) {
  return asaasRequest<AsaasPayment>("/v3/payments", {
    method: "POST",
    body: input
  });
}

export async function getAsaasPixQrCode(paymentId: string) {
  try {
    return await asaasRequest<AsaasPixQrCode>(`/v3/payments/${paymentId}/pixQrCode`, {
      method: "GET"
    });
  } catch {
    return null;
  }
}
