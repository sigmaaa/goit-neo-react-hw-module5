import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    const getMovieCast = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setMovieCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieCast();
  }, [movieId]);
  return (
    <div>
      {isLoading && <Loader />}
      {error && <p>error</p>}
      {movieCast.length === 0 ? (
        !isLoading && <p>No cast</p>
      ) : (
        <ul>
          {movieCast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              {profile_path && (
                <img src={profile_path} alt={name} width="200px" />
              )}
              <b>{name}</b>
              <p>{character}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
