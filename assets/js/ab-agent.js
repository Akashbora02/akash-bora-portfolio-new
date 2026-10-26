/**
 * ==============================================================================
 * AB AGENT — Cloud & DevOps Autonomous AI Copilot
 * ==============================================================================
 * Domain-specific AI assistant trained on Akash Bora's AWS Cloud Architecture,
 * Enterprise Linux Production Operations, Kubernetes GitOps, and FinOps pipelines.
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // Comprehensive Technical Knowledge Base for Cloud + DevOps
  // ----------------------------------------------------------------------------
  const KNOWLEDGE_BASE = [
    {
      id: 'why_hire',
      keywords: ['why hire', 'hire akash', 'recommend', 'value', 'fit', 'strengths', 'benefits', 'candidate', 'interview akash'],
      topic: 'hire',
      response: `### 💡 Why Hire Akash Bora for Your Cloud / DevOps Team?

Akash is a battle-tested **Cloud & DevOps Engineer** and **AWS Certified Solutions Architect – Professional** who bridges production infrastructure with developer productivity:

1. **AWS Multi-Account & Production Architecture**:
   - Hands-on expertise across **EKS, Multi-AZ VPC, EC2, RDS Aurora, S3, IAM, ALB, Route 53, and CloudFormation**.
   - Maintains **99.95% infrastructure uptime** for high-concurrency client workloads.

2. **Enterprise Linux Systems & Deep Troubleshooting**:
   - Strong foundation in **RHEL, Ubuntu, and CentOS** internals (kernel tuning, systemd, process isolation, memory/swap, and disk I/O diagnostics).
   - Proven track record resolving production incidents quickly without risking running workloads or stateful data.

3. **Cloud FinOps & Multi-Account Governance**:
   - Real-world experience building ingestion pipelines for **AWS Cost and Usage Reports (CUR)** and **AWS FOCUS 1.2 data specifications** backed by PostgreSQL and TimescaleDB.
   - Automated onboarding with CloudFormation templates and cross-account IAM roles.

4. **Declarative GitOps & Automated CI/CD**:
   - Zero-downtime microservices delivery using **Argo CD**, **Docker**, **GitLab CI/CD**, and **Azure DevOps Server**.
   - Enforces automated security quality gates (SonarQube SAST + Trivy container scanning).`,
      actions: [
        { label: 'View Work Experience', target: '#experience' },
        { label: 'Featured Projects', target: '#projects' },
        { label: 'Contact Akash Directly', target: '#contact' }
      ]
    },
    {
      id: 'aws_architecture',
      keywords: ['aws', 'cloud architecture', 'vpc', 'rds', 'aurora', 'ec2', 's3', 'iam', 'route53', 'cloudformation', 'solutions architect'],
      topic: 'aws',
      response: `### ☁️ AWS Cloud Infrastructure & Multi-Tier Architecture

Akash designs scalable, multi-AZ cloud foundations following the **AWS Well-Architected Framework**:

\`\`\`text
[ Internet / Route 53 DNS ]
             │
   [ Application Load Balancer (ALB) + ACM SSL/TLS ]
             │
 ┌───────────┴─────────────────────────────┐
 │ Public Subnets (NAT Gateways, Bastion)  │
 └───────────┬─────────────────────────────┘
             │
 ┌───────────┴─────────────────────────────┐
 │ Private Subnets: Amazon EKS Worker Nodes │
 │ Auto Scaling Group + Karpenter Dynamic   │
 └───────────┬─────────────────────────────┘
             │
 ┌───────────┴─────────────────────────────┐
 │ Isolated Database Subnets: Multi-AZ RDS  │
 │ Aurora (PostgreSQL / TimescaleDB)       │
 └─────────────────────────────────────────┘
\`\`\`

**Key Implementation Highlights**:
- **Multi-Account Governance**: CloudFormation automated onboarding with cross-account IAM role assumption.
- **High Availability & Fault Tolerance**: Multi-AZ subnets with automated failover for Aurora databases.
- **Security & Least Privilege**: IAM condition keys, encrypted S3 buckets with KMS customer-managed keys, and private cluster endpoints.`,
      actions: [
        { label: 'Explore 3D Topology', target: '#hero' },
        { label: 'Inspect Projects', target: '#projects' }
      ]
    },
    {
      id: 'linux_troubleshooting',
      keywords: ['linux', 'rhel', 'ubuntu', 'centos', 'troubleshoot', 'oom', 'cpu', 'memory', 'disk', 'systemd', 'journalctl', 'bash', 'scripting'],
      topic: 'linux',
      response: `### 🐧 Enterprise Linux Production Systems & Troubleshooting

Akash has extensive experience managing **RHEL, Ubuntu, and CentOS** in latency-sensitive production environments. Here is his systematic incident triage methodology:

#### 1. Memory & OOM Diagnostics:
\`\`\`bash
# Check memory allocation and swap pressure
free -m
vmstat 1 5

# Detect recent kernel Out-Of-Memory kills with timestamps
dmesg -T | grep -E -i 'oom|killed process'
\`\`\`

#### 2. Disk Space & Inode Exhaustion:
\`\`\`bash
# Identify full mount points and inode exhaustion
df -h
df -i

# Pinpoint runaway log directories without crossing filesystems
du -ahx /var/log | sort -rh | head -n 15
\`\`\`

#### 3. Systemd & Process Investigation:
\`\`\`bash
# Trace failing service logs with extended context
systemctl status <service_name>
journalctl -u <service_name> -n 100 --no-pager

# Inspect active TCP sockets and listening daemons
ss -tulpn
\`\`\`

*Akash authors automated Bash & Python maintenance scripts with built-in safety checks that prevent accidental volume deletion.*`,
      actions: [
        { label: 'View Tradetron Experience', target: '#experience' },
        { label: 'Run Linux Diag in Terminal', target: '#terminal-body' }
      ]
    },
    {
      id: 'k8s_gitops',
      keywords: ['kubernetes', 'k8s', 'eks', 'argo', 'argocd', 'gitops', 'docker', 'container', 'helm', 'ingress', 'hpa'],
      topic: 'k8s',
      response: `### ☸️ Kubernetes (Amazon EKS) & GitOps Delivery

Akash manages containerized workloads with declarative GitOps synchronization:

- **Cluster Management**: Amazon EKS with managed node groups and **Karpenter** for dynamic compute rightsizing.
- **GitOps with Argo CD**:
  - Declarative source of truth in Git repositories.
  - Automated drift detection and 1-click instantaneous Blue/Green rollbacks.
  - Zero-downtime rolling deployments with readiness and liveness probe validations.
- **Ingress & Networking**: NGINX Ingress controllers integrated with AWS Application Load Balancers (ALBs) and automated SSL/TLS certificates via cert-manager.
- **Container Hardening**: Multi-stage Docker builds minimizing image surface, non-root execution users, and Trivy vulnerability gatekeeping.`,
      actions: [
        { label: 'Inspect CI/CD Flow Visualizer', target: '#pipeline' },
        { label: 'View Kubernetes Projects', target: '#projects' }
      ]
    },
    {
      id: 'finops_cur_focus',
      keywords: ['finops', 'cur', 'focus', 'cost', 'optimization', 'cloudnetra', 'multi-account', 'timescaledb', 'billing', 'savings'],
      topic: 'finops',
      response: `### 💰 Cloud FinOps & Multi-Account Cost Optimization

At **Groots Software Technologies**, Akash directly contributes to the **CloudNetra** FinOps platform:

1. **Multi-Account AWS Onboarding**:
   - Declarative **CloudFormation templates** deployed into customer member accounts.
   - Secure cross-account **IAM roles** with strictly scoped read-only permissions.

2. **Cost Data Ingestion Pipelines**:
   - Ingests **AWS Cost and Usage Reports (CUR 2.0)** and new **AWS FOCUS 1.2 (FinOps Open Cost & Usage Specification)** datasets from Amazon S3.
   - Manages ingestion jobs and resolves account-specific data validation errors.

3. **Time-Series Storage & Analytics**:
   - Stores granular usage data in **PostgreSQL and TimescaleDB** hyper-tables for fast aggregation.

4. **Resource Waste Elimination**:
   - Automated detection of unattached EBS volumes, legacy GP2 storage, and overprovisioned EC2/EKS instances.`,
      actions: [
        { label: 'View Groots Cloud Role', target: '#experience' },
        { label: 'Inspect FinOps Details', target: '#projects' }
      ]
    },
    {
      id: 'cicd_devops',
      keywords: ['ci/cd', 'pipeline', 'jenkins', 'gitlab', 'azure devops', 'github actions', 'sonarqube', 'trivy', 'devsecops'],
      topic: 'k8s',
      response: `### 🚀 Production CI/CD & DevSecOps Pipelines

Akash builds automated software delivery pipelines that take code from Git commit to production cluster:

\`\`\`text
[Developer Push] ➔ [Lint & Syntax Check]
                          │
                  [SonarQube SAST Scan]
                          │
                  [Docker Multi-Stage Build]
                          │
                  [Trivy Container CVE Scan]
                          │
                  [Push Image to AWS ECR]
                          │
                  [Argo CD GitOps Sync to EKS]
\`\`\`

- **Tooling**: GitLab CI/CD, Azure DevOps Server, GitHub Actions, and Jenkins.
- **Shift-Left Security**: Enforces quality gates where builds fail if high/critical CVEs or code bugs are detected.
- **Outcome**: Slashed deployment lead times from 40+ minutes down to under 5 minutes with zero deployment drift.`,
      actions: [
        { label: 'Launch Pipeline Simulator', target: '#pipeline' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    },
    {
      id: 'certifications',
      keywords: ['certification', 'certified', 'sap', 'solutions architect professional', 'trainwithshubham', 'credentials'],
      topic: 'aws',
      response: `### 📜 Verified Professional Certifications

Akash holds premier industry credentials validating deep technical competence:

1. **AWS Certified Solutions Architect – Professional (SAP)**:
   - Issued by: **Amazon Web Services**
   - Level: **Professional** (Highest AWS Architecture Level)
   - Demonstrates advanced capability in multi-region failover, cost optimization, complex VPC peering, hybrid connectivity, and enterprise IAM governance.

2. **Agentic AI for DevOps - Masterclass**:
   - Issued by: **TrainWithShubham**
   - Credential ID: \`46XYO2NV\`
   - Focus: Autonomous SRE remediation, Prometheus anomaly detection, and LangGraph-powered infrastructure automation.`,
      actions: [
        { label: 'View Verified Badges', target: '#certifications' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    },
    {
      id: 'contact_info',
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'whatsapp', 'linkedin', 'github', 'location', 'pune'],
      topic: 'hire',
      response: `### 📬 Get in Touch with Akash Bora

Akash is actively considering **Cloud Engineer, DevOps Engineer, Platform Engineer, and SRE** opportunities:

- 📧 **Email**: [akashbora0082@gmail.com](mailto:akashbora0082@gmail.com)
- 📱 **Phone**: [+91-7057100082](tel:+917057100082)
- 💬 **WhatsApp**: [Chat directly on WhatsApp](https://api.whatsapp.com/send?phone=917057100082)
- 💼 **LinkedIn**: [linkedin.com/in/akash-bora](https://www.linkedin.com/in/akash-bora/)
- 💻 **GitHub**: [github.com/Akashbora02](https://github.com/Akashbora02)
- 📍 **Location**: Pune, Maharashtra, India (Open to On-site, Hybrid & Remote)`,
      actions: [
        { label: 'Open Contact Form', target: '#contact' }
      ]
    }
  ];

  // ----------------------------------------------------------------------------
  // Suggested Prompts by Category
  // ----------------------------------------------------------------------------
  const TOPIC_PROMPTS = {
    all: [
      { text: '💡 Why hire Akash Bora?', query: 'Why should we hire Akash for our Cloud/DevOps team?' },
      { text: '☁️ Explain AWS architecture', query: 'How does Akash architect multi-tier AWS infrastructure?' },
      { text: '🐧 Linux troubleshooting methodology', query: 'How does Akash troubleshoot Linux CPU, memory, and disk issues?' },
      { text: '💰 Cloud FinOps & FOCUS 1.2', query: 'Explain his FinOps and CUR / FOCUS 1.2 data pipeline experience' },
      { text: '☸️ Kubernetes & Argo CD GitOps', query: 'How does he implement GitOps with Argo CD on Amazon EKS?' }
    ],
    aws: [
      { text: '☁️ AWS Multi-AZ VPC design', query: 'Explain his AWS VPC and high availability architecture' },
      { text: '📜 AWS Certified Solutions Architect', query: 'Tell me about his AWS Certified Solutions Architect Professional credential' },
      { text: '🛡️ IAM least privilege policies', query: 'How does Akash implement IAM roles and cross-account access?' }
    ],
    linux: [
      { text: '🚨 Troubleshoot OOM Kills', query: 'How does Akash diagnose Linux OOM and memory leaks in production?' },
      { text: '⚙️ Systemd service diagnostics', query: 'What commands does he use to troubleshoot systemd failures?' },
      { text: '📜 Bash automation & runbooks', query: 'Tell me about his Bash scripting and Linux SOP runbooks at Tradetron' }
    ],
    k8s: [
      { text: '☸️ Amazon EKS setup', query: 'How does Akash configure Amazon EKS clusters and worker nodes?' },
      { text: '🔄 Argo CD Blue/Green rollouts', query: 'Explain his Argo CD GitOps synchronization and rollback strategy' },
      { text: '🐳 Docker container optimization', query: 'How does he optimize Docker images and scan for CVEs?' }
    ],
    finops: [
      { text: '💰 CUR & FOCUS 1.2 pipelines', query: 'Explain the CloudNetra FinOps CUR and FOCUS 1.2 pipelines' },
      { text: '📉 Cloud cost optimization tactics', query: 'What strategies does he use to eliminate cloud waste on AWS?' },
      { text: '🗄️ PostgreSQL & TimescaleDB usage', query: 'How does he use TimescaleDB for time-series cost reporting?' }
    ],
    hire: [
      { text: '🌟 Core engineering strengths', query: 'Why hire Akash Bora for our DevOps or Cloud role?' },
      { text: '🏢 Work history & roles', query: 'Give me a summary of his work at Groots, Hisan Labs, and Tradetron' },
      { text: '📞 How to contact or schedule interview', query: 'How can I contact Akash Bora for an interview?' }
    ]
  };

  // ----------------------------------------------------------------------------
  // Match User Query to Knowledge Engine
  // ----------------------------------------------------------------------------
  function matchQueryToKnowledge(query) {
    const clean = query.toLowerCase().trim();
    let bestMatch = null;
    let maxScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (clean.includes(kw)) {
          score += kw.length;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && maxScore >= 3) {
      return bestMatch;
    }

    // Dynamic SRE/DevOps fallback with rich reasoning
    return {
      id: 'dynamic_technical',
      response: `### 🤖 AB Agent Technical Analysis

Regarding **"${escapeHtml(query)}"**:

Akash Bora approaches this from an **SRE & Production Cloud Engineering** perspective:

1. **Reliability & Architecture**: Ensures multi-AZ resilience, automated health checks, and failure domain isolation on **AWS (EKS, VPC, RDS Aurora)**.
2. **Operational Verification**: Employs deep Linux diagnostics (\`journalctl\`, \`vmstat\`, \`dmesg\`, \`ss\`) and real-time observability via **Prometheus, Grafana, and CloudWatch**.
3. **Automated Remediation**: Encapsulates manual operational tasks into declarative **Terraform IaC**, **Bash/Python scripts**, or automated **Argo CD GitOps** pipelines.

*Would you like to explore Akash's related production implementations or get in touch directly?*`,
      actions: [
        { label: 'Explore Key Projects', target: '#projects' },
        { label: 'View Technical Skills', target: '#skills' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    };
  }

  // ----------------------------------------------------------------------------
  // Format Markdown to Clean HTML
  // ----------------------------------------------------------------------------
  function formatMarkdown(text) {
    let html = text;

    // Code blocks with syntax copy buttons
    html = html.replace(/```(bash|text|json|yaml)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanCode = escapeHtml(code.trim());
      return `
        <div class="ab-code-block">
          <div class="ab-code-header">
            <span class="ab-code-lang">${lang || 'code'}</span>
            <button class="ab-btn-copy-code" data-code="${escapeAttribute(code.trim())}">
              <i class="fa-solid fa-copy"></i> Copy
            </button>
          </div>
          <pre><code>${cleanCode}</code></pre>
        </div>
      `;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="ab-inline-code">$1</code>');

    // Headings
    html = html.replace(/### (.*?)\n/g, '<h5 class="ab-msg-h3">$1</h5>');
    html = html.replace(/#### (.*?)\n/g, '<h6 class="ab-msg-h4">$1</h6>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="ab-msg-link">$1</a>');

    // Lists
    html = html.replace(/^\s*-\s+(.*$)/gm, '<li class="ab-bullet-item">$1</li>');
    html = html.replace(/(<li class="ab-bullet-item">.*<\/li>)/s, '<ul class="ab-bullet-list">$1</ul>');

    // Paragraph line breaks
    html = html.replace(/\n\n/g, '<br><br>');

    return html;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeAttribute(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ----------------------------------------------------------------------------
  // Initialize UI & Event Handlers
  // ----------------------------------------------------------------------------
  function initABAgent() {
    const triggerBtn = document.getElementById('ab-agent-trigger');
    const widget = document.getElementById('ab-agent-widget');
    const closeBtn = document.getElementById('ab-btn-close');
    const clearBtn = document.getElementById('ab-btn-clear');
    const messagesContainer = document.getElementById('ab-chat-messages');
    const chatForm = document.getElementById('ab-chat-form');
    const chatInput = document.getElementById('ab-chat-input');
    const promptPillsContainer = document.getElementById('ab-prompt-pills');
    const tabButtons = document.querySelectorAll('.ab-tab');

    if (!triggerBtn || !widget || !messagesContainer) return;

    let isWidgetOpen = false;

    // Toggle Widget
    function toggleWidget(open) {
      isWidgetOpen = (open !== undefined) ? open : !isWidgetOpen;
      if (isWidgetOpen) {
        widget.classList.add('active');
        triggerBtn.classList.add('widget-open');
        widget.setAttribute('aria-hidden', 'false');
        if (chatInput) {
          setTimeout(() => chatInput.focus(), 250);
        }
      } else {
        widget.classList.remove('active');
        triggerBtn.classList.remove('widget-open');
        widget.setAttribute('aria-hidden', 'true');
      }
    }

    triggerBtn.addEventListener('click', () => toggleWidget());
    if (closeBtn) closeBtn.addEventListener('click', () => toggleWidget(false));

    // Clear Chat
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        renderWelcomeCard();
      });
    }

    // Tab Filtering for Suggested Prompts
    function renderPromptPills(category) {
      if (!promptPillsContainer) return;
      const prompts = TOPIC_PROMPTS[category] || TOPIC_PROMPTS.all;
      promptPillsContainer.innerHTML = prompts.map(p => `
        <button type="button" class="ab-prompt-pill" data-query="${escapeAttribute(p.query)}">
          ${p.text}
        </button>
      `).join('');

      promptPillsContainer.querySelectorAll('.ab-prompt-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const query = btn.getAttribute('data-query');
          if (query) {
            handleUserMessage(query);
          }
        });
      });
    }

    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => {
        tabButtons.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const topic = tab.getAttribute('data-topic') || 'all';
        renderPromptPills(topic);
      });
    });

    // Render Welcome Hero Card
    function renderWelcomeCard() {
      messagesContainer.innerHTML = `
        <div class="ab-welcome-card">
          <div class="d-flex align-items-center gap-3 mb-2">
            <div class="ab-welcome-avatar">
              <i class="fa-solid fa-robot text-cyan"></i>
            </div>
            <div>
              <h5 class="ab-welcome-title mb-0">Hi, I'm AB Agent!</h5>
              <small class="text-cyan mono" style="font-size: 0.76rem;">Autonomous Cloud &amp; DevOps Assistant</small>
            </div>
          </div>
          <p class="ab-welcome-text">
            Trained on <strong>Akash Bora's</strong> production infrastructure work, AWS architecture, Linux systems engineering, Kubernetes GitOps, and FinOps pipelines. Ask me anything or select a prompt below!
          </p>
          <div class="ab-quick-badge-strip">
            <span class="ab-mini-badge"><i class="fa-brands fa-aws text-warning"></i> AWS Certified SAP</span>
            <span class="ab-mini-badge"><i class="fa-brands fa-linux text-cyan"></i> Enterprise Linux</span>
            <span class="ab-mini-badge"><i class="fa-solid fa-coins text-success"></i> FinOps CUR / FOCUS</span>
          </div>
        </div>
      `;
      renderPromptPills('all');
    }

    // Append Message to Chat
    function appendMessage(sender, htmlContent, actions) {
      const row = document.createElement('div');
      row.className = `ab-message-row ${sender}-row`;

      const avatarHtml = sender === 'bot'
        ? `<div class="ab-msg-avatar bot"><i class="fa-solid fa-robot text-cyan"></i></div>`
        : `<div class="ab-msg-avatar user"><i class="fa-solid fa-user"></i></div>`;

      let actionsHtml = '';
      if (actions && actions.length > 0) {
        actionsHtml = `
          <div class="ab-msg-actions-row">
            ${actions.map(a => `
              <button type="button" class="ab-msg-action-btn" data-target="${a.target}">
                <i class="fa-solid fa-arrow-right-long text-cyan me-1"></i> ${a.label}
              </button>
            `).join('')}
          </div>
        `;
      }

      row.innerHTML = `
        ${avatarHtml}
        <div class="ab-msg-bubble-wrapper">
          <div class="ab-msg-bubble ${sender}-bubble">
            ${htmlContent}
          </div>
          ${actionsHtml}
        </div>
      `;

      messagesContainer.appendChild(row);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Bind action buttons inside message
      row.querySelectorAll('.ab-msg-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-target');
          if (target && target.startsWith('#')) {
            const el = document.querySelector(target);
            if (el) {
              if (window.innerWidth < 768) {
                toggleWidget(false);
              }
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

      // Bind code copy buttons
      row.querySelectorAll('.ab-btn-copy-code').forEach(btn => {
        btn.addEventListener('click', () => {
          const code = btn.getAttribute('data-code');
          if (code) {
            navigator.clipboard.writeText(code).then(() => {
              btn.innerHTML = `<i class="fa-solid fa-check text-success"></i> Copied!`;
              setTimeout(() => {
                btn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
              }, 2000);
            });
          }
        });
      });
    }

    // Show Realistic Agent Typing Animation
    function showTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.id = 'ab-typing-indicator';
      indicator.className = 'ab-message-row bot-row';
      indicator.innerHTML = `
        <div class="ab-msg-avatar bot"><i class="fa-solid fa-robot text-cyan"></i></div>
        <div class="ab-msg-bubble bot-bubble ab-typing-box">
          <span class="ab-dot"></span>
          <span class="ab-dot"></span>
          <span class="ab-dot"></span>
        </div>
      `;
      messagesContainer.appendChild(indicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      return indicator;
    }

    // Handle User Query
    function handleUserMessage(queryText) {
      const q = queryText.trim();
      if (!q) return;

      // 1. User Message
      appendMessage('user', escapeHtml(q));

      // 2. Typing Indicator
      const typingEl = showTypingIndicator();

      // 3. Process with realistic AI latency (450ms)
      setTimeout(() => {
        if (typingEl && typingEl.parentElement) {
          typingEl.remove();
        }

        const match = matchQueryToKnowledge(q);
        const formatted = formatMarkdown(match.response);
        appendMessage('bot', formatted, match.actions);
      }, 500);
    }

    // Form Submit
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = chatInput.value;
        chatInput.value = '';
        handleUserMessage(val);
      });
    }

    // Initial render
    renderWelcomeCard();

    // Export globally for programmatic interaction
    window.ABAgent = {
      open: () => toggleWidget(true),
      close: () => toggleWidget(false),
      ask: (q) => {
        toggleWidget(true);
        handleUserMessage(q);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initABAgent);
  } else {
    initABAgent();
  }
})();
