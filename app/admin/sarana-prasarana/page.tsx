"use client";
import { ResourcePage, StatusBadge } from "@/components/admin/resource-page";
import { Badge } from "@/components/ui/badge";
export default function SaranaPage() { return <ResourcePage config={{ title: "Sarana & Prasarana", description: "Kelola fasilitas sekolah pada halaman publik.", resource: "sarana-prasarana", createHref: "/admin/sarana-prasarana/baru", editPrefix: "/admin/sarana-prasarana", columns: ["Judul", "Slot tampilan", "Urutan", "Status"], fields: (item) => [<span className="font-semibold">{item.title}</span>, <Badge variant="outline">{item.presentationSlot ?? "standard"}</Badge>, <span>{item.sortOrder ?? 0}</span>, <StatusBadge published={item.isPublished} />] }} />; }
