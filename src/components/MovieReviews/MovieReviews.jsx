import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/api";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);
  return (
    <div>
      <div>
        {isLoading && <Loader />}
        {error && <p>error</p>}
        {movieReviews.length === 0 ? (
          !isLoading && <p>No reviews</p>
        ) : (
          <ul>
            {movieReviews.map(({ id, author, content }) => (
              <li key={id}>
                <p>
                  <b>Author:</b> {author}
                </p>
                <p>
                  <b>Content:</b> {content}{" "}
                </p>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieReviews;
