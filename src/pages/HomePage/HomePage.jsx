import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
};

export default HomePage;
