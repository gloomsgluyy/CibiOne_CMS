# Security Policy

> Kebijakan keamanan untuk CibiOne CMS

---

## 📋 Daftar Isi

1. [Supported Versions](#supported-versions)
2. [Reporting a Vulnerability](#reporting-a-vulnerability)
3. [Security Best Practices](#security-best-practices)
4. [Known Security Considerations](#known-security-considerations)
5. [Security Checklist](#security-checklist)

---

## 🔒 Supported Versions

Project ini masih dalam tahap development untuk JHIC 2026. Berikut adalah versi yang saat ini didukung dengan security updates:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| 0.1.x   | :white_check_mark: | Active Development |
| < 0.1   | :x:                | Pre-release (not supported) |

---

## 🚨 Reporting a Vulnerability

### Security Issue?

Jika Anda menemukan vulnerability atau security issue di CibiOne CMS, **JANGAN** buat public GitHub issue.

### Cara Melaporkan

**Email:** security@cibionecms.com

**Subject:** `[SECURITY] Brief description of issue`

**Informasi yang perlu disertakan:**

1. **Deskripsi vulnerability**
   - Apa yang terjadi?
   - Apa dampaknya?
   - Seberapa serius (Critical/High/Medium/Low)?

2. **Steps to reproduce**
   - Langkah-langkah detail untuk reproduce issue
   - URL/endpoint yang affected
   - Request/response examples (jika applicable)

3. **Proof of Concept (PoC)**
   - Code snippet
   - Screenshots/videos
   - cURL commands atau Postman collection

4. **Suggested fix** (opsional)
   - Bagaimana cara memperbaikinya?
   - Code patch (jika ada)

5. **Your information**
   - Nama
   - Email untuk follow-up
   - GitHub username (opsional)

### Response Timeline

- **Initial Response**: Dalam 24 jam (acknowledge receipt)
- **Assessment**: Dalam 72 jam (confirm if valid vulnerability)
- **Fix Timeline**: 
  - Critical: 24-48 jam
  - High: 3-7 hari
  - Medium: 7-14 hari
  - Low: 14-30 hari
- **Disclosure**: Setelah fix deployed + 7 hari grace period

### Disclosure Policy

**Responsible Disclosure:**

1. Reporter menemukan & report vulnerability privately
2. Team investigate & confirm issue
3. Team develop & test fix
4. Fix deployed to production
5. **Public disclosure** (credit to reporter jika diinginkan) setelah:
   - Fix sudah deployed
   - Grace period 7 hari untuk user update
   - Reporter diinformasikan sebelum disclosure

**Koordinasi:**
- Kami akan berkoordinasi dengan Anda tentang timeline disclosure
- Credit akan diberikan di CHANGELOG dan security advisory (jika Anda menginginkan)

---

## 🛡️ Security Best Practices

### For Developers

#### 1. Authentication & Authorization

**DO ✅:**

```typescript
// Always check authentication
export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return apiError({ code: 'UNAUTHORIZED', message: 'Login required' }, { status: 401 });
  }
  
  // Check role-based access
  if (user.role !== 'super_admin') {
    return apiError({ code: 'FORBIDDEN', message: 'Admin access required' }, { status: 403 });
  }
  
  // Check jurusan scope for jurusan_admin
  try {
    assertJurusanScope(user, body.jurusan_id);
  } catch {
    return apiError({ code: 'FORBIDDEN_JURUSAN_SCOPE', message: 'Cannot access other jurusan' }, { status: 403 });
  }
  
  // Proceed with operation...
}
```

**DON'T ❌:**

```typescript
// Never skip authentication checks
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Directly process without checking user!
  const result = await db.insert(posts).values(body);
  return apiSuccess(result);
}
```

#### 2. Input Validation

**DO ✅:**

```typescript
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/), // Only alphanumeric + hyphens
  body: z.string().max(50000), // Limit size
  type: z.enum(['berita', 'pengumuman', 'prestasi', 'agenda']),
  jurusan_id: z.number().int().positive().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Validate input
  const result = createPostSchema.safeParse(body);
  if (!result.success) {
    return apiError({
      code: 'VALIDATION_ERROR',
      message: 'Invalid input',
      details: result.error.flatten()
    }, { status: 400 });
  }
  
  // Use validated data
  const post = await createPost(result.data);
  return apiSuccess(post);
}
```

**DON'T ❌:**

```typescript
// Never trust user input directly
export async function POST(request: NextRequest) {
  const body = await request.json();
  // No validation!
  const result = await db.insert(posts).values(body);
  return apiSuccess(result);
}
```

#### 3. SQL Injection Prevention

**DO ✅:**

```typescript
// Use ORM with parameterized queries
const posts = await db
  .select()
  .from(posts)
  .where(eq(posts.id, postId)); // Parameterized

// Or use sql template with proper escaping
import { sql } from 'drizzle-orm';
const result = await db.execute(
  sql`SELECT * FROM posts WHERE title ILIKE ${`%${searchTerm}%`}`
);
```

**DON'T ❌:**

```typescript
// Never concatenate user input to SQL
const query = `SELECT * FROM posts WHERE title LIKE '%${searchTerm}%'`;
await db.execute(query); // SQL Injection vulnerability!
```

#### 4. XSS Prevention

**DO ✅:**

```typescript
// React automatically escapes by default
<div>{userInput}</div> // Safe

// For HTML content, use sanitization library
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }} />
```

**DON'T ❌:**

```typescript
// Never render unsanitized HTML from user input
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // XSS vulnerability!
```

#### 5. Secrets Management

**DO ✅:**

```typescript
// Use environment variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.OPENAI_API_KEY;

// Never log secrets
console.log('Connecting to database...'); // OK
// console.log('DB URL:', dbUrl); // ❌ DON'T
```

**DON'T ❌:**

```typescript
// Never hardcode secrets
const apiKey = 'sk-xxxxxxxxxxxxx'; // ❌ NEVER DO THIS

// Never commit .env file
// Add to .gitignore!
```

#### 6. Rate Limiting

**DO ✅:**

```typescript
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit: 10 requests per minute
  const identifier = getClientIp(request);
  const { success } = await rateLimit.check(identifier, 10, '1m');
  
  if (!success) {
    return apiError(
      { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests' },
      { status: 429 }
    );
  }
  
  // Proceed...
}
```

#### 7. CORS Configuration

**DO ✅:**

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://smkn1cibinong.sch.id' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};
```

**DON'T ❌:**

```typescript
// Never use wildcard in production
{ key: 'Access-Control-Allow-Origin', value: '*' } // ❌ Insecure!
```

### For Administrators

#### 1. Strong Passwords

**Requirements:**
- Minimal 12 karakter
- Kombinasi huruf besar, huruf kecil, angka, simbol
- Tidak menggunakan kata umum atau informasi personal
- Unique per account (jangan reuse password)

**Recommended Tools:**
- Password managers: Bitwarden, 1Password, LastPass
- Password generator

#### 2. Secure Session Management

- Jangan share session cookies
- Logout setelah selesai menggunakan dashboard
- Jangan gunakan "Remember Me" di komputer publik
- Session expired setelah 7 hari (otomatis)

#### 3. Access Control

- Review user access secara berkala
- Revoke akses untuk user yang sudah tidak aktif
- Principle of least privilege (beri akses minimal yang dibutuhkan)
- Separate account untuk super_admin dan jurusan_admin

#### 4. Data Protection

- Jangan share credentials via email/WhatsApp
- Backup database secara berkala
- Encrypt sensitive data saat transfer
- Use HTTPS only (never HTTP)

---

## ⚠️ Known Security Considerations

### Current Limitations

#### 1. Session Management

**Limitation:**
- Session token stored in database (bukan JWT)
- No built-in session refresh mechanism
- Session expiry fixed 7 hari

**Mitigation:**
- httpOnly cookies prevent XSS stealing
- Secure flag ensures HTTPS-only
- Manual revocation via database DELETE

**Future Improvement:**
- Implement refresh token mechanism
- Add session activity tracking
- Auto-logout on suspicious activity

#### 2. Password Storage

**Current:** ⚠️ **TO BE IMPLEMENTED**

**Planned:**
- bcrypt hashing dengan salt (cost factor: 12)
- Password strength validation
- Password history (prevent reuse)

#### 3. Rate Limiting

**Current:** ⚠️ **TO BE IMPLEMENTED**

**Planned:**
- IP-based rate limiting
- User-based rate limiting
- Exponential backoff for failed login attempts
- CAPTCHA after N failed attempts

#### 4. File Upload

**Current:** Basic validation only

**Risks:**
- Malicious file upload (malware, scripts)
- File type spoofing
- Size bomb (DoS)

**Mitigation:**
- Whitelist allowed extensions (jpg, jpeg, png only)
- Max file size: 5MB
- Content-Type validation
- Store in object storage (Vercel Blob), bukan server filesystem

**Future Improvement:**
- Virus scanning (ClamAV)
- Image content analysis
- CDN with DDoS protection

#### 5. CSRF Protection

**Current:** Next.js built-in CSRF protection for mutations

**Additional Measures (Planned):**
- CSRF tokens for sensitive operations
- SameSite cookie attribute
- Origin header validation

---

## ✅ Security Checklist

### Development

- [ ] All user input validated dengan Zod
- [ ] SQL queries menggunakan parameterized statements (via Drizzle ORM)
- [ ] No secrets hardcoded in source code
- [ ] All secrets in environment variables
- [ ] `.env` file in `.gitignore`
- [ ] Authentication required untuk protected endpoints
- [ ] Authorization (role checking) implemented
- [ ] Jurusan scope validation untuk jurusan_admin
- [ ] Error messages tidak expose sensitive info
- [ ] Logging tidak include secrets/passwords
- [ ] Dependencies up-to-date (no known vulnerabilities)

### Deployment

- [ ] HTTPS enabled (SSL certificate active)
- [ ] Environment variables set di production
- [ ] Database connection uses SSL
- [ ] CORS properly configured (no wildcards)
- [ ] Security headers configured:
  - [ ] Strict-Transport-Security
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] X-XSS-Protection
  - [ ] Content-Security-Policy
- [ ] Rate limiting enabled
- [ ] File upload restrictions enforced
- [ ] Database backups scheduled
- [ ] Monitoring & alerting setup

### Operations

- [ ] Regular security updates (dependencies)
- [ ] Review user access quarterly
- [ ] Audit logs reviewed monthly
- [ ] Incident response plan documented
- [ ] Security contact (security@...) monitored
- [ ] Backup restore tested quarterly
- [ ] Penetration testing performed (before production)

---

## 🔐 Security Headers

Recommended security headers di `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },
};
```

---

## 📚 Resources

### Security References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Vercel Security](https://vercel.com/docs/security)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)

### Tools

- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Scan dependencies
- [Snyk](https://snyk.io/) - Vulnerability scanning
- [OWASP ZAP](https://www.zaproxy.org/) - Security testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Security audit

---

## 📞 Contact

**Security Team:** security@cibionecms.com

**PGP Key:** [To be added]

**Response Time:** 24 hours for initial response

---

**Security Policy Version:** 1.0.0

**Last Updated:** August 20, 2026

**Next Review:** September 20, 2026
