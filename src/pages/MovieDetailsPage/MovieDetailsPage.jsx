import { useEffect, useState, useRef } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state || "/movies");

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [movieId]);

  return (
    <div>
      <GoBackBtn path={goBackLink.current} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}

      {movie && (
        <div>
          <div>
            <img src={movie.poster} alt={movie.title} width="240px" />
            <div>
              <h2>
                {movie.title} ({movie.release_year})
              </h2>
              <p>
                <b>User score:</b> {movie.vote}%
              </p>
              <p>
                <b>Overview:</b> {movie.overview}
              </p>
              <p>
                <b>Genres:</b> {movie.genres.join(", ")}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h3>Additional information</h3>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
