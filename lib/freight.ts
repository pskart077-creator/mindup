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

export async function calculateFreight({ cep }: FreightInput) {
  const state = await getStateByCep(cep);
  const region = REGION_BY_STATE[state] ?? "southeast";
  const etaDays = getEtaDays(region);

  const options: FreightOption[] = [
    {
      id: "standard",
      label: "Padrao gratis",
      priceCents: 0,
      etaDays: etaDays.standard
    },
    {
      id: "express",
      label: "Expresso gratis",
      priceCents: 0,
      etaDays: etaDays.express
    }
  ];

  return {
    state,
    options
  };
}
