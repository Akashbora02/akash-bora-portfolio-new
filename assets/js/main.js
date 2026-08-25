/**
 * Main JavaScript for Akash Bora Portfolio Website
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initParticleNetwork();
  initDynamicTyping();
  initStatsCounter();
  initSkillFilter();
  initPipelineVisualizer();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. NAVBAR SCROLL EFFECT & ACTIVE SPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE PARTICLE & CLOUD MESH CANVAS
   ========================================================================== */
function initParticleNetwork() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 22), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(0, 229, 255, ' : 'rgba(99, 102, 241, '
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.18 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // Move & draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. DYNAMIC TYPING ROTATOR
   ========================================================================== */
function initDynamicTyping() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Cloud Engineer @ Groots',
    'AWS Solutions Architect (Pro)',
    'DevOps & GitOps Specialist',
    'Kubernetes & SRE Engineer',
    'Agentic AI for DevOps'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. STATS NUMBER COUNTER (SCROLL TRIGGERED)
   ========================================================================== */
function initStatsCounter() {
  const statsSection = document.querySelector('.hero-stats-strip');
  if (!statsSection) return;

  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const step = target / 40;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = (isDecimal ? target.toFixed(2) : Math.round(target)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? current.toFixed(2) : Math.round(current)) + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ==========================================================================
   5. SKILLS MATRIX FILTER TABS
   ========================================================================== */
function initSkillFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE CI/CD & GITOPS PIPELINE VISUALIZER
   ========================================================================== */
function initPipelineVisualizer() {
  const nodes = document.querySelectorAll('.pipeline-step-node');
  const consoleOutput = document.getElementById('pipeline-console-output');
  const progressBar = document.querySelector('.pipeline-connector-progress');

  const stepDetails = {
    'step-code': {
      progress: '15%',
      log: `[00:01] <span style="color:#3B82F6">GIT REPO:</span> Commit triggered by Akash Bora on branch <span style="color:#00E5FF">main</span>
[00:03] Webhook dispatched to GitHub Actions / GitLab CI
[00:04] Syntax checking &amp; YAML linter completed: <span style="color:#10B981">PASSED (0 errors)</span>`
    },
    'step-sast': {
      progress: '38%',
      log: `[00:08] <span style="color:#8B5CF6">SONARQUBE SAST:</span> Executing static code analysis...
[00:14] Code Smells: 0 | Vulnerabilities: 0 | Bugs: 0
[00:15] <span style="color:#10B981">Quality Gate Status: PASSED</span> (A-grade maintainability &amp; reliability)`
    },
    'step-build': {
      progress: '62%',
      log: `[00:19] <span style="color:#EC4899">DOCKER MULTI-STAGE BUILD:</span> Building microservice container...
[00:27] Stripping development dependencies, base image size reduced to 42MB
[00:30] <span style="color:#10B981">TRIVY SCAN:</span> 0 Critical, 0 High vulnerabilities found.
[00:32] Pushing sanitized image to <span style="color:#FF9900">AWS ECR</span> (SHA256: 9e4f21a8...)`
    },
    'step-gitops': {
      progress: '85%',
      log: `[00:35] <span style="color:#FF9900">ARGO CD GITOPS ENGINE:</span> Detected manifest update in Git repository.
[00:37] Reconciling desired state with live AWS EKS Kubernetes cluster...
[00:40] Rolling out deployment with zero downtime (HPA target: 2-4 nodes).
[00:42] <span style="color:#10B981">Application Status: SYNCED &amp; HEALTHY</span> 🚀`
    },
    'step-monitor': {
      progress: '100%',
      log: `[00:45] <span style="color:#00E5FF">OBSERVABILITY:</span> Prometheus scraping metrics from /metrics endpoint.
[00:46] Grafana Dashboard updated: CPU: 12%, Memory: 24%, 0 Pod restarts.
[00:47] <span style="color:#10B981">All health checks &amp; synthetic probes responding 200 OK (Latency: 18ms).</span>`
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const stepId = node.getAttribute('data-step');
      if (stepDetails[stepId]) {
        progressBar.style.width = stepDetails[stepId].progress;
        consoleOutput.innerHTML = stepDetails[stepId].log;
      }
    });
  });
}

/* ==========================================================================
   7. CONTACT FORM REAL-TIME VALIDATION & SUBMISSION SIMULATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('btn-submit-contact');
  const toastEl = document.getElementById('contactToast');

  if (!contactForm || !submitBtn) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const topic = document.getElementById('contact-project-type') ? document.getElementById('contact-project-type').value : 'General Inquiry';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    // Email regex check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Submit state animation
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...`;

    const newInquiry = {
      id: 'inq_' + Date.now(),
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      topic,
      message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };

    // Store in browser database (localStorage for Admin Dashboard)
    try {
      const STORAGE_KEY = 'akash_portfolio_messages';
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      existing.unshift(newInquiry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('Storage sync warning:', e);
    }

    // Dispatch to Vercel Serverless /api/contact if available
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch(err => {
      console.log('Serverless API info (offline/static mode fallback active):', err);
    });

    // Simulated network feedback & toast trigger
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="fa-solid fa-check me-2"></i> Message Sent!`;
      submitBtn.classList.remove('btn-primary-glow');
      submitBtn.classList.add('btn-success');

      // Show Bootstrap Toast
      if (toastEl && window.bootstrap) {
        const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
        toast.show();
      }

      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.remove('btn-success');
        submitBtn.classList.add('btn-primary-glow');
      }, 4000);
    }, 1000);
  });
}

/* ==========================================================================
   8. SMOOTH SCROLL FOR BUTTONS & ANCHORS + MOBILE AUTO-CLOSE
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // Auto-close mobile navbar collapse if open
        const navCollapseEl = document.getElementById('navbarContent');
        if (navCollapseEl && navCollapseEl.classList.contains('show') && window.bootstrap) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapseEl) || new bootstrap.Collapse(navCollapseEl, { toggle: false });
          bsCollapse.hide();
        }

        const headerOffset = 75;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   9. STEALTH ADMIN SHORTCUT (Ctrl + Shift + A / Cmd + Shift + A)
   ========================================================================== */
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    window.location.href = 'admin/';
  }
});
