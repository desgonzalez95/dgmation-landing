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
// SHOWREEL MODAL
// ==============================
function initShowreelModal() {
  const openBtn = document.getElementById("openShowreel");
  const modal = document.getElementById("showreelModal");
  const closeBtn = document.getElementById("closeShowreel");
  const overlay = document.getElementById("showreelOverlay");
  const videoWrap = document.getElementById("showreelVideoWrap");

  if (!openBtn || !modal || !closeBtn || !overlay || !videoWrap) return;

  // Pega aquí el ID de tu video de YouTube
  const youtubeVideoId = "wjB_gJ43QNQ";

  const createIframe = () => {
    if (videoWrap.querySelector("iframe")) return;

    const iframe = document.createElement("iframe");
    iframe.className = "showreel-video-player";
    iframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`;
    iframe.title = "Showreel 2024";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    videoWrap.appendChild(iframe);
  };

  const destroyIframe = () => {
    videoWrap.innerHTML = "";
  };

  const openModal = (event) => {
    event.preventDefault();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    createIframe();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    destroyIframe();
  };

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

// ==============================
// INIT GENERAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroAnimation();
  initServicesReveal();
  initShowreelModal();
});

// ==============================
// SCROLL RESET (IMPORTANTE)
// ==============================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }
  window.scrollTo(0, 0);
});