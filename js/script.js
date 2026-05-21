/* =============================================
   VIS INC — Modern Website JavaScript
   ============================================= */

// ---- HERO SLIDER ----
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('sliderDots');
const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');
let current = 0;
let autoTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.slider-dot');

function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function resetTimer() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(current + 1), 5500);
}

nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });
prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
resetTimer();


// ---- STICKY HEADER SHADOW ----
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ---- MOBILE NAV TOGGLE ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});


// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observer.observe(sec));


// ---- SCROLL REVEAL ANIMATIONS ----
const revealEls = document.querySelectorAll(
  '.service-card, .value-item, .process-step, .contact-card, .about-copy, .about-image-wrap'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const style = document.createElement('style');
style.textContent = `
  .service-card, .value-item, .process-step, .contact-card, .about-copy, .about-image-wrap {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .service-card.revealed, .value-item.revealed, .process-step.revealed,
  .contact-card.revealed, .about-copy.revealed, .about-image-wrap.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .service-card:nth-child(2) { transition-delay: 0.08s; }
  .service-card:nth-child(3) { transition-delay: 0.16s; }
  .service-card:nth-child(4) { transition-delay: 0.24s; }
  .value-item:nth-child(2) { transition-delay: 0.07s; }
  .value-item:nth-child(3) { transition-delay: 0.14s; }
  .value-item:nth-child(4) { transition-delay: 0.21s; }
  .process-step:nth-child(3) { transition-delay: 0.08s; }
  .process-step:nth-child(5) { transition-delay: 0.16s; }
  .process-step:nth-child(7) { transition-delay: 0.24s; }
`;
document.head.appendChild(style);
revealEls.forEach(el => revealObserver.observe(el));


// ---- FORM SUBMISSIONS ----
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Sent! We\'ll be in touch.';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
});


// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
