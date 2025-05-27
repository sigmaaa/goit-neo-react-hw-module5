import { Link } from "react-router-dom";

const GoBackBtn = ({ path }) => {
  return (
    <div>
      <Link to={path}>Back</Link>
    </div>
  );
};

export default GoBackBtn;
