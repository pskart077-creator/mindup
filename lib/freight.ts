export type FreightOption = {
  id: "standard" | "express";
  label: string;
  priceCents: number;
  etaDays: number;
};

type FreightInput = {
  cep: string;
  quantity: number;
};

const BASE_RATE_BY_STATE: Record<string, number> = {
  AC: 3190,
  AL: 2790,
  AP: 3190,
  AM: 3290,
  BA: 2490,
  CE: 2590,
  DF: 1990,
  ES: 1990,
  GO: 2090,
  MA: 2790,
  MT: 2390,
  MS: 2390,
  MG: 1890,
  PA: 3090,
  PB: 2790,
  PR: 1890,
  PE: 2590,
  PI: 2790,
  RJ: 1890,
  RN: 2690,
  RS: 1990,
  RO: 2890,
  RR: 3290,
  SC: 1890,
  SP: 1490,
  SE: 2690,
  TO: 2790
};

const REGION_BY_STATE: Record<string, "southeast" | "south" | "center" | "north" | "northeast"> =
  {
    AC: "north",
    AL: "northeast",
    AP: "north",
    AM: "north",
    BA: "northeast",
    CE: "northeast",
    DF: "center",
    ES: "southeast",
    GO: "center",
    MA: "northeast",
    MT: "center",
    MS: "center",
    MG: "southeast",
    PA: "north",
    PB: "northeast",
    PR: "south",
    PE: "northeast",
    PI: "northeast",
    RJ: "southeast",
    RN: "northeast",
    RS: "south",
    RO: "north",
    RR: "north",
    SC: "south",
    SP: "southeast",
    SE: "northeast",
    TO: "north"
  };

function sanitizeDigits(value: string) {
  return value.replace(/\D/g, "");
}

async function getStateByCep(cep: string) {
  const normalizedCep = sanitizeDigits(cep);

  if (normalizedCep.length !== 8) {
    throw new Error("CEP invalido. Use 8 digitos.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${normalizedCep}/json/`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel consultar o CEP.");
  }

  const data = (await response.json()) as { erro?: boolean; uf?: string };

  if (data.erro || !data.uf) {
    throw new Error("CEP nao encontrado.");
  }

  return data.uf.toUpperCase();
}

function getEtaDays(region: string) {
  if (region === "southeast") {
    return { standard: 4, express: 2 };
  }

  if (region === "south" || region === "center") {
    return { standard: 6, express: 3 };
  }

  if (region === "northeast") {
    return { standard: 8, express: 4 };
  }

  return { standard: 10, express: 5 };
}

export async function calculateFreight({ cep, quantity }: FreightInput) {
  const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
  const state = await getStateByCep(cep);
  const region = REGION_BY_STATE[state] ?? "southeast";
  const baseRateCents = BASE_RATE_BY_STATE[state] ?? 2390;
  const unitIncrement = 290;

  const standardBase = baseRateCents + (safeQuantity - 1) * unitIncrement;
  const expressBase = Math.round(standardBase * 1.55);
  const etaDays = getEtaDays(region);

  const options: FreightOption[] = [
    {
      id: "standard",
      label: "Padrao",
      priceCents: standardBase,
      etaDays: etaDays.standard
    },
    {
      id: "express",
      label: "Expresso",
      priceCents: expressBase,
      etaDays: etaDays.express
    }
  ];

  return {
    state,
    options
  };
}
