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

  const formView = document.getElementById("contactFormView");
  const successView = document.getElementById("contactSuccessView");
  const successButton = document.getElementById("contactSuccessButton");
  const newMessageButton = document.getElementById("contactNewMessage");

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
    !submitButton ||
    !formView ||
    !successView ||
    !successButton ||
    !newMessageButton  
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

    window.setTimeout(() => {
      showContactForm();
    }, 320);

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

  const showContactSuccess = () => {
    formView.hidden = true;

    successView.hidden = false;
    successView.classList.remove("is-visible");

    requestAnimationFrame(() => {
      successView.classList.add("is-visible");
    });

    successView.setAttribute("tabindex", "-1");
    successView.focus();
  };

  const showContactForm = () => {
    successView.classList.remove("is-visible");
    successView.hidden = true;

    formView.hidden = false;

    window.setTimeout(() => {
      nameInput.focus();
    }, 80);
  };
  // ==============================
  // ENVÍO TEMPORAL
  // ==============================
  form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const isFormValid = validateForm();

  if (!isFormValid) {
    const firstInvalidElement = form.querySelector(
      ".is-invalid input, .is-invalid textarea, .is-invalid input[type='checkbox']"
    );

    firstInvalidElement?.focus();
    return;
  }

  const submitText = submitButton.querySelector(
    ".contact-form-submit-text"
  );

  const submitIcon = submitButton.querySelector("svg");

  submitButton.disabled = true;
  submitButton.classList.add("is-loading");

  if (submitText) {
    submitText.textContent = "Enviando...";
  }

  if (submitIcon) {
    submitIcon.hidden = true;
  }

  try {
  const isLocalDevelopment =
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost";

  // Simulación local para evitar el error 405 de Live Server
  if (isLocalDevelopment) {
    await new Promise((resolve) => setTimeout(resolve, 900));

    form.reset();

    serviceFieldset.classList.remove("is-valid", "is-invalid");

    form
      .querySelectorAll(".contact-form-field")
      .forEach((field) => {
        field.classList.remove("is-valid", "is-invalid");
      });

    form
      .querySelectorAll('[aria-invalid="true"], [aria-invalid="false"]')
      .forEach((field) => {
        field.removeAttribute("aria-invalid");
      });

    nameError.hidden = true;
    emailError.hidden = true;
    serviceError.hidden = true;
    messageError.hidden = true;

    console.log(
      "Simulación local: formulario enviado correctamente."
    );

    showContactSuccess();

    return;
  }

  // Envío real cuando el sitio esté publicado en Netlify
  const formData = new FormData(form);

  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(),
  });

  if (!response.ok) {
    throw new Error(
      `No se pudo enviar el formulario. Estado: ${response.status}`
    );
  }

  form.reset();

  serviceFieldset.classList.remove("is-valid", "is-invalid");

  form
    .querySelectorAll(".contact-form-field")
    .forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });

  form
    .querySelectorAll('[aria-invalid="true"], [aria-invalid="false"]')
    .forEach((field) => {
      field.removeAttribute("aria-invalid");
    });

  nameError.hidden = true;
  emailError.hidden = true;
  serviceError.hidden = true;
  messageError.hidden = true;

  console.log("Formulario enviado correctamente.");

    showContactSuccess();

  } catch (error) {
    console.error("Error al enviar el formulario:", error);

    alert(
      "No pudimos enviar tu mensaje. Inténtalo nuevamente o contáctanos por correo o WhatsApp."
    );
  } finally {
    submitButton.disabled = false;
    submitButton.classList.remove("is-loading");

    if (submitText) {
      submitText.textContent = "Enviar mensaje";
    }

    if (submitIcon) {
      submitIcon.hidden = false;
    }
  }
});

  // ==============================
  // EVENTOS DEL MODAL
  // ==============================
  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  successButton.addEventListener("click", () => {
    closeModal();

    window.setTimeout(() => {
      showContactForm();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 320);
});

newMessageButton.addEventListener("click", () => {
  showContactForm();
});

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
// PORTFOLIO FILTERS
// ==============================
function initPortfolioFilters() {
  const filters = document.querySelectorAll(".portfolio-filter");
  const cards = document.querySelectorAll(".portfolio-editorial-card");

  if (!filters.length || !cards.length) return;

  filters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const selectedFilter = filterButton.dataset.filter;

      // Actualizar filtro activo
      filters.forEach((button) => {
        const isActive = button === filterButton;

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      // Filtrar proyectos
      cards.forEach((card) => {
        const cardCategory = card.dataset.category;

        const shouldShow =
          selectedFilter === "all" ||
          cardCategory === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
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
  initPortfolioFilters();
  initContactModal();
});

// ==============================
// SCROLL RESET
// ==============================
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
  const hash = window.location.hash;

  // Si llegamos con un ancla válida, respetarla
  if (hash) {
    const targetSection = document.querySelector(hash);

    if (targetSection) {
      window.setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "auto",
          block: "start",
        });
      }, 50);

      return;
    }
  }

  // Si no hay ancla válida, comenzar arriba
  window.scrollTo(0, 0);
});