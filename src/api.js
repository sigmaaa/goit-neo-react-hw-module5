import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGNjMzNmZTQxOWE3ZDYwYTQ1NzQ1ZWZkNmY0YzFhMSIsIm5iZiI6MTc0ODA4MTAzOS45OSwic3ViIjoiNjgzMTk5OGYyMjZkOGIyZTg2MmI2ODc5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vJJeqfAa38v3nYCAxwv_PHRepG5v4_Goi_01EQzP62U";
const fetchTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
};

export default fetchTrendingMovies;
