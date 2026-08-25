# Project Run & Maintenance Manual (PRM.md)
## Akash Bora — DevOps & Cloud Engineer Portfolio

This manual provides complete, step-by-step instructions on how to run, customize, test, containerize, and deploy the portfolio website across multiple hosting platforms (GitHub Pages, Vercel, Netlify, AWS S3 + CloudFront, and Docker).

---

## Table of Contents
1. [Project Overview & File Structure](#1-project-overview--file-structure)
2. [How to Run Locally](#2-how-to-run-locally)
3. [Deployment Guides](#3-deployment-guides)
   - [Method A: Deploy on Vercel (Auto CI/CD with Clean `/admin` Routing)](#method-a-deploy-on-vercel)
   - [Method B: Free Hosting on GitHub Pages](#method-b-free-hosting-on-github-pages)
   - [Method C: Production Deployment on AWS (S3 + CloudFront + Route53)](#method-c-production-deployment-on-aws-s3--cloudfront--route53)
   - [Method D: Docker Container Deployment](#method-d-docker-container-deployment)
4. [Admin Portal & Inquiries Database (`/admin`)](#4-admin-portal--inquiries-database)
5. [Mobile & Tablet Responsive Architecture](#5-mobile--tablet-responsive-architecture)
6. [Contact Form Integration & Serverless API](#6-contact-form-integration--serverless-api)

---

## 1. Project Overview & File Structure

```
akash-bora-portfolio/
├── index.html                   # Core single-page responsive portfolio
├── admin/                       # Clean /admin route directory
│   └── index.html               # Crypto-locked Admin Inquiries Dashboard
├── admin.html                   # Fallback root admin portal
├── vercel.json                  # Vercel security headers & /admin rewrite rules
├── VERCEL_DEPLOYMENT.md         # Detailed Vercel and Database flow guide
├── PRM.md                       # Comprehensive Run & Deployment Manual
├── README.md                    # Repository documentation
├── Dockerfile                   # Production Nginx container build
├── docker-compose.yml           # Compose orchestration
├── nginx.conf                   # High-performance Nginx web server config
├── api/
│   └── contact.js               # Vercel Serverless Function for contact form
└── assets/
    ├── css/
    │   └── style.css            # Responsive styles, glassmorphism, animations
    ├── js/
    │   ├── main.js              # Particles, typing effect, mobile nav, form sync
    │   └── terminal.js          # Interactive DevOps terminal shell simulator
    └── images/
        ├── logo.jpg             # Custom Akash Bora Cloud Logo
        ├── aws-sap-cert.png     # AWS Solutions Architect Professional Badge
        ├── agentic-ai-cert.png  # TrainWithShubham Agentic AI Masterclass Badge
        └── projects/            # Clean SVG architecture diagrams
            ├── gitops-arch.svg
            ├── devsecops-pipeline.svg
            ├── observability-stack.svg
            └── terraform-cloud.svg
```

---

## 2. How to Run Locally

### Option 1: Python HTTP Server (Fastest & Universal)
```bash
# Navigate to project directory
cd akash-bora-portfolio

# Start server on port 8000
python3 -m http.server 8000
```
- Open portfolio: `http://localhost:8000`
- Open Admin Portal: `http://localhost:8000/admin`

### Option 2: VS Code Live Server
1. Open the `akash-bora-portfolio` folder in **VS Code**.
2. Right-click `index.html` &rarr; **"Open with Live Server"**.

### Option 3: Node.js Serve
```bash
npx serve .
```

---

## 3. Deployment Guides

### Method A: Deploy on Vercel (Recommended)

Vercel provides automatic HTTPS, edge CDN caching, serverless API execution, and clean `/admin` URLs.

#### Step 1: Push code to your GitHub Repository
```bash
cd akash-bora-portfolio
git init
git add .
git commit -m "feat: complete responsive DevOps portfolio with Admin portal and Vercel config"
git branch -M main
git remote add origin https://github.com/Akashbora02/akash-bora-portfolio.git
git push -u origin main
```

#### Step 2: Import into Vercel
1. Log in to [vercel.com](https://vercel.com) with your GitHub account.
2. Click **"Add New..."** &rarr; **Project**.
3. Select `akash-bora-portfolio` and click **Import**.
4. Keep the default settings and click **Deploy**.
5. Your website is live with production URL `https://akash-bora-portfolio.vercel.app`!

---

### Method B: Free Hosting on GitHub Pages

1. Push your code to GitHub as shown above.
2. In your GitHub repository, go to **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and `/ (root)`.
4. Click **Save**. Your site will be published at `https://Akashbora02.github.io/akash-bora-portfolio/`.

---

### Method C: Production Deployment on AWS (S3 + CloudFront + Route53)

```bash
# 1. Create S3 bucket
aws s3 mb s3://akashbora-portfolio --region ap-south-1

# 2. Sync all files
aws s3 sync . s3://akashbora-portfolio --delete --exclude ".git/*"

# 3. Invalidate CloudFront CDN Cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### Method D: Docker Container Deployment

```bash
# Build Docker image
docker build -t akash-portfolio:latest .

# Run container on port 80
docker run -d -p 80:80 --name my-portfolio akash-portfolio:latest
```

---

## 4. Admin Portal & Inquiries Database (`/admin`)

- Access path: **`/admin`** (or press **`Ctrl + Shift + A`** / `Cmd + Shift + A` on any page).
- **Security Engine**: Passcode verified using native **Web Crypto SHA-256 with cryptographic salt** (zero plaintext).
- **Brute-force protection**: 60-second lockout after 3 failed attempts.
- **Features**: Live metrics, category filter, search, full message view modal, 1-click email reply, CSV export, and passcode rotation.

---

## 5. Mobile & Tablet Responsive Architecture

The entire portfolio is engineered for fluid responsiveness across all device viewports:
- **Mobile (< 576px)**: Touch-friendly hamburger menu, full-width CTA buttons, 16px form inputs (preventing iOS auto-zoom), 2x2 stat grids, horizontal scrollable pipelines, and single-column project/experience cards.
- **Tablet (576px – 991px)**: Balanced 2-column grids, adaptive typography using CSS `clamp()`, and touch scroll containers.
- **Desktop (>= 992px)**: Glassmorphic sticky navbar, 3D interactive terminal, animated particle network, and hover elevation.

---
*Created for Akash Bora • Cloud & DevOps Engineer Portfolio*
