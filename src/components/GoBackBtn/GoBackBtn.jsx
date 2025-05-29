import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import css from "./GoBackBtn.module.css";

const GoBackBtn = ({ path }) => {
  return (
    <div className={css.backBtn}>
      <Link className={css.backpage} to={path}>
        {" "}
        <IoIosArrowBack className={css.backArrow} /> Back
      </Link>
    </div>
  );
};

export default GoBackBtn;
