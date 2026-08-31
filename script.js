/* ============================================
   Engagement Invitation — Interactive Scripts
   ============================================ */

// --- Theme Toggle ---
(function () {
  var toggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var mode = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', mode);
  updateIcon();

  if (toggle) {
    toggle.addEventListener('click', function () {
      mode = mode === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', mode);
      updateIcon();
      toggle.setAttribute('aria-label', 'Switch to ' + (mode === 'dark' ? 'light' : 'dark') + ' mode');
    });
  }

  function updateIcon() {
    if (!toggle) return;
    toggle.innerHTML = mode === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// --- Scroll Reveal Animation ---
// Use CSS class on <html> to enable reveal only when JS is active.
// This way, if JS fails, content is still visible.
(function () {
  var root = document.documentElement;
  root.classList.add('js-ready');

  var sections = document.querySelectorAll('.section, .invitation-card, .detail-card, .closing-card');
  sections.forEach(function (el) { el.classList.add('reveal'); });

  // Fallback: show everything after 3 seconds regardless
  var fallback = setTimeout(function () {
    sections.forEach(function (el) { el.classList.add('visible'); });
  }, 3000);

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(function (el) { observer.observe(el); });
  } else {
    // No IntersectionObserver support — show everything
    sections.forEach(function (el) { el.classList.add('visible'); });
    clearTimeout(fallback);
  }
})();

// --- Smooth scroll for scroll hint ---
(function () {
  var scrollHint = document.querySelector('.scroll-hint');
  if (!scrollHint) return;
  scrollHint.style.cursor = 'pointer';
  scrollHint.addEventListener('click', function () {
    var target = document.getElementById('invitation');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
})();
