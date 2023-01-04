import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { FaTachometerAlt, FaTable, FaServer, FaUsers } from "react-icons/fa";

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
                    <Link className="dropdown-item" to="/devices">
                      Devices
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/accounts">
                      Acounts
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
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
    </div>
  );
};

export default Navigation;
