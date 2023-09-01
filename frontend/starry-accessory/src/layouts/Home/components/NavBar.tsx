import { NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { library } from "@fortawesome/fontawesome-svg-core";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState);

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 mx-3">
      <div className="container-fluid text-white">
        <span>
          {" "}
          <NavLink className="nav-link mx-3" to="/">
            <img
              src={require("./../../../images/logo3resize.jpg")}
              width="100"
              height="70"
              alt=""
            />
          </NavLink>
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
              <NavLink className="nav-link mx-3" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mx-3" to="/search">
                Search items
              </NavLink>
            </li>
            {authState.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link mx-3" to="/shoppingcart">
                  Shopping cart
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-3">
              {!authState.isAuthenticated ? (
                <NavLink type="button" className="nav-link" to="/login">
                  Log in
                </NavLink>
              ) : (
                <button className="nav-link" onClick={handleLogout}>
                  Log out
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
