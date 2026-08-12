import * as Api from "./api.js";
import * as Utils from "./utils.js";
import * as Ui from "./ui.js";

const menuBar = document.getElementById("menu-bar");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const slideOne = document.querySelector(".slide1");
const slideTwo = document.querySelector(".slide2");
const slideThree = document.querySelector(".slide3");
const slideFour = document.querySelector(".slide4");
const swiperContainer = document.querySelector(".swiper");

let slide = 0;

menuBar.addEventListener("click", Utils.openMenu);

document.addEventListener("DOMContentLoaded", async () => {
  let data = await Api.getHeroMovies();
  let heroMovies = data.results.slice(0, 4);

  function prevHeroBox() {
    if (slide <= 0) {
      slide = 3;
      heroCarousel();
    } else {
      slide--;
      heroCarousel();
    }
  }

  function nextHeroBox() {
    if (slide >= 3) {
      slide = 0;
      heroCarousel();
    } else {
      slide++;
      heroCarousel();
    }
  }

  function atSpecificHero(dot) {
    slide = dot;
    heroCarousel();
  }

  function showSlide(dot) {
    switch (dot) {
      case 0:
        slideFour.classList.remove("selected-dot");
        slideThree.classList.remove("selected-dot");
        slideTwo.classList.remove("selected-dot");
        slideOne.classList.add("selected-dot");
        break;
      case 1:
        slideFour.classList.remove("selected-dot");
        slideThree.classList.remove("selected-dot");
        slideOne.classList.remove("selected-dot");
        slideTwo.classList.add("selected-dot");
        break;
      case 2:
        slideFour.classList.remove("selected-dot");
        slideTwo.classList.remove("selected-dot");
        slideOne.classList.remove("selected-dot");
        slideThree.classList.add("selected-dot");
        break;
      case 3:
        slideThree.classList.remove("selected-dot");
        slideTwo.classList.remove("selected-dot");
        slideOne.classList.remove("selected-dot");
        slideFour.classList.add("selected-dot");
        break;

      default:
        break;
    }
  }

  slideOne.addEventListener("click", () => {
    showSlide(0);
    atSpecificHero(0);
  });
  slideTwo.addEventListener("click", () => {
    showSlide(1);
    atSpecificHero(1);
  });
  slideThree.addEventListener("click", () => {
    showSlide(2);
    atSpecificHero(2);
  });
  slideFour.addEventListener("click", () => {
    showSlide(3);
    atSpecificHero(3);
  });

  setInterval(nextHeroBox, 5000);
  Ui.renderHeroSection(heroMovies);
  const heroBox = document.querySelectorAll(".hero-box");

  heroCarousel();
  function heroCarousel() {
    showSlide(slide);
    heroBox.forEach((element, index) => {
      element.style.left = `${index * 100}%`;
    });

    heroBox.forEach((element) => {
      element.style.transform = `translateX(-${slide * 100}%)`;
    });
  }
  prev.addEventListener("click", prevHeroBox);
  next.addEventListener("click", nextHeroBox);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      nextHeroBox();
    } else if (e.key === "ArrowLeft") {
      prevHeroBox();
    }
  });

  // trending section
  let trendingMovies = data.results.slice(0, 10);
  const details = await Promise.all(
    trendingMovies.map((movie) => Api.getSearchedMovie(movie.id)),
  );
  Ui.renderTrendingMovies(details);
  swiperContainer.style.setProperty("--swiper-navigation-color", "#00ffff");
  let swiperCard = new Swiper(".slider-wrapper", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 2,
      },

      1024: {
        slidesPerView: 3,
      },

      1280: {
        slidesPerView: 4,
      },
    },

    direction: "horizontal",
    mousewheel: {
      forceToAxis: true,
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
