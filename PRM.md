# Project Run & Maintenance Manual (PRM.md)
## Akash Bora — DevOps & Cloud Engineer Portfolio

This manual provides complete, step-by-step instructions on how to run, customize, test, containerize, and deploy the portfolio website across multiple hosting platforms (Vercel with Neon PostgreSQL, GitHub Pages, Netlify, AWS S3 + CloudFront, and Docker).

---

## Table of Contents
1. [Project Overview & File Structure](#1-project-overview--file-structure)
2. [PostgreSQL Database Setup & Architecture](#2-postgresql-database-setup--architecture)
3. [How to Run Locally](#3-how-to-run-locally)
4. [Deployment Guides](#4-deployment-guides)
   - [Method A: Deploy on Vercel with Neon PostgreSQL (Recommended)](#method-a-deploy-on-vercel-with-neon-postgresql)
   - [Method B: Free Hosting on GitHub Pages](#method-b-free-hosting-on-github-pages)
   - [Method C: Production Deployment on AWS (S3 + CloudFront + Route53)](#method-c-production-deployment-on-aws-s3--cloudfront--route53)
   - [Method D: Docker Container Deployment](#method-d-docker-container-deployment)
5. [Admin Portal & Inquiries Database (`/admin`)](#5-admin-portal--inquiries-database)
6. [Mobile & Tablet Responsive Architecture](#6-mobile--tablet-responsive-architecture)

---

## 1. Project Overview & File Structure

```
akash-bora-portfolio/
├── index.html                   # Core single-page responsive portfolio
├── admin/                       # Clean /admin route directory
│   └── index.html               # Crypto-locked Admin Portal with PostgreSQL Sync
├── admin.html                   # Fallback root admin portal
├── schema.sql                   # PostgreSQL table schema & indexes
├── package.json                 # Node dependencies for Vercel serverless (pg)
├── vercel.json                  # Vercel security headers, cache controls & /admin rewrites
├── VERCEL_DEPLOYMENT.md         # Detailed Vercel & Neon PostgreSQL deployment guide
├── PRM.md                       # Comprehensive Run & Deployment Manual
├── README.md                    # Repository documentation
├── Dockerfile                   # Production Nginx container build
├── docker-compose.yml           # Compose orchestration
├── nginx.conf                   # High-performance Nginx web server config
├── api/
│   ├── auth.js                  # Serverless Function: Master passcode authentication
│   ├── contact.js               # Serverless Function: POST contact form to PostgreSQL
│   ├── db-status.js             # Serverless Function: PostgreSQL diagnostics & live health check
│   └── messages.js              # Serverless Function: GET/PATCH/DELETE admin inquiries
└── assets/
    ├── css/
    │   └── style.css            # Responsive styles, dark glassmorphism, animations
    ├── js/
    │   ├── main.js              # Particles, typing effect, mobile nav, form submission
    │   └── terminal.js          # Interactive DevOps terminal shell simulator
    └── images/
        ├── logo-banner.png      # Full logo banner (transparent dark-mode optimized)
        ├── logo-icon.png        # Square icon badge for favicon & mobile header
        ├── logo-dark.png        # Transparent logo with glowing cyan DevOps loop
        ├── aws-sap-cert.png     # AWS Solutions Architect Professional Badge
        ├── agentic-ai-cert.png  # TrainWithShubham Agentic AI Masterclass Badge
        └── projects/            # Clean SVG architecture diagrams
            ├── gitops-arch.svg
            ├── devsecops-pipeline.svg
            ├── observability-stack.svg
            └── terraform-cloud.svg
```

---

## 2. PostgreSQL Database Setup & Architecture

The portfolio supports permanent cloud database storage using **Neon PostgreSQL** or **Vercel Postgres**.

### Database Schema (`schema.sql`)
```sql
CREATE TABLE IF NOT EXISTS inquiries (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  topic VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(32) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
```

### Free 1-Click PostgreSQL Setup on Neon / Vercel:
1. In your **Neon Console** (console.neon.tech), create database `akash-bora-portfolio-new`.
2. Copy your Neon connection string: `postgresql://user:password@endpoint.neon.tech/akash-bora-portfolio-new?sslmode=require`.
3. In **Vercel Dashboard** &rarr; Project **Settings** &rarr; **Environment Variables**, add:
   - **Key**: `POSTGRES_URL` (or `DATABASE_URL`)
   - **Value**: *(Your Neon connection string)*
   - **Environments**: Production, Preview, Development.
4. Redeploy project in Vercel.

---

## 3. How to Run Locally

### Option 1: Python HTTP Server (Fastest)
```bash
cd akash-bora-portfolio
python3 -m http.server 8000
```
- Open portfolio: `http://localhost:8000`
- Open Admin Portal: `http://localhost:8000/admin`

---

## 4. Admin Portal Security & Operations (`/admin`)

- **Secret Passcode**: `Akash@Cloud2026!`
- **Stealth Keybinding**: `Ctrl + Shift + A` (or `Cmd + Shift + A`) from any page.
- **Operations Supported**:
  - Live inquiry streaming from Neon PostgreSQL.
  - 1-Click "Clear DB" to wipe records.
  - 1-Click "Add Sample Lead" to test PostgreSQL writes.
  - 1-Click "Export CSV".
