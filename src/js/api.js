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
