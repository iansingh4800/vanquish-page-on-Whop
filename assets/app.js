// Click Here To Get Funded: video, copy-code buttons, payout viewer, sticky CTA.
(function () {
  "use strict";

  var CODE_RESET_MS = 2200;

  // ---- YouTube: load the player only when someone presses play ----
  document.querySelectorAll("[data-video]").forEach(function (box) {
    var btn = box.querySelector(".video__play");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var id = box.getAttribute("data-video");
      var start = box.getAttribute("data-start") || "0";
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&start=" + start + "&rel=0&playsinline=1&modestbranding=1";
      iframe.title = "Vanquish Trader Just Changed Funded Options Forever";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      box.replaceChild(iframe, btn);
    });
  });

  // ---- Copy code (clipboard can be blocked inside the Whop iframe) ----
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
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    }
    return legacyCopy(text);
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    var label = btn.querySelector("[data-copy-label]");
    var original = label ? label.textContent : "";
    var timer;
    btn.addEventListener("click", function () {
      copyText(btn.getAttribute("data-copy"))
        .then(function () { if (label) label.textContent = "copied ✓"; })
        .catch(function () { if (label) label.textContent = "type NOUR"; })
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

  // ---- Payout card viewer ----
  var dialog = document.querySelector("[data-lightbox-dialog]");
  var dialogImg = dialog && dialog.querySelector("[data-lightbox-img]");
  document.querySelectorAll("[data-lightbox]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.getAttribute("data-lightbox");
      if (!dialog || typeof dialog.showModal !== "function") {
        window.open(src, "_blank", "noopener");
        return;
      }
      dialogImg.src = src;
      dialogImg.alt = btn.getAttribute("data-alt") || "";
      dialog.showModal();
    });
  });
  if (dialog) {
    dialog.querySelector("[data-lightbox-close]").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  // ---- Sticky bar: show once the hero buttons are off screen ----
  var sticky = document.querySelector("[data-sticky]");
  var heroCta = document.querySelector(".hero__cta");
  if (sticky && heroCta && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle("is-visible", !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0);
    }).observe(heroCta);
  } else if (sticky) {
    sticky.classList.add("is-visible");
  }
})();
