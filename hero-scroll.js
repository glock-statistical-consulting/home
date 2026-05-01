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

document.addEventListener('DOMContentLoaded', function() {
  handleHeroScroll();

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
