(() => {
  const hero = document.querySelector(".jdc-hero");
  const bg = document.querySelector(".jdc-hero__bg");
  if (!hero || !bg) return;

  const SPEED = 1; // 0.15 slow, 0.35 zyada movement

  let ticking = false;

  function updateParallax() {
    ticking = false;

    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // hero view me hai?
    if (rect.bottom < 0 || rect.top > vh) return;

    // progress: 0 (enter) -> 1 (leave)
    const progress = (vh - rect.top) / (vh + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));

    // move amount (px)
    const move = (clamped - 0.5) * rect.height * SPEED;

    bg.style.transform = `translate3d(0, ${move}px, 0) scale(1.08)`;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  // accessibility: reduced motion
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }


// =========================
  // 2) COUNTERS SETUP
  // =========================
  const counterEls = document.querySelectorAll(".jdc-counter");
  let countersStarted = false;

  function animateOneCounter(el) {
    const target = Number(el.dataset.target || "0");
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const val = Math.floor(p * target);
      el.textContent = String(val);

      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    }

    requestAnimationFrame(step);
  }

  function updateCounters() {
    if (!counterEls.length || countersStarted) return;

    // first counter element view check
    const firstTop = counterEls[0].getBoundingClientRect().top;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    if (firstTop < vh * 0.8) {
      countersStarted = true;
      counterEls.forEach(animateOneCounter);
    }
  }

  // =========================
  // =========================
// 3) SINGLE RAF SCROLL LOOP
// =========================
let isFrameQueued = false;

function tick() {
  isFrameQueued = false;
  if (reduceMotion) return;

  updateParallax();
  updateCounters();
}

function onScrollOrResize() {
  if (!isFrameQueued) {
    isFrameQueued = true;
    requestAnimationFrame(tick);
  }
}

window.addEventListener("scroll", onScrollOrResize, { passive: true });
window.addEventListener("resize", onScrollOrResize);

// initial run
onScrollOrResize();

//line-scrooll 

  
})();