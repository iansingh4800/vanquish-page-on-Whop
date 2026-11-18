// Get Funded upsell page: copy-code buttons + sticky CTA.
(function () {
  "use strict";

  var CODE_RESET_MS = 2200;

  // Clipboard can be blocked inside the Whop iframe, so fall back to execCommand.
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text);
      });
    }
    return legacyCopy(text);
  }

  function legacyCopy(text) {
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var label = btn.querySelector("[data-copy-label]");
    var original = label ? label.textContent : "";
    var timer;

    btn.addEventListener("click", function () {
      copyText(btn.getAttribute("data-copy"))
        .then(function () { if (label) label.textContent = "copied ✓"; })
        .catch(function () { if (label) label.textContent = "code: NOUR"; })
        .finally(function () {
          btn.classList.add("is-copied");
          clearTimeout(timer);
          timer = setTimeout(function () {
            btn.classList.remove("is-copied");
            if (label) label.textContent = original;
          }, CODE_RESET_MS);
        });
    });
  });

  // Payout wall: reveal the rest of the cards.
  var more = document.querySelector("[data-show-more]");
  if (more) {
    more.addEventListener("click", function () {
      document.querySelectorAll("[data-extra]").forEach(function (el) { el.hidden = false; });
      more.remove();
    });
  }

  // Payout wall: full-size viewer.
  var dialog = document.querySelector("[data-lightbox-dialog]");
  var dialogImg = dialog && dialog.querySelector("[data-lightbox-img]");
  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-lightbox");
      var img = btn.querySelector("img");
      if (!dialog || typeof dialog.showModal !== "function") {
        window.open(src, "_blank", "noopener");
        return;
      }
      dialogImg.src = src;
      dialogImg.alt = img ? img.alt : "";
      dialog.showModal();
    });
  });
  if (dialog) {
    dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  // Show the sticky bar once the hero's code box has scrolled away.
  var sticky = document.querySelector("[data-sticky]");
  var heroBox = document.querySelector(".price-box");
  if (sticky && heroBox && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle("is-visible", !entries[0].isIntersecting);
    }).observe(heroBox);
  } else if (sticky) {
    sticky.classList.add("is-visible");
  }
})();
