# API Documentation - CibiOne CMS

> Dokumentasi lengkap REST API untuk developer

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Response Format](#response-format)
4. [Error Codes](#error-codes)
5. [Rate Limiting](#rate-limiting)
6. [Endpoints](#endpoints)
   - [Auth](#auth)
   - [Posts](#posts)
   - [Jurusan](#jurusan)
   - [Guru](#guru)
   - [Site Settings](#site-settings)
   - [Chatbot](#chatbot)

---

## 🌐 Overview

### Base URL

```
Production: https://smkn1cibinong.sch.id/api
Development: http://localhost:3000/api
```

### Content Type

All requests and responses use `application/json` unless specified otherwise.

### Versioning

Current API version: **v1** (included in base URL path)

---

## 🔐 Authentication

### Session-based Authentication

API menggunakan session-based authentication dengan cookie `httpOnly`.

**Login Flow:**

1. POST `/api/auth/login` dengan credentials
2. Server mengembalikan session cookie
3. Cookie otomatis disertakan di setiap request berikutnya
4. Session berlaku selama 7 hari

**Example Login Request:**

```bash
curl -X POST https://smkn1cibinong.sch.id/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smkn1cibinong.sch.id",
    "password": "your-password"
  }'
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin Sekolah",
      "email": "admin@smkn1cibinong.sch.id",
      "role": "super_admin",
      "jurusan_id": null
    }
  }
}
```

### Authorization Header (Alternative)

Untuk client yang tidak support cookies, gunakan Authorization header:

```
Authorization: Bearer <session-token>
```

### Protected Endpoints

Endpoints yang memerlukan authentication akan mengembalikan `401 Unauthorized` jika tidak ada session valid.

---

## 📦 Response Format

### Success Response

**Single Resource:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Juara 1 LKS Nasional",
    "created_at": "2026-08-20T00:00:00Z"
  }
}
```

**Collection (with Pagination):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Berita Pertama"
    },
    {
      "id": 2,
      "title": "Berita Kedua"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "total_pages": 5
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

---

## ⚠️ Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | `BAD_REQUEST` | Invalid request parameters |
| 400 | `VALIDATION_ERROR` | Request validation failed |
| 401 | `UNAUTHORIZED` | Authentication required |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 403 | `FORBIDDEN_JURUSAN_SCOPE` | Jurusan scope mismatch |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict (e.g., duplicate slug) |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests |
| 500 | `INTERNAL_SERVER_ERROR` | Server error |

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "title": ["Title is required"],
      "slug": ["Slug already exists"]
    }
  }
}
```

---

## 🚦 Rate Limiting

**Public Endpoints:**
- 100 requests per minute per IP

**Authenticated Endpoints:**
- 300 requests per minute per user

**Headers:**

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1629384000
```

---

## 🔌 Endpoints

### Auth

#### POST /api/auth/login

Authenticate user and create session.

**Request Body:**

```json
{
  "email": "admin@smkn1cibinong.sch.id",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Admin Sekolah",
      "email": "admin@smkn1cibinong.sch.id",
      "role": "super_admin",
      "jurusan_id": null
    }
  }
}
```

---

#### POST /api/auth/logout

Logout and invalidate session.

**Auth:** Required

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

#### GET /api/auth/me

Get current authenticated user info.

**Auth:** Required

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin Sekolah",
    "email": "admin@smkn1cibinong.sch.id",
    "role": "super_admin",
    "jurusan_id": null
  }
}
```

---

### Posts

Posts endpoint menangani 4 jenis konten: `berita`, `pengumuman`, `prestasi`, `agenda`.

#### GET /api/posts

Get list of posts with filtering and pagination.

**Auth:** Public (hanya published) | Admin (all)

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `type` | `string` | Filter by type: `berita`, `pengumuman`, `prestasi`, `agenda` | - |
| `jurusan_id` | `integer` | Filter by jurusan ID | - |
| `is_published` | `boolean` | Filter by publish status | `true` (public), all (admin) |
| `page` | `integer` | Page number | `1` |
| `limit` | `integer` | Items per page (max 100) | `10` |
| `sort` | `string` | Sort field: `created_at`, `updated_at`, `title` | `created_at` |
| `order` | `string` | Sort order: `asc`, `desc` | `desc` |
| `search` | `string` | Search in title and body | - |

**Example Request:**

```bash
GET /api/posts?type=berita&jurusan_id=1&page=1&limit=10
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "jurusan_id": 1,
      "type": "berita",
      "title": "SIJA Juara 1 LKS Nasional",
      "slug": "sija-juara-1-lks-nasional",
      "body": "Siswa jurusan SIJA berhasil meraih...",
      "image_url": "https://blob.vercel-storage.com/...",
      "event_date": null,
      "is_published": true,
      "created_by": 1,
      "created_at": "2026-08-20T00:00:00Z",
      "updated_at": "2026-08-20T00:00:00Z",
      "jurusan": {
        "id": 1,
        "title": "Sistem Informatika, Jaringan, dan Aplikasi",
        "slug": "sija"
      },
      "author": {
        "id": 1,
        "name": "Admin SIJA"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

---

#### GET /api/posts/:id

Get single post by ID.

**Auth:** Public (published only) | Admin (all)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "jurusan_id": 1,
    "type": "berita",
    "title": "SIJA Juara 1 LKS Nasional",
    "slug": "sija-juara-1-lks-nasional",
    "body": "Full content here...",
    "image_url": "https://blob.vercel-storage.com/...",
    "event_date": null,
    "is_published": true,
    "created_by": 1,
    "created_at": "2026-08-20T00:00:00Z",
    "updated_at": "2026-08-20T00:00:00Z",
    "jurusan": {
      "id": 1,
      "title": "Sistem Informatika, Jaringan, dan Aplikasi"
    },
    "author": {
      "id": 1,
      "name": "Admin SIJA"
    }
  }
}
```

---

#### POST /api/posts

Create new post.

**Auth:** Admin required

**Request Body:**

```json
{
  "jurusan_id": 1,
  "type": "berita",
  "title": "Judul Berita Baru",
  "slug": "judul-berita-baru",
  "body": "Konten lengkap berita...",
  "image_url": "https://blob.vercel-storage.com/...",
  "event_date": null,
  "is_published": true
}
```

**Validation Rules:**

- `type`: Required, enum(`berita`, `pengumuman`, `prestasi`, `agenda`)
- `title`: Required, max 200 characters
- `slug`: Required, unique, alphanumeric + hyphens
- `body`: Optional
- `image_url`: Optional, valid URL
- `jurusan_id`: Optional (null = sekolah-wide)
- `event_date`: Required if `type=agenda`, format ISO 8601
- `is_published`: Optional, default `true`

**Authorization:**
- `jurusan_admin`: Can only create posts with their own `jurusan_id`
- `super_admin`: Can create posts for any jurusan

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": 42,
    "jurusan_id": 1,
    "type": "berita",
    "title": "Judul Berita Baru",
    "slug": "judul-berita-baru",
    "created_at": "2026-08-20T00:00:00Z"
  }
}
```

---

#### PUT /api/posts/:id

Update existing post.

**Auth:** Admin required

**Request Body:** Same as POST (all fields optional)

**Authorization:**
- `jurusan_admin`: Can only update posts with their own `jurusan_id`
- `super_admin`: Can update any post

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 42,
    "title": "Judul yang Diupdate",
    "updated_at": "2026-08-20T01:00:00Z"
  }
}
```

---

#### DELETE /api/posts/:id

Delete post.

**Auth:** Admin required

**Authorization:**
- `jurusan_admin`: Can only delete posts with their own `jurusan_id`
- `super_admin`: Can delete any post

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "message": "Post deleted successfully"
  }
}
```

---

### Jurusan

#### GET /api/jurusan

Get list of all jurusan.

**Auth:** Public

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `is_published` | `boolean` | Filter by publish status | `true` |

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sistem Informatika, Jaringan, dan Aplikasi",
      "slug": "sija",
      "body": "Deskripsi jurusan SIJA...",
      "image_url": "https://blob.vercel-storage.com/logo-sija.png",
      "is_published": true,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-08-20T00:00:00Z"
    }
  ]
}
```

---

#### GET /api/jurusan/:id

Get single jurusan by ID.

**Auth:** Public

**Response:** `200 OK`

---

#### POST /api/jurusan

Create new jurusan.

**Auth:** `super_admin` only

**Request Body:**

```json
{
  "title": "Teknik Kendaraan Ringan",
  "slug": "tkr",
  "body": "Deskripsi jurusan...",
  "image_url": "https://blob.vercel-storage.com/logo-tkr.png",
  "is_published": true
}
```

**Response:** `201 Created`

---

#### PUT /api/jurusan/:id

Update jurusan.

**Auth:** `super_admin` only

**Response:** `200 OK`

---

#### DELETE /api/jurusan/:id

Delete jurusan.

**Auth:** `super_admin` only

**Response:** `200 OK`

---

### Guru

#### GET /api/guru

Get list of teachers.

**Auth:** Public

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `jurusan_id` | `integer` | Filter by jurusan | - |
| `is_published` | `boolean` | Filter by status | `true` |
| `page` | `integer` | Page number | `1` |
| `limit` | `integer` | Items per page | `20` |

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "jurusan_id": 1,
      "name": "Budi Santoso, S.Kom",
      "nip": "197501012000121001",
      "position": "Kepala Jurusan SIJA",
      "subject": "Pemrograman Web",
      "photo_url": "https://blob.vercel-storage.com/...",
      "email": "budi.santoso@smkn1cibinong.sch.id",
      "phone": "081234567890",
      "bio": "Lulusan S1 Teknik Informatika...",
      "is_published": true,
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

#### POST /api/guru

Create new teacher.

**Auth:** Admin required

**Authorization:**
- `jurusan_admin`: Can only create with their own `jurusan_id`
- `super_admin`: Can create for any jurusan

**Request Body:**

```json
{
  "jurusan_id": 1,
  "name": "Nama Guru",
  "nip": "197501012000121001",
  "position": "Guru Mata Pelajaran",
  "subject": "Jaringan Komputer",
  "photo_url": "https://blob.vercel-storage.com/...",
  "email": "guru@smkn1cibinong.sch.id",
  "phone": "081234567890",
  "bio": "Riwayat pendidikan...",
  "is_published": true
}
```

**Response:** `201 Created`

---

### Site Settings

#### GET /api/settings

Get all site settings.

**Auth:** Admin required

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "key": "contact_whatsapp",
      "value": "+6281234567890",
      "updated_by": 1,
      "updated_at": "2026-08-20T00:00:00Z"
    },
    {
      "key": "contact_email",
      "value": "info@smkn1cibinong.sch.id",
      "updated_by": 1,
      "updated_at": "2026-08-20T00:00:00Z"
    },
    {
      "key": "principal_message",
      "value": {
        "name": "Dr. Ahmad Suryadi, M.Pd",
        "nip": "196505051990031007",
        "photo_url": "https://blob.vercel-storage.com/kepsek.jpg",
        "message": "Sambutan lengkap kepala sekolah..."
      },
      "updated_by": 1,
      "updated_at": "2026-08-20T00:00:00Z"
    }
  ]
}
```

---

#### GET /api/settings/:key

Get single setting by key.

**Auth:** Public

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "key": "contact_whatsapp",
    "value": "+6281234567890",
    "updated_at": "2026-08-20T00:00:00Z"
  }
}
```

