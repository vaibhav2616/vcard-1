'use strict';

/**
 * Element toggle helper
 */
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

/**
 * Sidebar toggle functionality for mobile
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

/**
 * Testimonials modal functionality
 */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

if (testimonialsItem.length > 0 && modalContainer && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatarEl = this.querySelector("[data-testimonials-avatar]");
      const titleEl = this.querySelector("[data-testimonials-title]");
      const textEl = this.querySelector("[data-testimonials-text]");

      if (modalImg && avatarEl) {
        modalImg.src = avatarEl.src;
        modalImg.alt = avatarEl.alt;
      }
      if (modalTitle && titleEl) {
        modalTitle.innerHTML = titleEl.innerHTML;
      }
      if (modalText && textEl) {
        modalText.innerHTML = textEl.innerHTML;
      }

      testimonialsModalFunc();
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);
}

/**
 * Filter functionality (Portfolio)
 */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const normalized = selectedValue.trim().toLowerCase();
  for (let i = 0; i < filterItems.length; i++) {
    const itemCat = (filterItems[i].dataset.category || "").toLowerCase();
    if (normalized === "all") {
      filterItems[i].classList.add("active");
    } else if (normalized === itemCat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = selectedValue;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText;
    if (selectValue) selectValue.innerText = selectedValue;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

/**
 * Project Details Modal Data & Handlers
 */
const projectDetailsData = {
  "sre-triage": {
    title: "AI-Driven SRE & Automated Triage System",
    category: "AI & Automation",
    date: "Aug 2026 — Sept 2026",
    tags: ["Python", "CrewAI", "Kafka", "Jira MCP", "Docker"],
    bullets: [
      "Built an autonomous Site Reliability Engineering (SRE) pipeline that consumes streaming error logs and telemetry from the payment processing engine via Kafka.",
      "Deployed multi-agent AI workflows using CrewAI to analyze unstructured system logs, identify anomalous transaction drop-offs, and categorize failure severities.",
      "Integrated the Model Context Protocol (MCP) to automatically generate, assign, and track detailed Jira bug tickets, eliminating manual developer triage."
    ]
  },
  "payment-engine": {
    title: "Distributed Payment Processing Engine",
    category: "Backend & Distributed",
    date: "Jun 2026 — Aug 2026",
    tags: ["Django", "PostgreSQL", "Kafka", "FastAPI"],
    bullets: [
      "Developed a secure payment processing microservice utilizing Django's ORM for ACID-compliant transaction state management and data integrity.",
      "Integrated the system with the central Kafka event bus to broadcast structured transaction telemetry, latency metrics, and failure logs in real-time.",
      "Isolated heavy, synchronous financial logic within Django while offloading I/O-bound webhooks and client polling to the FastAPI gateway network."
    ]
  },
  "infra-chassis": {
    title: "Enterprise Microservice Infra Chassis",
    category: "Backend & Distributed",
    date: "May 2026 — Jun 2026",
    tags: ["FastAPI", "SQLAlchemy", "Redis", "Kafka", "Docker", "Transactional Outbox"],
    bullets: [
      "Engineered a modular backend service chassis adhering to Clean Architecture and strict System Design norms, serving as a production-ready template for scalable microservices.",
      "Implemented an atomic Transactional Outbox pattern with a background relay worker to eliminate the dual-write problem and guarantee at-least-once Kafka event delivery.",
      "Built high-concurrency safety and enterprise telemetry via Redis-backed distributed idempotency locking, RFC 7807 error handling, and structured JSON logging with correlation IDs."
    ]
  },
  "log-analyzer": {
    title: "AI Log Analyzer & Jira Automation System",
    category: "AI & Automation",
    date: "Jul 2026 — Aug 2026",
    tags: ["Python", "Celery", "CrewAI", "MCP", "Docker", "Elasticsearch"],
    bullets: [
      "Architected an asynchronous AI log parsing pipeline using FastAPI, Celery, and CrewAI, decoupling high-volume log ingestion from heavy LLM processing to eliminate API timeouts.",
      "Integrated Elasticsearch for unstructured log search and automated Jira issue creation via Model Context Protocol (MCP), eliminating manual bug triage.",
      "Secured M2M webhooks with HMAC and containerized microservices via Docker, enabling independent resource scaling for web nodes and background LLM workers."
    ]
  },
  "pizza-api": {
    title: "Pizza Delivery Production RESTful API",
    category: "Backend & Distributed",
    date: "Sep 2025 — Oct 2025",
    tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "JWT", "Docker", "Pytest"],
    bullets: [
      "Developed a production-ready RESTful API supporting user roles, secure JWT authentication, and order/delivery tracking workflows.",
      "Optimized PostgreSQL + SQLAlchemy queries, achieving 100ms latency under 100+ concurrent users in stress tests.",
      "Containerized with Docker, cutting deployment setup time by 70%, and validated endpoints with Swagger + Pytest (98% coverage)."
    ]
  },
  "replymate": {
    title: "ReplyMate – AI Chatbot Automation",
    category: "AI & Automation",
    date: "Aug 2025",
    tags: ["Python", "OCR", "NLP", "Gemini API"],
    bullets: [
      "Developed AI assistant combining OCR + NLP + Gemini API, reducing manual chat effort by 40% with sub-200ms response latency.",
      "Built a personalization engine adapting replies from JSON profiles, improving relevance by 25% and boosting engagement by 15%.",
      "Implemented hotkey-triggered automation workflows, cutting average response time by 30% in early testing."
    ]
  },
  "insurance-ml": {
    title: "Insurance Premium Prediction Pipeline",
    category: "Data & Analytics",
    date: "Aug 2025 — Sep 2025",
    tags: ["Python", "ML Regression", "FastAPI", "Streamlit", "Docker"],
    bullets: [
      "Built an ML pipeline predicting insurance premiums with R² = 0.87, improving accuracy by 22% over baseline.",
      "Deployed via FastAPI + Docker, handling 1,000+ requests with 30% lower latency using async optimizations.",
      "Created an interactive Streamlit dashboard tested by 10+ users, achieving real-time input, visualization, and sub-150ms predictions."
    ]
  },
  "hotel-cancellation": {
    title: "Hotel Booking Cancellation Analysis",
    category: "Data & Analytics",
    date: "Jun 2026 — Jul 2026",
    tags: ["Python", "Power BI", "SQL", "EDA"],
    bullets: [
      "Engineered an interactive Power BI dashboard analyzing historical booking records to identify primary drivers of revenue leakage and booking abandonment.",
      "Synthesized multi-variable trends—including lead time, deposit types, and seasonality—revealing correlation between specific booking windows and cancellation rates.",
      "Formulated data-driven pricing and overbooking strategies, projecting measurable reduction in revenue loss."
    ]
  },
  "heart-analytics": {
    title: "Heart Disease Diagnostic Analytics",
    category: "Data & Analytics",
    date: "Mar 2026 — Apr 2026",
    tags: ["Python", "Tableau", "Pandas", "Healthcare Analytics"],
    bullets: [
      "Processed and normalized clinical diagnostic data across patient records to visualize high-risk physiological indicators.",
      "Built a comprehensive Tableau diagnostic dashboard correlating age, cholesterol levels, and maximum heart rates with cardiovascular disease probability.",
      "Isolated high-risk demographic cohorts, providing an exploratory data tool for medical professionals to accelerate initial risk assessment and triage."
    ]
  },
  "saarthi-patent": {
    title: "Saarthi – AR/VR Cultural Platform (Patent Filed)",
    category: "Patents & Research",
    date: "Dec 2024",
    tags: ["Patent Filed", "AR/VR", "Innotech 2024", "Team Lead"],
    bullets: [
      "Collaborated and led a 4-member team to design and develop an AR/VR-based cultural heritage platform.",
      "Showcased the project at Innotech 2024, competing alongside projects from multiple colleges and institutions.",
      "Successfully filed an intellectual property patent for the interactive AR/VR artifact preservation system."
    ]
  }
};

const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalDismissBtn = document.querySelector("[data-project-modal-dismiss]");

const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDate = document.querySelector("[data-project-modal-date]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalTags = document.querySelector("[data-project-modal-tags]");
const projectModalBullets = document.querySelector("[data-project-modal-bullets]");

const closeProjectModal = function () {
  if (projectModalContainer && projectOverlay) {
    projectModalContainer.classList.remove("active");
    projectOverlay.classList.remove("active");
  }
};

if (projectModalCloseBtn) projectModalCloseBtn.addEventListener("click", closeProjectModal);
if (projectOverlay) projectOverlay.addEventListener("click", closeProjectModal);
if (projectModalDismissBtn) projectModalDismissBtn.addEventListener("click", closeProjectModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeProjectModal();
    if (modalContainer && modalContainer.classList.contains("active")) {
      testimonialsModalFunc();
    }
  }
});

