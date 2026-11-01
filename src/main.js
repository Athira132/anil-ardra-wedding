/**
 * ANIL BABU & ARDRA — KERALA BOTANICAL WEDDING INVITATION
 * Interactive Engine, Ambient Sparkles & YouTube Media Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initYouTubeAudio();
  initInvitationLoader();
  initScrollReveal();
  initParallax();
  initPetalsAndSparklesCanvas();
  initNavigation();
  initCalendarAction();
  initBlessingsWhatsApp();
  initMapActions();
});

/* --------------------------------------------------------------------------
   0. ELEGANT OPENING WEDDING INVITATION LOADING SCREEN
   Preload critical hero illustration & fonts; never trap visitors (1.8s safety timeout)
   -------------------------------------------------------------------------- */
function initInvitationLoader() {
  const loader = document.getElementById('invitation-loader');
  if (!loader) {
    initHeroEntrance();
    return;
  }

  let isDismissed = false;
  function dismissLoader() {
    if (isDismissed) return;
    isDismissed = true;

    loader.classList.add('is-hidden');
    initHeroEntrance();
  }

  // Safety fallback: maximum 1.8 seconds so visitor is NEVER trapped by slow network
  const safetyTimer = setTimeout(dismissLoader, 1800);

  // Preload & check critical above-the-fold couple photograph
  const criticalImg = new Image();
  criticalImg.src = '/images/hero-couple-photo.webp';

  const imgPromise = new Promise(resolve => {
    if (criticalImg.complete) {
      resolve();
    } else {
      criticalImg.onload = () => resolve();
      criticalImg.onerror = () => resolve(); // Non-blocking on failure
    }
  });

  const fontsPromise = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();

  // Minimum graceful duration of 350ms to ensure smooth initial paint
  const minTimer = new Promise(resolve => setTimeout(resolve, 350));

  Promise.all([imgPromise, fontsPromise, minTimer])
    .then(() => {
      clearTimeout(safetyTimer);
      dismissLoader();
    })
    .catch(() => {
      clearTimeout(safetyTimer);
      dismissLoader();
    });
}

/* --------------------------------------------------------------------------
   1. HERO ENTRANCE ANIMATION
   -------------------------------------------------------------------------- */
