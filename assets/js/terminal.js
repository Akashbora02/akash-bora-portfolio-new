/**
 * Interactive DevOps Terminal Simulation for Akash Bora Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  
  if (!terminalBody || !terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const terminalCommands = {
    help: () => `
<span class="terminal-highlight">Available Commands:</span>
  <span class="terminal-success">about</span>          - View Akash's professional summary
  <span class="terminal-success">skills</span>         - View core technical stack &amp; tools
  <span class="terminal-success">experience</span>     - View work history (Hisan Labs, Tradetron)
  <span class="terminal-success">cert</span>           - View AWS Solutions Architect Certification
  <span class="terminal-success">kubectl get nodes</span>- Inspect live Kubernetes cluster nodes
  <span class="terminal-success">kubectl get pods</span> - View microservices running on EKS
  <span class="terminal-success">terraform apply</span>  - Provision AWS Cloud Infrastructure
  <span class="terminal-success">gitops sync</span>      - Trigger Argo CD declarative deployment
  <span class="terminal-success">contact</span>        - Get direct phone, email &amp; LinkedIn
  <span class="terminal-success">clear</span>          - Clear terminal screen
`,
    about: () => `
<span class="terminal-highlight">Akash Bora</span> - <span class="terminal-success">Cloud &amp; DevOps Engineer</span> (2+ Years Exp)
Location: Pune, Maharashtra | Current: Cloud Engineer @ Groots
Focus: AWS Cloud Architecture, Kubernetes (EKS), GitOps, Terraform IaC, CI/CD &amp; Observability.
`,
    skills: () => `
<span class="terminal-highlight">Containers:</span> Docker, Kubernetes (EKS, GKE), Helm, HPA, ECR
<span class="terminal-highlight">Cloud / IaC:</span> AWS (EKS, EC2, RDS, VPC, ALB, S3, IAM), GCP, Terraform
<span class="terminal-highlight">CI/CD:</span> Jenkins, GitHub Actions, GitLab CI/CD, Argo CD, Zero-Downtime
<span class="terminal-highlight">Observability:</span> Prometheus, Grafana, AWS CloudWatch (MTTR -30%)
<span class="terminal-highlight">Security:</span> SonarQube SAST, Trivy Container Scanning, RBAC, SSL/TLS
<span class="terminal-highlight">Scripting:</span> Bash Shell Scripting, Python, Ansible
`,
    experience: () => `
<span class="terminal-highlight">1. Groots Software Technologies Pvt Ltd</span> | Cloud Engineer (Jun 2026 - Present)
   • AWS Infrastructure, Linux Administration, Azure DevOps Server &amp; Terraform
<span class="terminal-highlight">2. Hisan Labs Pvt Ltd</span> | DevOps Engineer (May 2025 - May 2026 · 1 yr 1 mo)
   • 5-10 microservices on Kubernetes (EKS/GKE), Jenkins, Argo CD GitOps, DevSecOps
<span class="terminal-highlight">3. Tradetron</span> | Linux Engineer (Jan 2023 - Dec 2023 · 1 yr, Remote)
   • Linux server administration (RHEL, Ubuntu), AWS &amp; Shell Scripting automation
`,
    cert: () => `
<span class="terminal-warning">1. AWS Certified Solutions Architect – Professional</span>
   Status: Active &amp; Verified | Level: Professional | Amazon Web Services
<span class="terminal-highlight">2. Agentic AI for DevOps - Masterclass</span>
   Issued by: TrainWithShubham | Credential ID: 46XYO2NV (Issued May 2026)
`,
    certifications: () => terminalCommands.cert(),
    'kubectl get nodes': () => `
<span class="terminal-highlight">NAME                          STATUS   ROLES    AGE   VERSION</span>
ip-10-0-1-12.ec2.internal     <span class="terminal-success">Ready</span>    node     42d   v1.28.3-eks
ip-10-0-2-45.ec2.internal     <span class="terminal-success">Ready</span>    node     42d   v1.28.3-eks
ip-10-0-3-88.ec2.internal     <span class="terminal-success">Ready</span>    node     18d   v1.28.3-eks
<span class="terminal-success">Cluster Health: 100% OK (HPA Dynamic Scaling Active)</span>
`,
    'kubectl get pods': () => `
<span class="terminal-highlight">NAMESPACE     NAME                           READY   STATUS    RESTARTS   AGE</span>
production    auth-service-789bfb569-8j2k1   1/1     <span class="terminal-success">Running</span>   0          5d
production    api-gateway-55694ccb4-9lp02    1/1     <span class="terminal-success">Running</span>   0          12d
production    payment-worker-6789f89a-w4r9q  1/1     <span class="terminal-success">Running</span>   0          3d
argocd        argocd-server-5d6489bc6-q12z7  1/1     <span class="terminal-success">Running</span>   0          42d
monitoring    prometheus-server-0            2/2     <span class="terminal-success">Running</span>   0          42d
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
<span class="terminal-highlight">Get in Touch with Akash:</span>
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
    appendTerminalLine(`<span class="terminal-prompt">akash@devops-node</span>:<span class="terminal-path">~/infra</span>$ <span class="terminal-cmd">${escapeHtml(raw)}</span>`);

    const lower = raw.toLowerCase();
    if (terminalCommands[lower]) {
      const res = terminalCommands[lower]();
      if (res) appendTerminalLine(res);
    } else if (lower === 'cls') {
      terminalCommands.clear();
    } else {
      appendTerminalLine(`<span class="terminal-warning">command not found: "${escapeHtml(raw)}". Type <span class="terminal-highlight">'help'</span> for available commands.</span>`);
    }
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
<span class="terminal-success">✓ Connected to Akash Bora Cloud Control Shell (v2.4.0)</span>
Type <span class="terminal-highlight">'help'</span> to see commands or explore the interactive portfolio below.
`);
  appendTerminalLine(`<span class="terminal-prompt">akash@devops-node</span>:<span class="terminal-path">~/infra</span>$ <span class="terminal-cmd">kubectl get nodes</span>`);
  appendTerminalLine(terminalCommands['kubectl get nodes']());
});
