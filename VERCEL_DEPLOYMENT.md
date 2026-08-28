# Vercel & Neon PostgreSQL Deployment Manual

This guide walks you through deploying the portfolio on **Vercel** with a **Neon PostgreSQL** database backend.

---

## 1. Quick Deploy to Vercel

1. Push your repository to GitHub (`Akashbora02/akash-bora-portfolio-new`).
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard).
3. Click **"Add New..."** &rarr; **Project** &rarr; Import `akash-bora-portfolio-new`.
4. Click **Deploy**.

---

## 2. Connect Neon PostgreSQL Database

1. Open your [Neon Console](https://console.neon.tech).
2. Select database: `akash-bora-portfolio-new`.
3. Copy the connection string:
   ```text
   postgresql://[user]:[password]@[endpoint].neon.tech/akash-bora-portfolio-new?sslmode=require
   ```
4. In your **Vercel Dashboard**:
   - Go to **Project Settings** &rarr; **Environment Variables**.
   - Add **Key**: `POSTGRES_URL` (or `DATABASE_URL`).
   - Add **Value**: *(Your Neon connection string)*.
   - Check all 3 environments: **Production**, **Preview**, **Development**.
   - Click **Save**.
5. Go to **Deployments** tab in Vercel &rarr; Click `...` &rarr; **Redeploy**.

---

## 3. Verify Admin Portal

1. Visit `https://your-domain.vercel.app/admin`.
2. Enter security passcode: `Akash@Cloud2026!`.
3. Verify the header status shows:
   `● PostgreSQL: akash-bora-portfolio-new (Connected)`.
