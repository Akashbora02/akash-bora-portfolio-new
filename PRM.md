# Project Run & Maintenance Manual (PRM.md)
## Akash Bora — DevOps & Cloud Engineer Portfolio

This manual provides complete, step-by-step instructions on how to run, customize, test, containerize, and deploy the portfolio website across multiple hosting platforms (Vercel with PostgreSQL, GitHub Pages, Netlify, AWS S3 + CloudFront, and Docker).

---

## Table of Contents
1. [Project Overview & File Structure](#1-project-overview--file-structure)
2. [PostgreSQL Database Setup & Architecture](#2-postgresql-database-setup--architecture)
3. [How to Run Locally](#3-how-to-run-locally)
4. [Deployment Guides](#4-deployment-guides)
   - [Method A: Deploy on Vercel with PostgreSQL (Recommended)](#method-a-deploy-on-vercel-with-postgresql)
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
├── VERCEL_DEPLOYMENT.md         # Detailed Vercel & PostgreSQL deployment guide
├── PRM.md                       # Comprehensive Run & Deployment Manual
├── README.md                    # Repository documentation
├── Dockerfile                   # Production Nginx container build
├── docker-compose.yml           # Compose orchestration
├── nginx.conf                   # High-performance Nginx web server config
├── api/
│   ├── contact.js               # Serverless Function: POST contact form to PostgreSQL
│   └── messages.js              # Serverless Function: GET/PATCH/DELETE admin inquiries
└── assets/
    ├── css/
    │   └── style.css            # Responsive styles, dark glassmorphism, animations
    ├── js/
    │   ├── main.js              # Particles, typing effect, mobile nav, form submission
    │   └── terminal.js          # Interactive DevOps terminal shell simulator
    └── images/
        ├── logo.png             # Full logo (transparent dark-mode optimized)
        ├── logo-dark.png        # Navbar & Footer logo with glowing cyan DevOps loop
        ├── logo-icon.png        # Square icon badge for favicon & mobile header
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

The portfolio supports permanent database storage using PostgreSQL (Vercel Postgres, Neon DB, Supabase, AWS RDS, or Railway).

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

### Free 1-Click PostgreSQL Setup on Vercel:
1. In your **Vercel Dashboard**, go to the **Storage** tab.
2. Click **Create Database** &rarr; Select **Postgres (Neon)**.
3. Click **Connect to Project** &rarr; Select `akash-bora-portfolio-new`.
4. Vercel automatically configures `POSTGRES_URL` in your environment variables!

---

## 3. How to Run Locally

### Option 1: Python HTTP Server (Fastest)
```bash
cd akash-bora-portfolio
python3 -m http.server 8000
```
- Open portfolio: `http://localhost:8000`
- Open Admin Portal: `http://localhost:8000/admin`

### Option 2: Node.js Serve
```bash
npx serve .
```

---

## 4. Deployment Guides

### Method A: Deploy on Vercel with PostgreSQL (Recommended)

1. Push to your GitHub repository:
```bash
git push origin main
```
2. In Vercel, attach your Postgres database or add environment variable:
   - `POSTGRES_URL`: `postgres://user:password@host:5432/dbname?sslmode=require`
   - `NOTIFICATION_EMAIL`: `akashbora0082@gmail.com`
   - `RESEND_API_KEY` (Optional for instant email alerts)

---

## 5. Admin Portal & Inquiries Database (`/admin`)

- **Route**: `https://your-domain.vercel.app/admin` (or press **`Ctrl + Shift + A`**).
- **Authentication**: Native Web Crypto SHA-256 salted hashing with 3-attempt brute-force rate limiter.
- **Features**:
  - Live PostgreSQL synchronization.
  - Mark as Read/Replied (persisted in PostgreSQL).
  - 1-Click Mailto reply.
  - 1-Click CSV Export of all inquiries.
  - Delete inquiries.
  - Passcode rotation tool.

---

## 6. Mobile & Tablet Responsive Architecture

- **Fluid Typography**: Dynamic sizing using CSS `clamp()` across all devices.
- **Experience Cards**: `overflow-wrap: anywhere` with auto-wrapping badges to prevent any character cutoffs on narrow phone screens.
- **Projects Showcase**: Diagram overlay badges dock cleanly on mobile viewports so they never overlap architecture graphics.
- **CI/CD Visualizer**: Horizontal touch-momentum scrolling across all 5 deployment stages.
