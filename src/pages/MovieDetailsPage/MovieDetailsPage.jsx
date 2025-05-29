import { useEffect, useState, useRef } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { fetchMovieById } from "../../api/api";
import Loader from "../../components/Loader/Loader";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import css from "./MovieDetails.module.css";

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
          <div className={css.detailsContainer}>
            <img src={movie.poster} alt={movie.title} width="240px" />
            <div className={css.detailsDescription}>
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
          <div className={css.addInfo}>
            <h3>Additional information</h3>
            <ul className={css.castReviewList}>
              <li>
                <NavLink className={css.cast} to="cast">
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink className={css.review} to="reviews">
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
