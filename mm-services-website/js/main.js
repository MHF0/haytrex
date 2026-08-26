/* MM Services LLC — site behavior */
(function () {
  "use strict";

  /* ----- mobile navigation ----- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    siteNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- before / after comparison sliders ----- */
  document.querySelectorAll("[data-ba]").forEach(function (widget) {
    var range = widget.querySelector(".ba-range");
    if (!range) return;
    var update = function () {
      widget.style.setProperty("--pos", range.value + "%");
    };
    range.addEventListener("input", update);
    update();
  });

  /* ----- preselect service when a service link is clicked ----- */
  var serviceSelect = document.getElementById("service-select");
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!serviceSelect) return;
      var wanted = link.getAttribute("data-service");
      Array.prototype.forEach.call(serviceSelect.options, function (opt) {
        if (opt.text === wanted) serviceSelect.value = opt.value || opt.text;
      });
    });
  });

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
      var href = "mailto:info@mmsvcs.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      window.location.href = href;
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Your email app should open with everything filled in. " +
          "If it doesn't, email us directly at info@mmsvcs.com.";
      }
    });
  }
  hookForm("contact-form", "Quote request", "New quote request from the website:");
  hookForm("apply-form", "Job application", "New job application from the website:");

  /* ----- scroll reveal ----- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll(
      ".service-card, .ba-figure, .team-card, .career-card, .apply-card, .contact-card, .contact-block, .band-item"
    );
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ----- footer year ----- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
