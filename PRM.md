# Project Run & Maintenance Manual (PRM.md)
## Akash Bora — DevOps & Cloud Engineer Portfolio

This manual provides complete, step-by-step instructions on how to run, customize, test, containerize, and deploy the portfolio website across multiple hosting platforms (GitHub Pages, Vercel, Netlify, AWS S3 + CloudFront, and Docker).

---

## Table of Contents
1. [Project Overview & File Structure](#1-project-overview--file-structure)
2. [How to Run Locally](#2-how-to-run-locally)
3. [Deployment Guides](#3-deployment-guides)
   - [Method A: Free Hosting on GitHub Pages (Recommended)](#method-a-free-hosting-on-github-pages-recommended)
   - [Method B: Deploy on Vercel / Netlify](#method-b-deploy-on-vercel--netlify)
   - [Method C: Production Deployment on AWS (S3 + CloudFront + Route53)](#method-c-production-deployment-on-aws-s3--cloudfront--route53)
   - [Method D: Docker Container Deployment](#method-d-docker-container-deployment)
4. [Customization & Updates](#4-customization--updates)
5. [Contact Form Integration Guide (EmailJS / Formspree)](#5-contact-form-integration-guide)

---

## 1. Project Overview & File Structure

```
akash-bora-portfolio/
├── index.html                   # Core single-page website
├── PRM.md                       # Complete Run & Deployment Manual
├── README.md                    # Project documentation
├── Dockerfile                   # Nginx multi-stage container build
├── docker-compose.yml           # Compose specification
├── nginx.conf                   # High-performance Nginx web server config
└── assets/
    ├── css/
    │   └── style.css            # Dark/Neon theme styles, animations, responsive design
    ├── js/
    │   ├── main.js              # Particles, stats counter, filter, form validation
    │   └── terminal.js          # Interactive DevOps terminal shell simulator
    └── images/
        ├── logo.jpg             # Custom Akash Bora Cloud Logo
        ├── aws-sap-cert.png     # AWS Solutions Architect Professional Badge
        └── projects/            # Clean SVG architecture diagrams
            ├── gitops-arch.svg
            ├── devsecops-pipeline.svg
            ├── observability-stack.svg
            └── terraform-cloud.svg
```

---

## 2. How to Run Locally

Choose any of the following methods to run the website locally on your computer:

### Option 1: VS Code Live Server (Easiest)
1. Open the `akash-bora-portfolio` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500`.

### Option 2: Python HTTP Server (No Install Required)
If you have Python installed:
```bash
# Navigate to the portfolio folder
cd akash-bora-portfolio

# For Python 3:
python3 -m http.server 8080

# For Windows / Python:
python -m http.server 8080
```
Open your browser and visit: `http://localhost:8080`

### Option 3: Node.js `http-server` / `serve`
```bash
npx serve .
# or
npx http-server -p 8080
```

---

## 3. Deployment Guides

### Method A: Free Hosting on GitHub Pages (Recommended)

GitHub Pages gives you a free HTTPS URL: `https://<your-username>.github.io/<repo-name>`

#### Step 1: Initialize Git and Push to GitHub
```bash
# Navigate to the project root
cd akash-bora-portfolio

# Initialize Git
git init

# Add files
git add .
git commit -m "feat: initial release of Akash Bora DevOps portfolio"

# Rename branch to main
git branch -M main

# Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/Akashbora02/akash-bora-portfolio.git

# Push to GitHub
git push -u origin main
```

#### Step 2: Enable GitHub Pages in Repository Settings
1. Go to your repository on GitHub: `https://github.com/Akashbora02/akash-bora-portfolio`
2. Click on **Settings** &rarr; **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   `https://akashbora02.github.io/akash-bora-portfolio/`

---

### Method B: Deploy on Vercel / Netlify

#### Deploying on Vercel:
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **"Add New Project"** &rarr; Import `akash-bora-portfolio`.
3. Keep default settings (Framework Preset: *Other*).
4. Click **Deploy**.
5. Your portfolio is instantly live on a fast global CDN with automated SSL.

#### Deploying on Netlify:
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag and drop the `akash-bora-portfolio` folder directly into the Netlify dashboard, or link your GitHub repository.
3. Your site is deployed within seconds.

---

### Method C: Production Deployment on AWS (S3 + CloudFront + Route53)

As an AWS Certified Solutions Architect, deploying on AWS demonstrates end-to-end cloud engineering skills.

#### Step 1: Create an S3 Bucket
```bash
aws s3 mb s3://akash-bora-portfolio --region us-east-1
```

#### Step 2: Upload Files to S3
```bash
aws s3 sync . s3://akash-bora-portfolio --exclude ".git/*" --exclude "PRM.md"
```

#### Step 3: Configure CloudFront Distribution
1. In the AWS Console, open **CloudFront** &rarr; **Create Distribution**.
2. **Origin domain**: Select your S3 bucket `akash-bora-portfolio.s3.us-east-1.amazonaws.com`.
3. **Origin Access Control (OAC)**: Enable OAC to restrict direct S3 public access.
4. **Viewer Protocol Policy**: Set to *Redirect HTTP to HTTPS*.
5. **Default Root Object**: Enter `index.html`.
6. Attach an **AWS Certificate Manager (ACM)** SSL certificate for your custom domain (e.g., `akashbora.dev` or `akashbora.com`).
7. Point your Route53 DNS record (A-Record Alias) to the CloudFront distribution domain name.

---

### Method D: Docker Container Deployment

You can package and run your portfolio inside a lightweight, production-tuned Nginx Alpine container.

#### Build and Run with Docker:
```bash
# Build the image
docker build -t akash-portfolio:latest .

# Run container on port 80
docker run -d -p 80:80 --name akash-portfolio-app akash-portfolio:latest
```
Visit: `http://localhost`

#### Run with Docker Compose:
```bash
docker compose up -d
```

---

## 4. Customization & Updates

- **Updating Experience / Jobs**: Edit the `<section id="experience">` in `index.html`.
- **Adding New Skills**: Add new `<span class="skill-badge">` elements under `<section id="skills">`.
- **Adding New Projects**: Duplicate a `.project-card` inside `<section id="projects">` and create corresponding modal entries.
- **Terminal Commands**: Add or modify custom commands in `assets/js/terminal.js` under the `terminalCommands` object.

---

## 5. Contact Form Integration Guide

The contact form is pre-styled and includes client-side validation and feedback. To receive real emails in your inbox, you can choose either of these 2 free services:

### Option A: Formspree (No JavaScript Changes Required)
1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and copy your Form ID (e.g., `https://formspree.io/f/mqkvabzo`).
3. In `index.html`, update the `<form>` tag:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option B: EmailJS (Direct Client-Side Sending)
1. Sign up at [emailjs.com](https://www.emailjs.com/).
2. Add EmailJS SDK to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
3. Initialize with your public key in `assets/js/main.js` and call `emailjs.sendForm(...)`.

---
*Maintained by Akash Bora • Cloud & DevOps Engineer*
