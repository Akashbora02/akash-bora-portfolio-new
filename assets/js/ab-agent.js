/**
 * ==============================================================================
 * AB AGENT — Cloud & DevOps Autonomous AI ChatBot Copilot
 * ==============================================================================
 * Domain-specific conversational AI assistant trained on Akash Bora's
 * AWS Cloud Architecture, Enterprise Linux Systems Engineering, Kubernetes
 * GitOps, Cloud FinOps, and SRE incident triage.
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // Session State (Memory & Context)
  // ----------------------------------------------------------------------------
  const sessionState = {
    userName: null,
    turnCount: 0,
    lastTopic: null
  };

  // ----------------------------------------------------------------------------
  // Helper: Extract User Name from Natural Intro
  // ----------------------------------------------------------------------------
  function extractUserName(text) {
    const clean = text.trim();
    // "praful this side", "hi ab, praful this side", "akash this side"
    const matchThisSide = clean.match(/(?:(?:hi|hello|hey)\s*(?:ab|akash)?,?\s*)?([A-Za-z]+)\s+this\s+side/i);
    if (matchThisSide && matchThisSide[1]) {
      return capitalize(matchThisSide[1]);
    }

    // "my name is praful", "i am praful", "i'm praful"
    const matchMyName = clean.match(/(?:my\s+name\s+is|i\s+am|i'm)\s+([A-Za-z]+)/i);
    if (matchMyName && matchMyName[1]) {
      return capitalize(matchMyName[1]);
    }

    // "this is praful from..."
    const matchThisIs = clean.match(/this\s+is\s+([A-Za-z]+)/i);
    if (matchThisIs && matchThisIs[1]) {
      return capitalize(matchThisIs[1]);
    }

    // "praful here", "hi praful here"
    const matchHere = clean.match(/(?:(?:hi|hello|hey)\s*(?:ab|akash)?,?\s*)?([A-Za-z]+)\s+here/i);
    if (matchHere && matchHere[1]) {
      return capitalize(matchHere[1]);
    }

    return null;
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // ----------------------------------------------------------------------------
  // Knowledge Base: In-depth Technical Answers
  // ----------------------------------------------------------------------------
  const KNOWLEDGE_RESPONSES = {
    // 1. Greetings & Introductions
    greeting: (name) => {
      const greetingHeader = name
        ? `Hello **${name}**! Great to connect with you. 👋`
        : `Hello! Great to meet you. 👋`;

      return {
        response: `${greetingHeader}

I'm **AB Agent**, Akash Bora's personal **Cloud & DevOps AI ChatBot**. I am trained on his production infrastructure work across AWS, enterprise Linux, Kubernetes, and Cloud FinOps.

Here are a few quick topics we can explore:
- 🏢 **Groots Role**: Akash's work as Cloud Engineer & FinOps (AWS CUR 2.0 / FOCUS 1.2)
- 📈 **Tradetron Production**: Managing 40+ low-latency algorithmic trading Linux servers
- ☸️ **Kubernetes & GitOps**: Production Amazon EKS, Karpenter, and Argo CD
- ⏳ **Hiring & Availability**: Immediate joiner, Pune / Remote, and interview scheduling

Feel free to ask any question or tap a suggestion below!`,
        actions: [
          { label: '🏢 Groots Cloud Experience', query: 'Tell me about his role at Groots Software Technologies' },
          { label: '📈 Tradetron 40+ Servers', query: 'Tell me about his Linux engineering role at Tradetron' },
          { label: '💡 Why Hire Akash?', query: 'Why should we hire Akash for our Cloud/DevOps team?' },
          { label: '📞 Contact / Schedule Interview', query: 'How can I contact Akash Bora for an interview?' }
        ]
      };
    },

    // 2. Polite / Gratitude
    polite: (name) => {
      const salutation = name ? `, ${name}` : '';
      return {
        response: `You're very welcome${salutation}! 😊

Is there anything else you'd like to explore regarding Akash's AWS cloud architecture, enterprise Linux production experience, or Kubernetes GitOps pipelines? 

Feel free to ask, or click below to connect with Akash directly!`,
        actions: [
          { label: '💬 Chat on WhatsApp', target: 'https://api.whatsapp.com/send?phone=917057100082' },
          { label: '📧 Send Email', target: 'mailto:akashbora0082@gmail.com' },
          { label: '📜 View Credentials', target: '#certifications' }
        ]
      };
    },

    // 3. Why Hire Akash Bora?
    why_hire: () => ({
      response: `### 💡 Why Hire Akash Bora for Your Cloud / DevOps Team?

Akash is a battle-tested **Cloud & DevOps Engineer** and **AWS Certified Solutions Architect – Professional** who bridges production cloud reliability with developer productivity:

1. **AWS Multi-Account & Production Architecture**:
   - Hands-on expertise across **EKS, Multi-AZ VPC, EC2, RDS Aurora, S3, IAM, ALB, Route 53, and CloudFormation**.
   - Maintains **99.95% infrastructure uptime** for high-concurrency client workloads across multi-account AWS environments.

2. **Enterprise Linux Systems & Deep Troubleshooting**:
   - Deep foundation in **RHEL, Ubuntu, and CentOS** internals (kernel tuning, systemd, process isolation, memory/swap, and disk I/O diagnostics).
   - Proven track record managing 40+ low-latency algorithmic trading servers at Tradetron with zero data-loss incidents.

3. **Cloud FinOps & Multi-Account Cost Governance**:
   - Real-world experience at **Groots Software Technologies** building ingestion pipelines for **AWS Cost and Usage Reports (CUR 2.0)** and **AWS FOCUS 1.2 data specifications** backed by PostgreSQL and TimescaleDB.
   - Slashed client cloud spend by 20%+ via GP2 to GP3 migration, unattached EBS cleanup, and Karpenter node rightsizing.

4. **Declarative GitOps & Automated DevSecOps CI/CD**:
   - Zero-downtime microservices delivery using **Argo CD**, **Docker**, **GitLab CI/CD**, and **Azure DevOps Server**.
   - Enforces automated security quality gates (SonarQube SAST + Trivy container scanning) in production.`,
      actions: [
        { label: 'View Work Experience', target: '#experience' },
        { label: 'Featured Projects', target: '#projects' },
        { label: 'Contact Akash Directly', target: '#contact' }
      ]
    }),

    // 4. Groots Software Technologies (Current Position)
    groots: () => ({
      response: `### 🏢 Current Role: Cloud Engineer @ Groots Software Technologies

Akash serves as **Cloud Engineer** at **Groots Software Technologies** (Pune, India), where he spearheads AWS cloud operations and the core data ingestion engine for **CloudNetra**, an enterprise multi-tenant Cloud FinOps platform:

1. **Multi-Account AWS Onboarding Automation**:
   - Developed declarative **CloudFormation templates** distributed to client AWS organizations.
   - Configured cross-account **IAM roles with External IDs** for secure, least-privilege telemetry and billing access.

2. **Cloud Cost & Usage Ingestion Engine**:
   - Built resilient data processing pipelines for **AWS Cost and Usage Reports (CUR 2.0)** and **AWS FOCUS 1.2 (FinOps Open Cost & Usage Specification)**.
   - Handled ingestion edge cases, schema validations, and automated reprocessing from Amazon S3 buckets.

3. **Time-Series Database Architecture**:
   - Structured billing and usage telemetry into **PostgreSQL and TimescaleDB** hypertables.
   - Optimized hypertable chunk time intervals and indexing, enabling sub-second analytical queries over millions of usage records.

4. **FinOps Cost Optimization Initiatives**:
   - Engineered automated detection jobs for orphaned EBS volumes, legacy GP2 volumes (migrated to GP3 for 20% savings), and unutilized Elastic IPs.
   - Recommended compute rightsizing with AWS Graviton and Karpenter dynamic node consolidation.`,
      actions: [
        { label: 'View Groots Timeline Entry', target: '#experience' },
        { label: 'Inspect FinOps Architecture', target: '#projects' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    }),

    // 5. Tradetron Solutions (Linux Production & Algorithmic Trading)
    tradetron: () => ({
      response: `### 📈 Experience: Linux Systems Engineer @ Tradetron Solutions

At **Tradetron Solutions**, Akash managed the Linux infrastructure backbone powering high-frequency algorithmic trading:

1. **40+ High-Frequency Linux Production Servers**:
   - Administered **RHEL, CentOS, and Ubuntu** server fleets executing low-latency market orders during peak market hours (NSE/BSE).
   - Enforced 99.9% uptime with zero critical order execution failures.

2. **Kernel Tuning & Network Socket Optimization**:
   - Fine-tuned Linux kernel parameters via \`/etc/sysctl.conf\` for extreme network throughput:
\`\`\`bash
net.core.somaxconn = 65535
net.ipv4.tcp_max_syn_backlog = 65535
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
\`\`\`

3. **Production Incident Diagnostics**:
   - Responded to high-volatility memory pressure, diagnosing Out-Of-Memory (OOM) killer events and thread starvation.
   - Identified and mitigated runaway log files, inode depletion, and network connection bottlenecks.

4. **Automated Bash Runbooks & Systemd Daemons**:
   - Authored self-healing Bash watchdog scripts running as systemd timers with built-in alerting to Telegram and Slack channels.`,
      actions: [
        { label: 'View Tradetron Timeline', target: '#experience' },
        { label: 'Try Linux Terminal Commands', target: '#terminal-body' }
      ]
    }),

    // 6. Hisan Labs (DevOps & CI/CD)
    hisan: () => ({
      response: `### 🚀 Experience: DevOps Engineer @ Hisan Labs

At **Hisan Labs**, Akash spearheaded the containerization transformation and CI/CD modernization:

1. **Microservices Containerization & Helm Packaging**:
   - Containerized legacy monolithic services into lightweight, multi-stage **Docker** images.
   - Authored modular **Helm charts** with environment-specific values files for development, staging, and production Kubernetes clusters.

2. **CI/CD Pipeline Automation**:
   - Built automated delivery pipelines using **GitLab CI/CD** and **Azure DevOps Server**.
   - Slashed deployment lead times from **45+ minutes down to under 5 minutes** with zero downtime rolling deployments.

3. **Shift-Left Security & Quality Gateways**:
   - Integrated **SonarQube** static analysis and **Trivy** vulnerability scanners directly into pull request checks.
   - Blocked Docker image builds containing Critical or High CVEs before publishing to AWS ECR.

4. **Cluster Networking & Ingress**:
   - Configured NGINX Ingress controllers, cert-manager automated Let's Encrypt SSL/TLS certificates, and AWS ALB TargetGroupBindings.`,
      actions: [
        { label: 'View Hisan Labs Entry', target: '#experience' },
        { label: 'Launch Pipeline Flow Simulator', target: '#pipeline' }
      ]
    }),

    // 7. Flagship AIOps & SRE Self-Healing Kubernetes Agent
    aiops: () => ({
      response: `### 🤖 Autonomous AIOps & Self-Healing SRE Agent

Akash engineered a cutting-edge **Autonomous Self-Healing Kubernetes Agent** combining LLMs with SRE incident triage:

1. **Event Interception**:
   - Prometheus Alertmanager fires anomaly webhooks (e.g. \`CrashLoopBackOff\`, \`HighHttp5xxRate\`, \`OOMKilled\`) directly to the agent's webhook receiver.

2. **Runbook Retrieval via Vector Database**:
   - Queries a **Qdrant Vector Database** containing indexed engineering postmortems, architecture runbooks, and Kubernetes diagnostic procedures.

3. **LangGraph Agentic Decision Engine**:
   - Formulates a root-cause hypothesis, parses pod stacktraces via LLM, and evaluates remediation safety boundaries.

4. **Declarative GitOps Remediation**:
   - Executes safe automated actions: triggers Argo CD instantaneous rollbacks, scales HPA minimum replicas, or safely restarts degraded pods.
   - Slashed **Mean Time To Resolution (MTTR) by 70%** and achieved **98.4% automated resolution** on reproducible staging incidents.`,
      actions: [
        { label: 'Inspect AI Agent Project Card', target: '#projects' },
        { label: 'Review Credentials & Training', target: '#certifications' }
      ]
    }),

    // 8. Linux Troubleshooting & Commands
    linux_commands: () => ({
      response: `### 🐧 Enterprise Linux Production Systems & Incident Triage

Here is Akash's systematic production triage playbook for RHEL, Ubuntu, and CentOS:

#### 1. Memory & OOM Kill Diagnostics:
\`\`\`bash
# 1. Review available memory and swap saturation
free -m
vmstat 1 5

# 2. Extract kernel Out-Of-Memory events with timestamps
dmesg -T | grep -E -i 'oom|killed process'

# 3. Sort active processes by memory consumption
ps aux --sort=-%mem | head -n 10
\`\`\`

#### 2. Disk Space & Inode Exhaustion:
\`\`\`bash
# 1. Inspect block capacity and inode saturation
df -h
df -i

# 2. Pinpoint runaway log directories without crossing filesystems
du -ahx /var/log | sort -rh | head -n 15
\`\`\`

#### 3. Systemd & Process Investigation:
\`\`\`bash
# 1. Trace failing service logs with extended context
systemctl status <service_name>
journalctl -u <service_name> -n 100 --no-pager

# 2. Inspect active TCP sockets and listening daemons
ss -tulpn
\`\`\`

*All diagnostics are non-destructive and preserve stateful data integrity during critical incidents.*`,
      actions: [
        { label: 'View Tradetron Experience', target: '#experience' },
        { label: 'Run Commands in Terminal HUD', target: '#terminal-body' }
      ]
    }),

    // 9. AWS Cloud Architecture
    aws: () => ({
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

**Key Architectural Patterns**:
- **Multi-Account AWS Governance**: Automated onboarding via CloudFormation StackSets with cross-account IAM role delegation.
- **High Availability & Zero Single Points of Failure**: Multi-AZ deployments with automated RDS Aurora failover (<30s RTO).
- **Network Security**: Private subnets with no public IPs for worker nodes, AWS PrivateLink for S3 & ECR, and strictly scoped Security Groups.`,
      actions: [
        { label: 'Inspect 3D Architecture Topology', target: '#hero' },
        { label: 'Explore Key Projects', target: '#projects' }
      ]
    }),

    // 10. Kubernetes & GitOps
    k8s: () => ({
      response: `### ☸️ Kubernetes (Amazon EKS) & Declarative GitOps

Akash delivers containerized workloads with declarative GitOps synchronization:

- **Cluster Management**: Amazon EKS with managed node groups and **Karpenter** for fast, dynamic compute provisioning.
- **GitOps with Argo CD**:
  - Declarative source of truth hosted in Git repositories.
  - Automated drift detection, auto-sync, and 1-click Blue/Green or Canary rollbacks.
  - Health checks verifying readiness and liveness probes before shifting user traffic.
- **Ingress & Networking**: AWS Load Balancer Controller integrated with NGINX Ingress and automated SSL/TLS certificates via cert-manager.
- **Workload Hardening**: Non-root execution contexts, read-only root filesystems, ResourceQuotas, and PodDisruptionBudgets.`,
      actions: [
        { label: 'Inspect CI/CD Flow Visualizer', target: '#pipeline' },
        { label: 'View Kubernetes Projects', target: '#projects' }
      ]
    }),

    // 11. FinOps CUR & FOCUS 1.2
    finops: () => ({
      response: `### 💰 Cloud FinOps & Multi-Account Cost Optimization

At **Groots Software Technologies**, Akash directly builds FinOps data pipelines and cost governance mechanisms:

1. **AWS CUR 2.0 & FOCUS 1.2 Pipelines**:
   - Ingests **Cost & Usage Reports** and the **FinOps Open Cost & Usage Specification (FOCUS 1.2)** from Amazon S3.
   - Validates multi-account schema definitions and normalizes billing metrics across AWS member accounts.

2. **TimescaleDB & PostgreSQL Analytical Store**:
   - Ingests usage records into time-series hypertables with tailored chunking and compression policies for rapid querying.

3. **Actionable Waste Elimination Strategies**:
   - **GP2 to GP3 Storage Upgrades**: Saves 20% baseline storage costs while providing baseline 3,000 IOPS and 125 MB/s throughput.
   - **Zombie Resource Cleanup**: Automated identification of unattached EBS volumes, aged snapshots, and unassociated Elastic IPs.
   - **Dynamic Provisioning**: Karpenter consolidation to minimize idle node waste during off-peak hours.`,
      actions: [
        { label: 'View Groots Cloud Role', target: '#experience' },
        { label: 'Inspect FinOps Project Card', target: '#projects' }
      ]
    }),

    // 12. Terraform & Infrastructure as Code
    terraform: () => ({
      response: `### 🧱 Terraform Infrastructure as Code (IaC)

Akash designs modular, production-ready Terraform architectures:

- **Remote Backend & Concurrency Protection**:
  - Encrypted Amazon S3 bucket for remote state with versioning enabled.
  - DynamoDB state locking table preventing race conditions across team pull requests.
- **Modular Directory Architecture**:
  - Reusable VPC, EKS, RDS Aurora, Security Group, and IAM modules.
  - Environment separation (\`dev\`, \`staging\`, \`prod\`) utilizing clean variable abstraction and Terragrunt DRY principles.
- **Automated Validation & Security**:
  - GitHub Actions / GitLab CI workflows executing \`terraform fmt\`, \`terraform validate\`, and **tfsec** static security scanning on every PR.
  - Scheduled drift detection pipelines notifying engineers of out-of-band AWS console modifications.`,
      actions: [
        { label: 'Explore Terraform Project Card', target: '#projects' },
        { label: 'View Skills Matrix', target: '#skills' }
      ]
    }),

    // 13. Observability & SRE
    observability: () => ({
      response: `### 📊 Observability, SRE Practices & Incident Management

Akash implements full-stack observability based on Site Reliability Engineering principles:

1. **The Four Golden Signals & RED Method**:
   - Monitors **Rate, Errors, and Duration (RED)** for customer-facing HTTP services.
   - Monitors **Utilization, Saturation, and Errors (USE)** for underlying Linux and Kubernetes infrastructure.

2. **Prometheus & Grafana Stack**:
   - Custom Prometheus scrape configs with node-exporter, kube-state-metrics, and blackbox-exporter.
   - Production Grafana executive and operational dashboards with real-time alerting thresholds.

3. **Alertmanager & Pager Duty Routing**:
   - Deduplication, grouping, and inhibition rules routing critical P1 alerts to Slack and on-call escalation matrices.

4. **SLI / SLO Governance**:
   - Establishes Service Level Objectives (e.g. 99.95% successful requests over a 30-day rolling window) with automated error budget consumption tracking.`,
      actions: [
        { label: 'View Observability Project Card', target: '#projects' },
        { label: 'Skills Matrix', target: '#skills' }
      ]
    }),

    // 14. Availability, Notice Period & Hiring Logistics
    availability: () => ({
      response: `### ⏳ Availability & Role Preferences

Akash is actively considering **Cloud Engineer, DevOps Engineer, Platform Engineer, and SRE** opportunities:

- **Target Roles**: Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE), Platform Engineer.
- **Notice Period**: **Immediate to 15 days** (negotiable / short notice).
- **Location Preference**: **Pune, Maharashtra** (On-site / Hybrid), Mumbai, Bangalore, or **Full Remote**.
- **Willingness to Relocate**: Yes, open to relocation for high-impact engineering opportunities.
- **Interview Readiness**: Available for technical architecture discussions, hands-on Linux/AWS scenarios, and live coding assessments.`,
      actions: [
        { label: 'Schedule an Interview', target: '#contact' },
        { label: 'Connect on WhatsApp', target: 'https://api.whatsapp.com/send?phone=917057100082' },
        { label: 'Direct Email', target: 'mailto:akashbora0082@gmail.com' }
      ]
    }),

    // 15. Contact Information
    contact: () => ({
      response: `### 📬 Contact Akash Bora Directly

Akash is ready to discuss how he can add immediate value to your infrastructure team:

- 📧 **Email**: [akashbora0082@gmail.com](mailto:akashbora0082@gmail.com)
- 📱 **Phone**: [+91-7057100082](tel:+917057100082)
- 💬 **WhatsApp**: [Direct WhatsApp Chat](https://api.whatsapp.com/send?phone=917057100082)
- 💼 **LinkedIn**: [linkedin.com/in/akash-bora](https://www.linkedin.com/in/akash-bora/)
- 💻 **GitHub**: [github.com/Akashbora02](https://github.com/Akashbora02)
- 📍 **Location**: Pune, Maharashtra, India (Open to On-site, Hybrid & Remote)`,
      actions: [
        { label: 'Open Contact Form', target: '#contact' },
        { label: 'Chat on WhatsApp', target: 'https://api.whatsapp.com/send?phone=917057100082' }
      ]
    }),

    // 16. Certifications
    certifications: () => ({
      response: `### 📜 Verified Professional Certifications

Akash holds premier industry credentials validating deep technical competence:

1. **AWS Certified Solutions Architect – Professional (SAP)**:
   - Issued by: **Amazon Web Services**
   - Level: **Professional** (Highest AWS Architecture Level)
   - Validates mastery of multi-region architectures, complex networking, disaster recovery, cost governance, and security compliance.

2. **Agentic AI for DevOps - Masterclass**:
   - Issued by: **TrainWithShubham**
   - Credential ID: \`46XYO2NV\`
   - Focus: Autonomous SRE remediation, Prometheus Alertmanager integration, LangGraph agent workflows, and vector databases.`,
      actions: [
        { label: 'View Verified Badges', target: '#certifications' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    })
  };

  // ----------------------------------------------------------------------------
  // Suggested Prompts by Category
  // ----------------------------------------------------------------------------
  const TOPIC_PROMPTS = {
    all: [
      { text: '💡 Why hire Akash Bora?', query: 'Why should we hire Akash for our Cloud/DevOps team?' },
      { text: '🏢 Groots Cloud Experience', query: 'Tell me about his role as Cloud Engineer at Groots Software Technologies' },
      { text: '🐧 Linux Triage & Tradetron', query: 'How did Akash troubleshoot Linux and 40+ servers at Tradetron?' },
      { text: '💰 FinOps CUR & FOCUS 1.2', query: 'Explain his FinOps and CUR / FOCUS 1.2 data pipeline experience' },
      { text: '☸️ Kubernetes & Argo CD GitOps', query: 'How does he implement GitOps with Argo CD on Amazon EKS?' },
      { text: '⏳ Notice Period & Availability', query: 'What is Akash Bora notice period and availability?' }
    ],
    aws: [
      { text: '🏢 Groots Cloud Engineer role', query: 'Tell me about his AWS Cloud Engineer role at Groots Software Technologies' },
      { text: '☁️ Multi-AZ VPC Architecture', query: 'Explain his AWS VPC and high availability architecture blueprint' },
      { text: '📜 AWS Solutions Architect Pro', query: 'Tell me about his AWS Certified Solutions Architect Professional credential' },
      { text: '🧱 Terraform Modular Cloud IaC', query: 'How does Akash write modular Terraform with S3 remote state and DynamoDB locks?' }
    ],
    linux: [
      { text: '📈 Tradetron 40+ Trading Servers', query: 'Tell me about his Linux Systems Engineer role managing 40+ servers at Tradetron' },
      { text: '🚨 Troubleshoot OOM Kills', query: 'How does Akash diagnose Linux OOM kills and memory leaks in production?' },
      { text: '⚙️ Systemd service crash loop', query: 'What commands does he use to troubleshoot failing systemd services?' },
      { text: '📜 Bash automation & runbooks', query: 'Tell me about his Bash scripting and Linux watchdog scripts' }
    ],
    k8s: [
      { text: '🤖 Autonomous Self-Healing Agent', query: 'Explain his Autonomous AIOps and Self-Healing Kubernetes SRE Agent' },
      { text: '☸️ Amazon EKS & Karpenter', query: 'How does Akash configure Amazon EKS clusters and Karpenter compute autoscaling?' },
      { text: '🔄 Argo CD GitOps & Rollbacks', query: 'Explain his Argo CD GitOps synchronization and rollback strategy' },
      { text: '🐳 Docker & CVE gatekeeping', query: 'How does he optimize Docker images and enforce Trivy security scanning?' }
    ],
    finops: [
      { text: '🏢 Groots CloudNetra Platform', query: 'What is his role with CloudNetra at Groots Software Technologies?' },
      { text: '💰 CUR 2.0 & FOCUS 1.2 pipelines', query: 'Explain the CloudNetra FinOps CUR 2.0 and FOCUS 1.2 pipelines' },
      { text: '🗄️ PostgreSQL & TimescaleDB', query: 'How does he use TimescaleDB hypertables for time-series cost reporting?' },
      { text: '📉 20%+ Cloud Cost Reduction', query: 'What strategies does Akash use to eliminate cloud waste on AWS?' }
    ],
    hire: [
      { text: '💡 Core Engineering Strengths', query: 'Why hire Akash Bora for our DevOps or Cloud role?' },
      { text: '⏳ Notice Period & Availability', query: 'What is Akash Bora notice period and availability to join?' },
      { text: '🏢 Summary of All Work History', query: 'Give me a summary of his work at Groots, Tradetron, and Hisan Labs' },
      { text: '📞 Schedule Technical Interview', query: 'How can I contact Akash Bora to schedule an interview?' }
    ]
  };

  // ----------------------------------------------------------------------------
  // Intelligent Conversational Intent Router
  // ----------------------------------------------------------------------------
  function routeUserMessage(query) {
    const raw = query.trim();
    const clean = raw.toLowerCase();

    // 1. Check for name introduction ("praful this side", "my name is praful", "i am praful")
    const extractedName = extractUserName(raw);
    if (extractedName) {
      sessionState.userName = extractedName;
      return KNOWLEDGE_RESPONSES.greeting(sessionState.userName);
    }

    // 2. Greetings without name ("hi", "hello", "hey", "good morning", "hey ab", "hi ab")
    if (/^(hi|hello|hey|hey\s+there|good\s+(morning|afternoon|evening)|hi\s+ab|hello\s+ab|hey\s+ab|yo|greetings)[\s!.,?]*$/i.test(clean)) {
      return KNOWLEDGE_RESPONSES.greeting(sessionState.userName);
    }

    // 3. Polite / Thanks / Acknowledgment
    if (clean.includes('thank') || clean.includes('thx') || /^(awesome|great|cool|nice|good\s+job|perfect|ok|okay|got\s+it|bye|see\s+you)(\s+(ab|akash|bot|agent))?[\s!.,?]*$/i.test(clean)) {
      return KNOWLEDGE_RESPONSES.polite(sessionState.userName);
    }

    // 4. Hiring / Candidate Fit / Why Hire
    if (clean.includes('why hire') || clean.includes('hire akash') || clean.includes('why should we hire') || clean.includes('strengths') || clean.includes('fit') || clean.includes('value proposition') || clean.includes('recommend')) {
      return KNOWLEDGE_RESPONSES.why_hire();
    }

    // 5. Notice Period / Availability / Join / Relocate / Location
    if (clean.includes('notice period') || clean.includes('availability') || clean.includes('immediate') || clean.includes('join') || clean.includes('relocate') || clean.includes('relocation') || clean.includes('location') || clean.includes('pune') || clean.includes('remote') || clean.includes('salary') || clean.includes('ctc') || clean.includes('resume') || clean.includes('cv')) {
      return KNOWLEDGE_RESPONSES.availability();
    }

    // 6. Contact / Schedule Interview / Phone / Email / WhatsApp
    if (clean.includes('contact') || clean.includes('interview') || clean.includes('email') || clean.includes('phone') || clean.includes('call') || clean.includes('reach') || clean.includes('whatsapp') || clean.includes('schedule') || clean.includes('hire him')) {
      return KNOWLEDGE_RESPONSES.contact();
    }

    // 7. Groots Software Technologies / FinOps / CUR / FOCUS 1.2
    if (clean.includes('groots') || clean.includes('cloudnetra') || clean.includes('cur') || clean.includes('focus') || clean.includes('timescale') || clean.includes('timescaledb') || clean.includes('billing') || clean.includes('cost optimization') || clean.includes('current role') || clean.includes('current job') || clean.includes('current company')) {
      return KNOWLEDGE_RESPONSES.groots();
    }

    // 8. Tradetron Solutions / Linux Trading Systems / Low Latency
    if (clean.includes('tradetron') || clean.includes('trading') || clean.includes('40+') || clean.includes('low latency') || clean.includes('sysctl') || clean.includes('socket') || clean.includes('kernel')) {
      return KNOWLEDGE_RESPONSES.tradetron();
    }

    // 9. Hisan Labs / Microservices / GitLab CI / Azure DevOps
    if (clean.includes('hisan') || clean.includes('gitlab') || clean.includes('azure devops') || clean.includes('microservices') || clean.includes('dockerize') || clean.includes('helm chart')) {
      return KNOWLEDGE_RESPONSES.hisan();
    }

    // 10. Autonomous AIOps / Self-Healing Agent
    if (clean.includes('ai agent') || clean.includes('aiops') || clean.includes('self healing') || clean.includes('langgraph') || clean.includes('qdrant') || clean.includes('vector db') || clean.includes('remediation')) {
      return KNOWLEDGE_RESPONSES.aiops();
    }

    // 11. Linux Troubleshooting Commands / OOM / Disk / Inode / Systemd
    if (clean.includes('oom') || clean.includes('linux') || clean.includes('rhel') || clean.includes('ubuntu') || clean.includes('centos') || clean.includes('troubleshoot') || clean.includes('memory') || clean.includes('disk full') || clean.includes('inode') || clean.includes('systemd') || clean.includes('journalctl') || clean.includes('bash script')) {
      return KNOWLEDGE_RESPONSES.linux_commands();
    }

    // 12. AWS Architecture / Multi-AZ / VPC / RDS
    if (clean.includes('aws') || clean.includes('vpc') || clean.includes('subnets') || clean.includes('aurora') || clean.includes('rds') || clean.includes('cloudformation') || clean.includes('s3') || clean.includes('multi-az') || clean.includes('solutions architect')) {
      return KNOWLEDGE_RESPONSES.aws();
    }

    // 13. Kubernetes / EKS / Argo CD / GitOps / Karpenter
    if (clean.includes('kubernetes') || clean.includes('k8s') || clean.includes('eks') || clean.includes('argo') || clean.includes('argocd') || clean.includes('gitops') || clean.includes('karpenter') || clean.includes('ingress') || clean.includes('container') || clean.includes('docker')) {
      return KNOWLEDGE_RESPONSES.k8s();
    }

    // 14. Terraform / Infrastructure as Code
    if (clean.includes('terraform') || clean.includes('iac') || clean.includes('terragrunt') || clean.includes('state') || clean.includes('dynamodb') || clean.includes('tfsec') || clean.includes('drift')) {
      return KNOWLEDGE_RESPONSES.terraform();
    }

    // 15. Observability / Monitoring / Prometheus / Grafana / SRE
    if (clean.includes('prometheus') || clean.includes('grafana') || clean.includes('alertmanager') || clean.includes('observability') || clean.includes('monitoring') || clean.includes('sre') || clean.includes('slo') || clean.includes('sli') || clean.includes('metric')) {
      return KNOWLEDGE_RESPONSES.observability();
    }

    // 16. Certifications
    if (clean.includes('certif') || clean.includes('credential') || clean.includes('sap') || clean.includes('trainwithshubham')) {
      return KNOWLEDGE_RESPONSES.certifications();
    }

    // Conversational Fallback: Intelligent, helpful, natural AI response
    const namePrefix = sessionState.userName ? `${sessionState.userName}, regarding` : 'Regarding';
    return {
      response: `### 🤖 AB Agent Response

${namePrefix} **"${escapeHtml(raw)}"**:

Akash Bora approaches this with a strong **Production Cloud & SRE Mindset**:

- **Resilience & High Availability**: Multi-AZ AWS architecture (EKS, RDS Aurora, VPC) with automated failover and zero single points of failure.
- **Enterprise Linux Rigor**: Deep operational verification using non-destructive diagnostics (\`vmstat\`, \`journalctl\`, \`ss\`, \`dmesg\`) developed managing 40+ trading servers.
- **Declarative Automation**: Automating manual toil into reproducible **Terraform IaC**, **Bash watchdogs**, or **Argo CD GitOps** pipelines.
- **Cost Awareness (FinOps)**: Enforcing data-driven efficiency via AWS CUR 2.0 & FOCUS 1.2 standards to eliminate idle cloud waste.

Would you like to explore any of Akash's specific production projects or discuss a role opening?`,
      actions: [
        { label: '🏢 Groots Cloud Experience', query: 'Tell me about his role as Cloud Engineer at Groots Software Technologies' },
        { label: '💡 Why Hire Akash?', query: 'Why should we hire Akash for our Cloud/DevOps team?' },
        { label: '📞 Contact / Schedule Interview', query: 'How can I contact Akash Bora for an interview?' }
      ]
    };
  }

  // ----------------------------------------------------------------------------
  // Format Markdown to Clean HTML (Native List Rendering, No Flex Breakage)
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

    // Numbered lists: wrap inside clean <ol> and <li> without flex
    html = html.replace(/^\s*\d+\.\s+(.*$)/gm, '<li class="ab-num-item">$1</li>');
    html = html.replace(/((?:<li class="ab-num-item">[\s\S]*?<\/li>\s*)+)/g, '<ol class="ab-num-list">$1</ol>');

    // Bullet lists: wrap inside clean <ul> and <li> without flex
    html = html.replace(/^\s*[-*]\s+(.*$)/gm, '<li class="ab-bullet-item">$1</li>');
    html = html.replace(/((?:<li class="ab-bullet-item">[\s\S]*?<\/li>\s*)+)/g, '<ul class="ab-bullet-list">$1</ul>');

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
        sessionState.turnCount = 0;
        sessionState.userName = null;
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
              <small class="text-cyan mono" style="font-size: 0.76rem;">Cloud &amp; DevOps Autonomous AI Copilot</small>
            </div>
          </div>
          <p class="ab-welcome-text">
            Trained on <strong>Akash Bora's</strong> production infrastructure work: AWS cloud architecture, Groots CloudNetra FinOps, Linux systems engineering, Kubernetes GitOps, and SRE. Ask me anything or select a prompt below!
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
            ${actions.map(a => {
              if (a.query) {
                return `
                  <button type="button" class="ab-msg-action-btn query-action" data-query="${escapeAttribute(a.query)}">
                    <i class="fa-solid fa-arrow-right text-cyan me-1"></i> ${a.label}
                  </button>
                `;
              } else if (a.target) {
                return `
                  <button type="button" class="ab-msg-action-btn target-action" data-target="${escapeAttribute(a.target)}">
                    <i class="fa-solid fa-arrow-up-right-from-square text-cyan me-1"></i> ${a.label}
                  </button>
                `;
              }
              return '';
            }).join('')}
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

      // Bind query action buttons (ask next question)
      row.querySelectorAll('.ab-msg-action-btn.query-action').forEach(btn => {
        btn.addEventListener('click', () => {
          const q = btn.getAttribute('data-query');
          if (q) handleUserMessage(q);
        });
      });

      // Bind navigation / external target action buttons
      row.querySelectorAll('.ab-msg-action-btn.target-action').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-target');
          if (target && (target.startsWith('http') || target.startsWith('mailto:'))) {
            window.open(target, '_blank', 'noopener,noreferrer');
          } else if (target && target.startsWith('#')) {
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

      sessionState.turnCount++;

      // 1. User Message
      appendMessage('user', escapeHtml(q));

      // 2. Typing Indicator
      const typingEl = showTypingIndicator();

      // 3. Process with realistic conversational delay (350ms)
      setTimeout(() => {
        if (typingEl && typingEl.parentElement) {
          typingEl.remove();
        }

        const match = routeUserMessage(q);
        const formatted = formatMarkdown(match.response);
        appendMessage('bot', formatted, match.actions);
      }, 350);
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

    // Export globally for programmatic interaction & automated test suites
    window.ABAgent = {
      open: () => toggleWidget(true),
      close: () => toggleWidget(false),
      ask: (q) => {
        toggleWidget(true);
        handleUserMessage(q);
      },
      getState: () => ({ ...sessionState })
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initABAgent);
  } else {
    initABAgent();
  }
})();
