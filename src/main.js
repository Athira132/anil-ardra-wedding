/**
 * ANIL BABU & ARDRA — KERALA BOTANICAL WEDDING INVITATION
 * Interactive Engine, Ambient Sparkles & YouTube Media Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroEntrance();
  initScrollReveal();
  initParallax();
  initPetalsAndSparklesCanvas();
  initNavigation();
  initYouTubeAudio();
  initCalendarAction();
  initBlessingsWhatsApp();
});

/* --------------------------------------------------------------------------
   1. HERO ENTRANCE ANIMATION
   -------------------------------------------------------------------------- */
function initHeroEntrance() {
  const heroReveals = document.querySelectorAll('#hero [class*="reveal-"]');
  setTimeout(() => {
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, index * 100);
    });
  }, 80);
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
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
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. PARALLAX SCROLLING ENGINE
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
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.04');
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
   4. FLOATING LOTUS PETALS & GOLDEN PARTICLES CANVAS
   -------------------------------------------------------------------------- */
function initPetalsAndSparklesCanvas() {
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
  const sparkleCount = window.innerWidth < 768 ? 20 : 36;
  const petals = [];
  const sparkles = [];

  // Lotus petal colors: blush, rose, coral pink, warm cream
  const petalColors = [
    'rgba(248, 165, 181, 0.70)',
    'rgba(242, 140, 159, 0.60)',
    'rgba(255, 240, 243, 0.75)',
    'rgba(232, 122, 104, 0.55)',
    'rgba(245, 215, 127, 0.40)'
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 0.7 + 0.35;
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

      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
      ctx.fill();

      // Delicate center vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.8);
      ctx.lineTo(0, this.size * 0.8);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Golden Diya / Firefly Sparkles
  class Sparkle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2 + 1;
      this.speedY = -(Math.random() * 0.4 + 0.15); // gentle upward drift
      this.speedX = Math.random() * 0.3 - 0.15;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.pulse += 0.03;
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.y < -10 || this.x < 0 || this.x > width) {
        this.reset();
      }
    }

    draw() {
      const currentOpacity = this.opacity * (0.6 + Math.sin(this.pulse) * 0.4);
      ctx.fillStyle = `rgba(245, 215, 127, ${currentOpacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push(new Sparkle());
  }

  let isVisible = true;
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function animate() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach(s => {
        s.update();
        s.draw();
      });
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

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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
   6. YOUTUBE WEDDING AUDIO PLAYER ENGINE
   Source: https://youtu.be/vPY_oohGR34 (Sayee Rakshith - Violin)
   -------------------------------------------------------------------------- */
function initYouTubeAudio() {
  const YOUTUBE_VIDEO_ID = 'vPY_oohGR34';
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  const iconSoundOff = musicToggle?.querySelector('.icon-sound-off');
  const iconSoundOn = musicToggle?.querySelector('.icon-sound-on');
  const promptBar = document.getElementById('music-prompt-bar');
  const promptBtn = document.getElementById('music-prompt-btn');
  const promptClose = document.getElementById('music-prompt-close');

  let ytPlayer = null;
  let isPlaying = false;
  let isReady = false;

  function updateUIState(playing, loading = false) {
    isPlaying = playing;
    if (!musicToggle) return;

    if (loading) {
      if (musicLabel) musicLabel.textContent = 'Loading...';
      return;
    }

    if (playing) {
      musicToggle.classList.add('playing');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Pause wedding music');
      if (musicLabel) musicLabel.textContent = 'Pause';
      iconSoundOff?.classList.add('hidden');
      iconSoundOn?.classList.remove('hidden');
      if (promptBar) promptBar.classList.add('hidden');
    } else {
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Play wedding music');
      if (musicLabel) musicLabel.textContent = 'Play Music';
      iconSoundOff?.classList.remove('hidden');
      iconSoundOn?.classList.add('hidden');
    }
  }

  function createPlayer() {
    ytPlayer = new window.YT.Player('yt-player', {
      height: '100',
      width: '100',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0
      },
      events: {
        onReady: (event) => {
          isReady = true;
          try {
            event.target.playVideo();
          } catch (e) {
            console.log('Autoplay blocked by browser policy', e);
          }

          // Check if autoplay succeeded after 1 second
          setTimeout(() => {
            const state = ytPlayer?.getPlayerState();
            if (state === window.YT.PlayerState.PLAYING) {
              updateUIState(true);
            } else {
              updateUIState(false);
              if (promptBar) {
                promptBar.classList.remove('hidden');
              }
            }
          }, 1200);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            updateUIState(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            updateUIState(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            ytPlayer?.playVideo();
          } else if (event.data === window.YT.PlayerState.BUFFERING) {
            updateUIState(false, true);
          }
        },
        onError: (err) => {
          console.warn('YouTube Player notification:', err);
          updateUIState(false);
        }
      }
    });
  }

  // Load YouTube Iframe API if not already present
  if (!window.YT || !window.YT.Player) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };
  } else {
    createPlayer();
  }

  // Persistent Toggle Button Click Handler
  musicToggle?.addEventListener('click', () => {
    if (!isReady || !ytPlayer) {
      showToast('Loading wedding audio...', '🎵');
      return;
    }

    const state = ytPlayer.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
      showToast('Playing wedding music ✨', '🎵');
    }
  });

  // Prompt Play Button Click (1-tap start)
  promptBtn?.addEventListener('click', () => {
    if (ytPlayer && isReady) {
      ytPlayer.playVideo();
      showToast('Playing wedding music ✨', '🎵');
    }
    if (promptBar) promptBar.classList.add('hidden');
  });

  // Prompt Dismiss Button Click
  promptClose?.addEventListener('click', () => {
    if (promptBar) promptBar.classList.add('hidden');
  });

  // Global user interaction fallback: start audio on first touch/click anywhere on document if paused
  const userStartOnInteraction = () => {
    if (isReady && ytPlayer && !isPlaying) {
      const state = ytPlayer.getPlayerState();
      if (state !== window.YT.PlayerState.PLAYING) {
        ytPlayer.playVideo();
      }
    }
    document.removeEventListener('click', userStartOnInteraction);
    document.removeEventListener('touchstart', userStartOnInteraction);
  };
  document.addEventListener('click', userStartOnInteraction, { once: true });
  document.addEventListener('touchstart', userStartOnInteraction, { once: true });
}

/* --------------------------------------------------------------------------
   7. ADD TO CALENDAR ACTION (.ICS DOWNLOAD & GOOGLE CALENDAR)
   Exact Details: Sunday, 20th December 2026
   -------------------------------------------------------------------------- */
function initCalendarAction() {
  const calBtn = document.getElementById('add-to-calendar-btn');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    const event = {
      title: 'Wedding: Anil Babu with Ardra Meletath',
      description: 'Wedding Ceremony of Anil Babu and Ardra Meletath.\\n\\nTHALIKETTU at Guruvayur Sree Krishna Temple.\\nWEDDING CEREMONY at Chakolas Pavilion Convention Centre, Anchery Chira, Kuttanellur, Thrissur.\\nCeremony Begins at 11:30 AM followed by lunch.\\nPresents in blessings only.',
      location: 'Chakolas Pavilion Convention Centre, Anchery Chira, Kuttanellur, Thrissur, Kerala',
      // Sunday, 20th December 2026: 11:30 AM IST = 06:00 UTC
      startDate: '20261220T060000Z',
      endDate: '20261220T103000Z'
    };

    // Build standard .ics calendar file
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Anil Babu & Ardra Meletath//Wedding Invitation//EN',
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
    downloadLink.setAttribute('download', 'Anil_Babu_and_Ardra_Meletath_Wedding.ics');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast('Calendar invite downloaded (.ics)', '📅');
  });
}

/* --------------------------------------------------------------------------
   8. SEND YOUR BLESSINGS (WHATSAPP & CLIPBOARD, ZERO BACKEND)
   Recipient: +91 6238 433 871 (formatted 916238433871)
   -------------------------------------------------------------------------- */
function initBlessingsWhatsApp() {
  const WHATSAPP_NUMBER = '916238433871';
  const textarea = document.getElementById('blessing-message-input');
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const copyBtn = document.getElementById('copy-blessing-btn');
  const chips = document.querySelectorAll('.blessing-chip');

  if (!textarea) return;

  // Handle Quick Chips Click
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      if (msg) {
        textarea.value = msg;
        textarea.focus();
        showToast('Blessing suggestion selected', '🌸');
      }
    });
  });

  // Handle Send via WhatsApp Click
  sendWhatsAppBtn?.addEventListener('click', () => {
    const rawMessage = textarea.value.trim() || 'Congratulations, Anil Babu and Ardra Meletath! Sending you both love and blessings.';
    const encoded = encodeURIComponent(rawMessage);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp to send blessing...', '💬');
  });

  // Handle Copy Blessing Click
  copyBtn?.addEventListener('click', async () => {
    const rawMessage = textarea.value.trim() || 'Congratulations, Anil Babu and Ardra Meletath! Sending you both love and blessings.';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(rawMessage);
      } else {
        textarea.select();
        document.execCommand('copy');
      }
      showToast('Blessing copied! Ready to paste & share.', '✨');
    } catch (e) {
      textarea.select();
      showToast('Selected text. Press Ctrl+C to copy.', '📋');
    }
  });
}

/* --------------------------------------------------------------------------
   9. GLOBAL TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
let toastTimeout = null;
function showToast(message, icon = '✨') {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-message');
  const iconEl = document.getElementById('toast-icon');

  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.remove('hidden');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3500);
}
