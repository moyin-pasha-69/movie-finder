import * as Config from "./config.js";

export async function getHeroMovies() {
  try {
    const response = await fetch(
      `${Config.BASE_URL}trending/movie/day`,
      Config.OPTIONS,
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getSearchedMovie(movie) {
  try {
    const response = await fetch(
      `${Config.BASE_URL}movie/${movie}`,
      Config.OPTIONS,
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export function getImage(path) {
  return `${Config.BASE_IMG_URL}/original/${path}`;
}

export async function getMovieCast(id) {
  try {
    const response = await fetch(
      `${Config.BASE_URL}movie/${id}/credits`,
      Config.OPTIONS,
    );
    return response.json();
  } catch (error) {
    d;
    console.log(error);
  }
}

export async function getRelatedMovie(id) {
  try {
    const response = await fetch(
      `${Config.BASE_URL}movie/${id}/similar`,
      Config.OPTIONS,
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getVideo(id) {
  try {
    const response = await fetch(
      `${Config.BASE_URL}movie/${id}/videos`,
      Config.OPTIONS,
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieByGenre(id) {
  try {
    const response = await fetch(
      `${Config.BASE_URL}discover/movie?with_genres=${id}`,
      Config.OPTIONS,
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
