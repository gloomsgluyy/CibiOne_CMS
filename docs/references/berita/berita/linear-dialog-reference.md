# Linear Dialog Reference

- Source diberikan langsung oleh PIC melalui chat pada 2026-08-18.
- Source menggunakan compound component: `Dialog`, `DialogTrigger`, `DialogContainer`, `DialogContent`, `DialogTitle`, `DialogDescription`, dan `DialogClose`.
- Behavior wajib yang diadaptasi: shared-layout transition, portal ke `document.body`, backdrop blur, Escape close, focus trap, body scroll lock, dan focus restoration.
- Implementasi proyek: `components/ui/linear-dialog.tsx`.
- Adaptasi dilakukan untuk memakai konvensi `framer-motion` proyek, menghapus duplikasi listener/scroll lock, memperbaiki tipe ref, dan menyediakan `onOpenChange` agar carousel berhenti selama dialog terbuka.
