import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="bg-dark">
      <footer className="container d-flex flex-wrap justify-content-end align-items-center py-4 text-white">
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link className="nav-link px-2 text-white" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link px-2 text-white" to="/search">
              All products
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="https://www.instagram.com/starry_accessory_macau/"
              className="nav-link px-2"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon
                // @ts-ignore
                icon={faInstagram}
                style={{ color: "#e68ebd" }}
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
