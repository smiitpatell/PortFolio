/* ==========================================================================
   SMIT PATEL - DEVELOPER PORTFOLIO INTERACTIVE LOGIC
   Visual Fingerprint Engine: Canvas Mesh, Custom Cursor, Mouse Parallax & Spotlight Cards
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundMesh();
  initCustomCursor();
  initMouseParallax();
  initCardSpotlight();
  initScrollReveal();
  initTypingAnimation();
  initThemeToggle();
  initMobileMenu();
  initContactForm();
});

// Detect reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/* ================= 1. AMBIENT BACKGROUND CANVAS MESH ================= */
function initBackgroundMesh() {
  const canvas = document.getElementById("bg-mesh");
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 180 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    particles = [];
    const particleCount = Math.floor((width * height) / 22000);
    for (let i = 0; i < Math.min(particleCount, 60); i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1
      });
    }
  }

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isLightMode = document.body.classList.contains("light");
    const particleColor = isLightMode ? "rgba(2, 132, 199, 0.4)" : "rgba(0, 245, 255, 0.4)";
    const lineColor = isLightMode ? "rgba(2, 132, 199, 0.08)" : "rgba(0, 245, 255, 0.08)";
    const mouseLineColor = isLightMode ? "rgba(192, 38, 211, 0.25)" : "rgba(255, 0, 212, 0.25)";

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1 - dist / 140;
          ctx.stroke();
        }
      }

      // Interaction with mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = mouseLineColor;
          ctx.lineWidth = 1 - dist / mouse.radius;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= 2. CUSTOM MAGNETIC CURSOR ================= */
function initCustomCursor() {
  const follower = document.getElementById("cursorFollower");
  const dot = document.getElementById("cursorDot");
  if (!follower || !dot || prefersReducedMotion || isTouchDevice) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let followerX = mouseX, followerY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states for interactive elements
  const interactiveSelectors = "a, button, .card, .skill-chip, input, textarea, .menu-btn";
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener("mouseenter", () => follower.classList.add("hovering"));
    el.addEventListener("mouseleave", () => follower.classList.remove("hovering"));
  });
}

/* ================= 3. MOUSE PARALLAX RESPONSE ================= */
function initMouseParallax() {
  const parallaxElements = document.querySelectorAll("[data-speed]");
  if (parallaxElements.length === 0 || prefersReducedMotion || isTouchDevice) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = (e.clientX - cx) / cx;
    targetY = (e.clientY - cy) / cy;
  });

  function updateParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.03;
      const moveX = currentX * speed * 120;
      const moveY = currentY * speed * 120;
      el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(updateParallax);
  }
  updateParallax();
}

/* ================= 4. SPOTLIGHT CARDS CURSOR TRACKING ================= */
function initCardSpotlight() {
  const spotlightCards = document.querySelectorAll(".spotlight-card");
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

/* ================= 5. STAGGERED SCROLL REVEAL & NAVBAR SPY ================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.querySelector(".glass");

  function onScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Reveal animation check
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        element.classList.add("active");
      }
    });

    // Glass navbar header scroll state
    if (header) {
      header.classList.toggle("scrolled", scrollY > 50);
    }

    // Scrollspy active link update
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
}

/* ================= 6. TYPING ANIMATION ================= */
function initTypingAnimation() {
  const words = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Problem Solver",
    "Fast Learner"
  ];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    let speed = isDeleting ? 40 : 80;
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        speed = 1800; // Pause at end of word
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400; // Pause before typing new word
      }
    }

    setTimeout(type, speed);
  }

  type();
}

/* ================= 7. THEME TOGGLE ================= */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggle");
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggleBtn.innerHTML = isLight ? "☀" : "🌙";
    themeToggleBtn.setAttribute("aria-label", isLight ? "Switch to Dark Mode" : "Switch to Light Mode");
  });
}

/* ================= 8. MOBILE MENU ================= */
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  if (nav) nav.classList.toggle("show");
}

function initMobileMenu() {
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const nav = document.querySelector(".nav-links");
      if (nav && nav.classList.contains("show")) {
        nav.classList.remove("show");
      }
    });
  });
}

/* ================= 9. CONTACT FORM HANDLER ================= */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("formName").value;
    const responseBox = document.getElementById("formResponse");

    if (responseBox) {
      responseBox.innerHTML = `✨ Thank you, <strong>${name}</strong>! Your message has been received. I'll get back to you soon!`;
      responseBox.className = "form-response success";
      contactForm.reset();

      setTimeout(() => {
        responseBox.style.display = "none";
      }, 6000);
    }
  });
}

