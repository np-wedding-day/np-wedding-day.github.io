// ===== INTRO COVER (envelope + wax seal) =====
const intro = document.getElementById('intro');
const introBtn = document.getElementById('introBtn');
const envelope = document.getElementById('envelope');

if (intro && introBtn && envelope) {
  document.body.classList.add('locked');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  introBtn.addEventListener('click', () => {
    // ลำดับ: ตราผนึกแตก → ฝาซองเปิด → จดหมายเลื่อนขึ้น → fade เข้าสู่การ์ด
    envelope.classList.add('opening');
    intro.classList.add('opening-hint-off');
    const openDelay = reduceMotion ? 150 : 2100;
    setTimeout(() => {
      intro.classList.add('open');
      intro.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('locked');
      setTimeout(() => intro.remove(), 1100);
    }, openDelay);
  }, { once: true });
}

// ===== BOTTOM NAV: highlight active section while scrolling =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function setActive(id) {
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.section === id);
  });
}

setActive('program');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach((s) => navObserver.observe(s));

navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// ===== COUNTDOWN =====
const countdown = document.getElementById('countdown');

if (countdown) {
  const target = new Date(countdown.dataset.date).getTime();
  if (!Number.isNaN(target)) {
    const els = {
      d: countdown.querySelector('[data-cd="d"]'),
      h: countdown.querySelector('[data-cd="h"]'),
      m: countdown.querySelector('[data-cd="m"]'),
      s: countdown.querySelector('[data-cd="s"]'),
    };
    const pad = (n) => String(n).padStart(2, '0');
    let cdTimer;

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        els.d.textContent = '0';
        els.h.textContent = '00';
        els.m.textContent = '00';
        els.s.textContent = '00';
        clearInterval(cdTimer);
        return;
      }
      els.d.textContent = Math.floor(diff / 86400000);
      els.h.textContent = pad(Math.floor(diff / 3600000) % 24);
      els.m.textContent = pad(Math.floor(diff / 60000) % 60);
      els.s.textContent = pad(Math.floor(diff / 1000) % 60);
    }

    countdown.hidden = false;
    tick();
    cdTimer = setInterval(tick, 1000);
  }
}

// ===== LIVE SCHEDULE: ไฮไลต์พิธีที่กำลังดำเนินอยู่ในวันงานจริง =====
// ใช้วันที่จาก #countdown data-date + เวลาใน data-time ของแต่ละ .schedule-item
const timeline = document.getElementById('scheduleTimeline');

if (timeline && countdown && countdown.dataset.date) {
  const day = countdown.dataset.date.slice(0, 10); // YYYY-MM-DD
  const items = Array.from(timeline.querySelectorAll('.schedule-item[data-time]'));

  function updateLiveSchedule() {
    const now = new Date();
    items.forEach((item) => {
      const start = new Date(`${day}T${item.dataset.time}:00`);
      if (Number.isNaN(start.getTime())) return;
      const durMin = parseInt(item.dataset.dur, 10) || 60;
      const end = new Date(start.getTime() + durMin * 60000);
      item.classList.toggle('live', now >= start && now < end);
      item.classList.toggle('done', now >= end);
    });
  }

  updateLiveSchedule();
  setInterval(updateLiveSchedule, 60000);
}

// ===== GALLERY SLIDESHOW =====
const track = document.getElementById('galleryTrack');
const dotsContainer = document.getElementById('galleryDots');

if (track) {
  const slides = Array.from(track.querySelectorAll('.gallery-slide'));
  let current = 0;
  let timer;

  // Remove slides for images that fail to load (404)
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        slide.style.display = 'none';
        slide.dataset.broken = '1';
      });
    }
  });

  function getVisibleSlides() {
    return slides.filter((s) => s.dataset.broken !== '1');
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    getVisibleSlides().forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `รูปที่ ${i + 1}`);
      dot.addEventListener('click', () => { goTo(i); resetTimer(); });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots(idx) {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.gallery-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function goTo(idx) {
    const visible = getVisibleSlides();
    if (visible.length === 0) return;
    current = ((idx % visible.length) + visible.length) % visible.length;
    // Find this slide's position among ALL slides for translateX
    const allIdx = slides.indexOf(visible[current]);
    track.style.transform = `translateX(-${allIdx * 100}%)`;
    updateDots(current);
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 4500);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  // Arrow buttons
  const prevBtn = document.getElementById('galPrev');
  const nextBtn = document.getElementById('galNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

  // Wait for images to potentially fail before building dots
  window.addEventListener('load', () => {
    buildDots();
    const count = getVisibleSlides().length;
    if (count > 1) startTimer();
    if (count < 2) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }
    // ยังไม่มีรูปเลย → แสดง placeholder แทนการยุบหาย
    if (count === 0) {
      const ph = document.createElement('div');
      ph.className = 'gallery-empty';
      ph.innerHTML = '🖼️<br>ใส่รูป pre-wedding ใน images/gallery/';
      track.parentElement.appendChild(ph);
    }
  });

  // Swipe/touch support
  let touchX = 0;
  track.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff > 0 ? 1 : -1));
      resetTimer();
    }
  }, { passive: true });

  // Mouse drag support
  let mouseX = 0;
  let dragging = false;
  track.addEventListener('mousedown', (e) => { mouseX = e.clientX; dragging = true; });
  track.addEventListener('mouseup', (e) => {
    if (!dragging) return;
    dragging = false;
    const diff = mouseX - e.clientX;
    if (Math.abs(diff) > 40) {
      goTo(current + (diff > 0 ? 1 : -1));
      resetTimer();
    }
  });
  track.addEventListener('mouseleave', () => { dragging = false; });
}

// ===== MAP: hide placeholder when iframe has real content =====
const mapIframe = document.querySelector('.map-container iframe');
const mapPh = document.getElementById('mapPlaceholder');
if (mapIframe && mapPh && mapIframe.src !== 'about:blank') {
  mapPh.style.display = 'none';
}
