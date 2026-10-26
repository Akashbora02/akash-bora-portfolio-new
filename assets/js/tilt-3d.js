/**
 * 3D Holographic Card Tilt & Specular Lighting Engine
 * For Akash Bora Portfolio
 */

(function () {
  'use strict';

  // Only enable on desktop pointer devices to avoid touch drag lag
  const isTouchDevice = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function init3DTilt() {
    if (isTouchDevice()) {
      return; // Keep cards native touch responsive on mobile
    }

    const cards = document.querySelectorAll(
      '.project-card, .cert-card, .experience-card, .terminal-window, .skill-category-card, .stat-card'
    );

    cards.forEach((card) => {
      // Create Specular Glare Element if not already added
      let glare = card.querySelector('.card-specular-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-specular-glare';
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glare);
      }

      const maxTilt = card.classList.contains('terminal-window') ? 6 : 9;

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
        glare.style.opacity = '1';
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;

        const rotateX = -percentY * maxTilt;
        const rotateY = percentX * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        // Move glare specular highlight
        glare.style.background = `radial-gradient(circle at ${(percentX + 0.5) * 100}% ${(percentY + 0.5) * 100}%, rgba(0, 229, 255, 0.16) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 80%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        glare.style.opacity = '0';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DTilt);
  } else {
    init3DTilt();
  }

  window.init3DTilt = init3DTilt;
})();
