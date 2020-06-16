const dropdown = document.querySelector(".nav__items");
const toggleButton = document.querySelector(".toggle-button");
const socialLinks = document.querySelector(".contact-links");
const navBar = document.querySelector(".nav");
const header = document.querySelector(".header");
const mainInfo = document.getElementById("main-info");
const sectionText = document.querySelectorAll(".section__text");
const servicesIcons = document.querySelectorAll(".services__icon");
const navItems = document.querySelectorAll(".nav__item");

// Closes and opens the navigation menu
const closeAndOpenMenu = () => {
  if (dropdown.classList.contains("open")) {
    navBar.style.animation = "raise 0.1s linear";
    dropdown.removeAttribute("style", "display:flex");
    dropdown.classList.remove("open");
  } else {
    navBar.style.animation = "dropdown 0.1s linear";
    dropdown.setAttribute("style", "display:flex");
    dropdown.style.animation = "appearance 0.3s linear";
    dropdown.classList.add("open");
  }
};

// Opens and closes the navigation menu with a click on the toggle button
toggleButton.addEventListener("click", () => {
  closeAndOpenMenu();
});

// Closes the navigation menu with a click on the navigation item
for (let item of navItems) {
  item.addEventListener("click", () => {
    closeAndOpenMenu();
  });
}

let isScrolling = false;

// Checks scrolling
const throttleScroll = () => {
  if (isScrolling === false) {
    window.requestAnimationFrame(() => {
      stickingHeader();
      addAnimation();
      isScrolling = false;
    });
  }
  isScrolling = true;
};

// Checks if the element is on top of the viewport
const isElementAtTop = (el) => {
  let elBoundary = el.getBoundingClientRect();
  let top = elBoundary.top;
  return top <= 0;
};

// Checks if the element is at bottom of the viewport
const isElementAtBottom = (el) => {
  let elBoundary = el.getBoundingClientRect();
  let bottom = elBoundary.bottom;
  return bottom >= 0;
};

// Sticks navigation menu, if it's on top of the viewport, and unsticks if not
const stickingHeader = () => {
  if (isElementAtTop(navBar)) {
    mainInfo.setAttribute("style", "margin-top:2.8rem");
    navBar.setAttribute("style", "position:fixed; top:0; width:100%");
  }
  if (isElementAtBottom(header)) {
    mainInfo.removeAttribute("style", "margin-top:2.8rem");
    navBar.removeAttribute("style", "position:fixed; top:0; width:100%");
  }
};

// Checks if the element is at viewport
const isFullyVisible = (el) => {
  let elBoundary = el.getBoundingClientRect();
  let top = elBoundary.top;
  let bottom = elBoundary.bottom;
  return top >= 0 && bottom <= window.innerHeight;
};

// Animates fragments
const animateFragments = (fragment) => {
  for (let i = 0; i < fragment.length; i++) {
    if (isFullyVisible(fragment[i])) {
      fragment[i].style.animation =
        "fadeInRight 700ms cubic-bezier(0, 0, 0.42, 0.4)";
      fragment[i].style.opacity = 1;
    }
  }
};

// Adds animation
const addAnimation = () => {
  animateFragments(sectionText);
  animateFragments(servicesIcons);
};

window.addEventListener("scroll", throttleScroll, false);
