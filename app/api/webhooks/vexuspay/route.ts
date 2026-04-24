import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

function isValidSignature(rawBody: string, timestamp: string, signature: string) {
  const clientSecret = process.env.VEXUSPAY_CLIENT_SECRET;

  if (!clientSecret) {
    return false;
  }

  const expected = createHmac("sha256", clientSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const signatureBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === signatureBuffer.length &&
    timingSafeEqual(expectedBuffer, signatureBuffer)
  );
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const timestamp = request.headers.get("x-vexus-webhook-timestamp");
  const signature = request.headers.get("x-vexus-webhook-signature");

  if (timestamp && signature && !isValidSignature(rawBody, timestamp, signature)) {
    return NextResponse.json({ error: "Assinatura invalida." }, { status: 401 });
  }

  try {
    const payload = rawBody ? JSON.parse(rawBody) : {};

    console.info("VexusPay webhook recebido", {
      transactionId: payload.transaction_id ?? payload.external_id,
      status: payload.status,
      event: payload.event,
    });
  } catch {
    console.info("VexusPay webhook recebido sem JSON valido.");
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
