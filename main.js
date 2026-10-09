// Fade-up on scroll + TODO counter. No dependencies.
(function () {
  var els = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Every unknown on the site is wrapped in <span class="todo">. Ship at zero.
  var todos = document.querySelectorAll(".todo");
  if (todos.length) {
    console.warn("[portfolio] " + todos.length + " TODO(s) on this page:");
    todos.forEach(function (t) { console.warn("  - " + t.textContent.trim()); });
  } else {
    console.log("[portfolio] 0 TODOs on this page.");
  }
})();
