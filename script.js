const loader = document.createElement("div");
loader.className = "site-loader";
loader.setAttribute("aria-hidden", "true");
loader.innerHTML = `
  <div class="site-loader-shell">
    <div class="site-loader-mark">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12.2a3.6 3.6 0 1 1-2-3.2V6.2l8-1.7v7.4a3.6 3.6 0 1 1-2-3.2V6.9L12 7.8V3Z" fill="currentColor"/></svg>
    </div>
    <div class="site-loader-copy">
      <strong>SurSadhana Music Studio</strong>
      <span>Voice. Craft. Confidence.</span>
    </div>
    <div class="site-loader-line"></div>
  </div>
`;

document.body.prepend(loader);
document.body.classList.add("loader-active");

const loaderStart = Date.now();
const hideLoader = () => {
  const elapsed = Date.now() - loaderStart;
  const delay = Math.max(0, 650 - elapsed);

  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    document.body.classList.remove("loader-active");
    window.setTimeout(() => loader.remove(), 360);
  }, delay);
};

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader, { once: true });
}

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const yearTarget = document.querySelector("[data-year]");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 960 || !navLinks.classList.contains("is-open")) {
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (!navLinks.contains(target) && !navToggle.contains(target)) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });
}

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const currentPath = window.location.pathname.split("/").pop() || "index.html";
const footerLinkGroups = document.querySelectorAll(".footer-links");

footerLinkGroups.forEach((group) => {
  const links = Array.from(group.querySelectorAll("a"));
  const matchedLink = links.find((link) => link.getAttribute("href") === currentPath);

  if (matchedLink) {
    matchedLink.classList.add("is-current");
    return;
  }

  const navCurrentLink = document.querySelector(`.nav-links a[href="${currentPath}"]`);

  if (navCurrentLink) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = currentPath;
    link.textContent = navCurrentLink.textContent;
    link.className = "is-current";
    item.appendChild(link);
    group.prepend(item);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

const enquiryForm = document.querySelector("[data-enquiry-form]");

if (enquiryForm) {
  const successMessage = enquiryForm.querySelector("[data-form-success]");

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    enquiryForm.reset();

    if (successMessage) {
      successMessage.hidden = false;
    }
  });
}
