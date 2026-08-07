import * as Api from "./api.js";
import * as Utils from "./utils.js";
import * as Config from "./config.js";
export const heroSection = document.querySelector(".hero-section");
export const slides = document.querySelector(".slides");

export function renderHeroSection(data) {
  data.forEach((element, index) => {
    // let movie = await Api.getSearchedMovie(element.id);
    let poster = Api.getImage(element.poster_path);
    let backdrop = Api.getImage(element.backdrop_path);
    // let genre = Utils.getMovieGenre(movie.genres);
    let releaseDate = new Date(element.release_date).getFullYear();
    let rating = element.vote_average.toFixed(1);

    let hero = document.createElement("div");
    hero.classList.add("hero-box");
    hero.style.backgroundImage = `url(${backdrop})`;
    hero.innerHTML = `
    <div class="absolute bg-black/60 w-full h-full top-0 left-0 z-10"></div>
              <!-- poster -->
          <div class="hero-poster z-30">
          <img class="w-full h-full object-fit" src="${poster}" alt="Hero Poster"/>
          </div>

          <!-- detail -->
          <div class="hero-details z-30">
            <!-- top -->
            <div class="hero-top">
              <p
                class="bg-[#00ff00] text-[#0a0a0a] font-extrabold rounded-3xl lg:py-1 lg:px-2 lg:text-xs py-0.5 px-2 text-[12px]"
              >
                RELEASED ${releaseDate}
              </p>
              <p class="text-[#ffff00] font-bold lg:text-lg text-sm">
                &starf; ${rating} / 10
              </p>
              
            </div>

            <!-- title -->
            <div class="hero-title">
              <h2 class="font-extrabold text-[#fffff] lg:text-4xl text-2xl">
                ${element.original_title}
              </h2>
            </div>

            <!-- info -->
            <p class="hero-info font-medium text-[#e0e0e0] overflow-y-scroll h-20">
              ${element.overview}
            </p>

            

            <!-- trailer -->
            <div class="hero-trailer">
              <button>&#9655; Watch Trailer</button>
              <button
                class="bg-[#2A2A3A] hover:outline-[#00ffff] hover:outline text-white"
              >
                &#10010; Add to Watchlist
              </button>
            </div>
          </div>
  `;
    slides.appendChild(hero);
  });
}
