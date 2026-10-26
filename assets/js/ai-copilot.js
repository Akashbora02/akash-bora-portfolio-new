/**
 * Ask with AB Agent — Autonomous Cloud, DevOps & SRE Assistant
 * Interactive conversational agent for recruiters, interviewers & engineering managers
 * For Akash Bora Portfolio
 */

(function () {
  'use strict';

  const KNOWLEDGE_BASE = [
    {
      keywords: ['hire', 'why', 'strength', 'candidate', 'interview', 'fit', 'qualification', 'value'],
      title: 'Why Akash Bora is an Exceptional Cloud & DevOps Engineer',
      response: `Here is why **Akash Bora** stands out for Cloud, DevOps & SRE roles:
- **Proven Production Experience:** 2+ years managing mission-critical AWS infrastructure (EKS, EC2, RDS, VPC, ALB, IAM), Linux production servers, and automated pipelines.
- **GitOps & Kubernetes Leadership:** Built zero-downtime Blue/Green GitOps deployment engines with **Argo CD & AWS EKS**, enabling automated drift correction and instant 1-click rollbacks.
- **AIOps & Modern SRE Specialist:** Holds an **Agentic AI for DevOps Masterclass** certification; designs autonomous SRE runbooks, log root-cause analysis, and predictive anomaly triage cutting MTTR by **70%**.
- **DevSecOps Discipline:** Shifts security left by baking **SonarQube SAST** and **Trivy container vulnerability gates** into CI/CD, eliminating critical CVEs before production.
- **Top-Tier Cloud Credential:** **AWS Certified Solutions Architect – Professional (SAP)** verified.`,
      quickAction: { label: 'Explore Key Projects', url: '#projects' }
    },
    {
      keywords: ['agentic', 'ai', 'aiops', 'llm', 'sre', 'remediation', 'self-healing', 'langgraph', 'autonomous'],
      title: 'Agentic AI for DevOps & SRE Autonomous Operations',
      response: `Akash leverages **Agentic AI & LLMOps** to transform traditional DevOps into autonomous self-healing systems:
- **Autonomous SRE Incident Remediation:** Uses LangGraph / ReAct agent frameworks to intercept Alertmanager webhooks, parse real-time OpenTelemetry pod logs, extract crash signatures, and query vector databases (Qdrant) for root-cause analysis in < 15 seconds.
- **Automated GitOps Remediation:** Instead of waking up engineers at 3 AM, the AI Agent creates targeted declarative Git rollback or config patches synced cleanly via Argo CD.
- **LLMOps on Kubernetes:** Architected GPU auto-scaling worker nodes with Karpenter on AWS EKS to host containerized GenAI microservices.
- **Certified Expertise:** Credentialed in **Agentic AI for DevOps Masterclass** (TrainWithShubham, Credential ID: \`46XYO2NV\`).`,
      quickAction: { label: 'Inspect AI SRE Project', url: '#projects' }
    },
    {
      keywords: ['gitops', 'argo', 'argocd', 'kubernetes', 'k8s', 'eks', 'blue', 'green', 'deployment'],
      title: 'Kubernetes & GitOps Blue/Green Architecture',
      response: `Akash's Kubernetes & GitOps production setup includes:
- **Declarative Infrastructure:** Kubernetes manifests, Helm charts, and custom Kustomize overlays maintained in Git as the single source of truth.
- **Argo CD Controller:** Automated drift detection between Git and live AWS EKS clusters.
- **Zero-Downtime Rollouts:** Blue/Green and Canary releases using NGINX Ingress and Argo Rollouts.
- **High Availability & Autoscaling:** Horizontal Pod Autoscaler (HPA) coupled with Cluster Autoscaler to handle dynamic traffic spikes smoothly.`,
      quickAction: { label: 'View GitOps Architecture', url: '#projects' }
    },
    {
      keywords: ['aws', 'cloud', 'cert', 'certified', 'solutions architect', 'professional', 'sap'],
      title: 'AWS Certified Solutions Architect – Professional',
      response: `Akash holds the prestigious **AWS Certified Solutions Architect – Professional**:
- **Expertise Validated:** Multi-tier VPC network topologies, AWS EKS container orchestration, Multi-AZ RDS Aurora, Application Load Balancers, IAM Least-Privilege, KMS encryption at rest, and CloudWatch telemetry.
- **Cost Optimization:** Leveraged Terraform modular IaC to eliminate idle cloud compute and optimize container sizing, driving down AWS bills while sustaining 99.95% uptime.`,
      quickAction: { label: 'View AWS Credential', url: '#certifications' }
    },
    {
      keywords: ['experience', 'work', 'history', 'company', 'groots', 'hisan', 'tradetron', 'background'],
      title: 'Professional Track Record (2+ Years)',
      response: `Here is a summary of Akash Bora's professional journey:
1. **Cloud Engineer @ Groots Software Technologies** *(Jun 2024 – Present | Pune)*
   - Leading AWS cloud infrastructure (EKS, VPC, ALB, RDS, S3), Linux production hardening, Azure DevOps Server, and Terraform IaC provisioning.
2. **DevOps Engineer @ Hisan Labs** *(May 2023 – May 2024 · 1 yr 1 mo | Pune)*
   - Managed 10+ microservices on Kubernetes (EKS/GKE), streamlined Jenkins & GitHub Actions pipelines (cutting deployment time by 40%), and implemented GitOps with Argo CD.
3. **Linux Engineer @ Tradetron** *(Jan 2022 – Dec 2022 · 1 yr | Remote)*
   - Mission-critical Linux server administration (RHEL, Ubuntu, CentOS), authoring standard incident runbooks, and automating operational tasks via Bash scripting.`,
      quickAction: { label: 'View Full Timeline', url: '#experience' }
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'call', 'location', 'pune', 'linkedin', 'github', 'whatsapp'],
      title: 'Direct Contact Details for Akash Bora',
      response: `You can reach out to Akash directly for interviews or discussions:
- 📧 **Email:** [akashbora0082@gmail.com](mailto:akashbora0082@gmail.com)
- 📱 **Phone / WhatsApp:** [+91-7057100082](tel:+917057100082)
- 💼 **LinkedIn:** [linkedin.com/in/akash-bora/](https://www.linkedin.com/in/akash-bora/)
- 💻 **GitHub:** [github.com/Akashbora02](https://github.com/Akashbora02)
- 📍 **Location:** Pune District, Maharashtra, India (Open to On-site, Hybrid & Remote opportunities)`,
      quickAction: { label: 'Send Form Message', url: '#contact' }
    },
    {
      keywords: ['terraform', 'iac', 'ansible', 'automation', 'scripting', 'bash', 'python'],
      title: 'Infrastructure as Code (IaC) & Automation Stack',
      response: `Akash builds repeatable, drift-free cloud environments using:
- **Terraform:** Reusable multi-environment modules (Dev, Staging, Prod), remote S3 state backends with DynamoDB locking, and automated \`terraform plan\` pull-request review gates.
- **Ansible:** Automated configuration management and Linux server security hardening.
- **Shell & Python:** Custom CLI tools, automated health probe monitors, and deployment hooks.`,
      quickAction: { label: 'View Key Projects', url: '#projects' }
    }
  ];

  function getAiResponse(userQuery) {
    const query = userQuery.toLowerCase().trim();
    let bestMatch = null;
    let highestScore = 0;

    KNOWLEDGE_BASE.forEach((item) => {
      let score = 0;
      item.keywords.forEach((kw) => {
        if (query.includes(kw)) {
          score += kw.length > 4 ? 2 : 1;
        }
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }

    // Default intelligent fallback
    return {
      title: 'Akash Bora — Cloud & DevOps Engineer Profile',
      response: `Hello! I'm **AB Agent** — Akash Bora's autonomous Cloud, DevOps & SRE assistant! I can answer technical questions regarding:
- 🚀 **Skills & Architecture:** AWS, Kubernetes (EKS), GitOps (Argo CD), Terraform, DevSecOps.
- 🤖 **Agentic AI & SRE:** Autonomous SRE remediation, Prometheus AIOps, OpenTelemetry pod logs.
- 🏢 **Work Experience:** Cloud Engineer at Groots, DevOps Engineer at Hisan Labs, Linux Engineer at Tradetron.
- 📜 **Credentials:** AWS Certified Solutions Architect – Professional (SAP) & Agentic AI Masterclass.
- 📞 **Contact Information:** Phone, email, WhatsApp, and LinkedIn.

*Feel free to click any of the prompt pills below or ask any technical interview question!*`,
      quickAction: { label: 'Contact Akash Directly', url: '#contact' }
    };
  }

  function initCopilotUI() {
    const modalEl = document.getElementById('aiCopilotModal');
    const messagesContainer = document.getElementById('ai-chat-messages');
    const inputField = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('btn-ai-send');
    const promptPills = document.querySelectorAll('.ai-prompt-pill');

    if (!modalEl || !messagesContainer || !inputField || !sendBtn) return;

    function appendMessage(sender, text, quickAction = null) {
      const msgRow = document.createElement('div');
      msgRow.className = `ai-message-row ${sender === 'user' ? 'user-message' : 'bot-message'}`;

      const avatar = sender === 'user' 
        ? '<div class="ai-avatar user"><i class="fa-solid fa-user"></i></div>'
        : '<div class="ai-avatar bot"><i class="fa-solid fa-robot text-cyan"></i></div>';

      // Markdown formatting conversion
      let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="terminal-highlight">$1</code>')
        .replace(/\n/g, '<br>');

      let actionHtml = '';
      if (quickAction && quickAction.url && quickAction.label) {
        actionHtml = `<div class="mt-2 pt-2 border-top border-secondary-subtle">
          <button type="button" class="btn btn-sm btn-outline-info ai-action-link" data-target-url="${quickAction.url}">
            <i class="fa-solid fa-arrow-up-right-from-square me-1"></i> ${quickAction.label}
          </button>
        </div>`;
      }

      msgRow.innerHTML = `
        ${avatar}
        <div class="ai-message-bubble">
          <div class="ai-message-text">${formattedText}</div>
          ${actionHtml}
        </div>
      `;

      messagesContainer.appendChild(msgRow);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Direct Action Link Handler: smoothly closes modal and navigates/scrolls to target
    messagesContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.ai-action-link');
      if (!btn) return;
      const targetUrl = btn.getAttribute('data-target-url');
      if (!targetUrl) return;

      const modalInstance = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }

      setTimeout(() => {
        if (targetUrl.startsWith('#projectModal')) {
          const targetModalEl = document.querySelector(targetUrl);
          if (targetModalEl) {
            const nextModal = new bootstrap.Modal(targetModalEl);
            nextModal.show();
          }
        } else if (targetUrl.startsWith('#')) {
          const targetSection = document.querySelector(targetUrl);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.location.href = targetUrl;
        }
      }, 350);
    });

    function handleUserSubmit(queryText) {
      const text = (queryText || inputField.value).trim();
      if (!text) return;

      appendMessage('user', text);
      inputField.value = '';

      // Simulated AI Thinking Delay
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'ai-message-row bot-message ai-typing-indicator';
      typingIndicator.innerHTML = `
        <div class="ai-avatar bot"><i class="fa-solid fa-robot text-cyan"></i></div>
        <div class="ai-message-bubble py-2 px-3">
          <span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span>
        </div>
      `;
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      setTimeout(() => {
        if (typingIndicator.parentElement) {
          typingIndicator.remove();
        }
        const data = getAiResponse(text);
        appendMessage('bot', data.response, data.quickAction);
      }, 420);
    }

    sendBtn.addEventListener('click', () => handleUserSubmit());
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSubmit();
      }
    });

    promptPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const query = pill.getAttribute('data-query') || pill.textContent.trim();
        handleUserSubmit(query);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopilotUI);
  } else {
    initCopilotUI();
  }

  window.AkashCopilot = {
    getResponse: getAiResponse
  };
})();