// Bind click to each project item
const projectCards = document.querySelectorAll(".project-item[data-project-id]");
projectCards.forEach(function (card) {
  card.addEventListener("click", function (e) {
    e.preventDefault();
    const projectId = this.dataset.projectId;
    const data = projectDetailsData[projectId];
    if (!data) return;

    if (projectModalTitle) projectModalTitle.innerText = data.title;
    if (projectModalCategory) projectModalCategory.innerText = data.category;
    if (projectModalDate) projectModalDate.innerText = data.date;

    if (projectModalTags) {
      projectModalTags.innerHTML = data.tags.map(function (t) {
        return `<span>${t}</span>`;
      }).join("");
    }

    if (projectModalBullets) {
      projectModalBullets.innerHTML = data.bullets.map(function (b) {
        return `<li>${b}</li>`;
      }).join("");
    }

    if (projectModalContainer && projectOverlay) {
      projectModalContainer.classList.add("active");
      projectOverlay.classList.add("active");
    }
  });
});

/**
 * Contact Form Validation & Toast Notification
 */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const toastNotification = document.getElementById("toast-notification");

for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form && form.checkValidity()) {
      if (formBtn) formBtn.removeAttribute("disabled");
    } else {
      if (formBtn) formBtn.setAttribute("disabled", "");
    }
  });
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (toastNotification) {
      toastNotification.classList.add("show");
      setTimeout(function () {
        toastNotification.classList.remove("show");
      }, 4500);
    }
    form.reset();
    if (formBtn) formBtn.setAttribute("disabled", "");
  });
}

