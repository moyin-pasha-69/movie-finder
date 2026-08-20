import * as Api from "./api.js";
import * as Utils from "./utils.js";
import * as Storage from "./storage.js";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

//head title
const headMovieTitle = document.querySelector(".head-movie-title");
headMovieTitle.innerHTML = `${Utils.getMovieGenreTitle(movieId)}`;

//genre movies section
const data = await Api.getMovieByGenre(movieId);

const movie = await Promise.all(
  data.results.map((element) => Api.getSearchedMovie(element.id)),
);
// const cardSection = document.querySelector(".card-section");
// movie.forEach((details) => {
//   let overview = details.overview;
//   if (overview === "") {
//     overview = "This movie not have any overview";
//   }
//   let genre = Utils.getMovieGenre(details.genres);
//   //   console.log(genre[0] + " / " + genre[1]);

//   let releaseDate = new Date(details.release_date).getFullYear();
//   let rating = details.vote_average.toFixed(1);

//   let card = document.createElement("div");
//   //   card.classList.add("genre-cards");

//   card.innerHTML = `
//           <div class="card-box bg-[#1A1A1A] w-full  group border-2 border-[#4a4a4a] rounded-xl overflow-hidden duration-150 ease-linear hover:border-[#00ffff]">
//                 <div class="overflow-hidden border-[#4a4a4a] border-b w-full h-[320px] relative">
//                   <!-- card image -->
//                   <img
//                     src= "${Api.getImage(details.poster_path)}"
//                     class="w-full group-hover:scale-[1.1] duration-300 ease-linear h-full object-center"
//                   />
//                   <div class="absolute top-2 right-1 bg-[#0D0D0F] px-1 py-0.5 rounded-md border border-[#4A4A4A]"><span class="text-[#ffff00] text-sm font-bold">
//                   &starf; ${rating}/10
//                   </span></div>
//                 </div>

//                 <!-- card details -->
//                 <div class="px-6 text-white pt-4 pb-4 relative">
//                   <h2 class="text-lg truncate group-hover:text-[#00ffff] duration-300 ease-linear mb-2 font-bold cursor-default" title="${details.title}">
//                     ${details.title}
//                   </h2>

//                   <span class="absolute top-0.5 right-3 text-[#00ff00] font-bold">${releaseDate}</span>

//                   <p class="text-sm h-10  overflow-y-scroll text-gray-400 mb-4">
//                    ${overview}
//                   </p>

//                   <hr class="text-[#4a4a4a] rounded-2xl mb-3" />
//                   <div class="flex justify-between items-center text-sm">
//                     <p class="text-gray-500">${genre[0]} / ${genre[1]}</p>
//                     <a href="../movie.html?id=${details.id}" class="text-[#00ffff] font-bold hover:underline">
//                       Details &rarr;</a
//                     >
//                   </div>
//                 </div>
//               </div>

//       `;
//   cardSection.appendChild(card);
// });
