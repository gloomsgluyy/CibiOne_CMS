import { EditorPage } from "@/components/admin/editor-page";
export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) { return <EditorPage kind="posts" id={(await params).id} />; }
