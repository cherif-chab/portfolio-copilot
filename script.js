// =====================
// 1) MENU HAMBURGER
// =====================
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function toggleMenu() {
  if (!navMenu) return;

  const isOpen = navMenu.style.display === "block" || navMenu.style.display === "flex";
  navMenu.style.display = isOpen ? "none" : "block";

  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", (!isOpen).toString());
  }
}

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

// =====================
// 2) SCROLL FLUIDE
// =====================
const navLinks = document.querySelectorAll('#navMenu a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    // referme le menu après clic (utile mobile)
    if (window.innerWidth < 768 && navMenu) {
      navMenu.style.display = "none";
    }
  });
});

// =====================
// 3) FILTRAGE PROJETS
// =====================
const filterButtons = document.querySelectorAll(".filterBtn");
const projects = document.querySelectorAll(".project");

function filterProjects(category) {
  projects.forEach((project) => {
    const projectCat = project.getAttribute("data-category");

    if (category === "all" || projectCat === category) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-filter");
    filterProjects(category);
  });
});

// =====================
// 4) LIGHTBOX (IMAGE MODALE)
// =====================
const projectImgs = document.querySelectorAll(".projectImg");

// overlay
const overlay = document.createElement("div");
overlay.style.display = "none";
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "rgba(0,0,0,0.7)";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";
overlay.style.zIndex = "9999";

const overlayImg = document.createElement("img");
overlayImg.style.maxWidth = "90%";
overlayImg.style.maxHeight = "90%";
overlayImg.style.borderRadius = "8px";
overlayImg.style.background = "#fff";

overlay.appendChild(overlayImg);
document.body.appendChild(overlay);

function openLightbox(src, alt) {
  overlayImg.src = src;
  overlayImg.alt = alt || "Image projet";
  overlay.style.display = "flex";
}

function closeLightbox() {
  overlay.style.display = "none";
  overlayImg.src = "";
}

projectImgs.forEach((img) => {
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    openLightbox(img.src, img.alt);
  });
});

overlay.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// =====================
// 5) VALIDATION FORMULAIRE
// =====================
const contactForm = document.getElementById("contactForm");
const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMsg = document.getElementById("formMsg");

function showMessage(text, ok) {
  if (!formMsg) return;
  formMsg.textContent = text;
  formMsg.style.marginTop = "10px";
  formMsg.style.fontWeight = "bold";
  formMsg.style.color = ok ? "green" : "red";
}

function isEmailValid(email) {
  return email.includes("@") && email.includes(".");
}

// feedback en direct
function validateLive() {
  const nom = nomInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (nom === "") return showMessage(" Le nom est requis.", false);
  if (email === "" || !isEmailValid(email)) return showMessage(" Email invalide.", false);
  if (message.length < 5) return showMessage(" Message trop court (min 5 caractères).", false);

  showMessage(" Tout est bon !", true);
}

[nomInput, emailInput, messageInput].forEach((field) => {
  if (field) field.addEventListener("input", validateLive);
});

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nom = nomInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (nom === "" || email === "" || message === "") {
      return showMessage("Remplis tous les champs.", false);
    }

    if (!isEmailValid(email)) {
      return showMessage(" Email invalide.", false);
    }

    if (message.length < 5) {
      return showMessage(" Message trop court.", false);
    }

    showMessage(" Message envoyé ! (simulation)", true);
    contactForm.reset();
  });
}
