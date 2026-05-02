function handleHeroScroll() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const threshold = 100;

  function updateHero() {
    if (window.scrollY > threshold) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHero, { passive: true });
  updateHero();
}

function smoothScrollBy(distance, duration) {
  const start = window.scrollY;
  const startTime = performance.now();
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', function() {
  handleHeroScroll();

  // Modal öffnen
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById('contactModal');
      if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
      }
    });
  });

  // Formular absenden
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const langEl = document.getElementById('hero-lang');
      if (langEl) langEl.value = (localStorage.getItem('lang') || 'DE').toUpperCase();
      const toast = document.createElement('div');
      toast.className = 'toast-success';
      const isEnglish = document.documentElement.lang === 'en';
      toast.textContent = isEnglish ? 'Booking Successful!' : 'Anfrage erfolgreich!';
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => toast.classList.remove('show'), 2500);
      setTimeout(() => this.submit(), 3300);
    });
  }

  // Features-Karten (Home)
  const featuresContainer = document.querySelector('.features.pricing-grid');
  if (featuresContainer) {
    featuresContainer.addEventListener('click', function(e) {
      const card = e.target.closest('.card');
      if (!card) return;
      if (e.target.closest('.card-details')) return;
      e.preventDefault();
      e.stopPropagation();
      document.querySelectorAll('.features .card').forEach(c => { if (c !== card) c.classList.remove('expanded'); });
      const wasExpanded = card.classList.contains('expanded');
      card.classList.toggle('expanded');
      if (!wasExpanded) {
        setTimeout(() => {
          const cardRect = card.getBoundingClientRect();
          const scrollDown = cardRect.height * 0.49;
          smoothScrollBy(scrollDown, 500);
        }, 450);
      }
    });

    // Booking-Type (Einzel/Paket)
    document.querySelectorAll('.features .card').forEach(card => {
      card.querySelectorAll('.booking-option').forEach(opt => {
        opt.addEventListener('click', function(e) {
          e.stopPropagation();
          card.querySelectorAll('.booking-option').forEach(o => o.classList.remove('active'));
          opt.classList.add('active');
          const pkg = card.querySelector('.package-options');
          if (pkg) pkg.classList.toggle('visible', opt.dataset.booking === 'package');
        });
      });

      // Package-Optionen (5h/10h/custom)
      card.querySelectorAll('.package-option').forEach(opt => {
        opt.addEventListener('click', function(e) {
          e.stopPropagation();
          card.querySelectorAll('.package-option').forEach(o => o.classList.remove('active'));
          opt.classList.add('active');
          const input = card.querySelector('.package-custom-input');
          if (input) input.classList.toggle('visible', opt.dataset.hours === 'custom');
        });
      });

      // Buchungs-Button
      const bookBtn = card.querySelector('.btn-book');
      if (bookBtn) {
        bookBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          const cardName = card.dataset.card;
          document.getElementById('booking-card').value = cardName;
          const activeBooking = card.querySelector('.booking-option.active');
          const bookingType = activeBooking ? activeBooking.textContent.trim() : 'Einzelbuchung';
          document.getElementById('booking-type').value = bookingType;
          if (activeBooking && activeBooking.dataset.booking === 'package') {
            const activePkg = card.querySelector('.package-option.active');
            const hoursLabel = activePkg ? activePkg.textContent.trim() : '5 Stunden';
            const customInput = card.querySelector('.package-custom-input');
            const discountMap = {
              'Basics': { '5 Stunden': '10%', '10 Stunden': '15%', '5 hours': '10%', '10 hours': '15%' },
              'Advanced': { '5 Stunden': '9%', '10 Stunden': '14%', '5 hours': '9%', '10 hours': '14%' },
              'Expert': { '5 Stunden': '7%', '10 Stunden': '12%', '5 hours': '7%', '10 hours': '12%' }
            };
            document.getElementById('booking-hours').value = activePkg.dataset.hours === 'custom' ? (customInput.value || 'nicht angegeben') : hoursLabel;
            document.getElementById('booking-discount').value = activePkg.dataset.hours === 'custom' ? 'individuell' : (discountMap[cardName]?.[hoursLabel] || '0%');
          } else {
            document.getElementById('booking-hours').value = '';
            document.getElementById('booking-discount').value = '0%';
          }
          document.getElementById('booking-language').value = (localStorage.getItem('lang') || 'DE').toUpperCase();
        });
      }
    });

    // Mobile: Auto-Expand beim Scrollen (nur für Pricing-Seite)
    const isMobile = () => window.innerWidth <= 768;
    if (isMobile() && document.querySelector('.pricing-grid')) {
      document.querySelectorAll('.pricing-grid .card').forEach(card => card.classList.remove('expanded'));

      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(function() {
            document.querySelectorAll('.pricing-grid .card').forEach(card => {
              const rect = card.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                if (!card.classList.contains('expanded') && !card.dataset.observed) {
                  card.classList.add('expanded');
                  card.dataset.observed = 'true';
                }
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      setTimeout(function() {
        window.dispatchEvent(new Event('scroll'));
      }, 300);
    }
  }

  // About-Seite: Service-Card
  const aboutContainer = document.querySelector('.about-content');
  if (aboutContainer) {
    aboutContainer.addEventListener('click', function(e) {
      const header = e.target.closest('.service-header');
      if (!header) return;
      e.preventDefault();
      e.stopPropagation();
      const card = header.closest('.service-card');
      document.querySelectorAll('.about-content .service-card').forEach(c => { if (c !== card) c.classList.remove('expanded'); });
      card.classList.toggle('expanded');
    });
  }
});

function closeModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  }
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
