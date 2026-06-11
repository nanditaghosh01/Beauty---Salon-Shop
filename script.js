/* ============================================================
   NANDITA BEAUTY STUDIO – script.js
   ============================================================ */

/* ── Preloader ──────────────────────────────────────────────── */
const isDesktop = window.matchMedia("(hover: hover)").matches;
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.classList.add('hide');
  }, 2000);
});

/* ── Custom Cursor ──────────────────────────────────────────── */

const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;

if (isDesktop) {

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animateCursor() {
    if (dot && ring) {
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';

      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll(
    'a, button, .gallery-item, .service-card, .filter-btn'
  ).forEach(el => {

    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering');
    });

    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering');
    });

  });

} else {

  dot?.remove();
  ring?.remove();

}

/* ── Theme Toggle ───────────────────────────────────────────── */
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('nbs-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeBtn && themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nbs-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (!themeBtn) return;
  themeBtn.innerHTML = theme === 'dark'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

/* ── Navbar: scroll + active ────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // scrolled class
  navbar && navbar.classList.toggle('scrolled', window.scrollY > 60);

  // scroll progress bar
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = pct + '%';
  }

  // active nav link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });

  // back to top
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('show', window.scrollY > 500);
});

/* ── Hamburger ──────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl && navLinksEl.classList.toggle('open');
});

navLinksEl && navLinksEl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
  })
);

/* ── Back To Top ────────────────────────────────────────────── */
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Particle Canvas ────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const COLORS = ['rgba(244,114,182,0.5)', 'rgba(192,132,252,0.5)', 'rgba(251,113,133,0.4)'];
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 3 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Mouse Reactive Orb Light ───────────────────────────────── */

if (isDesktop) {

  document.addEventListener('mousemove', e => {

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const rect = hero.getBoundingClientRect();

    if (e.clientY > rect.bottom) return;

    const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
    const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);

    hero.style.setProperty('--mx', x + '%');
    hero.style.setProperty('--my', y + '%');

  });

}

/* ── Magnetic Buttons ───────────────────────────────────────── */

if (isDesktop) {

  document.querySelectorAll('.magnetic').forEach(btn => {

    btn.addEventListener('mousemove', e => {

      const rect = btn.getBoundingClientRect();

      const x =
        e.clientX - rect.left - rect.width / 2;

      const y =
        e.clientY - rect.top - rect.height / 2;

      btn.style.transform =
        `translate(${x * 0.25}px, ${y * 0.25}px)`;

    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });

  });

}

/* ── Ripple Effect ──────────────────────────────────────────── */
document.querySelectorAll('.btn-primary, .btn-glass, .filter-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.35);
      transform:scale(0); animation:rippleAnim 0.55s ease-out forwards;
    `;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// inject ripple keyframes once
if (!document.getElementById('rippleStyle')) {
  const s = document.createElement('style');
  s.id = 'rippleStyle';
  s.textContent = '@keyframes rippleAnim { to { transform: scale(2.5); opacity: 0; } }';
  document.head.appendChild(s);
}

/* ── Counter Animation ──────────────────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = '1';
      animateCount(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── Gallery Filter ─────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hide', !show);
      if (show) {
        item.style.animation = 'none';
        item.offsetHeight; // reflow
        item.style.animation = 'galleryIn 0.4s ease forwards';
      }
    });
  });
});

if (!document.getElementById('galleryAnimStyle')) {
  const s = document.createElement('style');
  s.id = 'galleryAnimStyle';
  s.textContent = '@keyframes galleryIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }';
  document.head.appendChild(s);
}

/* ── Swiper Testimonials ────────────────────────────────────── */
if (typeof Swiper !== 'undefined') {
  new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    grabCursor: true,
    breakpoints: {
      640:  { slidesPerView: 1.6 },
      1024: { slidesPerView: 2.2 }
    }
  });
}

/* ── Vanilla Tilt for cards ─────────────────────────────────── */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.service-card, .pricing-card, .team-card'), {
    max: 8, speed: 400, glare: true, 'max-glare': 0.08, perspective: 1200
  });
}

/* ── AOS Init ───────────────────────────────────────────────── */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
  });
}

/* ── GSAP ScrollTrigger section reveals ────────────────────── */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out'
    });
  });

  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 90%' },
      y: 40, opacity: 0, duration: 0.6,
      delay: (i % 3) * 0.12, ease: 'power3.out'
    });
  });

  // Hero text reveal via GSAP (enhances CSS animations)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    gsap.from(heroTitle, { scale: 0.95, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.8 });
  }
}

/* ── Booking Form ───────────────────────────────────────────── */
const form = document.getElementById('bookingForm');
form && form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = form.querySelectorAll('[required]');
  let valid = true;
  fields.forEach(f => {
    f.style.borderColor = '';
    if (!f.value.trim()) { f.style.borderColor = 'var(--rose)'; valid = false; }
  });
  if (!valid) return;
  const success = document.getElementById('formSuccess');
  if (success) {
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }
});

/* ── Smooth scroll for all anchor links ────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Glass card mouse-follow glow ───────────────────────────── */
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(244,114,182,0.12), var(--glass-bg) 65%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ── Float shapes subtle parallax ──────────────────────────── */

if (isDesktop) {

  document.addEventListener('mousemove', e => {

    const shapes =
      document.querySelectorAll('.float-shape');

    const xPct =
      (e.clientX / window.innerWidth - 0.5);

    const yPct =
      (e.clientY / window.innerHeight - 0.5);

    shapes.forEach((s, i) => {

      const depth = (i + 1) * 12;

      s.style.transform =
        `translate(${xPct * depth}px, ${yPct * depth}px)`;

    });

  });

}