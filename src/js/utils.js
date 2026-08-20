import { slides } from "./ui.js";
import * as Storage from "./storage.js";

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

export function movieDuration(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;

  return `${h}h ${m}m`;
}

export function getMovieGenre(movie) {
  let genre = [];
  for (const element in movie) {
    genre.push(
      movie[element].name === "Science Fiction"
        ? "Sci-Fi"
        : movie[element].name,
    );
  }
  if (genre.length === 0) {
    genre[0] = "Not Set";
    genre[1] = "Not Set";
  }
  return genre;
}

export function getMovieGenreTitle(id) {
  const genre = Storage.MovieGenreList.find((element) => id == element.id);

  return genre?.title;
}
