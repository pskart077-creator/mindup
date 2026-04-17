import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateFreight } from "@/lib/freight";

const freightRequestSchema = z.object({
  cep: z.string().min(8),
  quantity: z.coerce.number().int().min(1).max(12).default(1)
});

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    const parsed = freightRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados invalidos para calculo de frete." },
        { status: 400 }
      );
    }

    const result = await calculateFreight(parsed.data);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro inesperado no frete.";
    const isClientError =
      /cep|invalido|nao encontrado/i.test(message) ||
      /dados invalidos/i.test(message);

    return NextResponse.json({ error: message }, { status: isClientError ? 400 : 500 });
  }
}
