/**
 * ANIL & ARDRA — KERALA BOTANICAL WEDDING INVITATION
 * Interactive Features & Animation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
  initScrollReveal();
  initParallax();
  initPetalsCanvas();
  initNavigation();
  initGalleryLightbox();
  initAmbientMusic();
  initCalendarAction();
  initBlessingsGuestbook();
});

/* --------------------------------------------------------------------------
   1. HERO ENTRANCE ANIMATION
   -------------------------------------------------------------------------- */
function initHeroEntrance() {
  const heroReveals = document.querySelectorAll('#hero [class*="reveal-"]');
  // Stagger initial entrance smoothly
  setTimeout(() => {
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, index * 120);
    });
  }, 100);
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // If user prefers reduced motion, reveal everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[class*="reveal-"]').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const revealElements = document.querySelectorAll('section:not(#hero) [class*="reveal-"]');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. SUBTLE PARALLAX SCROLLING (BANANA LEAVES & BOTANICALS)
   -------------------------------------------------------------------------- */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.05');
          const yPos = scrolled * speed;
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. FLOATING LOTUS PETALS CANVAS ENGINE
   -------------------------------------------------------------------------- */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const petalCount = window.innerWidth < 768 ? 16 : 28;
  const petals = [];

  // Soft pastel petal color palette: blush pink, pale rose, warm cream
  const petalColors = [
    'rgba(247, 214, 208, 0.65)',
    'rgba(232, 165, 152, 0.55)',
    'rgba(253, 241, 238, 0.7)',
    'rgba(249, 224, 219, 0.6)',
    'rgba(216, 228, 217, 0.45)' // subtle sage petal
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6; // 6 to 14px
      this.speedY = Math.random() * 0.8 + 0.4; // slow, gentle descent
      this.speedX = Math.random() * 0.5 - 0.25;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.6 + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      
      // Draw organic curved lotus petal silhouette
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
      ctx.fill();

      // Subtle center vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.8);
      ctx.lineTo(0, this.size * 0.8);
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  let isVisible = true;
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function animate() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.update();
        p.draw();
      });
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   5. NAVIGATION & SCROLL SPY
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navLinks = document.getElementById('nav-links');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll spy to highlight active section
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   6. PHOTO GALLERY LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Anil and Ardra Wedding Gallery';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-gallery-src');
      const caption = card.getAttribute('data-caption');
      if (src) openLightbox(src, caption);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --------------------------------------------------------------------------
   7. AMBIENT MUSIC ENGINE (WEB AUDIO API RAGAM SYNTHESIZER)
   Zero external dependencies, crystal clear, soothing Kerala temple flute / tanpura
   -------------------------------------------------------------------------- */
function initAmbientMusic() {
  const musicToggle = document.getElementById('music-toggle');
  const iconSoundOff = musicToggle?.querySelector('.icon-sound-off');
  const iconSoundOn = musicToggle?.querySelector('.icon-sound-on');
  if (!musicToggle) return;

  let audioCtx = null;
  let isPlaying = false;
  let intervalId = null;
  let masterGain = null;

  // Auspicious Indian classical Kalyani / Mohanam pentatonic scale frequencies (Hz)
  // Sa (C4), Ri (D4), Ga (E4), Pa (G4), Dha (A4), Sa' (C5)
  const notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25  // E5
  ];

  function playNote(freq, time, duration = 3.5) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      // Flute / acoustic soft sine + subtle triangle warmth
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Delicate envelope
      noteGain.gain.setValueAtTime(0, time);
      noteGain.gain.linearRampToValueAtTime(0.045, time + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn('Audio playback note notice', e);
    }
  }

  function startTanpuraDrone() {
    if (!audioCtx || !masterGain) return;
    // Continuous soft background Sa-Pa drone (C3 + G3)
    const droneFreqs = [130.81, 196.00];
    droneFreqs.forEach(freq => {
      const osc = audioCtx.createOscillator();
      const dGain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      dGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      osc.connect(dGain);
      dGain.connect(masterGain);
      osc.start();
    });
  }

  function startMelodyLoop() {
    let noteIndex = 0;
    // Auspicious ascending and descending gentle sequence
    const sequence = [0, 2, 3, 4, 5, 4, 3, 2, 0, 3, 2, 4, 5, 7, 5, 4, 2, 0];

    intervalId = setInterval(() => {
      if (!isPlaying || !audioCtx) return;
      const freq = notes[sequence[noteIndex % sequence.length]];
      playNote(freq, audioCtx.currentTime, 4.0);
      noteIndex++;
    }, 1800);
  }

  function toggleMusic() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
      startTanpuraDrone();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isPlaying) {
      isPlaying = true;
      masterGain.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 0.5);
      startMelodyLoop();
      musicToggle.classList.add('playing');
      iconSoundOff?.classList.add('hidden');
      iconSoundOn?.classList.remove('hidden');
      musicToggle.setAttribute('aria-label', 'Pause wedding ambient music');
    } else {
      isPlaying = false;
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      if (intervalId) clearInterval(intervalId);
      musicToggle.classList.remove('playing');
      iconSoundOff?.classList.remove('hidden');
      iconSoundOn?.classList.add('hidden');
      musicToggle.setAttribute('aria-label', 'Play soft wedding ambient music');
    }
  }

  musicToggle.addEventListener('click', toggleMusic);
}

