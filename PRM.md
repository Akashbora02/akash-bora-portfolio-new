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
    │   ├── ab-agent.js          # AB Agent: Cloud & DevOps Autonomous AI Copilot with categorized prompts
    │   ├── main.js              # Dynamic typing, smooth scroll, form validation
    │   ├── terminal.js          # Interactive Cloud Shell simulator with Linux & AWS diagnostics
    │   ├── three-scene.js       # 3D WebGL Three.js interactive cloud topology engine
    │   └── tilt-3d.js           # 3D holographic card tilt & specular reflection engine
    └── images/
        ├── logo-banner.png      # Full logo banner (transparent dark-mode optimized)
        ├── logo-icon.png        # Square icon badge for favicon & mobile header
        ├── logo-dark.png        # Transparent logo with glowing cyan DevOps loop
        ├── aws-sap-cert.png     # AWS Solutions Architect Professional Badge
        ├── agentic-ai-cert.png  # TrainWithShubham Agentic AI Masterclass Badge
        └── projects/            # Clean SVG architecture diagrams
            ├── ai-sre-agent.svg # Autonomous AIOps & SRE Self-Healing Kubernetes Agent
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

---

## 5. 2026 3D WebGL Topology & Smooth Hover System

### 3D Three.js Topology Layout & Zero Overlap
- **Desktop & Laptop (>= 992px)**: The 3D neural core and orbital rings are positioned dynamically at `(7.2, 0.2, 0)` behind the right-column Cloud Shell Terminal. This ensures **zero overlap** with the hero name ("Akash Bora"), typing headline, or subtitle.
- **Tablet & Mobile (< 992px)**: The 3D cluster is dynamically repositioned behind the terminal window at the lower section (`y = -6.5` on tablet, `y = -9.0` on mobile) with scaled wireframe opacity (`0.45` core, `0.35` rings), keeping the text in the upper section 100% readable.
- **3D Mode Selector Header**: Moved from the left column into a dedicated `3D INTERACTIVE TOPOLOGY` header directly above the Terminal Window, providing intuitive controls for `AI Core`, `Cloud`, and `K8s` modes.

### Physics-Based Smooth Hover Engine (`assets/js/tilt-3d.js`)
- **Fluid Damping Lerp**: Uses `requestAnimationFrame` with a 12% spring factor (`current += (target - current) * 0.12`), eliminating hover snapping or sudden jumps.
- **Dynamic Specular Glare**: Real-time holographic glass specular reflection with `mix-blend-mode: screen`.
- **Gentle Rest Settle**: On cursor exit, smoothly returns to flat rest state and automatically clears inline transforms.
- **Touch Device Protection**: Automatically disabled on mobile/touch screens (`maxTouchPoints > 0` or width < 992px) to prevent touch scroll trapping or sticky hover states.

### Multi-Device Responsive Testing
- **Mobile (375px - 576px)**: Fluid single-column layout, pill navbar collapse, full-width CTA buttons, touch-friendly terminal.
- **Tablet (768px - 991px)**: Vertical stack with centered topology behind terminal and full-width container margins.
- **Laptop (992px - 1199px)**: Compact navbar with `white-space: nowrap` ensuring all 8 links fit on one line without "CI/CD Flow" wrapping.
- **Desktop (1200px+)**: Full widescreen 2-column layout with 3D WebGL camera depth.

---

## 6. Final Production Polish & Career-Focused Enhancements

### Dedicated AB Agent — Real Cloud & DevOps AI Copilot
- **Single Right-Side Floating Action Button**: Positioned cleanly at the bottom right (`bottom: 24px; right: 24px`) with a luminous cyan-purple gradient, robot avatar, and live pulsing green "Online" indicator. Zero navbar clutter.
- **Modern User-Friendly Copilot Drawer**: An interactive floating glass drawer widget that slides up seamlessly on desktop without blocking the whole page, and transforms into a responsive full-height bottom sheet on mobile.
- **Domain-Specific Cloud + DevOps Reasoning Engine**: Deeply trained on Akash Bora's actual production stack:
  - AWS Cloud Architecture (Multi-AZ VPC, EKS, RDS Aurora, CloudFormation, IAM condition keys, Route 53)
  - Enterprise Linux Systems Engineering (RHEL, Ubuntu, CentOS diagnostics for OOM, CPU load, disk space, and systemd daemons)
  - Kubernetes & GitOps Delivery (Argo CD declarative drift sync, Helm charts, Karpenter dynamic node autoscaling)
  - Cloud FinOps (CloudNetra platform, AWS CUR & FOCUS 1.2 ingestion pipelines, PostgreSQL / TimescaleDB)
  - Interviewer & Recruiter Insights (Detailed breakdown of why to hire Akash Bora, verified credentials, and direct reach-out links)
