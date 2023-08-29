import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <div className="bg-dark">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 text-white">
        <p className="col-md-4">Starry Accessory</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">Home</li>
          <li className="nav-item">
            <a className="nav-link px-2 text-white" href="#">
              All products
            </a>
          </li>
          {/* <li className="nav-item">
            {/* <FontAwesomeIcon icon={faInstagram} style={{color: "#e68ebd"}} /> */}
          {/* </li>  */}
        </ul>
      </footer>
    </div>
  );
};
