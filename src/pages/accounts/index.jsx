import { NavLink } from "react-router-dom";
import { FaPlus, FaServer, FaUsers } from "react-icons/fa";

const Accounts = () => {
  return (
    <>
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
                  <NavLink
                    to="/devices"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-secondary"
                        : "nav-link text-white"
                    }
                  >
                    <FaServer className="bi d-block mx-auto mb-1" size={24} />
                    Devices
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/accounts"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link text-secondary"
                        : "nav-link text-white"
                    }
                  >
                    <FaUsers className="bi d-block mx-auto mb-1" size={24} />
                    Accounts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <section className="container">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Accounts</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                // onClick={handleShow}
                className="btn btn-sm btn-outline-secondary"
              >
                <FaPlus className="mr-2" />
                New Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accounts;
