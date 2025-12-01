# ta-project
# 📘 ECOMMERCE WEBSITE STORE — README.md

Dokumen ini merupakan **perencanaan arsitektur, blueprint, dan panduan eksekusi bertahap** untuk pembangunan sistem **E-Commerce Penjualan Website** dengan role **Buyer & Admin**, menggunakan:

* **Frontend:** Vue 3 CLI, TailwindCSS, Pinia, Vue Router, ApexCharts
* **Backend:** Fastify, Prisma, PostgreSQL
* **Payment Gateway:** DANA
* **Storage:** Minio / AWS S3
* **Auth:** JWT untuk Admin & Buyer

Dokumen ini digunakan sebagai **direksi AI**, yaitu arahan komprehensif agar seluruh agen, modul, atau developer (termasuk AI assistant) dapat mengikuti rencana secara konsisten.

---

# 🧩 1. TUJUAN PROJECT

Membangun platform e-commerce tempat pembeli dapat membeli **produk digital berupa file website / template**, sementara admin mengelola produk dan transaksi serta melihat statistik penjualan.

---

# 🧩 2. FITUR UTAMA (ROLE-BASED)

## 👤 Buyer

* Register & Login (JWT)
* Edit Profile
* Browse produk website
* Lihat detail produk
* Checkout & pembayaran via DANA
* Riwayat pesanan
* Download asset setelah pembayaran

## 🛠 Admin

* Login (JWT)
* CRUD Produk (Website)
* Upload asset (thumbnail & ZIP)
* Manajemen Order
* Dashboard Statistik (ApexCharts)
* Manajemen Buyer (opsional)

---

# 🧩 3. ARSITEKTUR SISTEM

## Frontend

* Vue 3 CLI
* TailwindCSS
* Pinia
* Vue Router
* Axios
* Vue-ApexCharts

## Backend

* Fastify
* Prisma ORM
* PostgreSQL
* Fastify-JWT
* Fastify-Multipart (upload)
* Fastify-Swagger (opsional dokumentasi)

## Infrastruktur

* Storage: Minio (dev) / S3 (production)
* Deployment: Docker / Docker Compose + CI/CD

---

# 🧩 4. DATABASE MODEL (PRISMA)

### users

* id
* name
* email
* password_hash
* role: admin/buyer
* created_at

### websites

* id
* title
* description
* price_cents
* slug
* thumbnail_key
* asset_key
* demo_url
* status
* created_at

### orders

* id
* buyer_id
* website_id
* amount_cents
* payment_status
* payment_method
* payment_provider_id
* created_at
* paid_at

### transactions

* id
* order_id
* provider_tx_id
* provider_payload (JSON)
* status
* created_at

### admin_stats_cache

* date
* revenue_cents
* orders_count

---

# 🧩 5. API ENDPOINTS

## Auth (Buyer & Admin)

* POST /api/auth/buyer/register

* POST /api/auth/buyer/login

* GET /api/auth/buyer/me

* PUT /api/auth/buyer/update

* POST /api/auth/admin/login

* GET /api/auth/admin/me

## Buyer

* GET /api/websites
* GET /api/websites/:slug
* POST /api/buyer/orders
* GET /api/buyer/orders
* GET /api/buyer/orders/:id
* GET /api/buyer/orders/:id/download

## Admin

* CRUD Produk
* List & Detail Order
* Dashboard Stats

## Payment — DANA

* POST /api/payments/dana/initiate
* POST /api/payments/dana/webhook

---

# 🧩 6. FLOW TRANSAKSI (BUYER)

1. Buyer login
2. Pilih produk
3. Checkout → create order
4. Backend meminta pembayaran ke DANA
5. DANA mengirim payment URL / QR
6. Buyer membayar
7. DANA webhook → update order = PAID
8. Buyer download asset

---

# 🧩 7. STRUKTUR DIREKTORI PROJECT

## Frontend

```
src/
  components/
  pages/
    admin/
    buyer/
  stores/
  services/
  router/
  assets/
  main.js
```

## Backend

```
src/
  routes/
    auth/
    buyer/
    admin/
    payments/
  services/
    dana/
    s3/
  prisma/
  plugins/
  app.js
```

---

# 🧩 8. PENTAHAPAN EKSEKUSI DEVELOPMENT

Tahapan ini dibagi agar tim / AI agent bisa menjalankan project step by step.

## **🔹 PHASE 1 — FUNDAMENTAL SETUP**

* Setup monorepo atau repo terpisah frontend/backend
* Inisialisasi Fastify + Prisma + PostgreSQL
* Inisialisasi Vue 3 CLI + Tailwind + Router + Pinia
* Setup Docker + Docker Compose
* Setup environment variable (.env)

## **🔹 PHASE 2 — AUTHENTICATION SYSTEM**

* Implement buyer register/login
* Implement admin login
* Generate JWT token
* Protect route dengan role-based guard

## **🔹 PHASE 3 — PRODUCT MANAGEMENT (ADMIN)**

* CRUD Website (backend)
* Upload thumbnail & ZIP ke S3/Minio
* Admin panel untuk input data
* Listing produk di frontend

## **🔹 PHASE 4 — BUYER MODULE**

* List seluruh produk
* Detail produk
* Checkout UI + API
* Riwayat pesanan buyer

## **🔹 PHASE 5 — PAYMENT INTEGRATION (DANA)**

* Backend payment initiate → DANA
* Webhook handler
* Update order status → PAID
* Validasi signature keamanan

## **🔹 PHASE 6 — DOWNLOAD SYSTEM**

* Generate secure download URL
* Hanya dapat diakses oleh buyer yang sudah membayar

## **🔹 PHASE 7 — ADMIN DASHBOARD (APEXCHARTS)**

* Statistik pendapatan
* Statistik order
* Grafik produk terlaris
* API stats range 7/30 hari

## **🔹 PHASE 8 — DEPLOYMENT**

* Docker production build
* Deploy backend (Render / Fly.io / AWS / DigitalOcean)
* Deploy frontend (Vercel / Netlify / Static Hosting)

---

# 🧩 9. REKOMENDASI OPTIMASI & KEAMANAN

* Rate limiting pada auth & checkout
* Verifikasi HMAC/Signature DANA
* Hash password bcrypt
* JWT expiry + refresh token opsional
* Validasi input dengan Zod
* HTTPS wajib di production
* Anti-leech download link menggunakan signed URL
* Gunakan CDN untuk file besar

---

# 🧩 10. CATATAN DIREKSI AI

Dokumen ini dapat digunakan untuk:

1. Menjadi panduan utama AI assistant ketika membuat bagian code
2. Menjadi blueprint konsisten untuk seluruh modul
3. Menjawab pertanyaan otomatis berdasarkan rencana arsitektur
4. Menghasilkan kode yang tidak menyimpang dari desain awal

Jika ada perubahan requirement, bagian yang terdampak harus diperbarui dalam dokumen ini agar semua modul tetap sinkron.

---


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
