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

function setFormLanguage(form) {
  if (!form) return;
  const lang = (document.documentElement.lang || 'de').toUpperCase();
  const langInput = form.querySelector('[name="language"], #booking-language');
  if (langInput) langInput.value = lang;
}

function updateModalText(modal, mode) {
  if (!modal || typeof applyLanguage !== 'function') return;

  const title = modal.querySelector('h2');
  const submitBtn = modal.querySelector('button[type="submit"]');
  const bookingInfo = modal.querySelector('[data-i18n="booking_info"]');

  if (title && !modal.dataset.originalTitleKey) {
    modal.dataset.originalTitleKey = title.dataset.i18n || '';
  }
  if (submitBtn && !modal.dataset.originalSubmitKey) {
    modal.dataset.originalSubmitKey = submitBtn.dataset.i18n || '';
  }

  if (mode === 'inquiry') {
    modal.dataset.mode = 'inquiry';
    if (title) title.dataset.i18n = 'contact_title';
    if (submitBtn) submitBtn.dataset.i18n = 'hero_contact_submit';
    if (bookingInfo) bookingInfo.style.display = 'none';
  } else {
    modal.dataset.mode = 'booking';
    if (title && modal.dataset.originalTitleKey) title.dataset.i18n = modal.dataset.originalTitleKey;
    if (submitBtn && modal.dataset.originalSubmitKey) submitBtn.dataset.i18n = modal.dataset.originalSubmitKey;
    if (bookingInfo) bookingInfo.style.display = 'block';
  }

  applyLanguage(document.documentElement.lang || 'de');
}

function setInquiryMode(modal) {
  if (!modal) return;
  updateModalText(modal, 'inquiry');
  const bookingType = modal.querySelector('[name="booking_type"]');
  const bookingHours = modal.querySelector('[name="booking_hours"]');
  const bookingDiscount = modal.querySelector('[name="discount"]');
  if (bookingType) bookingType.value = 'inquiry';
  if (bookingHours) bookingHours.value = 'NA';
  if (bookingDiscount) bookingDiscount.value = 'NA';
  setFormLanguage(modal.querySelector('form'));
}

function setBookingMode(modal) {
  if (!modal) return;
  updateModalText(modal, 'booking');
}

