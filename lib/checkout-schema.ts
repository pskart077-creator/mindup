import { z } from "zod";

const checkoutSchema = z.object({
  fullName: z.string().trim().min(3),
  email: z.string().trim().email(),
  phone: z.string().trim().min(10),
  cpfCnpj: z.string().trim().min(11),
  cep: z.string().trim().min(8),
  street: z.string().trim().min(3),
  addressNumber: z.string().trim().min(1),
  complement: z.string().trim().optional().default(""),
  district: z.string().trim().min(2),
  city: z.string().trim().min(2),
  state: z.string().trim().min(2).max(2),
  quantity: z.coerce.number().int().min(1).max(12),
  freightOptionId: z.enum(["standard", "express"])
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;

function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function validateCheckoutPayload(payload: unknown) {
  return checkoutSchema.safeParse(payload);
}

export function normalizeCheckoutPayload(payload: CheckoutPayload): CheckoutPayload {
  return {
    ...payload,
    fullName: payload.fullName.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: digitsOnly(payload.phone),
    cpfCnpj: digitsOnly(payload.cpfCnpj),
    cep: digitsOnly(payload.cep),
    street: payload.street.trim(),
    addressNumber: payload.addressNumber.trim(),
    complement: payload.complement?.trim() ?? "",
    district: payload.district.trim(),
    city: payload.city.trim(),
    state: payload.state.trim().toUpperCase()
  };
}
