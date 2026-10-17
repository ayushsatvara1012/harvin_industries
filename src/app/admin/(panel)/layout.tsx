import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireOwner } from "@/lib/dal";
import { countUnhandledLeads } from "@/lib/leads";

async function unhandledCount() {
  try {
    return await countUnhandledLeads();
  } catch (error) {
    console.error("[admin] could not count enquiries", error);
    return 0;
  }
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireOwner();
  const newLeads = await unhandledCount();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <AdminSidebar newLeads={newLeads} />
      <div className="flex flex-col md:pl-64 lg:pl-72 min-h-screen">
        <main id="main" className="flex-1 px-4 py-8 sm:px-8 lg:px-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
