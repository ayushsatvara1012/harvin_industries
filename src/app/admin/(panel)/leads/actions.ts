"use server";

import { assertOwner } from "@/lib/dal";
import { deleteLead, setLeadHandled } from "@/lib/leads";

export async function markLeadHandled(id: number, handled: boolean): Promise<{ ok: boolean; message?: string }> {
  await assertOwner();
  try {
    await setLeadHandled(id, handled);
    return { ok: true };
  } catch (error) {
    console.error("[admin] markLeadHandled failed", error);
    return { ok: false, message: "Could not update. Please try again." };
  }
}

export async function removeLead(id: number): Promise<{ ok: boolean; message?: string }> {
  await assertOwner();
  try {
    await deleteLead(id);
    return { ok: true };
  } catch (error) {
    console.error("[admin] removeLead failed", error);
    return { ok: false, message: "Could not delete. It may already be gone." };
  }
}
