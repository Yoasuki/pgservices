// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal animation
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Count-up for "Topo em números"
function animateCount(el, to, { prefix = "", suffix = "", duration = 950 } = {}) {
  const start = 0;
  const t0 = performance.now();

  function tick(now) {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const value = Math.round(start + (to - start) * eased);
    el.textContent = `${prefix}${value}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const statValues = document.querySelectorAll(".stat__value");
const statsIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;

    const el = e.target;
    const to = Number(el.dataset.count || "0");
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";

    animateCount(el, to, { prefix, suffix, duration: 950 });
    statsIO.unobserve(el);
  }
}, { threshold: 0.35 });

statValues.forEach(el => statsIO.observe(el));