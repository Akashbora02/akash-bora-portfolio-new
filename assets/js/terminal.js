/**
 * Interactive DevOps Terminal Simulation for Akash Bora Portfolio
 * Specializing in AWS Cloud, Enterprise Linux, Kubernetes & FinOps
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
<span class="terminal-highlight">Available Cloud &amp; Systems Commands:</span>
  <span class="terminal-success">about</span>            - View Akash's professional summary
  <span class="terminal-success">skills</span>           - View core technical stack &amp; tools
  <span class="terminal-success">experience</span>       - View work history (Groots, Hisan Labs, Tradetron)
  <span class="terminal-success">cert</span>             - View AWS SAP Certification details
  <span class="terminal-success">kubectl get nodes</span> - Inspect live Kubernetes cluster nodes
  <span class="terminal-success">kubectl get pods</span>  - View microservices running on EKS
  <span class="terminal-success">terraform apply</span>   - Provision AWS Cloud Infrastructure
  <span class="terminal-success">gitops sync</span>       - Trigger Argo CD declarative deployment
  <span class="terminal-success">finops report</span>     - View AWS multi-account cost optimization metrics
  <span class="terminal-success">linux diag</span>        - Run Linux production server health check
  <span class="terminal-success">ai status</span>         - Check autonomous SRE controller status
  <span class="terminal-success">ai remediate</span>      - Simulate automated incident self-healing
  <span class="terminal-success">contact</span>           - Get direct phone, email &amp; LinkedIn
  <span class="terminal-success">clear</span>             - Clear terminal screen
`,
    about: () => `
<span class="terminal-highlight">Akash Bora</span> - <span class="terminal-success">AWS Cloud &amp; DevOps Engineer | Linux Systems Specialist</span>
Location: Pune, Maharashtra, India | Current: Cloud Engineer @ Groots Software Technologies
Focus: AWS Multi-Account Cloud Architecture, Linux Production Operations, Kubernetes (EKS), Terraform IaC, FinOps &amp; GitOps.
`,
    skills: () => `
<span class="terminal-highlight">AWS Cloud:</span> Multi-AZ VPC, EKS, ECS, EC2, RDS Aurora, S3, IAM, Route 53, CloudWatch, CloudFormation
<span class="terminal-highlight">Linux Systems:</span> Enterprise RHEL, Ubuntu, CentOS, Kernel Tuning, Systemd, Process &amp; Resource Triage
<span class="terminal-highlight">DevOps &amp; IaC:</span> Terraform, Docker, Kubernetes, Helm, GitLab CI/CD, GitHub Actions, Jenkins, Argo CD
<span class="terminal-highlight">Cloud FinOps:</span> Multi-Account AWS Onboarding, Cross-Account IAM, CUR &amp; FOCUS 1.2 Data Pipelines
<span class="terminal-highlight">Observability:</span> Prometheus, Grafana, Alertmanager, AWS CloudWatch
<span class="terminal-highlight">Scripting:</span> Bash Shell Scripting, Python Automation
`,
    experience: () => `
<span class="terminal-highlight">1. Groots Software Technologies Pvt Ltd</span> | Cloud Engineer (Jun 2024 - Present)
   • AWS Cloud Infrastructure, Multi-Account Governance, CloudFormation, FinOps CUR/FOCUS 1.2, Linux Systems
<span class="terminal-highlight">2. Hisan Labs Pvt Ltd</span> | DevOps Engineer (May 2023 - May 2024 · 1 yr 1 mo)
   • AWS &amp; Linux infrastructure, Docker microservices packaging, CI/CD pipelines, production troubleshooting
<span class="terminal-highlight">3. Tradetron</span> | Linux Engineer (Jan 2022 - Dec 2022 · 1 yr, Remote)
   • Enterprise Linux system administration (RHEL, Ubuntu, CentOS), Bash automation, incident response runbooks
`,
    cert: () => `
<span class="terminal-warning">AWS Certified Solutions Architect – Professional (SAP)</span>
Status: Active &amp; Verified | Level: Professional | Amazon Web Services
Validation: Hands-on mastery in complex multi-tier cloud architectures, security, and high availability.
`,
    certifications: () => terminalCommands.cert(),
    'finops report': () => `
<span class="terminal-highlight">AWS Multi-Account FinOps Pipeline (CloudNetra):</span>
• Accounts Onboarded: <span class="terminal-success">Multi-Account AWS via CloudFormation &amp; IAM Cross-Account Roles</span>
• Data Ingestion: <span class="terminal-success">S3 CUR (Cost &amp; Usage Report) &amp; AWS FOCUS 1.2 Standard Ingestion</span>
• Storage &amp; Database: <span class="terminal-success">PostgreSQL &amp; TimescaleDB Time-Series Operations</span>
• Cost Anomaly Detection: <span class="terminal-highlight">Automated unattached EBS volume, idle compute &amp; snapshot sweeps</span>
`,
    'linux diag': () => `
<span class="terminal-highlight">[root@prod-rhel-node ~]# ./linux_system_audit.sh</span>
[00:01] Checking kernel parameters &amp; file descriptors: <span class="terminal-success">sysctl fs.file-max = 2097152 (OPTIMAL)</span>
[00:02] Memory &amp; Swap diagnostics: <span class="terminal-success">MemAvailable: 78.4% | SwapUsed: 0% (HEALTHY)</span>
[00:03] Disk I/O &amp; Inode consumption: <span class="terminal-success">/dev/nvme0n1p1: 42% used, Inodes: 18% used (CLEAN)</span>
[00:04] Systemd active units: <span class="terminal-success">142 loaded, 0 failed, 0 degraded</span>
<span class="terminal-success">✓ Linux Production Environment verified: 100% operational.</span>
`,
    'ai status': () => `
<span class="terminal-highlight">Agentic AI SRE Controller (v2.6)</span>
• Framework: <span class="terminal-success">LangGraph ReAct Autonomous Agent</span>
• LLM Engine: <span class="terminal-success">Claude 3.7 / Gemini 2.5 Pro via vLLM</span>
• Vector Memory: <span class="terminal-success">Qdrant Vector Cluster (Healthy - 1,420 Runbooks Indexed)</span>
• Webhook Listener: <span class="terminal-success">Active on /api/v1/alerts (Listening to Prometheus)</span>
• Remediation Action: <span class="terminal-success">Argo CD GitOps Pull-Request Engine (Permitted)</span>
• Incident Self-Healing Success Rate: <span class="terminal-highlight">98.4% without human intervention</span>
`,
    'ai remediate': () => `
<span class="terminal-warning">[SIMULATION] Triggering synthetic Alertmanager incident: HTTP 500 Spike in payment-worker</span>
[00:01] <span class="terminal-highlight">Alertmanager Webhook &rarr; AI SRE Agent:</span> Alert: HighErrorRate on namespace: production
[00:03] <span class="terminal-cmd">AI Agent:</span> Querying OpenTelemetry trace IDs and last 500 pod container logs...
[00:05] <span class="terminal-cmd">Root-Cause Detected:</span> OOMKilled caused by unexpected payload size in commit e4f891b
[00:08] <span class="terminal-cmd">Vector Search (Qdrant):</span> Matched Remediation Runbook #412 (Memory Limit Patch + Rolling Rollback)
[00:11] <span class="terminal-cmd">GitOps Action:</span> Dispatched Git pull-request with verified manifest patch to Argo CD
[00:14] <span class="terminal-success">Argo CD: Syncing microservice to healthy state (Blue/Green switchover complete)</span>
<span class="terminal-success">✓ Incident Fully Remediated in 14.2 seconds! MTTR reduced by 70%. Zero Downtime.</span>
`,
    'kubectl get nodes': () => `
<span class="terminal-highlight">NAME                          STATUS   ROLES    AGE   VERSION</span>
ip-10-0-1-12.ec2.internal     <span class="terminal-success">Ready</span>    node     42d   v1.28.3-eks
ip-10-0-2-45.ec2.internal     <span class="terminal-success">Ready</span>    node     42d   v1.28.3-eks
ip-10-0-3-88.ec2.internal     <span class="terminal-success">Ready</span>    node     18d   v1.28.3-eks
<span class="terminal-success">Cluster Health: 100% OK (HPA Dynamic Scaling + Karpenter Active)</span>
`,
    'kubectl get pods': () => `
<span class="terminal-highlight">NAMESPACE     NAME                           READY   STATUS    RESTARTS   AGE</span>
production    auth-service-789bfb569-8j2k1   1/1     <span class="terminal-success">Running</span>   0          5d
production    api-gateway-55694ccb4-9lp02    1/1     <span class="terminal-success">Running</span>   0          12d
production    payment-worker-6789f89a-w4r9q  1/1     <span class="terminal-success">Running</span>   0          3d
argocd        argocd-server-5d6489bc6-q12z7  1/1     <span class="terminal-success">Running</span>   0          42d
monitoring    prometheus-server-0            2/2     <span class="terminal-success">Running</span>   0          42d
ai-sre        ai-remediation-agent-7f9a2-x   1/1     <span class="terminal-success">Running</span>   0          14d
`,
    'terraform apply': () => `
<span class="terminal-highlight">Terraform v1.7.0</span>
Initializing provider plugins...
aws_vpc.prod_vpc: Refreshing state... [id=vpc-089b2c]
aws_eks_cluster.prod_eks: Refreshing state... [id=eks-prod-cluster]
<span class="terminal-success">Apply complete! Resources: 0 added, 0 changed, 0 destroyed.</span>
<span class="terminal-highlight">Outputs:</span>
eks_cluster_endpoint = "https://72E5D0.gr7.us-east-1.eks.amazonaws.com"
alb_dns_name = "k8s-prod-ingress-alb.amazonaws.com"
`,
    'gitops sync': () => `
<span class="terminal-highlight">Argo CD GitOps Sync Engine</span>
Fetching target revision 'HEAD' from repository...
Comparing target state to live cluster state...
Syncing app: <span class="terminal-success">microservices-prod</span> (Revision: 8f3c4e2)
✓ Pod/auth-service updated (Zero-downtime rolling update)
✓ Service/auth-service configured
<span class="terminal-success">✓ Health Status: Healthy | Sync Status: Synced</span>
`,
    contact: () => `
<span class="terminal-highlight">Get in Touch with Akash Bora:</span>
• Email:    <a href="mailto:akashbora0082@gmail.com" class="terminal-highlight">akashbora0082@gmail.com</a>
• Phone:    <a href="tel:+917057100082" class="terminal-highlight">+91-7057100082</a>
• LinkedIn: <a href="https://www.linkedin.com/in/akash-bora/" target="_blank" class="terminal-highlight">linkedin.com/in/akash-bora</a>
• GitHub:   <a href="https://github.com/Akashbora02" target="_blank" class="terminal-highlight">github.com/Akashbora02</a>
• Location: Pune, Maharashtra, India
`,
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  function appendTerminalLine(content) {
    const div = document.createElement('div');
    div.className = 'terminal-output';
    div.innerHTML = content;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmdText) {
    const raw = cmdText.trim();
    if (!raw) return;

    commandHistory.push(raw);
    historyIndex = commandHistory.length;

    // Echo input
    appendTerminalLine(`<span class="terminal-prompt">akash@cloud-shell</span>:<span class="terminal-path">~/infra</span>$ <span class="terminal-cmd">${escapeHtml(raw)}</span>`);

    const lower = raw.toLowerCase();

    // Check direct commands
    if (terminalCommands[lower]) {
      const res = terminalCommands[lower]();
      if (res) appendTerminalLine(res);
      return;
    }

    if (lower === 'cls') {
      terminalCommands.clear();
      return;
    }

    appendTerminalLine(`<span class="terminal-warning">command not found: "${escapeHtml(raw)}". Type <span class="terminal-highlight">'help'</span> for available commands.</span>`);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard navigation & Enter
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      e.preventDefault();
    }
  });

  // Keep terminal focused when clicking inside terminal box
  const terminalWindow = document.querySelector('.terminal-window');
  if (terminalWindow) {
    terminalWindow.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // Initial welcome sequence
  appendTerminalLine(`
<span class="terminal-success">✓ Connected to Akash Bora Cloud Control Shell (Linux &amp; AWS Systems)</span>
Type <span class="terminal-highlight">'help'</span>, <span class="terminal-highlight">'skills'</span>, <span class="terminal-highlight">'finops report'</span>, or <span class="terminal-highlight">'linux diag'</span>.
`);
  appendTerminalLine(`<span class="terminal-prompt">akash@cloud-shell</span>:<span class="terminal-path">~/infra</span>$ <span class="terminal-cmd">linux diag</span>`);
  appendTerminalLine(terminalCommands['linux diag']());
});
