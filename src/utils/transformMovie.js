const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const transformMoviesData = (data) => {
  return data.map(({ id, title }) => ({
    id,
    title,
  }));
};

const transformMovieData = (data) => {
  return {
    title: data.title,
    vote: Math.round(Number(data.vote_average) * 10),
    release_year: data.release_date.slice(0, 4),
    poster: data.poster_path ? IMAGE_BASE_URL + data.poster_path : defaultImg,
    overview: data.overview,
    genres: data.genres.map(({ name }) => name),
  };
};

const transformMovieCast = (data) => {
  return data.map(({ id, name, character, profile_path }) => ({
    id,
    name,
    character,
    profile_path: profile_path ? IMAGE_BASE_URL + profile_path : defaultImg,
  }));
};

const transformMovieReviews = (data) => {
  return data.map(({ id, author, content }) => ({
    id,
    author,
    content: content.replace(/<[^>]*>/g, ""),
  }));
};

export {
  transformMoviesData,
  transformMovieData,
  transformMovieCast,
  transformMovieReviews,
};