function setupPricingCards() {
  const pricingContainer = document.querySelector('.features.pricing-grid, .pricing-grid');
  if (!pricingContainer) return;

  const cards = pricingContainer.querySelectorAll('.card');
  const discountMap = {
    'Basics': { '5 Stunden': '10%', '10 Stunden': '15%', '5 hours': '10%', '10 hours': '15%' },
    'Advanced': { '5 Stunden': '9%', '10 Stunden': '14%', '5 hours': '9%', '10 hours': '14%' },
    'Expert': { '5 Stunden': '7%', '10 Stunden': '12%', '5 hours': '7%', '10 hours': '12%' }
  };

  pricingContainer.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    if (e.target.closest('.booking-option') || e.target.closest('.package-option') || e.target.closest('.btn-book') || e.target.closest('.package-custom-input')) return;
    e.preventDefault();
    e.stopPropagation();

    const wasExpanded = card.classList.contains('expanded');
    cards.forEach(c => { if (c !== card) c.classList.remove('expanded'); });
    card.classList.toggle('expanded');
    if (!wasExpanded) {
      setTimeout(() => {
        const cardRect = card.getBoundingClientRect();
        const scrollDown = cardRect.height * 0.49;
        smoothScrollBy(scrollDown, 500);
      }, 450);
    }
  });

  cards.forEach(card => {
    card.querySelectorAll('.booking-option').forEach(opt => {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        card.querySelectorAll('.booking-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const pkg = card.querySelector('.package-options');
        if (pkg) pkg.classList.toggle('visible', opt.dataset.booking === 'package');
      });
    });

    card.querySelectorAll('.package-option').forEach(opt => {
      opt.addEventListener('click', function(e) {
        e.stopPropagation();
        card.querySelectorAll('.package-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const input = card.querySelector('.package-custom-input');
        if (input) input.classList.toggle('visible', opt.dataset.hours === 'custom');
      });
    });

    const bookBtn = card.querySelector('.btn-book');
    if (bookBtn) {
      bookBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const modal = document.getElementById('contactModal');
        setBookingMode(modal);

        const cardName = card.dataset.card;
        const bookingCard = document.getElementById('booking-card');
        if (bookingCard) bookingCard.value = cardName;

        const activeBooking = card.querySelector('.booking-option.active');
        const bookingType = activeBooking ? activeBooking.textContent.trim() : 'Einzelbuchung';
        const bookingTypeField = document.getElementById('booking-type');
        if (bookingTypeField) bookingTypeField.value = bookingType;

        const bookingHoursField = document.getElementById('booking-hours');
        const bookingDiscountField = document.getElementById('booking-discount');
        const bookingLanguageField = document.getElementById('booking-language');

        if (activeBooking && activeBooking.dataset.booking === 'package') {
          const activePkg = card.querySelector('.package-option.active');
          const hoursLabel = activePkg ? activePkg.textContent.trim() : '5 Stunden';
          const customInput = card.querySelector('.package-custom-input');
          if (bookingHoursField) {
            bookingHoursField.value = activePkg && activePkg.dataset.hours === 'custom'
              ? (customInput.value || 'nicht angegeben')
              : hoursLabel;
          }
          if (bookingDiscountField) {
            bookingDiscountField.value = activePkg && activePkg.dataset.hours === 'custom'
              ? 'individuell'
              : (discountMap[cardName]?.[hoursLabel] || '0%');
          }
        } else {
          if (bookingHoursField) bookingHoursField.value = '';
          if (bookingDiscountField) bookingDiscountField.value = '0%';
        }

        if (bookingLanguageField) bookingLanguageField.value = (document.documentElement.lang || 'DE').toUpperCase();
      });
    }
  });

  const isMobile = () => window.innerWidth <= 768;
  if (isMobile()) {
    cards.forEach(card => card.classList.remove('expanded'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            if (!card.classList.contains('expanded')) {
              card.classList.add('expanded');
            }
            obs.unobserve(card);
          }
        });
      }, { threshold: 0.25 });
      cards.forEach(card => observer.observe(card));
    } else {
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          requestAnimationFrame(function() {
            cards.forEach(card => {
              const rect = card.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
                if (!card.classList.contains('expanded')) {
                  card.classList.add('expanded');
                }
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
      setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);
    }
  }
}

function setupServiceCards() {
  const cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
      e.stopPropagation();
      cards.forEach(c => { if (c !== card) c.classList.remove('expanded'); });
      card.classList.toggle('expanded');
    });
  });

  const isMobile = () => window.innerWidth <= 768;
  if (!isMobile()) return;

  cards.forEach(card => card.classList.remove('expanded'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          if (!card.classList.contains('expanded')) {
            card.classList.add('expanded');
          }
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.25 });
    cards.forEach(card => observer.observe(card));
  } else {
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
              if (!card.classList.contains('expanded')) {
                card.classList.add('expanded');
              }
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    setTimeout(() => window.dispatchEvent(new Event('scroll')), 300);
  }
}

function setupContactForms() {
  const forms = document.querySelectorAll('.contact-form, #pricing-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      setFormLanguage(form);

      const lang = (document.documentElement.lang || 'de').toLowerCase();
      const toast = document.getElementById('toast');
      if (toast) {
        const mode = form.id === 'pricing-form'
          ? (document.getElementById('contactModal')?.dataset.mode || 'booking')
          : 'inquiry';
        toast.textContent = mode === 'inquiry'
          ? (lang === 'de' ? 'Anfrage erfolgreich!' : 'Inquiry Successful!')
          : (lang === 'de' ? 'Buchung erfolgreich!' : 'Booking Successful!');
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 2500);
      }
      setTimeout(() => { this.submit(); }, 3300);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  handleHeroScroll();
  setupPricingCards();
  setupServiceCards();
  setupContactForms();

  const modal = document.getElementById('contactModal');
  if (modal) {
    document.querySelectorAll('.open-modal').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.closest('.btn-book')) {
          setBookingMode(modal);
        } else {
          setInquiryMode(modal);
        }
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
      });
    });

    const modalContent = modal.querySelector('.modal');
    if (modalContent) {
      modalContent.addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
  }
});

function closeModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  }
}

// Close button event listener
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
    });
  }
});

document.addEventListener('click', function(e) {
  if (e.target.closest('.modal-overlay')) {
    closeModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