/**
 * Page Navigation functionality & Skill Bar Animation Trigger
 */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const triggerSkillBars = function () {
  const skillFills = document.querySelectorAll(".skill-progress-fill");
  skillFills.forEach(function (fill) {
    const parent = fill.closest(".skills-item");
    const val = parent ? parent.querySelector("data") : null;
    if (val && val.value) {
      fill.style.width = "0%";
      setTimeout(function () {
        fill.style.width = val.value + "%";
      }, 150);
    }
  });
};

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase().trim();

    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        if (targetPage === "resume") {
          triggerSkillBars();
        }
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

/**
 * Dynamic Typing Title in Sidebar
 */
const dynamicTitleEl = document.getElementById("dynamic-title");
if (dynamicTitleEl) {
  const titles = [
    "Backend Systems Engineer",
    "Distributed Systems & SRE",
    "Autonomous AI & CrewAI Workflows",
    "GATE 2026 CS Scholar"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseBetween = 2000;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      charIndex--;
      dynamicTitleEl.textContent = currentTitle.substring(0, charIndex);
    } else {
      charIndex++;
      dynamicTitleEl.textContent = currentTitle.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentTitle.length) {
      delay = pauseBetween;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = 500;
    }

    setTimeout(typeEffect, delay);
  }

  setTimeout(typeEffect, 600);
}

/**
 * -------------------------------------------------------------
 * FALLING LEAVES SIMULATION (GPU-ACCELERATED HTML5 CANVAS)
 * -------------------------------------------------------------
 */
const leavesCanvas = document.getElementById("leaves-canvas");
const leavesToggleBtn = document.getElementById("leaves-toggle");
const leavesStatusText = document.getElementById("leaves-status-text");

