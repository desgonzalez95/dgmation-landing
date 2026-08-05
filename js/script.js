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
    ["UX/UI.", "3D.", "Branding."],
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
// CONTACT MODAL
// ==============================
function initContactModal() {
  const openButtons = document.querySelectorAll(".js-open-contact");
  const modal = document.getElementById("contactModal");
  const closeButton = document.getElementById("closeContactModal");
  const overlay = document.getElementById("contactOverlay");

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");

  const serviceFieldset = form?.querySelector(
    ".contact-service-fieldset"
  );

  const serviceInputs = form?.querySelectorAll(
    'input[name="servicios"]'
  );

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const serviceError = document.getElementById("serviceError");
  const messageError = document.getElementById("messageError");

  const submitButton = document.getElementById("contactSubmit");

  if (
    !openButtons.length ||
    !modal ||
    !closeButton ||
    !overlay ||
    !form ||
    !nameInput ||
    !emailInput ||
    !messageInput ||
    !serviceFieldset ||
    !serviceInputs?.length ||
    !nameError ||
    !emailError ||
    !serviceError ||
    !messageError ||
    !submitButton
  ) {
    return;
  }

  let lastFocusedElement = null;

  // ==============================
  // ABRIR Y CERRAR MODAL
  // ==============================
  const openModal = (event) => {
    event.preventDefault();

    lastFocusedElement = document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.setTimeout(() => {
      closeButton.focus();
    }, 100);
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  // ==============================
  // UTILIDADES DE VALIDACIÓN
  // ==============================
  const setFieldError = (input, errorElement, message) => {
    const field = input.closest(".contact-form-field");

    field?.classList.add("is-invalid");
    field?.classList.remove("is-valid");

    input.setAttribute("aria-invalid", "true");

    errorElement.textContent = message;
    errorElement.hidden = false;
  };

  const setFieldValid = (input, errorElement) => {
    const field = input.closest(".contact-form-field");

    field?.classList.remove("is-invalid");
    field?.classList.add("is-valid");

    input.setAttribute("aria-invalid", "false");
    errorElement.hidden = true;
  };

  const clearFieldState = (input, errorElement) => {
    const field = input.closest(".contact-form-field");

    field?.classList.remove("is-invalid", "is-valid");

    input.removeAttribute("aria-invalid");
    errorElement.hidden = true;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ==============================
  // VALIDACIÓN INDIVIDUAL
  // ==============================
  const validateName = () => {
    const value = nameInput.value.trim();

    if (value.length < 2) {
      setFieldError(
        nameInput,
        nameError,
        "Escribe tu nombre completo."
      );

      return false;
    }

    setFieldValid(nameInput, nameError);
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();

    if (!value) {
      setFieldError(
        emailInput,
        emailError,
        "Escribe tu correo electrónico."
      );

      return false;
    }

    if (!isValidEmail(value)) {
      setFieldError(
        emailInput,
        emailError,
        "Escribe un correo electrónico válido."
      );

      return false;
    }

    setFieldValid(emailInput, emailError);
    return true;
  };

  const validateServices = () => {
    const hasSelectedService = [...serviceInputs].some(
      (input) => input.checked
    );

    if (!hasSelectedService) {
      serviceFieldset.classList.add("is-invalid");
      serviceFieldset.classList.remove("is-valid");

      serviceError.hidden = false;

      return false;
    }

    serviceFieldset.classList.remove("is-invalid");
    serviceFieldset.classList.add("is-valid");

    serviceError.hidden = true;

    return true;
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();

    if (value.length < 10) {
      setFieldError(
        messageInput,
        messageError,
        "Cuéntanos un poco más sobre tu proyecto."
      );

      return false;
    }

    setFieldValid(messageInput, messageError);
    return true;
  };

  const validateForm = () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const areServicesValid = validateServices();
    const isMessageValid = validateMessage();

    return (
      isNameValid &&
      isEmailValid &&
      areServicesValid &&
      isMessageValid
    );
  };

  // ==============================
  // VALIDACIÓN EN TIEMPO REAL
  // ==============================
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  messageInput.addEventListener("blur", validateMessage);

  nameInput.addEventListener("input", () => {
    if (nameInput.value.trim().length >= 2) {
      setFieldValid(nameInput, nameError);
    } else {
      clearFieldState(nameInput, nameError);
    }
  });

  emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();

    if (value && isValidEmail(value)) {
      setFieldValid(emailInput, emailError);
    } else {
      clearFieldState(emailInput, emailError);
    }
  });

  messageInput.addEventListener("input", () => {
    if (messageInput.value.trim().length >= 10) {
      setFieldValid(messageInput, messageError);
    } else {
      clearFieldState(messageInput, messageError);
    }
  });

  serviceInputs.forEach((input) => {
    input.addEventListener("change", validateServices);
  });

  // ==============================
  // ENVÍO TEMPORAL
  // ==============================
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (!isFormValid) {
      const firstInvalidElement = form.querySelector(
        ".is-invalid input, .is-invalid textarea, .is-invalid input[type='checkbox']"
      );

      firstInvalidElement?.focus();
      return;
    }

    /*
      Todavía no enviamos a Netlify.
      En el siguiente paso agregaremos:
      - estado Enviando...
      - solicitud a Netlify
      - pantalla de éxito
      - estado de error
    */

    console.log("Formulario válido y listo para enviarse.");
  });

  // ==============================
  // EVENTOS DEL MODAL
  // ==============================
  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("is-open")
    ) {
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
  initContactModal();
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