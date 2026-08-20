import * as Api from "./api.js";
import * as Utils from "./utils.js";
import * as Storage from "./storage.js";

const cardSection = document.querySelector(".card-section");

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//head title
const headMovieTitle = document.querySelector(".head-movie-title");
headMovieTitle.innerHTML = `${Utils.getMovieGenreTitle(movieId)}`;

//genre movies section
let data = await Api.getMovieByGenre(movieId, 1);

//pagination
const genrePages = document.querySelector(".genre-page-pagination-section");
let totalPages = data.total_pages;
let currentPage = 1;
let previousPage = currentPage;
let pageUi = document.createElement("div");
pageUi.classList.add("genre-pagination");
pageUi.innerHTML = `
<button class="prev next-prev-btns">Previous</button>
          <div class="pagination-number">
           ${pages()}
          </div>
          <button class="next next-prev-btns">Next</button>
`;

genrePages.appendChild(pageUi);

const page = pageUi.querySelectorAll(".pagination-number div");

const prevBtn = pageUi.querySelector(".prev");
const nextBtn = pageUi.querySelector(".next");

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
page.forEach((element) => {
  element.addEventListener("click", () =>
    clickedPage(element.getAttribute("id")),
  );
});

makeDisableBtn();
changePaginationColor();
giveMovieData(currentPage);
function pages() {
  let page = "";
  for (let i = 1; i <= totalPages; i++) {
    page += `<div id="page${i}" class="normal-pages">${i}</div>`;
  }
  console.log("hello");

  return page;
}

function nextPage() {
  makeDisableBtn();
  if (currentPage >= totalPages) {
    currentPage = totalPages;
  } else {
    previousPage = currentPage;
    currentPage++;
    makeDisableBtn();
    changePaginationColor();
    giveMovieData(currentPage);
  }
}
function prevPage() {
  makeDisableBtn();
  if (currentPage <= 1) {
    currentPage = 1;
  } else {
    previousPage = currentPage;
    currentPage--;
    makeDisableBtn();
    changePaginationColor();
    giveMovieData(currentPage);
  }
}

function makeDisableBtn() {
  if (currentPage === 1) {
    prevBtn.classList.replace("next-prev-btns", "disable-btn");
  } else if (currentPage === totalPages) {
    nextBtn.classList.replace("next-prev-btns", "disable-btn");
  } else {
    nextBtn.className = "next next-prev-btns";
    prevBtn.className = "prev next-prev-btns";
  }
}
function changePaginationColor() {
  let selectedPage = document.querySelector(
    `.genre-pagination #page${currentPage}`,
  );
  let nonSelectedPage = document.querySelector(
    `.genre-pagination #page${previousPage}`,
  );
  nonSelectedPage.classList.replace("selected-page", "normal-pages");
  selectedPage.classList.replace("normal-pages", "selected-page");
}
function clickedPage(id) {
  let demo = id.split("e");
  previousPage = currentPage;
  currentPage = Number(demo[1]);
  changePaginationColor();
  makeDisableBtn();
  giveMovieData(currentPage);
}
async function giveMovieData(page) {
  data = await Api.getMovieByGenre(movieId, page);
  renderMovieCards();
}
//render movie  cards
async function renderMovieCards() {
  cardSection.innerHTML = "";
  const movie = await Promise.all(
    data.results.map((element) => Api.getSearchedMovie(element.id)),
  );
  movie.forEach((details) => {
    let overview = details.overview;
    if (overview === "") {
      overview = "This movie not have any overview";
    }
    let genre = Utils.getMovieGenre(details.genres);
    //   console.log(genre[0] + " / " + genre[1]);

    let releaseDate = new Date(details.release_date).getFullYear();
    let rating = details.vote_average.toFixed(1);

    let card = document.createElement("div");
    card.classList.add("cursor-grab");

    card.innerHTML = `
          <div class="card-box bg-[#1A1A1A] w-full  group border-2 border-[#4a4a4a] rounded-xl overflow-hidden duration-150 ease-linear hover:border-[#00ffff]">
                <div class="overflow-hidden border-[#4a4a4a] border-b w-full h-[320px] relative">
                  <!-- card image -->
                  <img
                    src= "${Api.getImage(details.poster_path)}"
                    class="w-full group-hover:scale-[1.1] duration-300 ease-linear h-full object-center"
                  />
                  <div class="absolute top-2 right-1 bg-[#0D0D0F] px-1 py-0.5 rounded-md border border-[#4A4A4A]"><span class="text-[#ffff00] text-sm font-bold">
                  &starf; ${rating}/10
                  </span></div>
                </div>

                <!-- card details -->
                <div class="px-6 text-white pt-4 pb-4 relative">
                  <h2 class="text-lg truncate group-hover:text-[#00ffff] duration-300 ease-linear mb-2 font-bold cursor-default" title="${details.title}">
                    ${details.title}
                  </h2>

                  <span class="absolute top-0.5 right-3 text-[#00ff00] font-bold">${releaseDate}</span>

                  <p class="text-sm h-10  overflow-y-scroll text-gray-400 mb-4">
                   ${overview}
                  </p>

                  <hr class="text-[#4a4a4a] rounded-2xl mb-3" />
                  <div class="flex justify-between items-center text-sm">
                    <p class="text-gray-500">${genre[0]} / ${genre[1]}</p>
                    <a href="../movie.html?id=${details.id}" class="text-[#00ffff] font-bold hover:underline">
                      Details &rarr;</a
                    >
                  </div>
                </div>
              </div>

      `;
    cardSection.appendChild(card);
  });
}
