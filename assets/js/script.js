// Scroll Reveal
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  for (let i = 0; i < reveals.length; i++) {
    let elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Navbar Shadow & Active Link Scrollspy
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  const scrollY = window.scrollY;

  // Toggle navbar glass scrolled shadow
  const header = document.querySelector(".glass");
  if (header) {
    header.classList.toggle("scrolled", scrollY > 50);
  }

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
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

window.addEventListener("scroll", updateActiveNav);

// Typing Animation with Pause Delay
const words = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Problem Solver",
  "Fast Learner"
];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  let typingSpeed = isDeleting ? 50 : 100;

  if (i >= words.length) i = 0;

  if (!isDeleting && j <= words[i].length) {
    current = words[i].substring(0, j++);
  } else if (isDeleting && j >= 0) {
    current = words[i].substring(0, j--);
  }

  const typingElement = document.getElementById("typing");
  if (typingElement) {
    typingElement.innerHTML = current;
  }

  if (!isDeleting && j === words[i].length + 1) {
    isDeleting = true;
    typingSpeed = 1500; // Pause at end of word
  } else if (isDeleting && j === -1) {
    isDeleting = false;
    i++;
    j = 0;
    typingSpeed = 500; // Pause before starting new word
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  type();
});

// Theme Toggle
const themeToggleBtn = document.getElementById("themeToggle");
if (themeToggleBtn) {
  themeToggleBtn.onclick = function () {
    document.body.classList.toggle("light");
    this.innerHTML = document.body.classList.contains("light") ? "☀" : "🌙";
  };
}

// Mobile Menu Toggle & Auto Close on Click
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  if (nav) nav.classList.toggle("show");
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector(".nav-links");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  });
});

// Contact Form Handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
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