---

#### PUT /api/settings/:key

Update setting value.

**Auth:** `super_admin` only

**Request Body:**

```json
{
  "value": "+6281234567890"
}
```

or for complex settings:

```json
{
  "value": {
    "name": "Dr. Ahmad Suryadi, M.Pd",
    "message": "Sambutan..."
  }
}
```

**Response:** `200 OK`

---

### Chatbot

#### POST /api/chatbot

Send message to AI chatbot and get response.

**Auth:** Public

**Request Body:**

```json
{
  "message": "Apa saja jurusan yang tersedia?",
  "jurusan_id": 1,
  "conversation_id": "uuid-optional"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "response": "SMKN 1 Cibinong memiliki 5 kompetensi keahlian: SIJA, TKJ, RPL, TEI, dan TOI.",
    "conversation_id": "uuid",
    "sources": [
      {
        "id": 1,
        "content_text": "Jurusan yang tersedia..."
      }
    ]
  }
}
```

---

## 📝 Examples

### JavaScript (Fetch API)

```javascript
// Login
const loginResponse = await fetch('https://smkn1cibinong.sch.id/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@smkn1cibinong.sch.id',
    password: 'password123'
  }),
  credentials: 'include' // Important for cookies
});

const loginData = await loginResponse.json();

// Get posts
const postsResponse = await fetch('https://smkn1cibinong.sch.id/api/posts?type=berita&page=1', {
  credentials: 'include' // Include session cookie
});

const postsData = await postsResponse.json();
console.log(postsData.data);
```

### Python (Requests)

```python
import requests

# Login
session = requests.Session()
login_response = session.post(
    'https://smkn1cibinong.sch.id/api/auth/login',
    json={
        'email': 'admin@smkn1cibinong.sch.id',
        'password': 'password123'
    }
)

# Get posts
posts_response = session.get(
    'https://smkn1cibinong.sch.id/api/posts',
    params={'type': 'berita', 'page': 1}
)

posts_data = posts_response.json()
print(posts_data['data'])
```

### cURL

```bash
# Login
curl -X POST https://smkn1cibinong.sch.id/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smkn1cibinong.sch.id","password":"password123"}' \
  -c cookies.txt

# Get posts (with session cookie)
curl -X GET "https://smkn1cibinong.sch.id/api/posts?type=berita&page=1" \
  -b cookies.txt
```

---

## 📚 Additional Resources

- [Project Documentation](../DOCUMENTATION.md)
- [User Guide](../PANDUAN_PENGGUNAAN.md)
- [Architecture Documentation](../docs/context/architecture.md)

---

**Last Updated:** August 20, 2026

**API Version:** 1.0.0
