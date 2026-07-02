// Bottom nav: highlight active section while scrolling
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function setActive(id) {
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.section === id);
  });
}

// Set first tab active on load
setActive('program');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach((s) => observer.observe(s));

// Smooth scroll: prevent default anchor jump, use scrollIntoView instead
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(item.dataset.section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

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

  // Wait for images to potentially fail before building dots
  window.addEventListener('load', () => {
    buildDots();
    if (getVisibleSlides().length > 1) startTimer();
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

// Hide map placeholder when iframe loads real content
const mapIframe = document.querySelector('.map-container iframe');
const mapPh = document.getElementById('mapPlaceholder');
if (mapIframe && mapPh) {
  if (mapIframe.src === 'about:blank') {
    // No map set yet — keep placeholder visible
  } else {
    mapIframe.addEventListener('load', () => { mapPh.style.display = 'none'; });
    mapPh.style.display = 'none'; // hide immediately, iframe handles it
  }
}
