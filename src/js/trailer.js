import * as Api from "./api.js";

const pageTitle = document.querySelector("title");
const headMovieTitle = document.querySelector(".head-movie-title");
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const data = await Api.getSearchedMovie(movieId);
pageTitle.innerHTML = `${data.original_title} - Official Trailer`;

//head title
const h2 = document.createElement("h2");
h2.classList.add("cursor-default");
h2.setAttribute("title", `${data.original_title}`);
h2.innerHTML = `${data.original_title}`;
headMovieTitle.appendChild(h2);

//trailer section
const main = document.querySelector("main");
const videos = await Api.getVideo(movieId);
let isEmpty = videos.results.length === 0;
const trailerBox = document.createElement("div");
if (isEmpty) {
  trailerBox.className =
    "mt-16 w-[90%] sm:h-[80%] h-[70%] text-[#4a4a4a] flex justify-center items-center text-2xl sm:text-4xl font-bold";
  trailerBox.innerHTML = "Trailer Not Available";
} else {
  const trailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true,
  );
  console.log(trailer);

  let trailerData = trailer.key === " ";

  trailerBox.className = "mt-16 w-[90%] sm:h-[80%] h-[70%]";
  trailerBox.innerHTML = `
       <iframe
        src="https://www.youtube.com/embed/${trailer.key}"
        frameborder="0"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
`;
}

main.appendChild(trailerBox);
