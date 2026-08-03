import * as Api from "./api.js";
import * as Utils from "./utils.js";
import * as Ui from "./ui.js";

const menuBar = document.getElementById("menu-bar");

menuBar.addEventListener("click", Utils.openMenu);

document.addEventListener("DOMContentLoaded", async () => {
  let data = await Api.getHeroMovies();
  let heroMovies = data.results.slice(0, 4);
  console.log(heroMovies);

  Ui.renderHeroSection(heroMovies);
});
