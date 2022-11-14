import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div>
      <nav className="py-2 bg-light ">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link link-dark px-2 active">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/faqs" className="nav-link link-dark px-2 active">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link link-dark px-2 active">
                About
              </Link>
            </li>
          </ul>
          <ul className="nav">
            {token ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user ? user.name : "User"}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={onLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <a href="/login" className="nav-link link-dark px-2">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {token ? (
        <header>
          <div className="px-3 py-2 text-bg-dark">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a
                  href="/"
                  className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                >
                  <svg
                    className="bi me-2"
                    width={40}
                    height={32}
                    role="img"
                    aria-label="Bootstrap"
                  >
                    <use xlinkHref="#bootstrap" />
                  </svg>
                </a>
                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  <li>
                    <a href="#" className="nav-link text-secondary">
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="#home" />
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link text-white">
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="#speedometer2" />
                      </svg>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link text-white">
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="#table" />
                      </svg>
                      Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link text-white">
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="#grid" />
                      </svg>
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link text-white">
                      <svg
                        className="bi d-block mx-auto mb-1"
                        width={24}
                        height={24}
                      >
                        <use xlinkHref="#people-circle" />
                      </svg>
                      Customers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="pt-4 ">
          <div className="container d-flex flex-wrap justify-content-center">
            <a
              href="/"
              className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none"
            >
              <svg className="bi me-2" width={40} height={32}>
                <use xlinkHref="#bootstrap" />
              </svg>
              <span className="fs-1">SIMS</span>
            </a>
          </div>
        </header>
      )}
    </div>
  );
};

export default Navigation;
