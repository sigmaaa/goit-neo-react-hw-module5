import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../api/api";

const MoviesPage = () => {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    if (query !== "") {
      setSearchParams({ query });
    }
  };

  useEffect(() => {
    if (!searchParams.get("query")) return;

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovies(searchParams.get("query"));
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [searchParams]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="query" placeholder="Enter search query" />
          <button type="submit">Search</button>
        </form>
      </div>
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
