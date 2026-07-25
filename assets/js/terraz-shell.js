(function () {
  "use strict";

  var menus = Array.prototype.slice.call(document.querySelectorAll("[data-site-menu]"));

  if (!menus.length) {
    return;
  }

  function closeMenus(except) {
    menus.forEach(function (menu) {
      if (menu !== except) {
        menu.removeAttribute("open");
      }
    });
  }

  menus.forEach(function (menu) {
    menu.addEventListener("toggle", function () {
      if (menu.open) {
        closeMenus(menu);
      }
    });
  });

  document.addEventListener("click", function (event) {
    menus.forEach(function (menu) {
      if (menu.open && !menu.contains(event.target)) {
        menu.removeAttribute("open");
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenus(null);
    }
  });
}());
