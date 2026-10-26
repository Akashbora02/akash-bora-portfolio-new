/**
 * ==============================================================================
 * AB AGENT — Cloud & DevOps Autonomous AI Copilot
 * ==============================================================================
 * Domain-specific AI assistant trained on Akash Bora's AWS Cloud Architecture,
 * Enterprise Linux Production Operations, Kubernetes GitOps, FinOps, and SRE.
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
      keywords: ['why hire', 'hire akash', 'recommend', 'value', 'fit', 'strengths', 'benefits', 'candidate', 'interview akash', 'strengths as engineer', 'why choose'],
      topic: 'hire',
      response: `### 💡 Why Hire Akash Bora for Your Cloud / DevOps Team?

Akash is a battle-tested **Cloud & DevOps Engineer** and **AWS Certified Solutions Architect – Professional** who bridges production cloud infrastructure with developer velocity and operational reliability:

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
    },
    {
      id: 'groots_experience',
      keywords: ['groots', 'groots software', 'cloud engineer', 'cloudnetra', 'current company', 'current role', 'cur 2.0', 'focus 1.2', 'finops platform'],
      topic: 'finops',
      response: `### 🏢 Current Role: Cloud Engineer @ Groots Software Technologies

Akash works as a **Cloud Engineer** at **Groots Software Technologies** (Pune, India), where he spearheads AWS cloud operations and the core data ingestion engine for **CloudNetra**, a multi-tenant Cloud FinOps platform:

1. **Multi-Account AWS Onboarding Automation**:
   - Developed declarative **CloudFormation templates** distributed to client AWS organizations.
   - Configured cross-account **IAM roles with External IDs** for secure, least-privilege telemetry and billing access.

2. **Cloud Cost & Usage Ingestion Engine**:
   - Built resilient data processing pipelines for **AWS Cost and Usage Reports (CUR 2.0)** and **AWS FOCUS 1.2 (FinOps Open Cost & Usage Specification)**.
   - Handled ingestion edge cases, schema validations, and automated reprocessing from S3 buckets.

3. **Time-Series Database Architecture**:
   - Structured billing and usage telemetry into **PostgreSQL and TimescaleDB** hypertables.
   - Optimized hypertable chunk time intervals and indexing, enabling sub-second analytical queries over millions of usage records.

4. **FinOps Cost Optimization Initiatives**:
   - Engineered automated detection jobs for orphaned EBS volumes, legacy GP2 volumes (migrated to GP3 for 20% savings), and unutilized Elastic IPs.
   - Recommended compute rightsizing with AWS Graviton and Karpenter dynamic node consolidation.`,
      actions: [
        { label: 'View Groots Timeline Entry', target: '#experience' },
        { label: 'Inspect FinOps Architecture', target: '#projects' }
      ]
    },
    {
      id: 'tradetron_experience',
      keywords: ['tradetron', 'linux systems engineer', 'algorithmic trading', 'trading platform', 'low latency', '40+ servers', 'kernel tuning', 'sysctl', 'socket', 'tcp', 'oom killer', 'tradetron solutions'],
      topic: 'linux',
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
    },
    {
      id: 'hisan_experience',
      keywords: ['hisan', 'hisan labs', 'devops engineer', 'microservices', 'gitlab ci', 'azure devops', 'dockerize', 'helm charts', 'deployment time'],
      topic: 'k8s',
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
    },
    {
      id: 'aiops_agent',
      keywords: ['aiops', 'ai agent', 'langgraph', 'self healing', 'autonomous', 'sre agent', 'remediation', 'alertmanager webhook', 'qdrant', 'vector db'],
      topic: 'k8s',
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
    },
    {
      id: 'aws_architecture',
      keywords: ['aws', 'cloud architecture', 'vpc', 'rds', 'aurora', 'ec2', 's3', 'iam', 'route53', 'cloudformation', 'solutions architect', 'multi-az', 'subnets'],
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

**Key Architectural Patterns**:
- **Multi-Account AWS Governance**: Automated onboarding via CloudFormation StackSets with cross-account IAM role delegation.
- **High Availability & Zero Single Points of Failure**: Multi-AZ deployments with automated RDS Aurora failover (<30s RTO).
- **Network Security**: Private subnets with no public IPs for worker nodes, AWS PrivateLink for S3 & ECR, and strictly scoped Security Groups.`,
      actions: [
        { label: 'Inspect 3D Architecture Topology', target: '#hero' },
        { label: 'Explore Key Projects', target: '#projects' }
      ]
    },
    {
      id: 'linux_troubleshooting',
      keywords: ['linux', 'rhel', 'ubuntu', 'centos', 'troubleshoot', 'oom', 'cpu', 'memory', 'disk', 'systemd', 'journalctl', 'bash', 'scripting', 'triage', 'sysadmin'],
      topic: 'linux',
      response: `### 🐧 Enterprise Linux Production Systems & Incident Triage

Akash has extensive experience managing **RHEL, Ubuntu, and CentOS** in production. Here is his systematic incident triage playbook:

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
    },
    {
      id: 'k8s_gitops',
      keywords: ['kubernetes', 'k8s', 'eks', 'argo', 'argocd', 'gitops', 'docker', 'container', 'helm', 'ingress', 'hpa', 'karpenter'],
      topic: 'k8s',
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
    },
    {
      id: 'finops_cur_focus',
      keywords: ['finops', 'cur', 'focus', 'cost', 'optimization', 'billing', 'savings', 'ebs cleanup', 'gp2 to gp3', 'timescaledb'],
      topic: 'finops',
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
    },
    {
      id: 'terraform_iac',
      keywords: ['terraform', 'iac', 'infrastructure as code', 'terragrunt', 's3 backend', 'dynamodb lock', 'state file', 'tfsec', 'drift'],
      topic: 'aws',
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
    },
    {
      id: 'observability_sre',
      keywords: ['observability', 'monitoring', 'prometheus', 'grafana', 'alertmanager', 'sre', 'sli', 'slo', 'red method', 'use method', 'metrics', 'loki'],
      topic: 'linux',
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
    },
    {
      id: 'cicd_devops',
      keywords: ['ci/cd', 'pipeline', 'jenkins', 'gitlab', 'azure devops', 'github actions', 'sonarqube', 'trivy', 'devsecops', 'docker build'],
      topic: 'k8s',
      response: `### 🚀 Production CI/CD & DevSecOps Pipelines

Akash builds end-to-end automated pipelines taking code from Git commit to production cluster:

\`\`\`text
[Developer Push] ➔ [Lint & Unit Tests]
                          │
                  [SonarQube SAST Quality Gate]
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
- **Shift-Left Security**: Quality gates fail builds if critical CVEs or code quality vulnerabilities are detected.
- **Outcome**: Slashed deployment lead times from 45+ minutes to under 5 minutes with zero deployment drift.`,
      actions: [
        { label: 'Launch Pipeline Simulator', target: '#pipeline' },
        { label: 'Contact Akash', target: '#contact' }
      ]
    },
    {
      id: 'certifications',
      keywords: ['certification', 'certified', 'sap', 'solutions architect professional', 'trainwithshubham', 'credentials', 'agentic ai masterclass'],
      topic: 'aws',
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
    },
    {
      id: 'availability_notice',
      keywords: ['notice period', 'availability', 'immediate', 'start date', 'join', 'relocate', 'salary', 'ctc', 'location', 'pune', 'remote'],
      topic: 'hire',
      response: `### ⏳ Availability & Role Preferences

Akash is actively seeking new career opportunities in Cloud & DevOps engineering:

- **Target Roles**: Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE), Platform Engineer.
- **Notice Period**: Immediate to 15 days (negotiable / short notice).
- **Location Preference**: Pune, Maharashtra (On-site / Hybrid), Mumbai, Bangalore, or Full Remote.
- **Willingness to Relocate**: Open to relocation for high-impact engineering opportunities.
- **Interview Readiness**: Available for technical discussions, architectural whiteboard rounds, and coding assessments.`,
      actions: [
        { label: 'Schedule an Interview', target: '#contact' },
        { label: 'Connect on WhatsApp', target: 'https://api.whatsapp.com/send?phone=917057100082' }
      ]
    },
    {
      id: 'contact_info',
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'whatsapp', 'linkedin', 'github', 'get in touch'],
      topic: 'hire',
      response: `### 📬 Get in Touch with Akash Bora

Akash is ready to discuss how he can add immediate value to your infrastructure team:

- 📧 **Email**: [akashbora0082@gmail.com](mailto:akashbora0082@gmail.com)
- 📱 **Phone**: [+91-7057100082](tel:+917057100082)
- 💬 **WhatsApp**: [Direct WhatsApp Chat](https://api.whatsapp.com/send?phone=917057100082)
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
      { text: '🏢 Groots Cloud Experience', query: 'Tell me about his role as Cloud Engineer at Groots Software Technologies' },
      { text: '🐧 Linux Triage & Tradetron', query: 'How did Akash troubleshoot Linux and 40+ servers at Tradetron?' },
      { text: '💰 FinOps CUR & FOCUS 1.2', query: 'Explain his FinOps and CUR / FOCUS 1.2 data pipeline experience' },
      { text: '☸️ Kubernetes & Argo CD GitOps', query: 'How does he implement GitOps with Argo CD on Amazon EKS?' },
      { text: '🤖 AIOps Self-Healing Agent', query: 'Explain his Autonomous AIOps Kubernetes SRE Agent project' }
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
          // Weight multi-word and exact matches heavily
          score += (kw.length * kw.length);
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && maxScore >= 9) {
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
3. **Automated Remediation**: Encapsulates manual operational tasks into declarative **Terraform IaC**, **Bash/Python runbooks**, or automated **Argo CD GitOps** pipelines.

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

    // Numbered lists
    html = html.replace(/^\s*(\d+)\.\s+(.*$)/gm, '<li class="ab-num-item"><span class="ab-num-bullet">$1.</span> $2</li>');
    html = html.replace(/((?:<li class="ab-num-item">[\s\S]*?<\/li>\s*)+)/g, '<ol class="ab-num-list">$1</ol>');

    // Bullet lists
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
          if (target && target.startsWith('http')) {
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

      // 1. User Message
      appendMessage('user', escapeHtml(q));

      // 2. Typing Indicator
      const typingEl = showTypingIndicator();

      // 3. Process with realistic AI latency (400ms)
      setTimeout(() => {
        if (typingEl && typingEl.parentElement) {
          typingEl.remove();
        }

        const match = matchQueryToKnowledge(q);
        const formatted = formatMarkdown(match.response);
        appendMessage('bot', formatted, match.actions);
      }, 400);
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
