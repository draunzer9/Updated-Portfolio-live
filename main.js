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

      card.innerHTML = `
        ${imageHtml}
        <div class="card-content">
          <div class="card-meta">
            ${roleHtml}
            ${study.year ? `<span style="color: var(--text-tertiary); font-size: 0.65rem;">•</span> ${dateHtml}` : ''}
          </div>
          <h3 class="card-title">${study.title}</h3>
          <p class="card-desc">${study.summary || study.description || ''}</p>
        </div>
      `;

      grid.appendChild(card);
      cards.push(card);
    });
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
});
