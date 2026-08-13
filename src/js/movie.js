import * as Api from "./api.js";
import * as Utils from "./utils.js";
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const data = await Api.getSearchedMovie(movieId);
const headMovieTitle = document.querySelector(".head-movie-title");
const detailBox = document.querySelector("#detail-page .slides");
console.log(data);

// head title
const h2 = document.createElement("h2");
h2.classList.add("cursor-default");
h2.setAttribute("title", `${data.original_title}`);
h2.innerHTML = `${data.original_title}`;
headMovieTitle.appendChild(h2);

//movie card
let backdrop = Api.getImage(data.backdrop_path);
let poster = Api.getImage(data.poster_path);
let releaseDate = new Date(data.release_date).getFullYear();
let rating = data.vote_average.toFixed(1);
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

              <p class="text-sm text-[#e0e0e0] font-medium">${Utils.movieDuration(data.runtime)}</p>
              
            </div>

            <!-- title -->
            <div class="hero-title">
              <h2 class="font-extrabold text-[#fffff] lg:text-4xl text-2xl">
                ${data.original_title}
              </h2>
            </div>

            <!-- info -->
            <p class="hero-info font-medium text-[#e0e0e0] overflow-y-scroll h-20">
              ${data.overview}
            </p>

            <div class="genre"></div>

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
detailBox.appendChild(hero);
let genreBox = document.querySelector(".genre");
let genre = Utils.getMovieGenre(data.genres);
genre.forEach((gen) => {
  let g = document.createElement("div");
  g.classList.add("movie-genre-item");
  g.innerHTML = `${gen}`;
  genreBox.appendChild(g);
});

//cast details
let castItems = document.querySelector(".cast-items");
const castInfo = await Api.getMovieCast(data.id);
let d = castInfo.cast.slice(0, 10);
console.log(d);

d.forEach((element) => {
  let cast = document.createElement("div");
  cast.setAttribute("class", "flex flex-col items-center ");
  cast.innerHTML = `
            <a>
            <img
              src="${Api.getImage(element.profile_path)}"
              alt=""
              class="object-center w-40 h-40 rounded-full"
            />
            </a>
            <div class="text-center">
            <a><h3 class="text-[#ffffff] text-sm font-bold">${element.name}</h3></a>
              <h4 class="text-[#e0e0e0] text-xs">${element.character}</h4>
            </div>
  `;
  castItems.appendChild(cast);
});
