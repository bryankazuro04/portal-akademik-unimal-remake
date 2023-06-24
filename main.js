/**
 *  ============================================================================================
 *  Tabs open
 */
const triggerTabList = document.querySelectorAll("#myTab button");
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new bootstrap.Tab(triggerEl);

  triggerEl.addEventListener("click", (event) => {
    event.preventDefault();
    tabTrigger.show();
  });
});

/**
 *  ============================================================================================
 *  Individual tabs active
 */

const triggerEl = document.querySelector('#myTab button[data-bs-target="#semester2"]');
bootstrap.Tab.getInstance(triggerEl).show();

const triggerFirstTabEl = document.querySelector("#myTab li:first-child button");
bootstrap.Tab.getInstance(triggerFirstTabEl).show();

/**
 *  ============================================================================================
 *  Dropdown Matakuliah
 */

const dropdownMatkul = document.getElementsByClassName("dropdown__matkul"),
  dropdownMatkulHeader = document.querySelectorAll(".dropdown__matkul-header");

function matkul() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < dropdownMatkul.length; i++) {
    dropdownMatkul[i].className = "dropdown__matkul";
  }

  if (itemClass === "dropdown__matkul") {
    this.parentNode.className = "dropdown__matkul open";
  }
}

dropdownMatkulHeader.forEach((header) => {
  header.addEventListener("click", matkul);
});

/**
 *  ============================================================================================
 *  Profile user
 */

const profileUser = document.querySelector(".profile"),
  profileImg = document.querySelector(".profile__image");

profileImg.addEventListener("click", () => {
  profileUser.classList.toggle("show");
});

/**
 *  ============================================================================================
 *  Light/Dark mode
 */
const dropdownElementList = document.querySelectorAll(".dropdown-toggle");
const dropdownList = [...dropdownElementList].map((dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl));

(() => {
  "use strict";

  const storedTheme = localStorage.getItem("theme");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const setTheme = function (theme) {
    if (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme) => {
    const activeThemeIcon = document.querySelector(".theme-icon-active");
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
    const iconOfActiveBtn = btnToActive.querySelector("i").dataset.themeIcon;

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
    });

    btnToActive.classList.add("active");
    activeThemeIcon.classList.remove(activeThemeIcon.dataset.themeIconActive);
    activeThemeIcon.classList.add(iconOfActiveBtn);
    activeThemeIcon.dataset.iconActive = iconOfActiveBtn;
  };

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (storedTheme !== "light" || storedTheme !== "dark") {
      setTheme(getPreferredTheme());
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