if (leavesCanvas) {
  const ctx = leavesCanvas.getContext("2d");
  let width = (leavesCanvas.width = window.innerWidth);
  let height = (leavesCanvas.height = window.innerHeight);

  let isLeavesActive = true;
  let animationFrameId = null;

  // Track mouse coordinates for gentle wind breeze effect
  let mouse = { x: -1000, y: -1000, vx: 0, vy: 0 };
  let lastMouse = { x: 0, y: 0 };

  window.addEventListener("mousemove", function (e) {
    mouse.vx = e.clientX - lastMouse.x;
    mouse.vy = e.clientY - lastMouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener("resize", function () {
    width = leavesCanvas.width = window.innerWidth;
    height = leavesCanvas.height = window.innerHeight;
  });

  // Autumn & Golden Color Palette
  const leafColorPalettes = [
    { base: "rgba(226, 168, 67, ", stroke: "rgba(180, 120, 30, " }, // Amber Gold
    { base: "rgba(245, 192, 86, ", stroke: "rgba(200, 145, 45, " }, // Sunlit Yellow
    { base: "rgba(208, 98, 42, ", stroke: "rgba(160, 60, 20, " },  // Russet Bronze
    { base: "rgba(185, 60, 35, ", stroke: "rgba(135, 35, 15, " },  // Crimson Maple
    { base: "rgba(168, 142, 54, ", stroke: "rgba(125, 105, 30, " } // Golden Olive
  ];

  class Leaf {
    constructor(isInit = false) {
      this.reset(isInit);
    }

    reset(isInit = false) {
      this.x = Math.random() * width;
      this.y = isInit ? Math.random() * height : -30 - Math.random() * 50;
      this.size = 12 + Math.random() * 16;
      this.speedY = 0.8 + Math.random() * 1.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.035;
      this.oscillationSpeed = 0.015 + Math.random() * 0.025;
      this.oscillationDistance = 20 + Math.random() * 40;
      this.oscillationOffset = Math.random() * Math.PI * 2;
      this.tilt = Math.random() * Math.PI * 2;
      this.tiltSpeed = 0.03 + Math.random() * 0.04;
      this.palette = leafColorPalettes[Math.floor(Math.random() * leafColorPalettes.length)];
      this.opacity = 0.65 + Math.random() * 0.3;
      this.type = Math.floor(Math.random() * 3); // 0: Maple, 1: Birch/Oval, 2: Willow
    }

    update(time) {
      // Natural horizontal sway
      const sway = Math.sin(time * this.oscillationSpeed + this.oscillationOffset) * 0.8;
      this.x += this.speedX + sway;
      this.y += this.speedY;

      this.rotation += this.rotationSpeed;
      this.tilt += this.tiltSpeed;

      // Mouse proximity interaction: gently push leaf away
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && dist > 0) {
        const force = (100 - dist) / 100;
        this.x += (dx / dist) * force * 4;
        this.y += (dy / dist) * force * 2;
      }

      // Recycle leaf if out of viewport
      if (this.y > height + 40 || this.x < -60 || this.x > width + 60) {
        this.reset(false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      // 3D tumble flip effect
      ctx.scale(Math.cos(this.tilt), 1);

      ctx.fillStyle = this.palette.base + this.opacity + ")";
      ctx.strokeStyle = this.palette.stroke + (this.opacity * 0.8) + ")";
      ctx.lineWidth = 1;

      const s = this.size;

      ctx.beginPath();
      if (this.type === 0) {
        // Realistic 3-lobed Maple Leaf
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.35, -s * 0.7, s * 0.9, -s * 0.5, s * 0.7, -s * 0.1);
        ctx.bezierCurveTo(s * 0.95, 0.1 * s, s * 0.8, 0.5 * s, s * 0.4, 0.6 * s);
        ctx.bezierCurveTo(s * 0.2, 0.75 * s, 0.1 * s, s * 0.95, 0, s);
        ctx.bezierCurveTo(-0.1 * s, s * 0.95, -s * 0.2, 0.75 * s, -s * 0.4, 0.6 * s);
        ctx.bezierCurveTo(-s * 0.8, 0.5 * s, -s * 0.95, 0.1 * s, -s * 0.7, -s * 0.1);
        ctx.bezierCurveTo(-s * 0.9, -s * 0.5, -s * 0.35, -s * 0.7, 0, -s);
      } else if (this.type === 1) {
        // Elegant Birch / Oak Oval Leaf
        ctx.moveTo(0, -s);
        ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 0.7, s * 0.3, 0, s);
        ctx.bezierCurveTo(-s * 0.7, s * 0.3, -s * 0.6, -s * 0.6, 0, -s);
      } else {
        // Graceful slender Willow Leaf
        ctx.moveTo(0, -s * 1.2);
        ctx.bezierCurveTo(s * 0.35, -s * 0.4, s * 0.35, s * 0.4, 0, s * 1.2);
        ctx.bezierCurveTo(-s * 0.35, s * 0.4, -s * 0.35, -s * 0.4, 0, -s * 1.2);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Leaf central vein
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85);
      ctx.lineTo(0, s * 0.85);
      ctx.strokeStyle = this.palette.stroke + (this.opacity * 0.9) + ")";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Create leaf particles (desktop: 32, mobile: 16)
  const leafCount = window.innerWidth > 768 ? 32 : 16;
  const leaves = [];
  for (let i = 0; i < leafCount; i++) {
    leaves.push(new Leaf(true));
  }

  let startTime = performance.now();

  function animateLeaves(timestamp) {
    if (!isLeavesActive) return;

    ctx.clearRect(0, 0, width, height);
    const elapsed = (timestamp - startTime) * 0.05;

    for (let i = 0; i < leaves.length; i++) {
      leaves[i].update(elapsed);
      leaves[i].draw(ctx);
    }

    animationFrameId = requestAnimationFrame(animateLeaves);
  }

  animationFrameId = requestAnimationFrame(animateLeaves);

  // Toggle button functionality
  if (leavesToggleBtn) {
    leavesToggleBtn.addEventListener("click", function () {
      isLeavesActive = !isLeavesActive;
      if (isLeavesActive) {
        if (leavesStatusText) leavesStatusText.textContent = "ON";
        startTime = performance.now();
        animationFrameId = requestAnimationFrame(animateLeaves);
      } else {
        if (leavesStatusText) leavesStatusText.textContent = "OFF";
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        ctx.clearRect(0, 0, width, height);
      }
    });
  }
}
