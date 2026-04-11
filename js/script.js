// ==============================
// MENU MOBILE
// ==============================
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navGroup = document.querySelector(".nav-group");

  if (!menuToggle || !navGroup) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navGroup.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  const navLinks = navGroup.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navGroup.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ==============================
// HERO TITLE ANIMATION
// ==============================
function initHeroAnimation() {
  const heroTitle = document.querySelector(".hero-title");
  const heroTitleLines = document.querySelectorAll(".hero-title-line");

  if (!heroTitle || heroTitleLines.length !== 3) return;

  const heroPhrases = [
    ["Diseño.", "Movimiento.", "Experiencia."],
    ["Interfaces.", "Animación.", "Impacto."],
    ["UX/UI.", "3D.", "Narrativa."],
    ["Concepto.", "Forma.", "Resultado."],
  ];

  let heroIndex = 0;

  setInterval(() => {
    heroTitle.classList.add("is-changing");

    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroPhrases.length;

      heroTitleLines.forEach((line, index) => {
        line.textContent = heroPhrases[heroIndex][index];
      });

      heroTitle.classList.remove("is-changing");
    }, 450);
  }, 3200);
}

// ==============================
// SERVICES REVEAL ON SCROLL
// ==============================
function initServicesReveal() {
  const servicesSection = document.querySelector(".services");
  const servicesHeading = document.querySelector(".services-heading");
  const serviceCards = document.querySelectorAll(".service-card");

  if (!servicesSection || !servicesHeading || !serviceCards.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        servicesHeading.classList.add("is-visible");
        serviceCards.forEach((card) => card.classList.add("is-visible"));

        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  observer.observe(servicesSection);
}

// ==============================
// INIT GENERAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroAnimation();
  initServicesReveal();
});