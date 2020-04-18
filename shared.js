let dropdown = document.querySelector(".nav__items");
let toggleButton = document.querySelector(".toggle-button");
let socialLinks = document.querySelector(".contact-links");
let navBar = document.querySelector(".nav");
let header = document.querySelector(".header");
let mainInfo = document.getElementById("main-info");
let sectionText = document.querySelectorAll(".section__text");
let servicesIcons = document.querySelectorAll(".services__icon");

toggleButton.addEventListener("click", () => {
  if (dropdown.classList.contains("open")) {
    dropdown.style.animation =
      "disappearance 0.3s cubic-bezier(0.2, 0.48, 0.76, 0.29)";
    setTimeout(() => {
      navBar.style.animation = "dropup 0.5s ease-out";
      dropdown.removeAttribute("style", "display:flex");
      dropdown.classList.remove("open");
    }, 300);
  } else {
    navBar.style.animation = "dropdown 0.5s ease-out";
    setTimeout(() => {
      dropdown.setAttribute("style", "display:flex");
      dropdown.style.animation =
        "appearance 0.3s cubic-bezier(0.2, 0.48, 0.76, 0.29)";
      dropdown.classList.add("open");
    }, 300);
  }
});

let isScrolling = false;

const throttleScroll = e => {
  if (isScrolling === false) {
    window.requestAnimationFrame(() => {
      scrolling(e);
      isScrolling = false;
    });
  }
  isScrolling = true;
};

const scrolling = e => {
  if (isElementAtTop(navBar)) {
    mainInfo.setAttribute("style", "margin-top:5rem");
    navBar.setAttribute("style", "position:fixed; top:0; width:100%");
  }
  if (isElementAtBottom(header)) {
    mainInfo.removeAttribute("style", "margin-top:5rem");
    navBar.removeAttribute("style", "position:fixed; top:0; width:100%");
  }
  for (let i = 0; i < sectionText.length; i++) {
    if (isFullyVisible(sectionText[i])) {
      sectionText[i].style.animation =
        "fadeInRight 700ms cubic-bezier(0, 0, 0.42, 0.4)";
      sectionText[i].style.opacity = 1;
    }
  }
  for (let i = 0; i < servicesIcons.length; i++) {
    if (isFullyVisible(servicesIcons[i])) {
      servicesIcons[i].style.animation =
        "fadeInRight 700ms cubic-bezier(0, 0, 0.42, 0.4)";
      servicesIcons[i].style.opacity = 1;
    }
  }
};

const isElementAtTop = el => {
  let elBoundary = el.getBoundingClientRect();
  let top = elBoundary.top;
  return top <= 0;
};

const isElementAtBottom = el => {
  let elBoundary = el.getBoundingClientRect();
  let bottom = elBoundary.bottom;
  return bottom >= 0;
};

const isFullyVisible = el => {
  let elBoundary = el.getBoundingClientRect();
  let top = elBoundary.top;
  let bottom = elBoundary.bottom;
  return top >= 0 && bottom <= window.innerHeight;
};

window.addEventListener("scroll", throttleScroll, false);