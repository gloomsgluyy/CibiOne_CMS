# Contributing Guide - CibiOne CMS

> Panduan kontribusi untuk developer yang ingin berkontribusi pada project CibiOne CMS

---

## 📋 Daftar Isi

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Coding Standards](#coding-standards)
4. [Git Workflow](#git-workflow)
5. [Pull Request Process](#pull-request-process)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation](#documentation)
8. [Code Review](#code-review)

---

## 🚀 Getting Started

### Prerequisites

Sebelum mulai berkontribusi, pastikan Anda sudah:

- [x] Membaca [DOCUMENTATION.md](../DOCUMENTATION.md)
- [x] Membaca [AI_CONTEXT.md](context/AI_CONTEXT.md)
- [x] Membaca [architecture.md](context/architecture.md)
- [x] Setup local environment (lihat [Setup & Instalasi](../DOCUMENTATION.md#setup--instalasi))
- [x] Familiar dengan Next.js, TypeScript, dan Tailwind CSS

### Project Structure Knowledge

Pahami struktur project dan konvensi yang digunakan:

- **Backend Pattern**: `ContentList` vs `SiteSetting`
- **Component Registry**: Cek `component-registry.md` sebelum buat UI baru
- **SRS Template**: Setiap section punya SRS di `docs/srs/`
- **Response Envelope**: Semua API pakai format standar

---

## 🔄 Development Workflow

### 1. Claim Section/Task

Sebelum mulai coding, claim section yang akan dikerjakan:

1. **Check existing SRS** di `docs/srs/`
2. **Buat SRS baru** jika belum ada (copy dari `SRS_TEMPLATE.md`)
3. **Update SRS** dengan:
   - Metadata (PIC, tanggal, dll)
   - Component Registry Reference
   - Layout/design reference
4. **Create GitHub Issue** untuk tracking
5. **Assign yourself** ke issue tersebut

### 2. Create Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feat/home-hero-banner

# Naming convention:
# feat/    - New feature
# fix/     - Bug fix
# chore/   - Maintenance (deps update, config)
# docs/    - Documentation only
# refactor/ - Code refactoring
```

### 3. Development

**Fase 1 - Frontend Implementation:**

1. **Cek Component Registry**
   - Buka `docs/context/component-registry.md`
   - Cari component untuk section Anda
   - **JANGAN buat dari scratch jika sudah ada!**

2. **Implementasi Component**
   ```bash
   # Create component file
   touch components/sections/hero-banner.tsx
   ```

3. **Integrate ke Page**
   ```bash
   # Edit page file
   code app/(public)/page.tsx
   ```

4. **Test Locally**
   ```bash
   npm run dev
   # Buka http://localhost:3000
   ```

5. **Update SRS Execution Log**
   - Tambah entry di Execution Log Fase 1
   - Status: In Progress → Waiting for Approval

**Fase 2 - Backend Logic:**

1. **Tunggu Approval Fase 1** (jangan mulai sebelum Fase 1 = Done)

2. **Implement Database Schema**
   ```typescript
   // db/schema.ts
   export const myTable = pgTable("my_table", {
     // ...fields
   });
   ```

3. **Generate Migration**
   ```bash
   npx drizzle-kit generate
   ```

4. **Implement API Routes**
   ```bash
   # Create API route
   mkdir -p app/api/my-resource
   touch app/api/my-resource/route.ts
   ```

5. **Follow Pattern**
   - Gunakan `apiSuccess()` dan `apiError()` dari `lib/api-response.ts`
   - Implement role scoping dengan `assertJurusanScope()`
   - Validation dengan Zod

6. **Test API**
   ```bash
   # Manual test dengan curl/Postman
   curl http://localhost:3000/api/my-resource
   ```

7. **Update SRS Execution Log**
   - Tambah entry di Execution Log Fase 2
   - Status: In Progress → Waiting for Approval

### 4. Commit Changes

**Convention:**

```bash
# Fase 1
git commit -m "[Fase1] Add hero banner component"

# Fase 2
git commit -m "[Fase2] Implement posts API endpoint"

# Bug fix
git commit -m "fix: Fix jurusan scoping in posts API"

# Chore
git commit -m "chore: Update dependencies"
```

**Commit Message Format:**

```
[Fase1|Fase2] <type>: <short description>

<optional detailed description>

<optional footer with issue references>
```

**Examples:**

```bash
[Fase1] feat: Add hero banner with liquid metal effect

- Implement hero-liquid-metal from Cult UI
- Add responsive breakpoints
- Integrate with CMS data

Closes #12
```

```bash
[Fase2] feat: Implement posts CRUD API

- Add GET /api/posts with pagination
- Add POST /api/posts with validation
- Add PUT /api/posts/:id with role scoping
- Add DELETE /api/posts/:id

Closes #13
```

### 5. Push Branch

```bash
git push origin feat/home-hero-banner
```

---

## 📏 Coding Standards

### TypeScript

**Strict Mode:**

```typescript
// ✅ Good: Type everything
interface PostData {
  title: string;
  slug: string;
  body: string | null;
}

function createPost(data: PostData): Promise<Post> {
  // ...
}

// ❌ Bad: Using `any`
function createPost(data: any): any {
  // ...
}
```

**Named Exports:**

```typescript
// ✅ Good: Named export
export function HeroBanner() {
  return <div>...</div>;
}

// ❌ Bad: Default export
export default function HeroBanner() {
  return <div>...</div>;
}
```

### React Components

**Functional Components Only:**

```typescript
// ✅ Good
export function MyComponent({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

// ❌ Bad: Class component
export class MyComponent extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
```

**Props Interface:**

```typescript
// ✅ Good: Separate interface
interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export function HeroBanner({ title, subtitle, imageUrl }: HeroBannerProps) {
  return <div>...</div>;
}
```

### Styling

**Tailwind Utility Classes Only:**

```typescript
// ✅ Good: Utility classes
<div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
</div>

// ❌ Bad: Inline styles
<div style={{ display: 'flex', padding: '8px 16px' }}>
  <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>{title}</h1>
</div>

// ❌ Bad: CSS modules
import styles from './hero.module.css';
<div className={styles.container}>...</div>
```

**Conditional Classes:**

```typescript
import { cn } from '@/lib/utils';

// ✅ Good: Use cn() helper
<button 
  className={cn(
    "px-4 py-2 rounded-lg font-medium",
    isPrimary ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
>
  {label}
</button>
```

### API Routes

**Response Envelope:**

```typescript
import { apiSuccess, apiError } from '@/lib/api-response';
import { NextRequest } from 'next/server';

// ✅ Good: Use helpers
export async function GET(request: NextRequest) {
  try {
    const posts = await db.select().from(posts);
    return apiSuccess(posts);
  } catch (error) {
    return apiError(
      { code: 'INTERNAL_ERROR', message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// ❌ Bad: Manual response
export async function GET(request: NextRequest) {
  const posts = await db.select().from(posts);
  return Response.json({ data: posts }); // Inconsistent format!
}
```

**Validation:**

```typescript
import { z } from 'zod';

// ✅ Good: Zod validation
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  type: z.enum(['berita', 'pengumuman', 'prestasi', 'agenda']),
  body: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = createPostSchema.safeParse(body);
  if (!result.success) {
    return apiError(
      { 
        code: 'VALIDATION_ERROR', 
        message: 'Invalid request data',
        details: result.error.flatten()
      },
      { status: 400 }
    );
  }
  
  // Process validated data
  const post = await createPost(result.data);
  return apiSuccess(post, { status: 201 });
}
```

**Role Scoping:**

```typescript
import { assertJurusanScope } from '@/lib/auth';

// ✅ Good: Check jurusan scope
export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return apiError({ code: 'UNAUTHORIZED', message: 'Login required' }, { status: 401 });
  }
  
  const body = await request.json();
  
  // Check if jurusan_admin tries to create for other jurusan
  try {
    assertJurusanScope(user, body.jurusan_id);
  } catch (error) {
    return apiError({ code: 'FORBIDDEN_JURUSAN_SCOPE', message: 'Cannot create content for other jurusan' }, { status: 403 });
  }
  
  // Proceed...
}
```

### File Naming

```
components/
  sections/
    hero-banner.tsx          ✅ kebab-case
    contact-footer.tsx       ✅
    HeroBanner.tsx           ❌ PascalCase
    hero_banner.tsx          ❌ snake_case

app/
  api/
    posts/
      route.ts               ✅ Next.js convention
    posts/[id]/
      route.ts               ✅
```

---

## 🌿 Git Workflow

### Branch Naming

```bash
feat/section-name        # New feature
fix/bug-description      # Bug fix
chore/task-description   # Maintenance
docs/what-changed        # Documentation
refactor/what-refactored # Code refactoring
```

**Examples:**

```bash
feat/home-hero-banner
feat/admin-posts-crud
fix/jurusan-scope-validation
chore/update-dependencies
docs/api-documentation
refactor/auth-helper
```

### Commit Frequency

**✅ Good:**
- Commit setiap logical change
- 1 commit = 1 feature/fix yang complete
- Commit sebelum switch task

**❌ Bad:**
- Commit setiap 5 menit
- 1 giant commit untuk semua changes
- Commit broken code

### Commit Messages

**Good Examples:**

```bash
[Fase1] feat: Add hero banner section

Implement hero-liquid-metal component from Cult UI with:
- Responsive design (mobile, tablet, desktop)
- Animation on scroll
- Integration with site_settings for content

[Fase2] feat: Implement posts API

Add complete CRUD endpoints for posts resource:
- GET /api/posts (list with pagination & filters)
- GET /api/posts/:id (single post)
- POST /api/posts (create with validation)
- PUT /api/posts/:id (update with role scoping)
- DELETE /api/posts/:id (delete with role scoping)

Closes #42

fix: Fix jurusan scope validation in posts API

jurusan_admin could previously edit posts from other jurusan
by manipulating request body. Now properly validated with
assertJurusanScope() helper.

Fixes #56
```

**Bad Examples:**

```bash
update                   # ❌ Too vague
fix bug                  # ❌ What bug?
add stuff                # ❌ What stuff?
WIP                      # ❌ Don't commit WIP to main/shared branches
```

---

## 🔀 Pull Request Process

### 1. Create Pull Request

**Via GitHub:**

1. Push branch ke remote
2. Buka repository di GitHub
3. Klik **"Compare & pull request"**
4. Isi PR template (lihat bawah)
5. Assign reviewers
6. Add labels (`Fase1`, `Fase2`, `bug`, `enhancement`, dll)
7. Link related issues

**Via CLI:**

```bash
# Install GitHub CLI
gh pr create --title "[Fase1] Add hero banner section" --body "..." --base main
```

### 2. PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Fase 1 - Frontend Implementation
- [ ] Fase 2 - Backend Logic
- [ ] Bug fix
- [ ] Chore/Refactor
- [ ] Documentation

## Related Issues

Closes #42

## Changes Made

- Implement hero-liquid-metal component from Cult UI
- Add responsive breakpoints
- Integrate with site_settings API

## Testing

- [x] Tested on desktop (Chrome, Firefox, Safari)
- [x] Tested on mobile (iPhone, Android)
- [x] Tested on tablet (iPad)
- [x] Visual matches design reference
- [ ] API tested with Postman (N/A for Fase 1)

## Screenshots

[Attach screenshots/videos jika UI changes]

## Checklist

- [x] Code follows project coding standards
- [x] Component from registry (not built from scratch)
- [x] SRS execution log updated
- [x] No console errors
- [x] Responsive design tested
- [x] TypeScript strict mode passes
- [ ] Tests added/updated (if applicable)

## Reviewer Notes

Any specific areas to focus review on?
```

### 3. Review Process

**PR akan di-review oleh:**
- 1 programmer lain (peer review)
- 1 PIC/reviewer (approval)

**Review Checklist:**

- [ ] Code quality & readability
- [ ] Follows coding standards
- [ ] Component from registry (if UI)
- [ ] API uses response envelope
- [ ] Role scoping implemented
- [ ] No hardcoded values (use env/config)
- [ ] Responsive design
- [ ] No console errors
- [ ] SRS updated

### 4. Address Review Comments

```bash
# Make changes based on review
git add .
git commit -m "fix: Address review comments"
git push origin feat/home-hero-banner
```

**PR akan auto-update!**

### 5. Merge

**Setelah approved:**

1. **Squash and merge** (recommended) - Clean commit history
2. **Delete branch** after merge

```bash
# Via GitHub UI: Click "Squash and merge"

# Or via CLI:
gh pr merge 42 --squash --delete-branch
```

---

## 🧪 Testing Guidelines

### Manual Testing

**Setiap PR harus di-test:**

1. **Functional Testing**
   - Feature works as expected
   - Edge cases handled
   - Error states handled

2. **Visual Testing** (untuk UI)
   - Desktop: Chrome, Firefox, Safari
   - Mobile: iPhone, Android
   - Tablet: iPad

3. **Responsive Testing**
   - Mobile: 375px, 428px
   - Tablet: 768px, 1024px
   - Desktop: 1280px, 1920px

4. **API Testing** (untuk backend)
   - Test dengan Postman/cURL
   - Test all endpoints (GET, POST, PUT, DELETE)
   - Test validation errors
   - Test authorization

### Browser DevTools Testing

```bash
# Open DevTools
F12 atau Cmd+Option+I

# Check:
- Console (no errors)
- Network (no failed requests)
- Lighthouse (score > 90)
- Responsive mode
```

### Testing Checklist

**Frontend (Fase 1):**
- [ ] Component renders correctly
- [ ] Props passed correctly
- [ ] Responsive design works
- [ ] No console errors
- [ ] Images load
- [ ] Links work
- [ ] Animations smooth

**Backend (Fase 2):**
- [ ] API returns correct data
- [ ] Validation works
- [ ] Error handling works
- [ ] Role scoping works
- [ ] Pagination works (if list)
- [ ] Response envelope correct
- [ ] Database updated correctly

---

## 📖 Documentation

### When to Update Docs

**Update documentation when:**
- Adding new feature
- Changing API endpoint
- Adding environment variable
- Changing architecture/pattern
- Adding new decision (ADR)

### What to Update

| Change | Files to Update |
|--------|----------------|
| New API endpoint | `docs/API_DOCUMENTATION.md` |
| New feature | `DOCUMENTATION.md`, `PANDUAN_PENGGUNAAN.md` |
| Architecture change | `docs/context/architecture.md` |
| New decision | `docs/context/decisions.md` (add new ADR) |
| New component source | `docs/context/component-registry.md` |
| New section | Create `docs/srs/<halaman>/<section>.md` |

### Documentation Format

**Use Markdown:**
- Headers: `#`, `##`, `###`
- Code blocks: ` ```typescript ` 
- Lists: `- Item` atau `1. Item`
- Tables: `| Column | Column |`
- Links: `[Text](url)`

---

## 👀 Code Review

### As a Reviewer

**Review for:**

1. **Correctness**
   - Does it work?
   - Does it solve the problem?
   - Are there bugs?

2. **Code Quality**
   - Readable and maintainable?
   - Follows coding standards?
   - Proper naming?

3. **Architecture**
   - Follows project patterns?
   - Uses correct API pattern (ContentList/SiteSetting)?
   - Uses component from registry?

4. **Security**
   - No SQL injection?
   - No XSS vulnerabilities?
   - Proper authentication/authorization?

5. **Performance**
   - No N+1 queries?
   - Images optimized?
   - Proper caching?

**Review Comments Format:**

```markdown
# ✅ Approve
LGTM! Good work on implementing the hero banner.

# 🔧 Request Changes
Please address:
1. Use component from registry instead of building from scratch
2. Add role scoping to POST endpoint
3. Fix TypeScript error on line 42

# 💡 Suggestion (optional)
Consider extracting this logic to a separate function for reusability.

# ❓ Question
Why did you choose this approach instead of X?
```

### As an Author

**Respond to comments:**

```markdown
# If you agree and fix:
✅ Fixed in latest commit

# If you disagree:
I chose this approach because... [explain reasoning]
Would you prefer...?

# If unclear:
Can you clarify what you mean by...?
```

**Don't:**
- ❌ Take comments personally
- ❌ Ignore comments
- ❌ Argue defensively
- ❌ Mark resolved without actually fixing

---

## 🎯 Best Practices Summary

### DO ✅

- Read all documentation before starting
- Check Component Registry before building UI
- Follow SRS template for every section
- Commit logical units of work
- Write clear commit messages
- Test thoroughly before PR
- Update SRS execution log
- Ask questions if unclear
- Review others' code
- Update documentation

### DON'T ❌

- Don't build UI from scratch if component exists
- Don't start Fase 2 before Fase 1 approved
- Don't commit broken code
- Don't commit secrets/credentials
- Don't hardcode values (use env/config)
- Don't skip validation
- Don't ignore role scoping
- Don't merge without approval
- Don't delete others' work without discussion

---

## 📞 Questions?

**Stuck? Need help?**

1. **Check documentation first**: `docs/`
2. **Search existing issues**: GitHub Issues
3. **Ask in team chat**: WhatsApp/Slack/Discord
4. **Create discussion**: GitHub Discussions
5. **Tag reviewer**: @mention di PR/issue

---

**Happy coding! 🚀**

**Contributing Guide Version:** 1.0.0

**Last Updated:** August 20, 2026