/* --------------------------------------------------------------------------
   8. ADD TO CALENDAR ACTION (.ICS DOWNLOAD & GOOGLE CALENDAR)
   -------------------------------------------------------------------------- */
function initCalendarAction() {
  const calBtn = document.getElementById('add-to-calendar-btn');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    // Wedding event details
    const event = {
      title: 'Wedding of Anil & Ardra',
      description: 'Together with their families, Anil and Ardra invite you to celebrate their auspicious wedding ceremony in Kerala.',
      location: 'The Heritage Palace Convention Center, Kovalam Beach Road, Trivandrum, Kerala',
      startDate: '20261129T040000Z', // Nov 29, 2026 09:30 AM IST (UTC: 04:00)
      endDate: '20261129T080000Z'    // Nov 29, 2026 01:30 PM IST (UTC: 08:00)
    };

    // Build standard .ics format string
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Anil and Ardra//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `DTSTART:${event.startDate}`,
      `DTEND:${event.endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'Anil_and_Ardra_Wedding.ics');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  });
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE BLESSINGS GUESTBOOK
   -------------------------------------------------------------------------- */
function initBlessingsGuestbook() {
  const form = document.getElementById('wishes-form');
  const nameInput = document.getElementById('guest-name');
  const messageInput = document.getElementById('guest-message');
  const feedback = document.getElementById('wishes-feedback');
  const listContainer = document.getElementById('wishes-display-list');

  if (!form || !listContainer) return;

  const STORAGE_KEY = 'anil_ardra_wedding_wishes';

  // Sample heartfelt default blessings
  const defaultWishes = [
    {
      name: 'Unnikrishnan & Deepa Nair',
      message: 'May God bless your sacred union with enduring joy, abundant peace, and eternal companionship.',
      time: 'Just now'
    },
    {
      name: 'Reshma & Ashwin',
      message: 'So thrilled to celebrate your special day! Wishing Anil and Ardra a lifetime filled with laughter and love.',
      time: 'Earlier today'
    }
  ];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultWishes;
    } catch (e) {
      return defaultWishes;
    }
  }

  function saveWishes(wishes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  function renderWishes() {
    const wishes = getStoredWishes();
    listContainer.innerHTML = '';

    wishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'wish-item';
      card.innerHTML = `
        <div class="wish-item-header">
          <span class="wish-author">${escapeHtml(item.name)}</span>
          <span class="wish-time">${escapeHtml(item.time)}</span>
        </div>
        <p class="wish-message">&ldquo;${escapeHtml(item.message)}&rdquo;</p>
      `;
      listContainer.appendChild(card);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    const newWish = {
      name,
      message,
      time: 'Just now'
    };

    const currentWishes = getStoredWishes();
    currentWishes.unshift(newWish);
    saveWishes(currentWishes);
    renderWishes();

    nameInput.value = '';
    messageInput.value = '';

    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 4000);
    }
  });

  renderWishes();
}
