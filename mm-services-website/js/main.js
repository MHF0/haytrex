/* MM Services LLC — site behavior */
(function () {
  "use strict";

  var noAnim = /noanim/.test(window.location.search);
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || noAnim;
  if (noAnim) {
    var kill = document.createElement("style");
    kill.textContent = "*,*::before,*::after{animation:none !important;transition:none !important}";
    document.head.appendChild(kill);
  }

  /* ----- mobile navigation ----- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ----- header shadow on scroll ----- */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });
  }

  /* ----- before / after comparison sliders ----- */
  document.querySelectorAll("[data-ba]").forEach(function (widget) {
    var range = widget.querySelector(".ba-range");
    if (!range) return;
    var update = function () { widget.style.setProperty("--pos", range.value + "%"); };
    range.addEventListener("input", update);
    update();
  });

  /* ----- animated counters ----- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ----- scroll reveal with stagger + counter trigger ----- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .service-card, .ba-figure, .career-card, .apply-card, .contact-card, .contact-block, .band-item, .service-row, .perks-chips, .cta-band h2, .cta-band p, .cta-band .hero-ctas, .reviews-wrap, .reviews-summary, .gallery-note, .map-embed"
  );
  if ("IntersectionObserver" in window && !reduceMotion) {
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("section-head")) el.classList.add("reveal");
    });
    var siblingIndex = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var parentKey = el.parentNode ? Array.prototype.indexOf.call(document.querySelectorAll("*"), el.parentNode) : 0;
        siblingIndex[parentKey] = (siblingIndex[parentKey] || 0);
        el.style.transitionDelay = Math.min(siblingIndex[parentKey] * 90, 450) + "ms";
        siblingIndex[parentKey]++;
        setTimeout(function () { siblingIndex[parentKey] = 0; }, 700);
        el.classList.add("is-visible");
        el.querySelectorAll("[data-count]").forEach(animateCounter);
        observer.unobserve(el);
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { observer.observe(el); });
    /* safety net: never leave content hidden if observation stalls */
    setTimeout(function () {
      revealTargets.forEach(function (el) {
        if (!el.classList.contains("is-visible")) {
          el.classList.add("is-visible");
          el.querySelectorAll("[data-count]").forEach(animateCounter);
        }
      });
    }, 3000);
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
      el.querySelectorAll("[data-count]").forEach(animateCounter);
    });
  }

  /* ----- reviews carousel (auto-rotating) ----- */
  var carousel = document.querySelector("[data-carousel]");
  if (carousel) {
    var track = carousel.querySelector(".reviews-track");
    var cards = track.children;
    var dotsWrap = carousel.querySelector(".reviews-dots");
    var prevBtn = carousel.querySelector("[data-prev]");
    var nextBtn = carousel.querySelector("[data-next]");
    var index = 0, timer = null;

    function perView() {
      var w = window.innerWidth;
      return w <= 720 ? 1 : w <= 980 ? 2 : 3;
    }
    function pages() { return Math.max(1, cards.length - perView() + 1); }
    function go(i) {
      index = (i + pages()) % pages();
      var card = cards[0];
      var gap = parseFloat(getComputedStyle(track).gap) || 26;
      var offset = index * (card.getBoundingClientRect().width + gap);
      track.style.transform = "translateX(" + (-offset) + "px)";
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (d, di) {
          d.classList.toggle("active", di === index);
        });
      }
    }
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i < pages(); i++) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Go to review " + (i + 1));
        (function (i2) { b.addEventListener("click", function () { go(i2); restart(); }); })(i);
        dotsWrap.appendChild(b);
      }
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(index + 1); }, 4200);
    }
    if (prevBtn) prevBtn.addEventListener("click", function () { go(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(index + 1); restart(); });
    carousel.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
    carousel.addEventListener("mouseleave", restart);
    window.addEventListener("resize", function () { buildDots(); go(index); });
    buildDots();
    go(0);
    restart();
  }

  /* ----- service pre-select: ?service= query or data-service links ----- */
  var serviceSelect = document.getElementById("service-select");
  if (serviceSelect) {
    var q = new URLSearchParams(window.location.search).get("service");
    if (q) {
      Array.prototype.forEach.call(serviceSelect.options, function (opt) {
        if (opt.text.toLowerCase() === q.toLowerCase()) serviceSelect.value = opt.value || opt.text;
      });
    }
  }

  /* ----- forms: compose an email with the entered details -----
     To switch to a form service later (Formspree, Netlify, etc.),
     replace buildMailto() with a fetch() to your endpoint. */
  function hookForm(formId, subjectPrefix, intro) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var subject = subjectPrefix;
      var pick = data.get("position") || data.get("service");
      if (pick) subject += " — " + pick;
      var lines = [intro, ""];
      data.forEach(function (value, key) {
        if (String(value).trim() === "") return;
        var label = key.charAt(0).toUpperCase() + key.slice(1);
        lines.push(label + ": " + value);
      });
      lines.push("", "Sent from mmsvcs.com");
      window.location.href = "mailto:info@mmsvcs.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Your email app should open with everything filled in. " +
          "If it doesn't, email us directly at info@mmsvcs.com.";
      }
    });
  }
  hookForm("contact-form", "Quote request", "New quote request from the website:");
  hookForm("apply-form", "Job application", "New job application from the website:");

  /* ----- footer year ----- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
