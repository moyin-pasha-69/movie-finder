export const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYmRhMWNkNzVjNmRjNWI1OTQxNWE3ZWYyNzIxMWRiMiIsIm5iZiI6MTc4NDMwNzcxNC42NDYwMDAxLCJzdWIiOiI2YTVhNjAwMmVhOWRiMTU5ODQ3MmI5MGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oQIHmeCX-MhwMn6JTCLhDtRPbdteZvk8_ZU-hK-raeo`;

export const BASE_URL = "https://api.themoviedb.org/3/";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/";

export const OPTIONS = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: "application/json",
  },
};
