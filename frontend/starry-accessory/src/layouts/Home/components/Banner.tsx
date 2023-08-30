import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="p-5 mb-4 header d-flex justify-content-center align-items-end">
      <Link type="button" className="btn btn-dark p-3" to="/search">
        Explore all products
      </Link>
    </div>
  );
};
