/**
 * Ultra-Smooth 3D Perspective Tilt & Specular Glare Engine
 * Physics-based spring lerp for silky smooth 60fps hover transitions
 * For Akash Bora Portfolio
 */

(function () {
  'use strict';

  // Detect touch devices to avoid interference with mobile scrolling
  const isTouchDevice = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 992);

  function init3DTilt() {
    const cards = document.querySelectorAll(
      '.project-card, .cert-card, .experience-card, .terminal-window, .skill-category-card, .stat-card'
    );

    if (isTouchDevice()) {
      // Clean up any existing inline transforms on mobile/touch screens
      cards.forEach((el) => {
        el.style.transform = '';
        el.style.transition = '';
      });
      return;
    }

    cards.forEach((card) => {
      // Create Specular Glare Element if not already added
      let glare = card.querySelector('.card-specular-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-specular-glare';
        card.style.position = 'relative';
        card.appendChild(glare);
      }

      // Max tilt angle & lift parameters
      const isTerminal = card.classList.contains('terminal-window');
      const maxTilt = isTerminal ? 3.0 : 7.0;
      const liftY = isTerminal ? -2.0 : -6.0;
      const scaleVal = isTerminal ? 1.006 : 1.018;

      let state = {
        currentRotX: 0,
        currentRotY: 0,
        currentTranslateY: 0,
        currentScale: 1,
        currentGlareOpacity: 0,
        targetRotX: 0,
        targetRotY: 0,
        targetTranslateY: 0,
        targetScale: 1,
        targetGlareOpacity: 0,
        glarePercentX: 50,
        glarePercentY: 50,
        rafId: null,
        isHovered: false
      };

      function updatePhysics() {
        const factor = 0.12; // Silky smooth damping factor

        state.currentRotX += (state.targetRotX - state.currentRotX) * factor;
        state.currentRotY += (state.targetRotY - state.currentRotY) * factor;
        state.currentTranslateY += (state.targetTranslateY - state.currentTranslateY) * factor;
        state.currentScale += (state.targetScale - state.currentScale) * factor;
        state.currentGlareOpacity += (state.targetGlareOpacity - state.currentGlareOpacity) * factor;

        // Apply 3D transform with perspective
        card.style.transform = `perspective(1000px) translateY(${state.currentTranslateY.toFixed(2)}px) rotateX(${state.currentRotX.toFixed(2)}deg) rotateY(${state.currentRotY.toFixed(2)}deg) scale3d(${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)})`;

        // Apply specular glare highlight
        glare.style.opacity = state.currentGlareOpacity.toFixed(3);
        glare.style.background = `radial-gradient(circle at ${state.glarePercentX.toFixed(1)}% ${state.glarePercentY.toFixed(1)}%, rgba(0, 229, 255, 0.18) 0%, rgba(99, 102, 241, 0.08) 45%, transparent 75%)`;

        // Calculate motion delta to determine whether animation loop should continue
        const delta = Math.abs(state.targetRotX - state.currentRotX) +
                      Math.abs(state.targetRotY - state.currentRotY) +
                      Math.abs(state.targetTranslateY - state.currentTranslateY) +
                      Math.abs(state.targetScale - state.currentScale) +
                      Math.abs(state.targetGlareOpacity - state.currentGlareOpacity);

        if (state.isHovered || delta > 0.005) {
          state.rafId = requestAnimationFrame(updatePhysics);
        } else {
          // Cleanly settled back to flat rest state
          card.style.transform = '';
          glare.style.opacity = '0';
          state.rafId = null;
        }
      }

      card.addEventListener('mouseenter', () => {
        state.isHovered = true;
        state.targetTranslateY = liftY;
        state.targetScale = scaleVal;
        state.targetGlareOpacity = 1;

        if (!state.rafId) {
          state.rafId = requestAnimationFrame(updatePhysics);
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const percentX = (x / rect.width) - 0.5;
        const percentY = (y / rect.height) - 0.5;

        state.targetRotX = -percentY * maxTilt;
        state.targetRotY = percentX * maxTilt;
        state.glarePercentX = (percentX + 0.5) * 100;
        state.glarePercentY = (percentY + 0.5) * 100;

        if (!state.rafId) {
          state.rafId = requestAnimationFrame(updatePhysics);
        }
      });

      card.addEventListener('mouseleave', () => {
        state.isHovered = false;
        state.targetRotX = 0;
        state.targetRotY = 0;
        state.targetTranslateY = 0;
        state.targetScale = 1;
        state.targetGlareOpacity = 0;

        if (!state.rafId) {
          state.rafId = requestAnimationFrame(updatePhysics);
        }
      });
    });
  }

  // Handle window resize to dynamically enable/disable 3D tilt
  window.addEventListener('resize', () => {
    init3DTilt();
  }, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DTilt);
  } else {
    init3DTilt();
  }

  window.init3DTilt = init3DTilt;
})();
