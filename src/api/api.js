import axios from "axios";
import {
  transformMovieCast,
  transformMovieData,
  transformMovieReviews,
  transformMoviesData,
} from "../utils/transformMovie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGNjMzNmZTQxOWE3ZDYwYTQ1NzQ1ZWZkNmY0YzFhMSIsIm5iZiI6MTc0ODA4MTAzOS45OSwic3ViIjoiNjgzMTk5OGYyMjZkOGIyZTg2MmI2ODc5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.vJJeqfAa38v3nYCAxwv_PHRepG5v4_Goi_01EQzP62U";

const fetchTrendingMovies = async () => {
  const { data } = await axios.get("/trending/movie/day");
  return transformMoviesData(data.results);
};

const fetchMovies = async (query) => {
  const { data } = await axios.get(`/search/movie?query=${query}`);
  return transformMoviesData(data.results);
};

const fetchMovieById = async (id) => {
  const { data } = await axios.get(`movie/${id}`);
  return transformMovieData(data);
};

const fetchMovieCast = async (id) => {
  const { data } = await axios.get(`movie/${id}/credits`);
  return transformMovieCast(data.cast);
};

const fetchMovieReviews = async (id) => {
  const { data } = await axios.get(`movie/${id}/reviews`);
  return transformMovieReviews(data.results);
};

export {
  fetchTrendingMovies,
  fetchMovies,
  fetchMovieById,
  fetchMovieCast,
  fetchMovieReviews,
};
