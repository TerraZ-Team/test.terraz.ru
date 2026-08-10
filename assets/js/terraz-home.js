(function () {
  "use strict";

  var button = document.querySelector("[data-copy-server]");
  var address = document.querySelector("[data-server-address]");
  var label = document.querySelector("[data-copy-label]");
  var status = document.querySelector("[data-copy-status]");
  var video = document.querySelector(".portal-hero__video");
  var resetTimer = null;

  if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.pause();
    video.removeAttribute("autoplay");
  }

  if (!button || !address) {
    return;
  }

  function fallbackCopy(value) {
    var textarea = document.createElement("textarea");
    var copied = false;

    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(textarea);
    return copied;
  }

  function showCopied() {
    window.clearTimeout(resetTimer);
    button.classList.add("is-copied");

    if (label) {
      label.textContent = "Скопировано";
    }
    if (status) {
      status.textContent = "Адрес сервера скопирован";
    }

    resetTimer = window.setTimeout(function () {
      button.classList.remove("is-copied");
      if (label) {
        label.textContent = "Копировать";
      }
      if (status) {
        status.textContent = "";
      }
    }, 1800);
  }

  function copyAddress() {
    var value = address.textContent.trim();

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(showCopied).catch(function () {
        if (fallbackCopy(value)) {
          showCopied();
        }
      });
      return;
    }

    if (fallbackCopy(value)) {
      showCopied();
    }
  }

  button.addEventListener("click", copyAddress);
}());
