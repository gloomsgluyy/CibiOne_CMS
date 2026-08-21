import { EditorPage } from "@/components/admin/editor-page";
export default async function EditGuruPage({ params }: { params: Promise<{ id: string }> }) { return <EditorPage kind="guru" id={(await params).id} />; }
