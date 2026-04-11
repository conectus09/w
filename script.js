/* ============================================================
   JEET LIBRARY — script.js
   Smooth interactions, WhatsApp forms, AOS, counter, theme
   ============================================================ */

// ─── PRELOADER ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('gone');
  }, 1600);
});

// ─── THEME TOGGLE ───────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const saved = localStorage.getItem('jeet-theme') || 'dark';
html.setAttribute('data-theme', saved);
setThemeIcon(saved);

themeToggle.addEventListener('click', () => {
  const cur = html.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('jeet-theme', next);
  setThemeIcon(next);
});

function setThemeIcon(t) {
  themeIcon.innerHTML = t === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// ─── NAVBAR SCROLL ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  scrollTopBtn.classList.toggle('show', y > 400);
  highlightNav();
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ─── HAMBURGER / MOBILE MENU ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobile);
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── SMOOTH SCROLL ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
  });
});

// ─── AOS SCROLL REVEAL ──────────────────────────────────────
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-done');
        }, delay);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}
initAOS();

// ─── COUNT-UP ANIMATION ─────────────────────────────────────
function countUp(el, target, duration = 1600) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const val = parseInt(el.dataset.count);
      if (!isNaN(val)) countUp(el, val);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ─── TESTIMONIAL SLIDER ─────────────────────────────────────
let curTesti = 0;
const testiCards = document.querySelectorAll('.testi-card');
const tDots = document.querySelectorAll('.t-dot');

function showTesti(i) {
  testiCards.forEach(c => c.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  curTesti = ((i % testiCards.length) + testiCards.length) % testiCards.length;
  testiCards[curTesti].classList.add('active');
  tDots[curTesti].classList.add('active');
}

document.getElementById('tPrev').addEventListener('click', () => showTesti(curTesti - 1));
document.getElementById('tNext').addEventListener('click', () => showTesti(curTesti + 1));
tDots.forEach((d, i) => d.addEventListener('click', () => showTesti(i)));

// Auto-rotate
let testiTimer = setInterval(() => showTesti(curTesti + 1), 5000);
document.querySelector('.testi-outer').addEventListener('mouseenter', () => clearInterval(testiTimer));
document.querySelector('.testi-outer').addEventListener('mouseleave', () => {
  testiTimer = setInterval(() => showTesti(curTesti + 1), 5000);
});

// Touch swipe for testimonials
let touchStartX = 0;
document.querySelector('.testi-cards').addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.querySelector('.testi-cards').addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) showTesti(diff > 0 ? curTesti + 1 : curTesti - 1);
});

// ─── PLAN SELECT PRE-FILL ───────────────────────────────────
document.querySelectorAll('.pc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.price-card');
    const slotName = card.querySelector('h3').textContent.trim();
    const select = document.getElementById('rSlot');
    if (!select) return;
    for (let opt of select.options) {
      if (opt.value.toLowerCase().includes(slotName.toLowerCase().split(' ')[0])) {
        select.value = opt.value;
        break;
      }
    }
  });
});

// ─── REGISTRATION FORM → WHATSAPP ───────────────────────────
document.getElementById('regForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('rName').value.trim();
  const phone = document.getElementById('rPhone').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const slot = document.getElementById('rSlot').value;
  const msg = document.getElementById('rMsg').value.trim();

  if (!name) { toast('Kripya apna naam bharein ✍️', 'error'); return; }
  if (!phone || phone.length < 10) { toast('Sahi phone number bharein 📱', 'error'); return; }

 const text =
`Your Library - New Registration
------------------------------
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Selected Slot: ${slot || 'Not selected'}
Message: ${msg || 'No message'}
------------------------------
Sent from Your Library Website`;

  window.open(`https://wa.me/918287735448?text=${encodeURIComponent(text)}`, '_blank');
  toast('WhatsApp pe redirect ho raha hai! 🎉', 'success');
  this.reset();
});

// ─── CONTACT FORM → WHATSAPP ────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const subject = document.getElementById('cSubject').value.trim();
  const msg = document.getElementById('cMsg').value.trim();

  if (!name) { toast('Apna naam likhein ✍️', 'error'); return; }
  if (!phone || phone.length < 10) { toast('Sahi phone number likhein 📱', 'error'); return; }
  if (!msg) { toast('Message likhein 💬', 'error'); return; }

  const text =
`📩 *Jeet Library — New Message*
━━━━━━━━━━━━━━━━━━━━
👤 *Naam:* ${name}
📱 *Phone:* ${phone}
📌 *Subject:* ${subject || 'General Enquiry'}
💬 *Message:* ${msg}
━━━━━━━━━━━━━━━━━━━━
_Reply to: ${phone}_`;

  window.open(`https://wa.me/918287735448?text=${encodeURIComponent(text)}`, '_blank');
  toast('Message WhatsApp pe bhej diya! ✅', 'success');
  this.reset();
});

// ─── TOAST NOTIFICATION ─────────────────────────────────────
function toast(msg, type = 'success') {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity .3s ease';
    t.style.opacity = '0';
    setTimeout(() => t.remove(), 350);
  }, 3500);
}

// ─── GALLERY LIGHTBOX (simple) ──────────────────────────────
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const caption = item.querySelector('.gal-caption')?.textContent || '';
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,.9);
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      cursor:pointer;animation:fadeIn .3s ease;
    `;
    overlay.innerHTML = `
      <img src="${src}" style="max-width:90vw;max-height:80vh;border-radius:12px;object-fit:contain"/>
      <p style="color:#fff;margin-top:16px;font-size:.9rem;opacity:.7">${caption}</p>
      <button style="position:absolute;top:24px;right:28px;background:none;border:none;color:#fff;font-size:1.8rem;cursor:pointer;">✕</button>
    `;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// ─── PARALLAX HERO BLOBS ────────────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (blob1) blob1.style.transform = `translateY(${y * 0.15}px)`;
  if (blob2) blob2.style.transform = `translateY(${y * -0.1}px)`;
});

// ─── NAVBAR ACTIVE ON CLICK ─────────────────────────────────
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
    l.classList.add('active');
  });
});

console.log('%c✅ Jeet Library Website Loaded!', 'color:#00d4ff;font-size:14px;font-weight:bold');
console.log('%cBuilt with ❤️ using Claude AI', 'color:#00ff88;font-size:12px');
