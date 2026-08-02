import * as CONFIG from "./config.js";

export async function getMovie() {
  try {
    const response = await fetch(
      `${CONFIG.BASE_URL}trending/movie/day`,
      CONFIG.OPTIONS,
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
