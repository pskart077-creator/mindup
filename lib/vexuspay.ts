import QRCode from "qrcode";

type VexusPixTransactionInput = {
  amount: number;
  payerName: string;
  payerDocument: string;
  transactionId: string;
  projectWebhook: string;
  description?: string;
  payerEmail?: string;
};

type VexusPixTransactionResponse = {
  message?: string;
  qrCodeResponse?: {
    transactionId?: string;
    status?: string;
    qrcode?: string;
    amount?: number;
  };
  error?: string;
  messageError?: string;
};

const VEXUS_WEBHOOK_PATH = "/api/webhooks/vexuspay";

export type VexusPixTransaction = {
  transactionId: string;
  status: string;
  qrcode: string;
  qrcodeImage: string;
  amount: number;
};

function getVexusEnv() {
  const clientId = process.env.VEXUSPAY_CLIENT_ID?.trim();
  const clientSecret = process.env.VEXUSPAY_CLIENT_SECRET?.trim();
  const apiUrl =
    process.env.VEXUSPAY_API_URL?.trim() ?? "https://api.vexuspay.com";
  const webhookUrl = process.env.VEXUSPAY_WEBHOOK_URL?.trim();

  if (!clientId) {
    throw new Error("Configure a variavel VEXUSPAY_CLIENT_ID no ambiente.");
  }

  if (!clientSecret) {
    throw new Error("Configure a variavel VEXUSPAY_CLIENT_SECRET no ambiente.");
  }

  return { apiUrl, clientId, clientSecret, webhookUrl };
}

function isPublicHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return (
      url.protocol === "https:" &&
      hostname !== "localhost" &&
      hostname !== "127.0.0.1" &&
      hostname !== "::1" &&
      !hostname.endsWith(".local") &&
      hostname.includes(".")
    );
  } catch {
    return false;
  }
}

function createWebhookUrlFromBaseUrl(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.startsWith("http")
    ? baseUrl
    : `https://${baseUrl}`;

  return new URL(VEXUS_WEBHOOK_PATH, normalizedBaseUrl).toString();
}

async function readVexusResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {} as VexusPixTransactionResponse;
  }

  try {
    return JSON.parse(text) as VexusPixTransactionResponse;
  } catch {
    return { error: text };
  }
}

export function getVexusWebhookUrl(requestUrl?: string) {
  const { webhookUrl } = getVexusEnv();

  if (webhookUrl && isPublicHttpsUrl(webhookUrl)) {
    return webhookUrl;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    process.env.SITE_URL?.trim() ??
    process.env.VERCEL_URL?.trim();

  if (siteUrl) {
    const candidateUrl = createWebhookUrlFromBaseUrl(siteUrl);

    if (isPublicHttpsUrl(candidateUrl)) {
      return candidateUrl;
    }
  }

  if (requestUrl) {
    const candidateUrl = createWebhookUrlFromBaseUrl(new URL(requestUrl).origin);

    if (isPublicHttpsUrl(candidateUrl)) {
      return candidateUrl;
    }
  }

  throw new Error(
    "Configure uma URL publica HTTPS em VEXUSPAY_WEBHOOK_URL. A VexusPay nao aceita localhost como callback."
  );
}

export async function createVexusPixTransaction(
  input: VexusPixTransactionInput
) {
  const { apiUrl, clientId, clientSecret } = getVexusEnv();
  const body = {
    ...input,
    url_callback: input.projectWebhook,
  };
  const response = await fetch(`${apiUrl}/api/transactions/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ci: clientId,
      cs: clientSecret,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await readVexusResponse(response);

  if (!response.ok) {
    const errorMessage =
      data.error ??
      data.messageError ??
      data.message ??
      "Falha ao comunicar com a API da VexusPay.";

    if (/client_id|client_secret|credenciais/i.test(errorMessage)) {
      throw new Error(
        "Credenciais da VexusPay invalidas. Confira o client_id e client_secret no .env.local."
      );
    }

    if (/url_callback|projectWebhook|isUrl|callback|webhook/i.test(errorMessage)) {
      throw new Error(
        "URL de callback invalida. Configure VEXUSPAY_WEBHOOK_URL com uma URL publica HTTPS."
      );
    }

    throw new Error(errorMessage);
  }

  const qrCodeResponse = data.qrCodeResponse;

  if (!qrCodeResponse?.qrcode || !qrCodeResponse.transactionId) {
    throw new Error("Resposta invalida da VexusPay ao gerar PIX.");
  }

  const qrcodeImage = await QRCode.toDataURL(qrCodeResponse.qrcode, {
    errorCorrectionLevel: "M",
    margin: 2,
    scale: 8,
    color: {
      dark: "#10367D",
      light: "#FFFFFF",
    },
  });

  return {
    transactionId: qrCodeResponse.transactionId,
    status: qrCodeResponse.status ?? "PENDING",
    qrcode: qrCodeResponse.qrcode,
    qrcodeImage,
    amount: qrCodeResponse.amount ?? input.amount,
  } satisfies VexusPixTransaction;
}
