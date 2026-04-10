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
// INIT GENERAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroAnimation();
});