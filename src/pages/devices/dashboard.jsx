import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaTachometerAlt,
  FaNetworkWired,
  FaServer,
  FaCogs,
  FaUsers,
  FaWifi,
  FaTicketAlt,
} from "react-icons/fa";
import { MdQueue, MdList } from "react-icons/md";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uuid } = useParams();

  const { user, token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!token) {
      navigate("/login");
    }

    // dispatch(getGoals());

    return;
  }, [user, token, navigate, isError, message, dispatch]);

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
                  <Link
                    to="/devices/:uuid/interface"
                    className="nav-link text-white"
                  >
                    <FaNetworkWired
                      className="bi d-block mx-auto mb-1"
                      size={24}
                    />
                    Interfaces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices/:uuid/hotspot"
                    className="nav-link text-white"
                  >
                    <FaWifi className="bi d-block mx-auto mb-1" size={24} />
                    Hotspot
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices/:uuid/queues"
                    className="nav-link text-white"
                  >
                    <MdQueue className="bi d-block mx-auto mb-1" size={24} />
                    Queues
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices/:uuid/vouchers"
                    className="nav-link text-white"
                  >
                    <FaTicketAlt
                      className="bi d-block mx-auto mb-1"
                      size={24}
                    />
                    Vouchers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/devices/:uuid/vouchers"
                    className="nav-link text-white"
                  >
                    <MdList className="bi d-block mx-auto mb-1" size={24} />
                    Logs
                  </Link>
                </li>
                <li>
                  <Link to="/devices" className="nav-link text-white">
                    <FaCogs className="bi d-block mx-auto mb-1" size={24} />
                    System
                  </Link>
                </li>
                <li>
                  <Link to="/devices" className="nav-link text-white">
                    <FaUsers className="bi d-block mx-auto mb-1" size={24} />
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <h1>dashboard {uuid}</h1>
      </div>
    </>
  );
};

export default Dashboard;
