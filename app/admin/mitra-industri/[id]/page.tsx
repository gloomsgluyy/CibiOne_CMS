import { EditorPage } from "@/components/admin/editor-page";
export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) { return <EditorPage kind="kerjasama-industri" id={(await params).id} />; }
