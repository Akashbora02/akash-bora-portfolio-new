# Vercel Deployment & Contact Form Data Architecture Guide
## Akash Bora — DevOps & Cloud Engineer Portfolio

This document explains how to deploy your portfolio to **Vercel**, how the contact form data flow works, how the built-in **Admin Dashboard** operates, and how to store data in a database.

---

## 1. How Contact Form Data Flows (Architecture & Storage)

When a recruiter or visitor submits the contact form on your portfolio (`index.html`), here is what happens:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Visitor Fills Contact Form (index.html)                  │
│    - Name, Email, Subject, Topic, Message                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Form Validation Passed)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Dual-Engine Storage & Notification Trigger               │
│                                                             │
│   ├── [Channel A: Private Admin Database (Instant)]         │
│   │   - Automatically saves inquiry into browser DB         │
│   │   - Available in your Admin Portal (admin.html)         │
│   │   - Protected with PIN (default: akash2026)             │
│   │   - 1-Click Export to CSV / JSON                        │
│   │                                                         │
│   └── [Channel B: Vercel Serverless API (/api/contact)]     │
│       - Receives JSON payload via Vercel Function           │
│       - Can forward instant email to akashbora0082@gmail.com│
│       - Can connect to MongoDB, Supabase, or PostgreSQL     │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Using Your Secure Admin Dashboard (`admin.html`)

You have a built-in, private Admin Dashboard to view, filter, manage, and export all inquiries.

1. Open **`admin.html`** (or press `Ctrl + Shift + A` anywhere on your portfolio).
2. Enter your private master security passcode.
3. **Features in the Admin Dashboard**:
   - **Real-Time Metrics**: Total Messages, Unread Inquiries, Job Openings, Consulting Requests.
   - **Search & Filter**: Search by keyword or filter by Topic / Status.
   - **View Full Message Modal**: Read the full inquiry with timestamps.
   - **1-Click Reply**: Opens pre-filled email client directly to the sender.
   - **Export to CSV**: Download all leads to an Excel/CSV spreadsheet for record keeping.
   - **Change Passcode**: Update and re-encrypt your passcode directly from within the dashboard.
   - **Mark as Read / Delete**: Manage inquiry status.

---

## 3. Step-by-Step Vercel Hosting Guide

### Method 1: Deploy via GitHub (Recommended — Auto Deploy on `git push`)

#### Step 1: Push your code to GitHub
```bash
cd akash-bora-portfolio
git init
git add .
git commit -m "feat: complete Akash Bora DevOps portfolio with Vercel API and Admin Dashboard"
git branch -M main
git remote add origin https://github.com/Akashbora02/akash-bora-portfolio.git
git push -u origin main
```

#### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** &rarr; **Project**.
3. Under **Import Git Repository**, select `akash-bora-portfolio`.
4. In the Project Settings:
   - **Framework Preset**: Leave as `Other` (Static HTML/JS).
   - **Root Directory**: `./`
5. Click **Deploy**.
6. Within 15 seconds, Vercel will give you a live production URL:
   `https://akash-bora-portfolio.vercel.app`

---

### Method 2: Deploy directly via Vercel CLI (Instant)

If you have Node.js installed, you can deploy straight from your terminal:

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Navigate to project
cd /home/newuser/.gemini/antigravity/scratch/akash-bora-portfolio

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod
```

---

## 4. (Optional) Connecting a Cloud Database to Vercel

If you want submissions stored in an external cloud database, you can connect any of these options in under 2 minutes:

### Option A: Free Resend API (Instant Email Delivery to your Gmail)
1. Sign up for free at [resend.com](https://resend.com).
2. Generate an API Key.
3. In Vercel Project Settings &rarr; **Environment Variables**, add:
   - `RESEND_API_KEY`: `re_xxxxxxxxx`
   - `NOTIFICATION_EMAIL`: `akashbora0082@gmail.com`
4. Now every inquiry submitted on the website will land directly in your Gmail inbox!

### Option B: Formspree (Zero-Code Email Forwarding)
1. Register at [formspree.io](https://formspree.io).
2. Copy your Form ID (e.g. `https://formspree.io/f/mqkvabzo`).
3. Set the form `action="https://formspree.io/f/YOUR_ID"` in `index.html`.

### Option C: MongoDB Atlas or Supabase
- Add your connection string in Vercel Environment Variables (`MONGODB_URI` or `SUPABASE_URL`) to query or insert records directly within `api/contact.js`.

---

## 5. Adding a Custom Domain on Vercel

1. In Vercel, open your project &rarr; **Settings** &rarr; **Domains**.
2. Enter your custom domain (e.g., `akashbora.dev` or `akashbora.in`).
3. Add the CNAME or A-Record provided by Vercel into your DNS registrar (GoDaddy, Namecheap, Route53, or Cloudflare).
4. Vercel automatically provisions a free SSL Certificate!

---
*Created for Akash Bora • Cloud & DevOps Engineer Portfolio*
