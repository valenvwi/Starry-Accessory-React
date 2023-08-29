export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3">
      <div className="container-fluid text-white">
        <span>
          {" "}
          <img src={require("./../../../images/logo3resize.jpg")} 
          width="100"
          height="70"
          alt="" />
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link mx-3" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link mx-3" href="#">
                Search items
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              <a type="button" className="nav-link" href="#">
                {" "}
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
