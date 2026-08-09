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
// HOME PORTFOLIO REVEAL
// ==============================
function initHomePortfolioReveal() {
  const section = document.querySelector(".portfolio-home-reveal");

  if (!section) return;

  const heading = section.querySelector(".portfolio-home-heading");
  const cards = section.querySelectorAll(".portfolio-home-card");
  const cta = section.querySelector(".portfolio-home-cta");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        // Título
        if (heading) {
          heading.classList.add("is-visible");
        }

        // Cards
        cards.forEach((card, index) => {
          let delay;

          if (index === 0) {
            // Card principal
            delay = 180;
          } else {
            // Cards secundarias entran juntas
            delay = 380;
          }

          window.setTimeout(() => {
            card.classList.add("is-visible");
          }, delay);
        });

        // CTA
        window.setTimeout(() => {
          if (cta) {
            cta.classList.add("is-visible");
          }
        }, 820);

        // La animación solo ocurre una vez
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.28,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  observer.observe(section);
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
// PORTFOLIO FILTERS + LOAD MORE
// ==============================
function initPortfolioFilters() {
  const filters = document.querySelectorAll(".portfolio-filter");
  const cards = Array.from(
    document.querySelectorAll(".portfolio-editorial-card")
  );

  const moreWrapper = document.getElementById("portfolioShowcaseMore");
  const moreButton = document.getElementById("portfolioMoreBtn");

  if (!filters.length || !cards.length) return;

  const INITIAL_VISIBLE_PROJECTS = 10;

  let activeFilter = "all";
  let isExpanded = false;

  // Devuelve únicamente las cards que pertenecen
  // al filtro seleccionado actualmente.
  const getFilteredCards = () => {
    return cards.filter((card) => {
      if (activeFilter === "all") {
        return true;
      }

      return card.dataset.category === activeFilter;
    });
  };

  // Actualiza qué proyectos se muestran.
  const updateProjects = () => {
    const filteredCards = getFilteredCards();

    // Primero ocultamos todo.
    cards.forEach((card) => {
      card.hidden = true;
    });

    // Si está expandido, mostramos todos.
    // Si no, solamente los primeros 10.
    const visibleCards = isExpanded
      ? filteredCards
      : filteredCards.slice(0, INITIAL_VISIBLE_PROJECTS);

    visibleCards.forEach((card) => {
      card.hidden = false;
    });

    // ==============================
    // BOTÓN VER MÁS / VER MENOS
    // ==============================
    if (!moreWrapper || !moreButton) return;

    // Si el filtro tiene 10 proyectos o menos,
    // no necesitamos mostrar el botón.
    if (filteredCards.length <= INITIAL_VISIBLE_PROJECTS) {
      moreWrapper.hidden = true;
      return;
    }

    moreWrapper.hidden = false;

    moreButton.textContent = isExpanded
      ? "Ver menos"
      : "Ver más";
  };

  // ==============================
  // FILTROS
  // ==============================
  filters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      activeFilter = filterButton.dataset.filter;

      // Cada vez que cambiamos de filtro,
      // regresamos al estado compacto.
      isExpanded = false;

      filters.forEach((button) => {
        const isActive = button === filterButton;

        button.classList.toggle("is-active", isActive);
        button.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      updateProjects();
    });
  });

  // ==============================
  // VER MÁS / VER MENOS
  // ==============================
  if (moreButton) {
    moreButton.addEventListener("click", () => {
      isExpanded = !isExpanded;

      updateProjects();

      // Si volvemos a "Ver menos",
      // reposicionamos suavemente al usuario
      // cerca de los filtros/grid.
      if (!isExpanded) {
        const portfolioGrid = document.querySelector(
          ".portfolio-editorial-grid"
        );

        portfolioGrid?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Estado inicial
  updateProjects();
}

// ==============================
// PORTFOLIO PROJECT DATA
// ==============================
const portfolioProjects = {

  // ==========================================
  // 1. VELFARE
  // ==========================================
  velfare: {
    title: "Velfare",
    category: "Diseño UX/UI",
    tagClass: "portfolio-card-tag--purple",
    description:
      "Aplicación enfocada en nutrición personalizada con una experiencia intuitiva y visual.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/velfare-image.png",
        alt: "Proyecto Velfare",
      },

      {
        type: "image",
        src: "assets/images/portfolio/velfare/velfareapp-banner-01.jpg",
        alt: "Velfare App View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/velfare/velfareapp-banner-02.jpg",
        alt: "Velfare App View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/velfare/velfareapp-banner-03.jpg",
        alt: "Velfare App View 3",
      },
    ],
  },


  // ==========================================
  // 2. CORTEZ ACOSTA & ASOCIADOS
  // ==========================================
  "cortez-acosta": {
    title: "Cortez Acosta & Asociados",
    category: "Branding",
    tagClass: "portfolio-card-tag--teal",
    description:
      "Rediseño de identidad visual para firma especializada en servicios administrativos, contables, financieros, fiscales y legales.",
    year: "2024",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/cortezacosta-image02.jpg",
        alt: "Proyecto Cortez Acosta & Asociados",
      },

      {
        type: "image",
        src: "assets/images/portfolio/cortez-acosta/cortez-acosta-image-02.webp",
        alt: "Cortez Acosta View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/cortez-acosta/cortez-acosta-image-03.webp",
        alt: "Cortez Acosta View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/cortez-acosta/cortez-acosta-image-04.webp",
        alt: "Cortez Acosta View 3",
      },
    ],
  },


  // ==========================================
  // 3. PISTOLA QUIRÚRGICA
  // ==========================================
  "pistola-quirurgica": {
    title: "Pistola Quirúrgica",
    category: "Modelado 3D",
    tagClass: "portfolio-card-tag--cyan",
    description:
      "Modelado 3D de dispositivo médico orientado a simulación, visualización y comunicación técnica dentro del sector salud.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/pistola-image.jpg",
        alt: "Proyecto Pistola Quirúrgica",
      },

      {
        type: "image",
        src: "assets/images/portfolio/pistola-quirurgica/pistola-quirurgica-02.webp",
        alt: "Pistola Quirúrgica View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/pistola-quirurgica/pistola-quirurgica-03.webp",
        alt: "Pistola Quirúrgica View 2",
      },

      {
        type: "video",
        src: "assets/images/portfolio/pistola-quirurgica/pistola-quirurgica-video-01.mp4",
      },
    ],
  },


  // ==========================================
  // 4. CELU
  // ==========================================
  celu: {
    title: "Celu",
    category: "Diseño UX/UI",
    tagClass: "portfolio-card-tag--purple",
    description:
      "Diseño UX/UI de plataforma web y app que integra farmacia virtual, consultas médicas e historial clínico en una experiencia digital unificada.",
    year: "2024",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/celu-image.png",
        alt: "Proyecto Celu",
      },

      {
        type: "image",
        src: "assets/images/portfolio/celu/celu-app-image-02.webp",
        alt: "Celu View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/celu/celu-app-image-03.webp",
        alt: "Celu View 2",
      },
    ],
  },


  // ==========================================
  // 5. LA CESTA DEL CHEF
  // ==========================================
  "la-cesta-del-chef": {
    title: "La Cesta del Chef",
    category: "Branding",
    tagClass: "portfolio-card-tag--teal",
    description:
      "Diseño de identidad visual y logotipo para una marca especializada en hongos gourmet, vegetales exóticos y productos selectos para amantes de la gastronomía.",
    year: "2026",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/lacestadelchef-image.jpg",
        alt: "Proyecto La Cesta del Chef",
      },

      {
        type: "image",
        src: "assets/images/portfolio/la-cesta-del-chef/la-cesta-del-chef-image-02.webp",
        alt: "La Cesta del Chef View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/la-cesta-del-chef/la-cesta-del-chef-image-03.webp",
        alt: "La Cesta del Chef View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/la-cesta-del-chef/la-cesta-del-chef-image-04.webp",
        alt: "La Cesta del Chef View 3",
      },

      {
        type: "image",
        src: "assets/images/portfolio/la-cesta-del-chef/la-cesta-del-chef-image-05.webp",
        alt: "La Cesta del Chef View 4",
      },

      {
        type: "image",
        src: "assets/images/portfolio/la-cesta-del-chef/la-cesta-del-chef-image-06.webp",
        alt: "La Cesta del Chef View 4",
      },
    ],
  },


  // ==========================================
  // 6. KUVIK
  // ==========================================
  kuvik: {
    title: "Kuvik",
    category: "Diseño UX/UI",
    tagClass: "portfolio-card-tag--purple",
    description:
      "Sitio web diseñado para exhibir y comercializar arte digital, con una experiencia enfocada en la exploración visual.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/kuvik-image.jpg",
        alt: "Proyecto Kuvik",
      },

      {
        type: "image",
        src: "assets/images/portfolio/kuvik/kuvik-image-02.webp",
        alt: "Kuvik View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/kuvik/kuvik-image-03.webp",
        alt: "Kuvik View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/kuvik/kuvik-image-04.webp",
        alt: "Kuvik View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/kuvik/kuvik-image-05.webp",
        alt: "Kuvik View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/kuvik/kuvik-image-06.webp",
        alt: "Kuvik View 2",
      },
    ],
  },


  // ==========================================
  // 7. JERINGA MÉDICA
  // ==========================================
  "jeringa-medica": {
    title: "Jeringa Médica",
    category: "Animación",
    tagClass: "portfolio-card-tag--yellow",
    description:
      "Modelado y renderizado 3D de dispositivo médico, desarrollado para visualización de producto y comunicación visual dentro del sector salud.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/jeringa-image.jpg",
        alt: "Proyecto Jeringa Médica",
      },

      {
        type: "image",
        src: "assets/images/portfolio/jeringa-medica/jeringa-medica-image-02.webp",
        alt: "Jeringa Médica View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/jeringa-medica/jeringa-medica-image-03.webp",
        alt: "Jeringa Médica View 1",
      },

      {
        type: "video",
        src: "assets/images/portfolio/jeringa-medica/jeringa-medica-video-01.mp4",
      },
    ],
  },


  // ==========================================
  // 8. MESA MÉDICA
  // ==========================================
  "mesa-medica": {
    title: "Mesa Médica",
    category: "Modelado 3D",
    tagClass: "portfolio-card-tag--cyan",
    description:
      "Modelado y renderizado 3D de equipamiento médico, enfocado en la visualización detallada y comunicación visual de producto para el sector salud.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/mesamedica-image.jpg",
        alt: "Proyecto Mesa Médica",
      },

      {
        type: "image",
        src: "assets/images/portfolio/mesa-medica/mesa-medica-image-02.webp",
        alt: "Mesa Médica View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/mesa-medica/mesa-medica-image-03.webp",
        alt: "Mesa Médica View 2",
      },

      {
        type: "video",
        src: "assets/images/portfolio/mesa-medica/mesa-medica-video-01.mp4",
      },
    ],
  },


  // ==========================================
  // 9. SURA GAME
  // ==========================================
  "sura-game": {
    title: "Sura Game",
    category: "Animación",
    tagClass: "portfolio-card-tag--yellow",
    description:
      "Propuesta visual y modelado 3D para el desarrollo de un videojuego de SURA México, incluyendo la creación de escenarios y recursos gráficos.",
    year: "2024",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/sura-image.jpg",
        alt: "Proyecto Sura Game",
      },

      {
        type: "image",
        src: "assets/images/portfolio/sura-game/sura-game-image-02.webp",
        alt: "Sura Game View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/sura-game/sura-game-image-03.webp",
        alt: "Sura Game View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/sura-game/sura-game-image-04.webp",
        alt: "Sura Game View 3",
      },

      {
        type: "image",
        src: "assets/images/portfolio/sura-game/sura-game-image-05.webp",
        alt: "Sura Game View 4",
      },
    ],
  },


  // ==========================================
  // 10. SERANOVA APP
  // ==========================================
  "seranova-app": {
    title: "Seranova App",
    category: "Diseño UX/UI",
    tagClass: "portfolio-card-tag--purple",
    description:
      "Diseño UX/UI de aplicación enfocada en bienestar y nutrición, creando una experiencia digital intuitiva para los usuarios de Seranova LATAM.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/seranova-image.jpg",
        alt: "Proyecto Seranova App",
      },

      {
        type: "image",
        src: "assets/images/portfolio/seranova-app/seranova-app-image-02.webp",
        alt: "Seranova App View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/seranova-app/seranova-app-image-03.webp",
        alt: "Seranova App View 2",
      },

      {
        type: "image",
        src: "assets/images/portfolio/seranova-app/seranova-app-image-04.webp",
        alt: "Seranova App View 3",
      },
    ],
  },


  // ==========================================
  // 11. NUCLO WEALTH
  // ==========================================
  "nuclo-wealth": {
    title: "Nuclo Wealth",
    category: "Diseño UX/UI",
    tagClass: "portfolio-card-tag--purple",
    description:
      "Rediseño de sitio web para firma especializada en administración y crecimiento patrimonial de familias de alto patrimonio, con una experiencia digital clara y sofisticada.",
    year: "2026",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/nuclowealth-image.jpg",
        alt: "Proyecto Nuclo Wealth",
      },
    ],
  },


  // ==========================================
  // 12. DYNAMIC METERS
  // ==========================================
  "dynamic-meters": {
    title: "Dynamic Meters",
    category: "Branding",
    tagClass: "portfolio-card-tag--teal",
    description:
      "Rediseño de identidad visual y logotipo para empresa especializada en el suministro de medidores a grandes cadenas comerciales en México.",
    year: "2025",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/dynamicmeters-image.jpg",
        alt: "Proyecto Dynamic Meters",
      },
    ],
  },


  // ==========================================
  // 13. HIDRANTE
  // ==========================================
  hidrante: {
    title: "Hidrante",
    category: "Modelado 3D",
    tagClass: "portfolio-card-tag--cyan",
    description:
      "Modelado y renderizado 3D de hidrante desarrollado como asset para videojuego.",
    year: "2026",

    media: [
      {
        type: "image",
        src: "assets/images/portfolio/hidrante-image.jpg",
        alt: "Proyecto Hidrante",
      },

      {
        type: "image",
        src: "assets/images/portfolio/hidrante/hidrante-01.jpg",
        alt: "Hidrante View 1",
      },

      {
        type: "image",
        src: "assets/images/portfolio/hidrante/hidrante-02.jpg",
        alt: "Hidrante View 2",
      },
    ],
  },

};

