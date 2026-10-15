import "server-only";

import { withDb, withWakeRetry } from "@/lib/db";

export type LeadInput = {
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  product: string;
  output: string;
  message: string;
};

export type AdminLead = LeadInput & {
  id: number;
  handled: boolean;
  createdAt: Date;
  productName?: string;
};

export function createLead(input: LeadInput) {
  return withDb((db) => db.lead.create({ data: input, select: { id: true } }));
}

export async function listLeads(): Promise<AdminLead[]> {
  const [rows, products] = await withWakeRetry((db) =>
    Promise.all([
      db.lead.findMany({ orderBy: [{ handled: "asc" }, { createdAt: "desc" }] }),
      db.product.findMany({ select: { slug: true, name: true } }),
    ]),
  );
  const names = new Map(products.map((product) => [product.slug, product.name]));
  return rows.map((row) => ({ ...row, productName: names.get(row.product) }));
}

export async function countUnhandledLeads(): Promise<number> {
  return withWakeRetry((db) => db.lead.count({ where: { handled: false } }));
}

export function setLeadHandled(id: number, handled: boolean) {
  return withDb((db) => db.lead.update({ where: { id }, data: { handled }, select: { id: true } }));
}

export function deleteLead(id: number) {
  return withDb((db) => db.lead.delete({ where: { id }, select: { id: true } }));
}
