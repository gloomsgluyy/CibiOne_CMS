import { EditorPage } from "@/components/admin/editor-page";
export default async function EditFacilityPage({ params }: { params: Promise<{ id: string }> }) { return <EditorPage kind="sarana-prasarana" id={(await params).id} />; }
