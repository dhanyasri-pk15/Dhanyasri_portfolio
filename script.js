const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Gentle scroll reveals, with a graceful fallback for older browsers.
const revealTargets = document.querySelectorAll(
  ".hero-copy, .hero-visual, .section-heading, .about-card, .experience-card, .project-card, .skill-group, .contact-section"
);
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("reveal-ready");
  revealTargets.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    revealObserver.observe(el);
  });
}

// Project cards can be clicked or keyboard-activated to highlight their details.
document.querySelectorAll(".project-card").forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-pressed", "false");
  const toggleCard = () => {
    const expanded = card.classList.toggle("is-expanded");
    card.setAttribute("aria-pressed", String(expanded));
  };
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    toggleCard();
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard();
    }
  });
  const hint = document.createElement("span");
  hint.className = "expand-hint";
  hint.textContent = "CLICK TO HIGHLIGHT ↗";
  card.appendChild(hint);
});

const year = document.getElementById("year");
if (year) year.textContent = `© ${new Date().getFullYear()}`;
