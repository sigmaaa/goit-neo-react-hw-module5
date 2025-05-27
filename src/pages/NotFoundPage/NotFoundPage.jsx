import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 Not found page</h2>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFoundPage;
