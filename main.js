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
      if (study.liveUrl) {
        card.setAttribute('data-has-live', 'true');
      }

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
        const hasLive = card.getAttribute('data-has-live') === 'true';
        const category = card.getAttribute('data-category');
        const matches = (filter === 'all') || 
                        (filter === 'live' && hasLive) || 
                        (category === filter);
        if (matches) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // Direct trigger for Live Prototypes Nav Link
  const liveNavBtn = document.getElementById('nav-live-prototypes');
  const mobileLiveTrigger = document.getElementById('mobile-live-trigger');
  const liveFilterBtn = document.getElementById('filter-live');

  function handleLiveFilterClick(e) {
    if (e) e.preventDefault();
    const targetSec = document.querySelector('.capstone-section') || document.getElementById('work');
    if (targetSec) {
      targetSec.scrollIntoView({ behavior: 'smooth' });
    }
    if (liveFilterBtn) {
      liveFilterBtn.click();
    }
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      const toggle = document.getElementById('mobile-menu-toggle');
      if (toggle) toggle.click();
    }
  }

  if (liveNavBtn) liveNavBtn.addEventListener('click', handleLiveFilterClick);
  if (mobileLiveTrigger) mobileLiveTrigger.addEventListener('click', handleLiveFilterClick);

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
  const openResumeBtns = [
    document.getElementById('header-resume-btn'), 
    document.getElementById('resume-card-trigger'),
    document.getElementById('mobile-resume-trigger')
  ];
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

  // --- Certificate Modal Logic ---
  const certModal = document.getElementById('cert-modal');
  const openCertBtn = document.getElementById('timeline-airtribe-trigger');
  const closeCertBtn = document.getElementById('cert-close-btn');
  const closeCertOverlay = document.getElementById('cert-close-overlay');

  if (certModal) {
    const openModal = () => {
      certModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (openCertBtn) {
      openCertBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    }
    
    if (closeCertBtn) closeCertBtn.addEventListener('click', closeModal);
    if (closeCertOverlay) closeCertOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Magnetic Button Physics
  const magneticWrap = document.getElementById('magnetic-wrap');
  const magneticBtn = document.getElementById('resume-card-trigger');
  
  if (magneticWrap && magneticBtn) {
    magneticWrap.addEventListener('mousemove', (e) => {
      const rect = magneticWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      magneticBtn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    });
    
    magneticWrap.addEventListener('mouseleave', () => {
      magneticBtn.style.transform = `translate(0px, 0px)`;
      magneticBtn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s ease';
    });
    
    magneticWrap.addEventListener('mouseenter', () => {
      magneticBtn.style.transition = 'transform 0.1s linear, background 0.4s ease';
    });
  }

  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const menuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (menuToggle && menuOverlay) {
    const toggleMenu = () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      menuOverlay.setAttribute('aria-hidden', isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.id === 'mobile-resume-trigger') {
          e.preventDefault();
        }
        // Close menu drawer
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Navigation ScrollSpy ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const updateActiveNavLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    const setActiveClass = (links) => {
      links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    setActiveClass(navLinks);
    setActiveClass(mobileNavLinks);
  };

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Run on mount

  // --- Smooth Scroll & Dropdown Toggle for Open to roles badge ───
  const rolesContainer = document.querySelector('.open-roles-container');
  const openRolesBtn = document.querySelector('.open-roles-btn');
  
  if (rolesContainer && openRolesBtn) {
    openRolesBtn.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        // Mobile behavior: first tap shows roles dropdown, second tap scrolls
        if (!rolesContainer.classList.contains('active')) {
          e.preventDefault();
          e.stopPropagation();
          rolesContainer.classList.add('active');
          return;
        }
      }

      // Smooth scroll execution
      e.preventDefault();
      rolesContainer.classList.remove('active');
      const targetSection = document.querySelector(openRolesBtn.getAttribute('href'));
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // offset for nav header
          behavior: 'smooth'
        });
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!rolesContainer.contains(e.target)) {
        rolesContainer.classList.remove('active');
      }
    });
  }
});