function initHeroEntrance() {
  const heroReveals = document.querySelectorAll('#hero [class*="reveal-"]');
  setTimeout(() => {
    heroReveals.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('is-revealed');
      }, index * 90);
    });
  }, 60);
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL SYSTEM (INTERSECTION OBSERVER)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('section:not(#hero) [class*="reveal-"]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '80px 0px 80px 0px',
    threshold: 0.01
  });

  revealElements.forEach(el => observer.observe(el));

  // Safety fallback for fast scrolling and headless rendering
  const checkVisible = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh + 120 && rect.bottom >= -50) {
          el.classList.add('is-revealed');
          observer.unobserve(el);
        }
      }
    });
  };

  // Initial check plus scroll & resize listeners
  setTimeout(checkVisible, 250);
  window.addEventListener('scroll', checkVisible, { passive: true });
  window.addEventListener('resize', checkVisible, { passive: true });
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
   4. TRADITIONAL TEMPLE OIL LAMP EMBERS & GOLDEN PARTICLES CANVAS
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

  const sparkCount = window.innerWidth < 768 ? 22 : 42;
  const embers = [];

  // Warm temple golden lamp light colors (No pink lotus petals)
  const goldPalette = [
    'rgba(255, 215, 0, ',    // Pure Kerala temple gold
    'rgba(255, 185, 45, ',   // Warm oil flame amber
    'rgba(255, 243, 184, ',  // Soft pale gold highlight
    'rgba(245, 166, 35, ',   // Deep brass glow
    'rgba(255, 255, 240, '   // Bright flame core
  ];

  class TempleEmber {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + Math.random() * 20;
      this.radius = Math.random() * 2.2 + 1.2;
      this.speedY = -(Math.random() * 0.55 + 0.2); // Gentle upward draft from lamps
      this.speedX = Math.random() * 0.4 - 0.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      this.baseOpacity = Math.random() * 0.55 + 0.25;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      this.pulse = Math.random() * Math.PI * 2;
      this.colorBase = goldPalette[Math.floor(Math.random() * goldPalette.length)];
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.pulse += this.pulseSpeed;
      this.x += Math.sin(this.wobble) * 0.4 + this.speedX;
      this.y += this.speedY;

      if (this.y < -15 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      const alpha = this.baseOpacity * (0.6 + Math.sin(this.pulse) * 0.4);
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${alpha})`;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
      ctx.shadowBlur = this.radius * 3.5;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < sparkCount; i++) {
    embers.push(new TempleEmber());
  }

  let isVisible = true;
  document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
  });

  function animate() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      embers.forEach(e => {
        e.update();
        e.draw();
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
   6. DUAL WEDDING AUDIO PLAYER SYSTEM
   - Section 1 (Hero): YouTube vPY_oohGR34 (Sayee Rakshith - Violin)
   - Section 2 (Invitation): YouTube Short UHjaQacm3YE (Video ID: UHjaQacm3YE) with seamless direct stream fallback
   - Mutually exclusive playback (never play simultaneously)
   - Discreet, accessible controls for each section
   - Browser-compliant autoplay handling & scroll-aware switching
   -------------------------------------------------------------------------- */
function initYouTubeAudio() {
  const TRACK_1_ID = 'vPY_oohGR34';
  const TRACK_2_ID = 'UHjaQacm3YE';

  // Section 1 (Navbar / Hero) Controls
  const musicToggle1 = document.getElementById('music-toggle');
  const iconSoundOff1 = musicToggle1?.querySelector('.icon-sound-off');
  const iconSoundOn1 = musicToggle1?.querySelector('.icon-sound-on');

  // Section 2 (Invitation) Controls
  const musicToggle2 = document.getElementById('invitation-music-toggle');
  const iconPlay2 = musicToggle2?.querySelector('.inv-icon-play');
  const iconPause2 = musicToggle2?.querySelector('.inv-icon-pause');

  let player1 = null;
  let player2 = null;
  let player1Ready = false;
  let player2Ready = false;
  let player2UseAudio = false;
  let isSection2Active = false;
  let userMutedAll = false;
  let hasUserInteracted = false;

  // High-fidelity native audio fallback for Section 2 (exact track from YouTube Short UHjaQacm3YE)
  const audio2 = new Audio();
  audio2.preload = 'auto';
  audio2.loop = true;
  audio2.volume = 1.0;

  // Use m4a (AAC) or webm (Opus) depending on browser support
  if (audio2.canPlayType('audio/mp4; codecs="mp4a.40.2"')) {
    audio2.src = '/audio/section2-kettimelam.m4a';
  } else {
    audio2.src = '/audio/section2-kettimelam.webm';
  }

  // Track 1 UI State
  function updateUI1(playing, loading = false, isMutedOnly = false) {
    if (!musicToggle1) return;

    if (loading) {
      return;
    }

    if (playing) {
      musicToggle1.classList.add('playing');
      musicToggle1.setAttribute('aria-pressed', 'true');
      musicToggle1.setAttribute('aria-label', 'Pause music');
      iconSoundOff1?.classList.add('hidden');
      iconSoundOn1?.classList.remove('hidden');
    } else if (isMutedOnly) {
      musicToggle1.classList.remove('playing');
      musicToggle1.setAttribute('aria-pressed', 'false');
      musicToggle1.setAttribute('aria-label', 'Unmute music');
      iconSoundOff1?.classList.remove('hidden');
      iconSoundOn1?.classList.add('hidden');
    } else {
      musicToggle1.classList.remove('playing');
      musicToggle1.setAttribute('aria-pressed', 'false');
      musicToggle1.setAttribute('aria-label', 'Play music');
      iconSoundOff1?.classList.remove('hidden');
      iconSoundOn1?.classList.add('hidden');
    }
  }

  // Track 2 UI State (Only set to playing when playback has ACTUALLY started)
  function updateUI2(playing, loading = false, isMutedOnly = false) {
    if (!musicToggle2) return;

    if (loading) {
      return;
    }

    if (playing) {
      musicToggle2.classList.add('playing');
      musicToggle2.setAttribute('aria-pressed', 'true');
      musicToggle2.setAttribute('aria-label', 'Pause music');
      iconPlay2?.classList.add('hidden');
      iconPause2?.classList.remove('hidden');
    } else if (isMutedOnly) {
      musicToggle2.classList.remove('playing');
      musicToggle2.setAttribute('aria-pressed', 'false');
      musicToggle2.setAttribute('aria-label', 'Unmute music');
      iconPlay2?.classList.remove('hidden');
      iconPause2?.classList.add('hidden');
    } else {
      musicToggle2.classList.remove('playing');
      musicToggle2.setAttribute('aria-pressed', 'false');
      musicToggle2.setAttribute('aria-label', 'Play music');
      iconPlay2?.classList.remove('hidden');
      iconPause2?.classList.add('hidden');
    }
  }

  function isSection1Playing() {
    return player1 && player1.getPlayerState && player1.getPlayerState() === window.YT?.PlayerState?.PLAYING && (player1.isMuted ? !player1.isMuted() : true);
  }

  function isSection2Playing() {
    const audioPlaying = audio2 && !audio2.paused && audio2.currentTime > 0;
    const ytPlaying = player2 && player2.getPlayerState && player2.getPlayerState() === window.YT?.PlayerState?.PLAYING && (player2.isMuted ? !player2.isMuted() : true);
    return Boolean(audioPlaying || ytPlaying);
  }

  function pausePlayer1() {
    if (player1 && player1.pauseVideo) {
      try { player1.pauseVideo(); } catch (e) {}
    }
    updateUI1(false);
  }

  function pausePlayer2() {
    isSection2Active = false;
    if (player2 && player2.pauseVideo) {
      try { player2.pauseVideo(); } catch (e) {}
    }
    if (audio2 && !audio2.paused) {
      try { audio2.pause(); } catch (e) {}
    }
    updateUI2(false);
  }

  function playPlayer1() {
    // Strictly pause Section 2
    pausePlayer2();
    isSection2Active = false;
    if (!player1 || !player1Ready) return;
    try {
      if (player1.unMute) player1.unMute();
      if (player1.setVolume) player1.setVolume(100);
      player1.playVideo();
      updateUI1(true);
    } catch (e) {
      console.warn('Track 1 play notice:', e);
    }
  }

  function playAudioTrack2() {
    // Strictly pause Section 1
    pausePlayer1();
    if (!audio2) return;
    try {
      audio2.volume = 1.0;
      audio2.muted = false;
      const playPromise = audio2.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            pausePlayer1();
            updateUI2(true);
          })
          .catch((err) => {
            console.log('Track 2 audio autoplay restricted by browser; user can tap to play:', err);
            updateUI2(false);
          });
      }
    } catch (e) {
      console.warn('Track 2 audio playback error:', e);
      updateUI2(false);
    }
  }

  function playPlayer2() {
    // Strictly pause Section 1
    pausePlayer1();
    isSection2Active = true;
    userMutedAll = false;

    // If YouTube embed failed (e.g., error 150) or is not ready, use native audio directly
    if (player2UseAudio || !player2Ready || !player2) {
      playAudioTrack2();
      return;
    }

    try {
      if (player2.unMute) player2.unMute();
      if (player2.setVolume) player2.setVolume(100);
      player2.playVideo();
      // Notice: Do NOT call updateUI2(true) prematurely here.
      // Wait for onStateChange to confirm PLAYING!
    } catch (e) {
      console.warn('Track 2 YouTube error, playing direct audio stream:', e);
      player2UseAudio = true;
      playAudioTrack2();
    }
  }

  // Audio element event listeners
  audio2.addEventListener('playing', () => {
    pausePlayer1();
    updateUI2(true);
  });

  audio2.addEventListener('pause', () => {
    if (!isSection2Playing()) {
      updateUI2(false);
    }
  });

  audio2.addEventListener('ended', () => {
    updateUI2(false);
  });

  audio2.addEventListener('error', (e) => {
    console.warn('Track 2 native audio element error:', e);
    updateUI2(false);
  });

  function createPlayers() {
    // 1. Hero Player (Track 1)
    player1 = new window.YT.Player('yt-player', {
      height: '100',
      width: '100',
      videoId: TRACK_1_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: TRACK_1_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          player1Ready = true;
          // Attempt audible playback immediately when website opens
          try {
            if (event.target.unMute) event.target.unMute();
            if (event.target.setVolume) event.target.setVolume(100);
            event.target.playVideo();
          } catch (e) {
            console.log('Autoplay track 1 request initiated', e);
          }

          setTimeout(() => {
            if (!player1 || !player1.getPlayerState) return;
            const state = player1.getPlayerState();
            const isMuted = player1.isMuted ? player1.isMuted() : false;

            if (state === window.YT.PlayerState.PLAYING && !isMuted) {
              updateUI1(true);
            } else if (state === window.YT.PlayerState.PLAYING && isMuted) {
              updateUI1(false, false, true);
            } else {
              try {
                player1.mute();
                player1.playVideo();
                updateUI1(false, false, true);
              } catch (err) {
                updateUI1(false);
              }
            }
          }, 600);
        },
        onStateChange: (event) => {
          if (!player1) return;
          const isMuted = player1.isMuted ? player1.isMuted() : false;

          if (event.data === window.YT.PlayerState.PLAYING) {
            if (isSection2Active) {
              // Section 2 is actively playing; keep Player 1 paused
              try { player1.pauseVideo(); } catch (e) {}
              updateUI1(false);
              return;
            }
            if (isMuted) {
              updateUI1(false, false, true);
            } else {
              // Ensure Player 2 and audio 2 are paused
              pausePlayer2();
              updateUI1(true);
            }
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            updateUI1(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            if (!isSection2Active) player1.playVideo();
          } else if (event.data === window.YT.PlayerState.BUFFERING) {
            if (!isSection2Active) updateUI1(false, true);
          }
        },
        onError: (err) => {
          console.warn('Track 1 player notice:', err);
          updateUI1(false);
        }
      }
    });

    // 2. Section 2 Invitation Player (Track 2: UHjaQacm3YE)
    player2 = new window.YT.Player('yt-player-invitation', {
      height: '100',
      width: '100',
      videoId: TRACK_2_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: TRACK_2_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        origin: window.location.origin
      },
      events: {
        onReady: () => {
          player2Ready = true;
        },
        onStateChange: (event) => {
          if (!player2) return;
          const isMuted = player2.isMuted ? player2.isMuted() : false;

          if (event.data === window.YT.PlayerState.PLAYING) {
            if (isMuted) {
              updateUI2(false, false, true);
            } else {
              // Ensure Player 1 is paused
              pausePlayer1();
              updateUI2(true);
            }
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            if (!isSection2Playing()) {
              updateUI2(false);
            }
          } else if (event.data === window.YT.PlayerState.ENDED) {
            player2.playVideo();
          } else if (event.data === window.YT.PlayerState.BUFFERING) {
            updateUI2(false, true);
          }
        },
        onError: (err) => {
          // Error 150 / 101 means YouTube disallows embedding this video on other domains
          console.warn('Track 2 YouTube notice (using direct audio stream):', err);
          player2UseAudio = true;
          if (isSection2Active && !userMutedAll) {
            playAudioTrack2();
          } else {
            updateUI2(false);
          }
        }
      }
    });
  }

  // Load YouTube Iframe API asynchronously
  if (!window.YT || !window.YT.Player) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      createPlayers();
    };
  } else {
    createPlayers();
  }

  // Toggle for Section 1 (Hero)
  musicToggle1?.addEventListener('click', (e) => {
    e.stopPropagation();
    hasUserInteracted = true;

    if (!player1Ready || !player1 || !player1.getPlayerState) {
      return;
    }

    if (isSection1Playing()) {
      pausePlayer1();
      userMutedAll = true;
    } else {
      userMutedAll = false;
      playPlayer1();
    }
  });

  // Toggle for Section 2 (Invitation)
  musicToggle2?.addEventListener('click', (e) => {
    e.stopPropagation();
    hasUserInteracted = true;

    if (isSection2Playing()) {
      pausePlayer2();
      userMutedAll = true;
    } else {
      userMutedAll = false;
      playPlayer2();
    }
  });

  // Section-Aware Automatic Transition (mutually exclusive)
  if ('IntersectionObserver' in window) {
    const invSection = document.getElementById('invitation');
    const heroSection = document.getElementById('hero');

    if (invSection) {
      const invObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !userMutedAll) {
            // When visitor enters Section 2, switch from track 1 to track 2
            if (isSection1Playing() || (hasUserInteracted && !isSection2Playing())) {
              playPlayer2();
            }
          }
        });
      }, { threshold: 0.35 });

      invObserver.observe(invSection);
    }

    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !userMutedAll) {
            // When visitor returns to Hero, switch from track 2 to track 1
            if (isSection2Playing()) {
              playPlayer1();
            }
          }
        });
      }, { threshold: 0.35 });

      heroObserver.observe(heroSection);
    }
  }

  // Global first user interaction: seamlessly unmute whichever track is currently active
  const unmuteOnFirstGesture = (e) => {
    hasUserInteracted = true;
    // If the click originated from one of the explicit music controls, let the control handle it
    if (e?.target?.closest && (e.target.closest('#music-toggle') || e.target.closest('#invitation-music-toggle'))) {
      return;
    }
    if (userMutedAll || isSection2Active) return;

    // Check if user is currently viewing the invitation section
    const invSection = document.getElementById('invitation');
    const invRect = invSection?.getBoundingClientRect();
    const isAtInvitation = invRect && invRect.top < window.innerHeight * 0.7 && invRect.bottom > 80;

    if (isAtInvitation) {
      playPlayer2();
    } else if (player1Ready && player1) {
      const isMuted1 = player1.isMuted ? player1.isMuted() : false;
      const state1 = player1.getPlayerState ? player1.getPlayerState() : null;

      if (isMuted1 || state1 !== window.YT.PlayerState.PLAYING) {
        if (player1.unMute) player1.unMute();
        if (player1.setVolume) player1.setVolume(100);
        player1.playVideo();
        updateUI1(true);
      }
    }
  };

  document.addEventListener('click', unmuteOnFirstGesture, { once: true });
  document.addEventListener('touchstart', unmuteOnFirstGesture, { once: true });
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

/* --------------------------------------------------------------------------
   10. VENUE LOCATION & GOOGLE MAPS ACTIONS
   Exact Venue URL: https://maps.app.goo.gl/K7cWqppcJANAemw76?g_st=ac
   -------------------------------------------------------------------------- */
function initMapActions() {
  const CHAKOLAS_MAP_URL = 'https://maps.app.goo.gl/K7cWqppcJANAemw76?g_st=ac';

  // Ceremony Card Venue Map Button
  const ceremonyMapBtn = document.getElementById('ceremony-venue-map-btn');
  if (ceremonyMapBtn) {
    ceremonyMapBtn.addEventListener('click', () => {
      showToast('Opening Chakolas Pavilion in Google Maps...', '📍');
    });
  }

  // Location Section Map Button
  const locationSectionBtn = document.getElementById('open-google-maps-btn');
  if (locationSectionBtn) {
    locationSectionBtn.addEventListener('click', () => {
      showToast('Opening Chakolas Pavilion in Google Maps...', '📍');
    });
  }
}
