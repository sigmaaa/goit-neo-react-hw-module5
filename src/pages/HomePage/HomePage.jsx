import { useEffect, useState } from "react";
import fetchTrendingMovies from "../../api";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        alert(error.message || "Failed to fetch movies");
      }
    };

    getTrendingMovies();
  }, []);

  return <div>Home</div>;
};

export default HomePage;
