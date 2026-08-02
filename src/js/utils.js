const navItems = document.querySelector(".nav-items");
const navIcons = document.querySelector(".nav-icons");

export function openMenu() {
  if (navItems.className.includes("hidden")) {
    navItems.classList.remove("hidden");
    navIcons.classList.remove("hidden");
    navItems.classList.add("side-bar-items");
    navIcons.classList.add("side-bar-icons");
  } else {
    navItems.classList.add("hidden");
    navIcons.classList.add("hidden");
    navItems.classList.remove("side-bar-items");
    navIcons.classList.remove("side-bar-icons");
  }
}