- **Interactive Capabilities**:
  - Filter tabs by domain: `All Topics`, `☁️ AWS Cloud`, `🐧 Linux Systems`, `☸️ K8s & GitOps`, `💰 FinOps`, `💼 Why Hire?`
  - Dynamic prompt pills for instant one-click questions
  - Syntax-highlighted code blocks with a one-click `[Copy Code]` button
  - In-chat actionable navigation buttons that scroll smoothly to relevant sections (`#projects`, `#experience`, `#contact`)
  - Realistic typing animation with streaming delay simulation

### Hero Section Redesign: High-Converting Realistic Buttons & Bold Sub-Points
- **Realistic CTA Buttons**: Replaced legacy "3D Arch", "Experience", and "LinkedIn" buttons with realistic, career-accelerating buttons:
  1. `Featured Projects` (Primary Glow)
  2. `CI/CD & GitOps Flow` (Secondary Glass)
  3. `AWS Certified SAP` (Secondary Glass with official AWS gold badge)
  4. `Contact Akash` (Secondary Glass)
- **High-Impact Sub-Points with Bold Wording**:
  - ☁️ **AWS Cloud Infrastructure:** Hands-on engineering across **EKS, Multi-AZ VPC, EC2, RDS Aurora, ALB, S3, IAM, Route 53**, and **CloudWatch** delivering **99.95% high availability**.
  - 🐧 **Linux Production Operations:** Enterprise **RHEL, Ubuntu & CentOS administration**, kernel diagnostics, systemd services, and **Bash / Python automation** eliminating operational toil.
  - ☸️ **Kubernetes & GitOps Delivery:** Containerized microservices on **Amazon EKS**, declarative provisioning with **Terraform IaC**, and automated drift sync via **Argo CD & CI/CD pipelines**.
  - 💰 **Cloud FinOps & Governance:** Scalable **multi-account AWS onboarding (CloudFormation / IAM roles)**, S3 cost-data pipelines, and **CUR / FOCUS 1.2 data validation** to eliminate cloud waste.

### Deep Linux + AWS Experience Realignment (ChatGPT Aligned)
- **Groots Software Technologies (Cloud Engineer)**:
  - AWS Multi-Account Governance, VPC networking, EKS clusters, and CloudFormation onboarding templates.
  - FinOps engineering: Ingestion pipelines for AWS Cost & Usage Reports (CUR) and AWS FOCUS 1.2 data specifications with PostgreSQL and TimescaleDB.
  - Linux production operations: Resource monitoring, systemd services, and safe Bash automated volume cleanup.
- **Hisan Labs (DevOps Engineer)**:
  - AWS cloud infrastructure (EC2, VPC, ALB, S3, IAM) and Docker microservices containerization.
  - Automated CI/CD pipelines via Jenkins & GitHub Actions with Bash & Python automation.
  - Linux system administration, service availability troubleshooting, and systemd management.
- **Tradetron (Linux Systems & Support Engineer)**:
  - Enterprise Linux administration (RHEL, Ubuntu, CentOS) in high-frequency trading environments.
  - System-level root-cause analysis (`journalctl`, `iotop`, `netstat`, `/proc`), disk space management, and memory diagnostics.
  - Bash shell scripting automation for health checks, log rotation, and standardized SOP runbooks.

### Comprehensive Google SEO Suite for "Akash Bora"
- **Title Tag**: `Akash Bora | AWS Cloud & DevOps Engineer | Linux Systems & Kubernetes Specialist`
- **Rich Meta Description & Strong Keywords**: Targeted for high Google ranking on "Akash Bora", "Akash Bora Cloud Engineer", "Akash Bora DevOps", "Akash Bora Pune".
- **Structured Data (Schema.org JSON-LD)**: Rich `Person`, `ProfilePage`, and `WebSite` graph schema for Google Rich Snippets and Knowledge Graph.
- **Search Engine Assets**: `robots.txt` and `sitemap.xml` generated with priority indexing.