// ==============================
// PORTFOLIO GALLERY
// ==============================
function initPortfolioGallery() {
  const openButtons = document.querySelectorAll(
    ".js-open-project-gallery"
  );

  const modal = document.getElementById("portfolioGalleryModal");
  const overlay = document.getElementById("portfolioGalleryOverlay");
  const closeButton = document.getElementById("portfolioGalleryClose");

  const galleryTag = document.getElementById("portfolioGalleryTag");
  const galleryCounter = document.getElementById(
    "portfolioGalleryCounter"
  );

  const galleryImage = document.getElementById(
    "portfolioGalleryImage"
  );

  const galleryVideo = document.getElementById(
    "portfolioGalleryVideo"
  );

  const prevButton = document.getElementById("portfolioGalleryPrev");
  const nextButton = document.getElementById("portfolioGalleryNext");

  const galleryTitle = document.getElementById(
    "portfolioGalleryTitle"
  );

  const galleryDescription = document.getElementById(
    "portfolioGalleryDescription"
  );

  const galleryYear = document.getElementById(
    "portfolioGalleryYear"
  );

  if (
    !openButtons.length ||
    !modal ||
    !overlay ||
    !closeButton ||
    !galleryTag ||
    !galleryCounter ||
    !galleryImage ||
    !galleryVideo ||
    !prevButton ||
    !nextButton ||
    !galleryTitle ||
    !galleryDescription ||
    !galleryYear
  ) {
    return;
  }

  let currentProject = null;
  let currentMediaIndex = 0;
  let lastFocusedElement = null;

  const updateCounter = () => {
    if (!currentProject) return;

    const current = String(currentMediaIndex + 1).padStart(2, "0");
    const total = String(currentProject.media.length).padStart(2, "0");

    galleryCounter.textContent = `${current} / ${total}`;
  };

  const resetVideo = () => {
    galleryVideo.pause();
    galleryVideo.currentTime = 0;
    galleryVideo.removeAttribute("src");
    galleryVideo.removeAttribute("poster");
    galleryVideo.load();
  };

  const renderMedia = () => {
    if (!currentProject) return;

    const mediaItem = currentProject.media[currentMediaIndex];

    if (!mediaItem) return;

    updateCounter();

    // Primera imagen: ocultar izquierda
    prevButton.hidden = currentMediaIndex === 0;

    // Última imagen: ocultar derecha
    nextButton.hidden =
      currentMediaIndex === currentProject.media.length - 1;

    // ==============================
    // IMAGEN
    // ==============================
    if (mediaItem.type === "image") {
      resetVideo();

      galleryVideo.hidden = true;
      galleryImage.hidden = false;

      galleryImage.classList.add("is-changing");

      window.setTimeout(() => {
        galleryImage.src = mediaItem.src;
        galleryImage.alt =
          mediaItem.alt || currentProject.title;

        galleryImage.onload = () => {
          requestAnimationFrame(() => {
            galleryImage.classList.remove("is-changing");
          });
        };
      }, 180);

      return;
    }

    // ==============================
    // VIDEO
    // ==============================
    if (mediaItem.type === "video") {
      galleryImage.hidden = true;
      galleryVideo.hidden = false;

      galleryVideo.pause();

      galleryVideo.src = mediaItem.src;

      if (mediaItem.poster) {
        galleryVideo.poster = mediaItem.poster;
      } else {
        galleryVideo.removeAttribute("poster");
      }

      galleryVideo.currentTime = 0;

      galleryVideo.load();

      galleryVideo.play().catch(() => {
        // Si el navegador bloquea autoplay,
        // el video simplemente queda disponible.
      });
    }
  };

  const renderProject = (project) => {
    currentProject = project;
    currentMediaIndex = 0;

    galleryTitle.textContent = project.title;
    galleryDescription.textContent = project.description;
    galleryYear.textContent = project.year;
    galleryTag.textContent = project.category;

    galleryTag.className = "portfolio-card-tag";

    if (project.tagClass) {
      galleryTag.classList.add(project.tagClass);
    }

    renderMedia();
  };

  const openGallery = (projectId, triggerElement = null) => {
    const project = portfolioProjects[projectId];

    if (!project) return;

    if (triggerElement) {
      lastFocusedElement = triggerElement;
    }

    renderProject(project);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    window.setTimeout(() => {
      closeButton.focus();
    }, 100);
  };

  const closeGallery = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    resetVideo();

    galleryVideo.hidden = true;
    galleryImage.hidden = false;

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const showPreviousMedia = () => {
    if (!currentProject || currentMediaIndex <= 0) return;

    currentMediaIndex--;

    renderMedia();
  };

  const showNextMedia = () => {
    if (
      !currentProject ||
      currentMediaIndex >= currentProject.media.length - 1
    ) {
      return;
    }

    currentMediaIndex++;

    renderMedia();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest("[data-project-id]");

      if (!card) return;

      const projectId = card.dataset.projectId;

      openGallery(projectId, button);
    });
  });

  closeButton.addEventListener("click", closeGallery);
  overlay.addEventListener("click", closeGallery);

  prevButton.addEventListener("click", showPreviousMedia);
  nextButton.addEventListener("click", showNextMedia);

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showPreviousMedia();
    }

    if (event.key === "ArrowRight") {
      showNextMedia();
    }
  });
}


// ==============================
// INIT GENERAL
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeroAnimation();
  initHomePortfolioReveal();
  initServicesReveal();
  initShowreelModal();
  initPortfolioFilters();
  initPortfolioGallery();
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