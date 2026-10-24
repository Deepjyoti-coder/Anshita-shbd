/**
 * ============================================================================
 * A LITTLE WORLD FOR ANSHITA ❤️
 * A Cinematic Romantic Experience — Created by Deep for Anshita's Birthday
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
   RELATIONSHIP TIMELINE CONFIGURATION
   ----------------------------------------------------------------------------
   Set the date when your journey began in "YYYY-MM-DD" format (e.g., "2024-02-14").
   If left as "YYYY-MM-DD" or invalid, the timeline counter will gracefully display:
   "Every story has a beginning. Ours is worth remembering."
---------------------------------------------------------------------------- */
const RELATIONSHIP_START_DATE = "2024-09-03";

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------------------------------------
     1. DESKTOP CURSOR GLOW
     -------------------------------------------------------------------------- */
  const cursorGlow = document.getElementById("cursor-glow");
  if (cursorGlow && !prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(updateCursor);
    };
    updateCursor();
  }

  /* --------------------------------------------------------------------------
     2. AMBIENT BACKGROUND CANVAS (Stars, Aurora, Falling Petals, Shooting Stars)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById("ambient-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    });

    // Stars collection
    const STAR_COUNT = Math.min(180, Math.floor((width * height) / 7000));
    let stars = [];
    const starColors = ["#FFFFFF", "#C6B5FF", "#FF8FB1", "#E8C98A", "#F8F5FF"];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.4,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          alpha: Math.random() * 0.8 + 0.2,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          driftX: (Math.random() - 0.5) * 0.08,
          driftY: (Math.random() - 0.5) * 0.08,
        });
      }
    };
    initStars();

    // Shooting stars collection
    let shootingStars = [];
    const createShootingStar = () => {
      if (Math.random() < 0.012 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
        });
      }
    };

    // Soft floating rose petals
    const PETAL_COUNT = 14;
    let petals = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 7 + 6,
        speedY: Math.random() * 0.5 + 0.3,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        oscillation: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.2,
      });
    }

    // Animation loop
    const renderCanvas = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw & update stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.twinkleSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.twinkleSpeed = -s.twinkleSpeed;
        }
        s.x = (s.x + s.driftX + width) % width;
        s.y = (s.y + s.driftY + height) % height;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw & update shooting stars
      createShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, "rgba(232, 201, 138, 0)");
        grad.addColorStop(1, `rgba(255, 245, 255, ${ss.opacity})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      // 3. Draw & update rose petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.oscillation += 0.02;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.oscillation) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = "#FF8FB1";
        ctx.globalAlpha = p.opacity;

        // Elegant curved petal shape
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
        ctx.fill();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(renderCanvas);
    };
    renderCanvas();
  }

  /* --------------------------------------------------------------------------
     3. SCENE 0: THE FIRST HELLO (Natural Typing Sequence)
     -------------------------------------------------------------------------- */
  const line1 = document.getElementById("prologue-line-1");
  const line2 = document.getElementById("prologue-line-2");
  const line3 = document.getElementById("prologue-line-3");
  const line4 = document.getElementById("prologue-line-4");
  const prologueReveal = document.getElementById("prologue-reveal");
  const btnEnterWorld = document.getElementById("btn-enter-world");

  const runPrologue = () => {
    if (prefersReducedMotion) {
      if (line1) line1.classList.add("visible");
      if (line2) line2.classList.add("visible");
      if (line3) line3.classList.add("visible");
      if (line4) line4.classList.add("visible");
      if (prologueReveal) prologueReveal.classList.add("visible");
      return;
    }

    setTimeout(() => line1 && line1.classList.add("visible"), 500);
    setTimeout(() => line2 && line2.classList.add("visible"), 2200);
    setTimeout(() => line3 && line3.classList.add("visible"), 4000);
    setTimeout(() => line4 && line4.classList.add("visible"), 5600);
    setTimeout(() => prologueReveal && prologueReveal.classList.add("visible"), 7200);
  };
  runPrologue();

  if (btnEnterWorld) {
    btnEnterWorld.addEventListener("click", () => {
      const nextScene = document.getElementById("scene-countdown") || document.getElementById("scene-1");
      if (nextScene) {
        nextScene.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. SCENE 1: INTERACTIVE RAIPUR MAP & LOCATION CARDS
     -------------------------------------------------------------------------- */
  const markerDeep = document.getElementById("marker-deep");
  const markerAnshita = document.getElementById("marker-anshita");
  const mapModal = document.getElementById("map-info-modal");
  const modalTag = document.getElementById("modal-tag");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const btnCloseModal = document.getElementById("btn-close-modal");

  const showLocationCard = (locationType) => {
    if (!mapModal || !modalTag || !modalTitle || !modalBody) return;
    if (locationType === "deep") {
      modalTag.textContent = "Deep's Corner • Raipur";
      modalTitle.textContent = "Amity University Raipur";
      modalBody.textContent =
        "Where Deep spends his days studying, coding, and thinking of you across the city. 33 kilometers away, but never out of his thoughts.";
    } else {
      modalTag.textContent = "Anshita's Corner • Raipur";
      modalTitle.textContent = "Pandri, Raipur";
      modalBody.textContent =
        "The sweetest corner of Raipur, where Anshita lives and brings light to ordinary days. Her smile makes every kilometer feel worth traveling.";
    }
    mapModal.classList.add("active");
  };

  if (markerDeep) {
    markerDeep.addEventListener("click", () => showLocationCard("deep"));
  }
  if (markerAnshita) {
    markerAnshita.addEventListener("click", () => showLocationCard("anshita"));
  }
  if (btnCloseModal && mapModal) {
    btnCloseModal.addEventListener("click", () => {
      mapModal.classList.remove("active");
    });
  }

  // Animate map dots along SVG arc
  const travelDot1 = document.getElementById("map-travel-dot-1");
  const travelDot2 = document.getElementById("map-travel-dot-2");
  const connectionPath = document.getElementById("connection-path");

  if (connectionPath && typeof connectionPath.getTotalLength === "function" && travelDot1 && travelDot2 && !prefersReducedMotion) {
    const pathLength = connectionPath.getTotalLength();
    let progress1 = 0;
    let progress2 = 0.5;

    const animateMapDots = () => {
      progress1 = (progress1 + 0.0035) % 1;
      progress2 = (progress2 - 0.0035 + 1) % 1;

      const p1 = connectionPath.getPointAtLength(progress1 * pathLength);
      travelDot1.setAttribute("cx", p1.x);
      travelDot1.setAttribute("cy", p1.y);

      const p2 = connectionPath.getPointAtLength(progress2 * pathLength);
      travelDot2.setAttribute("cx", p2.x);
      travelDot2.setAttribute("cy", p2.y);

      requestAnimationFrame(animateMapDots);
    };
    animateMapDots();
  }

  /* --------------------------------------------------------------------------
     5. SCENE 2: OPEN MY HEART BUTTON
     -------------------------------------------------------------------------- */
  const btnOpenHeart = document.getElementById("btn-open-heart");
  if (btnOpenHeart) {
    btnOpenHeart.addEventListener("click", () => {
      const target = document.getElementById("scene-faculty") || document.getElementById("scene-3");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. SCENE 4: LETTER BOOKMARK INTERACTION
     -------------------------------------------------------------------------- */
  const btnBookmarkLetter = document.getElementById("btn-bookmark-letter");
  const bookmarkStatus = document.getElementById("bookmark-status");

  if (btnBookmarkLetter && bookmarkStatus) {
    btnBookmarkLetter.addEventListener("click", () => {
      bookmarkStatus.textContent = "Letter saved close to your heart ✨";
      btnBookmarkLetter.style.borderColor = "var(--color-rose)";
      btnBookmarkLetter.style.background = "rgba(255, 143, 177, 0.15)";

      if (typeof confetti === "function") {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#E8C98A", "#FF8FB1", "#C6B5FF"],
          disableForReducedMotion: true,
        });
      }
      setTimeout(() => {
        bookmarkStatus.textContent = "";
      }, 5000);
    });
  }

  /* --------------------------------------------------------------------------
     7. SCENE 6: GLASS REASON CARDS (FLIP INTERACTION)
     -------------------------------------------------------------------------- */
  const reasonCards = document.querySelectorAll(".glass-reason-card");
  reasonCards.forEach((card) => {
    const toggleCard = () => {
      const isFlipped = card.classList.toggle("is-flipped");
      card.setAttribute("aria-expanded", isFlipped ? "true" : "false");
    };

    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard();
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. SCENE 7: OUR LITTLE TIMELINE (CONFIGURABLE COUNTER)
     -------------------------------------------------------------------------- */
  const timelineUnconfigured = document.getElementById("timeline-unconfigured");
  const timelineCounter = document.getElementById("timeline-counter");
  const countDays = document.getElementById("count-days");
  const countHours = document.getElementById("count-hours");
  const countMinutes = document.getElementById("count-minutes");
  const countSeconds = document.getElementById("count-seconds");

  // Validate start date format
  const isValidDate = (d) => {
    return d && d !== "YYYY-MM-DD" && !isNaN(Date.parse(d));
  };

  if (isValidDate(RELATIONSHIP_START_DATE)) {
    if (timelineUnconfigured) timelineUnconfigured.style.display = "none";
    if (timelineCounter) timelineCounter.classList.remove("is-hidden");

    const startDate = new Date(RELATIONSHIP_START_DATE).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = now - startDate;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (countDays) countDays.textContent = String(days).padStart(2, "0");
        if (countHours) countHours.textContent = String(hours).padStart(2, "0");
        if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, "0");
        if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, "0");
      }
    };
    updateTimer();
    setInterval(updateTimer, 1000);
  } else {
    // Graceful unconfigured state
    if (timelineUnconfigured) timelineUnconfigured.style.display = "flex";
    if (timelineCounter) timelineCounter.classList.add("is-hidden");
  }

  /* --------------------------------------------------------------------------
     9. SCENE 8: INTERACTIVE CRYSTAL HEART
     -------------------------------------------------------------------------- */
  const btnTapHeart = document.getElementById("btn-tap-heart");
  const crystalHeartSvg = document.getElementById("crystal-heart-svg");
  const heartGlowField = document.getElementById("heart-glow-field");
  const heartTapCounter = document.getElementById("heart-tap-counter");
  const tapCountText = document.getElementById("tap-count-text");
  const heartRevelation = document.getElementById("heart-revelation");

  let heartTapCount = 0;
  const MAX_TAPS = 5;

  const tapHeartHandler = () => {
    heartTapCount++;

    // Throb animation
    if (crystalHeartSvg) {
      crystalHeartSvg.style.transform = "scale(1.18)";
      setTimeout(() => {
        crystalHeartSvg.style.transform = "scale(1)";
      }, 250);
    }

    // Glow expansion
    if (heartGlowField) {
      const scale = 1 + heartTapCount * 0.15;
      const opacity = 0.5 + heartTapCount * 0.1;
      heartGlowField.style.transform = `scale(${scale})`;
      heartGlowField.style.opacity = `${opacity}`;
    }

    if (tapCountText) {
      if (heartTapCount < MAX_TAPS) {
        const phrases = [
          "Felt your warmth! (1/5)",
          "Beating faster... (2/5)",
          "You are so cherished... (3/5)",
          "Almost full of love... (4/5)",
        ];
        tapCountText.textContent = phrases[heartTapCount - 1] || `${heartTapCount} / ${MAX_TAPS}`;
      } else {
        tapCountText.textContent = "Forever in my heart ❤️";
      }
    }

    // Celebration on reaching MAX_TAPS (Burst with love!)
    if (heartTapCount === MAX_TAPS) {
      if (heartRevelation) {
        heartRevelation.classList.add("revealed");
      }
      if (crystalHeartSvg) {
        triggerHeartBurst(crystalHeartSvg, heartRevelation);
      }
    } else if (heartTapCount > MAX_TAPS) {
      // Allow repeated bursting
      if (crystalHeartSvg) {
        triggerHeartBurst(crystalHeartSvg, heartRevelation);
      }
    }
  };

  if (btnTapHeart) btnTapHeart.addEventListener("click", tapHeartHandler);
  if (crystalHeartSvg) crystalHeartSvg.addEventListener("click", tapHeartHandler);

  /* --------------------------------------------------------------------------
     10. SCENE 10: SUNRISE & SILHOUETTES IN-VIEW TRIGGER
     -------------------------------------------------------------------------- */
  const sceneSunrise = document.getElementById("scene-10");
  if (sceneSunrise && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sceneSunrise.classList.add("in-view");
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(sceneSunrise);
  } else if (sceneSunrise) {
    sceneSunrise.classList.add("in-view");
  }

  /* --------------------------------------------------------------------------
     11. FINAL SCENE: REPLAY & KEEP THIS MEMORY
     -------------------------------------------------------------------------- */
  const btnReplay = document.getElementById("btn-replay");
  const btnSaveMemory = document.getElementById("btn-save-memory");
  const saveMemoryToast = document.getElementById("save-memory-toast");

  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      const scene0 = document.getElementById("scene-0");
      if (scene0) {
        scene0.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (btnSaveMemory && saveMemoryToast) {
    btnSaveMemory.addEventListener("click", () => {
      saveMemoryToast.textContent = "A little memory, made just for you. Saved forever in our hearts. ✨";
      if (typeof confetti === "function") {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#E8C98A", "#FF8FB1", "#C6B5FF"],
          disableForReducedMotion: true,
        });
      }
      setTimeout(() => {
        saveMemoryToast.textContent = "";
      }, 6000);
    });
  }

  /* --------------------------------------------------------------------------
     12. FLOATING MUSIC PLAYER (Local File, No Autoplay)
     -------------------------------------------------------------------------- */
  const bgAudio = document.getElementById("bg-audio");
  const btnAudioToggle = document.getElementById("btn-audio-toggle");
  const btnAudioMute = document.getElementById("btn-audio-mute");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const progressBar = document.getElementById("audio-progress-bar");
  const progressFill = document.getElementById("audio-progress-fill");
  const timeCurrent = document.getElementById("time-current");
  const timeDuration = document.getElementById("time-duration");
  const playerWrapper = document.getElementById("floating-music-player");
  const audioStatusMsg = document.getElementById("audio-status-msg");

  let isPlaying = false;

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (bgAudio && btnAudioToggle) {
    btnAudioToggle.addEventListener("click", () => {
      if (!isPlaying) {
        bgAudio
          .play()
          .then(() => {
            isPlaying = true;
            btnAudioToggle.setAttribute("aria-pressed", "true");
            if (iconPlay) iconPlay.classList.add("is-hidden");
            if (iconPause) iconPause.classList.remove("is-hidden");
            if (playerWrapper) playerWrapper.classList.add("is-playing");
            if (audioStatusMsg) audioStatusMsg.textContent = "";
          })
          .catch((err) => {
            console.warn("Audio playback note:", err);
            if (audioStatusMsg) {
              audioStatusMsg.textContent = "Place romantic-piano.mp3 in assets/music/ to play!";
            }
          });
      } else {
        bgAudio.pause();
        isPlaying = false;
        btnAudioToggle.setAttribute("aria-pressed", "false");
        if (iconPlay) iconPlay.classList.remove("is-hidden");
        if (iconPause) iconPause.classList.add("is-hidden");
        if (playerWrapper) playerWrapper.classList.remove("is-playing");
      }
    });

    // Update progress bar & time
    bgAudio.addEventListener("timeupdate", () => {
      if (bgAudio.duration) {
        const percent = (bgAudio.currentTime / bgAudio.duration) * 100;
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (timeCurrent) timeCurrent.textContent = formatTime(bgAudio.currentTime);
      }
    });

    bgAudio.addEventListener("loadedmetadata", () => {
      if (timeDuration) timeDuration.textContent = formatTime(bgAudio.duration);
    });

    bgAudio.addEventListener("ended", () => {
      isPlaying = false;
      btnAudioToggle.setAttribute("aria-pressed", "false");
      if (iconPlay) iconPlay.classList.remove("is-hidden");
      if (iconPause) iconPause.classList.add("is-hidden");
      if (playerWrapper) playerWrapper.classList.remove("is-playing");
    });

    // Handle audio error gracefully
    bgAudio.addEventListener("error", () => {
      if (audioStatusMsg) {
        audioStatusMsg.textContent = "Audio ready when romantic-piano.mp3 is added";
      }
    });

    // Progress bar scrubbing
    if (progressBar) {
      progressBar.addEventListener("click", (e) => {
        if (!bgAudio.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        bgAudio.currentTime = clickPos * bgAudio.duration;
      });
    }

    // Mute button
    if (btnAudioMute) {
      btnAudioMute.addEventListener("click", () => {
        bgAudio.muted = !bgAudio.muted;
        btnAudioMute.style.opacity = bgAudio.muted ? "0.4" : "1";
      });
    }
  }

  /* --------------------------------------------------------------------------
     13. SCENE PROGRESS NAVIGATION & OBSERVER
     -------------------------------------------------------------------------- */
  const navDots = document.querySelectorAll(".nav-dot");
  const navIndicator = document.getElementById("nav-indicator");
  const allScenes = document.querySelectorAll(".scene");

  // Dot click navigation
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const sceneIndex = dot.getAttribute("data-scene");
      const targetScene = document.getElementById(`scene-${sceneIndex}`);
      if (targetScene) {
        targetScene.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Track active scene on scroll
  const onScrollNav = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (navIndicator) {
      navIndicator.style.height = `${scrollPercent}%`;
    }

    let currentSceneIdx = 0;
    allScenes.forEach((scene, idx) => {
      const top = scene.offsetTop - window.innerHeight / 3;
      if (scrollY >= top) {
        currentSceneIdx = idx;
      }
    });

    navDots.forEach((dot, idx) => {
      const isActive = idx === currentSceneIdx;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* --------------------------------------------------------------------------
     14. GSAP & SCROLLTRIGGER ENHANCEMENTS (If Loaded)
     -------------------------------------------------------------------------- */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined" && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade and subtle scale up for section headers
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 25,
        duration: 1,
        ease: "power2.out",
      });
    });

    // Glass cards stagger
    if (document.querySelector(".cards-grid")) {
      gsap.from(".glass-reason-card", {
        scrollTrigger: {
          trigger: ".cards-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Unfolding parchment letter
    if (document.getElementById("parchment-letter")) {
      gsap.from(".parchment-letter", {
        scrollTrigger: {
          trigger: "#parchment-letter",
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  }

  /* --------------------------------------------------------------------------
     15. SCENE 9 — INTERACTIVE MEMORY GALLERY & LIGHTBOX (6 Real Photos)
     -------------------------------------------------------------------------- */
  const GALLERY_MEMORIES = [
    {
      src: "assets/images/img_1.jpg",
      alt: "Anshita sitting gracefully in peach attire on the steps",
      tag: "Memory 01 • Poise & Grace",
      quote: "\u201cSome smiles stay with you long after the moment has passed.\u201d",
      sub: "Sitting on the steps, radiant in peach and red, making the simplest moment feel like poetry.",
      affirmation: "Graceful in every single way. ❤️",
    },
    {
      src: "assets/images/img_2.jpg",
      alt: "Anshita walking down the stairs, dress flowing elegantly",
      tag: "Memory 02 • Effortless Elegance",
      quote: "\u201cThe way you move through the world with so much light.\u201d",
      sub: "Every step effortless, every glance bright enough to illuminate everything around you.",
      affirmation: "Walking straight out of a dream. ✨",
    },
    {
      src: "assets/images/img_3.jpg",
      alt: "Anshita cute candid selfie with glasses resting chin on hand",
      tag: "Memory 03 • Playful Candid",
      quote: "\u201cThe little candid expressions that I cherish the most.\u201d",
      sub: "Glasses resting in your hair, lost in thought with your chin on your hand... pure, adorable Anshita.",
      affirmation: "Never lose that playful spark. 💖",
    },
    {
      src: "assets/images/img_4.jpg",
      alt: "Anshita in golden hour sunset profile in the open field",
      tag: "Memory 04 • Golden Hour Magic",
      quote: "\u201cEven the setting sun slows down just to catch a glimpse of you.\u201d",
      sub: "Golden rays kissing your hair, gentle evening breezes, and a calm that makes the world stand still.",
      affirmation: "Sun-kissed and breathtaking. 🌅",
    },
    {
      src: "assets/images/img_5.jpg",
      alt: "Anshita close-up portrait with winged eyeliner looking at camera",
      tag: "Memory 05 • Forever Special",
      quote: "\u201cNo matter how ordinary the day may be...\u201d",
      sub: "You have a way of becoming one of its most special parts.",
      affirmation: "And I'm really glad it's you, Anshita. ❤️",
    },
    {
      src: "assets/images/img_6.jpg",
      alt: "Deep and Anshita standing side by side holding headphones",
      tag: "Memory 06 • Deep & Anshita",
      quote: "\u201c33 kilometers between Amity and Pandri... but side by side in every thought.\u201d",
      sub: "Standing together, walking this journey, turning distance into something beautiful.",
      affirmation: "Happy Birthday, Anshita! Always here for you. ✨",
    },
  ];

  let currentGalleryIndex = 0;
  const galleryMainImg = document.getElementById("gallery-main-img");
  const galleryCaptionTag = document.getElementById("gallery-caption-tag");
  const galleryCaptionQuote = document.getElementById("gallery-caption-quote");
  const galleryCaptionSub = document.getElementById("gallery-caption-sub");
  const galleryCaptionAffirmation = document.getElementById("gallery-caption-affirmation");
  const galleryDots = document.querySelectorAll(".gallery-dot");
  const polaroidCards = document.querySelectorAll(".polaroid-card");
  const btnPrev = document.getElementById("gallery-btn-prev");
  const btnNext = document.getElementById("gallery-btn-next");
  const portraitFrame2 = document.getElementById("portrait-frame-2");

  // Lightbox Elements
  const lightbox = document.getElementById("memory-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTag = document.getElementById("lightbox-tag");
  const lightboxQuote = document.getElementById("lightbox-quote");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxBackdrop = document.getElementById("lightbox-backdrop");

  const updateGallery = (index, animate = true) => {
    if (index < 0) index = GALLERY_MEMORIES.length - 1;
    if (index >= GALLERY_MEMORIES.length) index = 0;
    currentGalleryIndex = index;

    const data = GALLERY_MEMORIES[index];

    if (galleryMainImg) {
      if (animate) {
        galleryMainImg.style.opacity = "0";
        galleryMainImg.style.transform = "scale(0.96)";
        setTimeout(() => {
          galleryMainImg.src = data.src;
          galleryMainImg.alt = data.alt;
          galleryMainImg.style.opacity = "1";
          galleryMainImg.style.transform = "scale(1)";
        }, 180);
      } else {
        galleryMainImg.src = data.src;
        galleryMainImg.alt = data.alt;
      }
    }

    if (galleryCaptionTag) galleryCaptionTag.textContent = data.tag;
    if (galleryCaptionQuote) galleryCaptionQuote.innerHTML = data.quote;
    if (galleryCaptionSub) galleryCaptionSub.textContent = data.sub;
    if (galleryCaptionAffirmation) galleryCaptionAffirmation.innerHTML = data.affirmation;

    galleryDots.forEach((dot, i) => {
      const isActive = i === index;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    polaroidCards.forEach((card, i) => {
      card.classList.toggle("active", i === index);
    });

    if (lightbox && lightbox.classList.contains("is-open")) {
      updateLightbox(index);
    }
  };

  let activeLightboxSource = "gallery"; // "gallery" or "handmade"
  let currentHandmadeIndex = 0;

  const HANDMADE_CARDS = [
    {
      src: "assets/images/handmade-1.jpg",
      alt: "Handmade KitKat Card",
      tag: "Handmade Note 01 • KitKat",
      quote: "\u201cI never want to take a break from you...\u201d",
      sub: "Because every conversation and little moment with you always feels too short."
    },
    {
      src: "assets/images/handmade-2.jpg",
      alt: "Handmade Happydent Wave Card",
      tag: "Handmade Note 02 • Happydent Wave",
      quote: "\u201cFor the smile I always love to see...\u201d",
      sub: "Your genuine smile is one of the most heartwarming things in this world."
    },
    {
      src: "assets/images/handmade-3.jpg",
      alt: "Handmade Munch Max Card",
      tag: "Handmade Note 03 • Munch Max",
      quote: "\u201cLife is much better with you...\u201d",
      sub: "The simplest days turn into the best memories whenever you're around."
    },
    {
      src: "assets/images/handmade-4.jpg",
      alt: "Handmade Perk Plus Card",
      tag: "Handmade Note 04 • Perk Plus",
      quote: "\u201cThanks for being the Perk in my life....\u201d",
      sub: "An instant boost of positivity, comfort, and laughter when it's needed most."
    },
    {
      src: "assets/images/handmade-5.jpg",
      alt: "Handmade 5 Star 3D Card",
      tag: "Handmade Note 05 • 5 Star 3D",
      quote: "\u201cI give you 5 Stars for always listening to me.....\u201d",
      sub: "For your patience, your understanding, and always being there to listen."
    },
    {
      src: "assets/images/handmade-6.jpg",
      alt: "Handmade Dairy Milk Silk Oreo Card",
      tag: "Handmade Note 06 • Silk Oreo",
      quote: "\u201cAlways melting my heart.....\u201d",
      sub: "Having a good friend like you is sweet, comforting, and deeply cherished."
    }
  ];

  const updateLightbox = (index) => {
    const data = GALLERY_MEMORIES[index];
    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxTag) lightboxTag.textContent = data.tag;
    if (lightboxQuote) lightboxQuote.innerHTML = `${data.quote} <br><small style="color:var(--color-rose);">${data.sub}</small>`;
  };

  const openLightbox = (index) => {
    activeLightboxSource = "gallery";
    updateLightbox(index);
    if (lightbox) {
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const openHandmadeLightbox = (index) => {
    if (index < 0) index = HANDMADE_CARDS.length - 1;
    if (index >= HANDMADE_CARDS.length) index = 0;
    currentHandmadeIndex = index;
    activeLightboxSource = "handmade";

    const data = HANDMADE_CARDS[index];
    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxTag) lightboxTag.textContent = data.tag;
    if (lightboxQuote) lightboxQuote.innerHTML = `${data.quote} <br><small style="color:var(--color-rose);">${data.sub}</small>`;

    if (lightbox) {
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  // Handmade card clicks
  const handmadeCards = document.querySelectorAll(".handmade-card");
  handmadeCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-handmade-idx"), 10);
      openHandmadeLightbox(idx);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = parseInt(card.getAttribute("data-handmade-idx"), 10);
        openHandmadeLightbox(idx);
      }
    });
  });

  if (btnPrev) {
    btnPrev.addEventListener("click", () => updateGallery(currentGalleryIndex - 1));
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => updateGallery(currentGalleryIndex + 1));
  }

  galleryDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      updateGallery(idx);
    });
  });

  polaroidCards.forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.getAttribute("data-index"), 10);
      updateGallery(idx);
    });
  });

  if (portraitFrame2) {
    portraitFrame2.style.cursor = "pointer";
    portraitFrame2.addEventListener("click", () => openLightbox(currentGalleryIndex));
    portraitFrame2.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(currentGalleryIndex);
      }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);

  const prevLightboxItem = () => {
    if (activeLightboxSource === "handmade") {
      openHandmadeLightbox(currentHandmadeIndex - 1);
    } else {
      updateGallery(currentGalleryIndex - 1);
    }
  };

  const nextLightboxItem = () => {
    if (activeLightboxSource === "handmade") {
      openHandmadeLightbox(currentHandmadeIndex + 1);
    } else {
      updateGallery(currentGalleryIndex + 1);
    }
  };

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prevLightboxItem();
    });
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      nextLightboxItem();
    });
  }

  /* --------------------------------------------------------------------------
     16. SCENE: A FEW THINGS I PROBABLY SHOULDN'T SAY OUT LOUD (10 Flirty Cards)
     -------------------------------------------------------------------------- */
  const FLIRTY_MESSAGES = [
    "Anshita, I blame your eyes for at least 50% of my inability to act normal around you.",
    "You were supposed to be just another person I met. Nobody told my heart to ignore the assignment.",
    "Thirty-three kilometers isn't that far. But apparently, it's far enough for me to miss you at the most random times.",
    "Your birthday comes first, but somehow, you've already taken the lead in occupying my thoughts.",
    "I have a theory that the number nine is lucky. But honestly, meeting you might be my favorite coincidence.",
    "If eye contact were an exam, I'd have forgotten the entire syllabus in that faculty room.",
    "You know what's unfair? You get to be effortlessly adorable while I'm over here trying to come up with lines that sound normal.",
    "I was perfectly capable of minding my own business before those eyes entered the story. Allegedly.",
    "I don't need the stars to align. I just need our schedules to align for once. 😉",
    "My favorite notification is still the one that has something to do with you.",
  ];

  let currentFlirtyIndex = 0;
  const btnNextFlirty = document.getElementById("btn-next-flirty");
  const flirtyActiveCard = document.getElementById("flirty-active-card");
  const flirtyCounter = document.getElementById("flirty-counter");
  const flirtyMessageText = document.getElementById("flirty-message-text");
  const flirtyCompleteCard = document.getElementById("flirty-complete-card");
  const btnFlirtyRestart = document.getElementById("btn-flirty-restart");
  const flirtyPills = document.querySelectorAll("#flirty-pills .f-dot");

  const updateFlirtyCard = (newIndex) => {
    if (newIndex >= FLIRTY_MESSAGES.length) {
      // Completed all 10 messages
      if (flirtyActiveCard) flirtyActiveCard.style.display = "none";
      if (btnNextFlirty) btnNextFlirty.style.display = "none";
      if (flirtyCompleteCard) flirtyCompleteCard.classList.remove("is-hidden");
      if (typeof confetti === "function") {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.65 },
          colors: ["#FF8FB1", "#E8C98A", "#C6B5FF"],
          disableForReducedMotion: true,
        });
      }
      return;
    }

    currentFlirtyIndex = newIndex;

    if (flirtyActiveCard) {
      flirtyActiveCard.classList.add("fade-out");
      setTimeout(() => {
        if (flirtyCounter) {
          const numStr = String(currentFlirtyIndex + 1).padStart(2, "0");
          flirtyCounter.textContent = `LINE ${numStr} OF 10`;
        }
        if (flirtyMessageText) {
          flirtyMessageText.innerHTML = `&ldquo;${FLIRTY_MESSAGES[currentFlirtyIndex]}&rdquo;`;
        }
        // Update pills
        flirtyPills.forEach((pill, idx) => {
          pill.classList.toggle("active", idx === currentFlirtyIndex);
        });
        flirtyActiveCard.classList.remove("fade-out");
        flirtyActiveCard.classList.add("fade-in");
        setTimeout(() => flirtyActiveCard.classList.remove("fade-in"), 450);
      }, 250);
    }
  };

  if (btnNextFlirty) {
    btnNextFlirty.addEventListener("click", () => {
      updateFlirtyCard(currentFlirtyIndex + 1);
    });
  }

  if (btnFlirtyRestart) {
    btnFlirtyRestart.addEventListener("click", () => {
      if (flirtyCompleteCard) flirtyCompleteCard.classList.add("is-hidden");
      if (flirtyActiveCard) flirtyActiveCard.style.display = "flex";
      if (btnNextFlirty) btnNextFlirty.style.display = "inline-flex";
      updateFlirtyCard(0);
    });
  }

  /* --------------------------------------------------------------------------
     17. SCENE OBSERVERS FOR 3 SEPTEMBER & BIRTHDAYS INTERACTION
     -------------------------------------------------------------------------- */
  const sceneFirstConvo = document.getElementById("scene-first-convo");
  if (sceneFirstConvo && "IntersectionObserver" in window) {
    const convoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sceneFirstConvo.classList.add("in-view");
          }
        });
      },
      { threshold: 0.3 }
    );
    convoObserver.observe(sceneFirstConvo);
  }

  // Interactive pulse on clicking the central 9
  const nexus9 = document.getElementById("bday-nexus");
  if (nexus9) {
    nexus9.style.cursor = "pointer";
    nexus9.addEventListener("click", () => {
      nexus9.style.transform = "scale(1.15)";
      setTimeout(() => { nexus9.style.transform = "scale(1)"; }, 300);
      if (typeof confetti === "function") {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.55 },
          colors: ["#E8C98A", "#FF8FB1"],
          disableForReducedMotion: true,
        });
      }
    });
  }

  // Interactive sacred lights in Navratri
  const sacredLights = document.querySelectorAll(".sacred-light");
  sacredLights.forEach((light) => {
    light.addEventListener("click", () => {
      light.style.transform = "scale(1.4) rotate(10deg)";
      setTimeout(() => { light.style.transform = ""; }, 400);
    });
  });

  // Keyboard navigation for gallery & lightbox
  window.addEventListener("keydown", (e) => {
    if (lightbox && lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightboxItem();
      if (e.key === "ArrowRight") nextLightboxItem();
    }
  });

  /* ==========================================================================
     18. ROMANTIC HEART BURST ENGINE & AUDIO CHIME SYNTHESIS
     ========================================================================== */
  const playRomanticChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      if (actx.state === "suspended") {
        actx.resume();
      }
      // Warm crystalline glockenspiel chord: C5, E5, G5, B5, C6, E6
      const chord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.51];
      chord.forEach((freq, idx) => {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, actx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.001, actx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.16, actx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + idx * 0.07 + 1.4);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(actx.currentTime + idx * 0.07);
        osc.stop(actx.currentTime + idx * 0.07 + 1.4);
      });
    } catch (e) {
      // AudioContext unavailable or blocked by browser policy, graceful fallback
    }
  };

  const BURST_EMOJIS = ["❤️", "💖", "💕", "✨", "🌸", "🌹", "💝", "🌟", "🎂", "🥰"];
  const BURST_PHRASES = [
    "My heart literally burst with love for you! 💖",
    "Every beat belongs to you, Anshita! ✨",
    "Counting down every second to your special day! 🎂",
    "Overflowing with love, 33 kilometers away! 💕",
    "You make my heart beat like nothing else in this world! ❤️",
    "Happy Birthday in advance, my favorite person! 🌹",
  ];
  let lastBurstPhraseIdx = -1;

  const burstHeartParticles = (originX, originY) => {
    if (prefersReducedMotion) return;

    // 1. Expanding Screen Shockwave Ring
    const shockwave = document.createElement("div");
    shockwave.className = "burst-screen-shockwave";
    shockwave.style.left = `${originX}px`;
    shockwave.style.top = `${originY}px`;
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 900);

    // 2. Flying 3D Heart & Sparkle Particles (48 particles)
    const particleCount = 48;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("span");
      p.className = "burst-particle";
      p.textContent = BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)];

      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 12 + 6;
      const size = Math.random() * 1.2 + 1; // rem

      p.style.fontSize = `${size}rem`;
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      document.body.appendChild(p);

      particles.push({
        el: p,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 3 + 2), // slightly upward bias
        gravity: 0.18,
        drag: 0.96,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 14,
        scale: 1,
        opacity: 1,
        life: 0,
        maxLife: Math.floor(Math.random() * 25 + 55),
      });
    }

    const animateParticles = () => {
      let active = false;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.life < p.maxLife) {
          active = true;
          p.life++;
          p.vx *= p.drag;
          p.vy = p.vy * p.drag + p.gravity;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);
          p.scale = Math.max(0.2, 1 - (p.life / p.maxLife) * 0.5);

          p.el.style.transform = `translate(-50%, -50%) translate3d(${p.x - originX}px, ${p.y - originY}px, 0) rotate(${p.rotation}deg) scale(${p.scale})`;
          p.el.style.opacity = p.opacity;
        } else if (p.el.parentNode) {
          p.el.remove();
        }
      }
      if (active) {
        requestAnimationFrame(animateParticles);
      }
    };
    requestAnimationFrame(animateParticles);

    // 3. Dual Confetti Cannons
    if (typeof confetti === "function") {
      const relX = originX / window.innerWidth;
      const relY = originY / window.innerHeight;
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { x: relX, y: relY },
        colors: ["#FF5376", "#FF8FB1", "#E8C98A", "#C6B5FF", "#FFD700", "#FFFFFF"],
        disableForReducedMotion: true,
      });
      // Second staggered wave
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 120,
          origin: { x: relX, y: relY },
          colors: ["#FF8FB1", "#E8C98A", "#C6B5FF"],
          disableForReducedMotion: true,
        });
      }, 160);
    }
  };

  const triggerHeartBurst = (heartElement, toastElement) => {
    if (!heartElement) return;

    const rect = heartElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Trigger tremor animation
    heartElement.classList.remove("heart-tremor", "heart-explode-bloom");
    void heartElement.offsetWidth; // Reflow
    heartElement.classList.add("heart-tremor");

    // Audio chime
    playRomanticChime();

    setTimeout(() => {
      heartElement.classList.remove("heart-tremor");
      void heartElement.offsetWidth;
      heartElement.classList.add("heart-explode-bloom");

      // Explosive particles and shockwave
      burstHeartParticles(centerX, centerY);

      // Toast affirmation
      if (toastElement) {
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * BURST_PHRASES.length);
        } while (nextIdx === lastBurstPhraseIdx && BURST_PHRASES.length > 1);
        lastBurstPhraseIdx = nextIdx;

        toastElement.textContent = BURST_PHRASES[nextIdx];
        toastElement.classList.add("show");
        clearTimeout(toastElement._hideTimer);
        toastElement._hideTimer = setTimeout(() => {
          toastElement.classList.remove("show");
        }, 5000);
      }
    }, 420);
  };

  /* ==========================================================================
     19. SCENE: HIGH-PRECISION REAL-TIME BIRTHDAY COUNTDOWN CONTROLLER (25 OCTOBER)
     ========================================================================== */
  const bdayDays = document.getElementById("bday-days");
  const bdayHours = document.getElementById("bday-hours");
  const bdayMinutes = document.getElementById("bday-minutes");
  const bdaySeconds = document.getElementById("bday-seconds");
  const bdayMs = document.getElementById("bday-ms");
  const bdayStatusText = document.getElementById("bday-status-text");
  const headerCountdownTimer = document.getElementById("header-countdown-timer");
  const headerCountdownPill = document.getElementById("header-countdown-pill");
  const bdayCardCountdownText = document.getElementById("bday-card-countdown-text");
  const btnBurstCountdownHeart = document.getElementById("btn-burst-countdown-heart");
  const burstCountdownHeartSvg = document.getElementById("burst-heart-svg");
  const btnBurstLove = document.getElementById("btn-burst-love");
  const btnCountdownContinue = document.getElementById("btn-countdown-continue");
  const heartBurstToast = document.getElementById("heart-burst-toast");
  const headerBrandHeart = document.getElementById("header-brand-heart");
  const btnBurstSceneHeart = document.getElementById("btn-burst-scene-heart");

  let hasTriggeredBirthdayBurst = false;

  const calculateBirthdayCountdown = () => {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Anshita's Birthday: 25 October (Month index 9)
    let target = new Date(currentYear, 9, 25, 0, 0, 0, 0);
    const endOfBirthday = new Date(currentYear, 9, 25, 23, 59, 59, 999);

    let isBirthdayToday = false;
    let diff = target.getTime() - now.getTime();

    if (now >= target && now <= endOfBirthday) {
      // It is October 25th today!
      isBirthdayToday = true;
      // Countdown the precious hours, minutes, seconds left of her birthday!
      diff = endOfBirthday.getTime() - now.getTime();
    } else if (now > endOfBirthday) {
      // Past October 25 of this year, target next year's 25 October!
      target = new Date(currentYear + 1, 9, 25, 0, 0, 0, 0);
      diff = target.getTime() - now.getTime();
    }

    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = Math.floor((diff % 1000) / 10); // 00 - 99 centiseconds for ultra-smooth real-time display

    return { days, hours, minutes, seconds, ms, isBirthdayToday, diff };
  };

  const updateRealtimeCountdown = () => {
    const { days, hours, minutes, seconds, ms, isBirthdayToday, diff } = calculateBirthdayCountdown();

    const dStr = String(days).padStart(2, "0");
    const hStr = String(hours).padStart(2, "0");
    const mStr = String(minutes).padStart(2, "0");
    const sStr = String(seconds).padStart(2, "0");
    const msStr = String(ms).padStart(2, "0");

    if (bdayDays && bdayDays.textContent !== dStr) bdayDays.textContent = dStr;
    if (bdayHours && bdayHours.textContent !== hStr) bdayHours.textContent = hStr;
    if (bdayMinutes && bdayMinutes.textContent !== mStr) bdayMinutes.textContent = mStr;
    if (bdaySeconds && bdaySeconds.textContent !== sStr) bdaySeconds.textContent = sStr;
    if (bdayMs) bdayMs.textContent = msStr;

    if (headerCountdownTimer) {
      if (isBirthdayToday) {
        headerCountdownTimer.textContent = `TODAY! 🎂 ${hStr}h ${mStr}m ${sStr}s`;
      } else {
        headerCountdownTimer.textContent = `${dStr}d ${hStr}h ${mStr}m ${sStr}s`;
      }
    }

    if (bdayCardCountdownText) {
      if (isBirthdayToday) {
        bdayCardCountdownText.textContent = `IT'S TODAY! 🎂 (${hStr}h ${mStr}m left)`;
      } else {
        bdayCardCountdownText.textContent = `${dStr}d ${hStr}h ${mStr}m left`;
      }
    }

    if (bdayStatusText) {
      if (isBirthdayToday) {
        if (!bdayStatusText.classList.contains("birthday-active")) {
          bdayStatusText.textContent = "🎉 IT'S ANSHITA'S BIRTHDAY TODAY! Happy Birthday to the most special girl in my world! 🎂✨";
          bdayStatusText.classList.add("birthday-active");
        }
        if (!hasTriggeredBirthdayBurst) {
          hasTriggeredBirthdayBurst = true;
          setTimeout(() => {
            if (burstCountdownHeartSvg) {
              triggerHeartBurst(burstCountdownHeartSvg, heartBurstToast);
            }
          }, 1200);
        }
      } else if (!bdayStatusText.classList.contains("birthday-active")) {
        bdayStatusText.textContent =
          days === 0
            ? `Less than a day to go! (${hStr} hours, ${mStr} mins, ${sStr}s) The wait is almost over for Anshita's special day. ✨`
            : `Every second brings us closer to celebrating 25 October. You deserve all the joy in the world, Anshita. ✨`;
      }
    }

    if (diff === 0 && !hasTriggeredBirthdayBurst) {
      hasTriggeredBirthdayBurst = true;
      if (burstCountdownHeartSvg) {
        triggerHeartBurst(burstCountdownHeartSvg, heartBurstToast);
      }
    }

    requestAnimationFrame(updateRealtimeCountdown);
  };

  // Launch real-time ticking immediately
  updateRealtimeCountdown();

  // Hook up Burst Heart clicks
  if (btnBurstCountdownHeart && burstCountdownHeartSvg) {
    btnBurstCountdownHeart.addEventListener("click", () => {
      triggerHeartBurst(burstCountdownHeartSvg, heartBurstToast);
    });
  }

  if (btnBurstLove && burstCountdownHeartSvg) {
    btnBurstLove.addEventListener("click", () => {
      triggerHeartBurst(burstCountdownHeartSvg, heartBurstToast);
    });
  }

  if (btnCountdownContinue) {
    btnCountdownContinue.addEventListener("click", () => {
      const scene1 = document.getElementById("scene-1");
      if (scene1) {
        scene1.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (headerCountdownPill) {
    headerCountdownPill.addEventListener("click", (e) => {
      e.preventDefault();
      const countdownScene = document.getElementById("scene-countdown");
      if (countdownScene) {
        countdownScene.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (headerBrandHeart) {
    headerBrandHeart.style.cursor = "pointer";
    headerBrandHeart.addEventListener("click", () => {
      triggerHeartBurst(headerBrandHeart, heartBurstToast);
    });
  }

  if (btnBurstSceneHeart && crystalHeartSvg) {
    btnBurstSceneHeart.addEventListener("click", () => {
      triggerHeartBurst(crystalHeartSvg, heartRevelation);
      if (heartRevelation) {
        heartRevelation.classList.add("revealed");
      }
    });
  }
});
