import { caseStudies } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('portfolio-grid');
  let cards = [];
  
  if (grid) {
    caseStudies.forEach((study) => {
      const card = document.createElement('a');
      const filename = study.url.startsWith('/') ? '.' + study.url : study.url;
      card.href = filename;
      card.className = 'portfolio-card reveal';

      // Determine filter category
      let category = study.filterCategory || 'All';
      card.setAttribute('data-category', category);

      // Image HTML (if available)
      const imageHtml = study.image ? `
        <div class="card-image-container">
          ${study.tags && study.tags.length > 0 ? `<div class="card-tag"><span style="width: 6px; height: 6px; border-radius: 50%; background-color: var(--accent-secondary);"></span> ${study.tags[0]}</div>` : ''}
          <img src="${study.image}" alt="${study.title}" loading="lazy">
        </div>
      ` : '';

      const roleHtml = `<span class="card-role">${study.category || 'PRODUCT'}</span>`;
      const dateHtml = `<span class="card-date">${study.year || '2023'}</span>`;

      // Live URL badge and button — shown on cards that have a deployed prototype/app
      const liveBadgeHtml = study.liveUrl ? `
        <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
          <div style="
            display: inline-flex; align-items: center; gap: 8px;
            background: rgba(${study.themeColor ? hexToRgb(study.themeColor) : '59,130,246'}, 0.12);
            border: 1px solid rgba(${study.themeColor ? hexToRgb(study.themeColor) : '59,130,246'}, 0.3);
            border-radius: 100px; padding: 6px 14px;
            font-family: var(--font-mono); font-size: 0.68rem;
            color: ${study.themeSecondary || '#60A5FA'};
          ">
            <span style="
              width: 6px; height: 6px; border-radius: 50%;
              background: ${study.themeSecondary || '#60A5FA'};
              box-shadow: 0 0 8px ${study.themeSecondary || '#60A5FA'};
              animation: liveDot 2s ease-in-out infinite;
            "></span>
            Live on Vercel
          </div>
          <a href="${study.liveUrl}" target="_blank" rel="noopener" class="btn"
             onclick="event.stopPropagation();"
             style="
               display: inline-flex; align-items: center; justify-content: center; gap: 8px;
               background: linear-gradient(135deg, ${study.themeColor || '#3B82F6'} 0%, ${study.themeSecondary || '#60A5FA'} 100%);
               color: #fff;
               box-shadow: 0 6px 20px rgba(${study.themeColor ? hexToRgb(study.themeColor) : '59,130,246'}, 0.4);
               font-family: var(--font-display); font-weight: 700;
               padding: 12px 24px; border-radius: 8px; text-decoration: none;
               transition: all 0.3s ease;
               width: 100%;
             "
             onmouseover="this.style.transform='translateY(-3px) scale(1.02)'; this.style.boxShadow='0 10px 25px rgba(${study.themeColor ? hexToRgb(study.themeColor) : '59,130,246'}, 0.6)';"
             onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 6px 20px rgba(${study.themeColor ? hexToRgb(study.themeColor) : '59,130,246'}, 0.4)';"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10A15 15 0 0 1 12 2z"/></svg>
            View Live App
          </a>
        </div>
      ` : '';

      card.innerHTML = `
        ${imageHtml}
        <div class="card-content">
          <div class="card-meta">
            ${roleHtml}
            ${study.year ? `<span style="color: var(--text-tertiary); font-size: 0.65rem;">•</span> ${dateHtml}` : ''}
          </div>
          <h3 class="card-title">${study.title}</h3>
          <p class="card-desc">${study.summary || study.description || ''}</p>
          ${liveBadgeHtml}
        </div>
      `;

      grid.appendChild(card);
      cards.push(card);
    });

    // Helper: convert hex color to rgb triplet string for rgba()
    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      return `${r},${g},${b}`;
    }
  }

  // --- Filter Logic ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          // Re-trigger reveal animation manually if desired, or just let it show
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Custom Cursor ---
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
      });
    });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Number Counter Animation ---
  const numberElements = document.querySelectorAll('.count-up');
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseFloat(target.getAttribute('data-value'));
        const isFloat = target.getAttribute('data-value').includes('.');
        let startValue = 0;
        const duration = 1500;
        const startTime = performance.now();

        const updateNumber = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          let currentValue = startValue + (finalValue - startValue) * easeProgress;
          
          if (isFloat) target.innerText = currentValue.toFixed(1);
          else target.innerText = Math.floor(currentValue);

          if (progress < 1) requestAnimationFrame(updateNumber);
          else target.innerText = finalValue + (target.getAttribute('data-suffix') || '');
        };
        requestAnimationFrame(updateNumber);
        numberObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  numberElements.forEach(el => numberObserver.observe(el));

  // --- Hero Glow Effect ---
  const hero = document.querySelector('.hero');
  if (hero) {
    const glow = document.createElement('div');
    glow.id = 'hero-glow';
    hero.prepend(glow);

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    });
    
    hero.addEventListener('mouseenter', () => { glow.style.opacity = '1'; });
    hero.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  }

  // --- Resume Modal & 3D Card Logic ---
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = [document.getElementById('header-resume-btn'), document.getElementById('resume-card-trigger')];
  const closeResumeBtn = document.getElementById('resume-close-btn');
  const closeResumeOverlay = document.getElementById('resume-close-overlay');

  if (resumeModal) {
    const openModal = () => {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    const closeModal = () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    openResumeBtns.forEach(btn => {
      if(btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
    
    if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeModal);
    if (closeResumeOverlay) closeResumeOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 3D Card Tilt Effect
  const resumeCard = document.getElementById('resume-card-trigger');
  const resumeInner = document.querySelector('.resume-3d-inner');
  if (resumeCard && resumeInner) {
    resumeCard.addEventListener('mousemove', (e) => {
      const rect = resumeCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
      const rotateY = ((x - centerX) / centerX) * 10;
      
      resumeInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    resumeCard.addEventListener('mouseleave', () => {
      resumeInner.style.transform = `rotateX(0) rotateY(0)`;
    });
  }
});
