import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaNetworkWired,
    FaServer,
    FaCogs,
    FaUsers,
    FaWifi,
    FaTicketAlt,
} from "react-icons/fa";
import { MdQueue, MdList, MdOutlet } from "react-icons/md";

const DeviceNavigation = ({ uuid }) => {

    return (
        <header>
            <div className="px-3 py-2 text-bg-dark">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a
                            href="/"
                            className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                        >
                            <img
                                src="\mikrotik.png"
                                className="d-block mx-lg-auto img-fluid mb-3"
                                alt="Bootstrap Themes"
                                width={200}
                                loading="lazy"
                            />
                        </a>
                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>

                                <NavLink
                                    to="dashboard"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link text-secondary"
                                            : "nav-link text-white"
                                    }
                                >
                                    <FaTachometerAlt
                                        className="bi d-block mx-auto mb-1"
                                        size={24}
                                    />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`interfaces`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link text-secondary"
                                            : "nav-link text-white"
                                    }
                                >
                                    <MdOutlet
                                        className="bi d-block mx-auto mb-1"
                                        size={24}
                                    />
                                    Interfaces
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`ip`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link text-secondary"
                                            : "nav-link text-white"
                                    }
                                >

                                    <FaNetworkWired className="bi d-block mx-auto mb-1" size={24} />
                                    IP
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`hotspot`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link text-secondary"
                                            : "nav-link text-white"
                                    }
                                >

                                    <FaWifi className="bi d-block mx-auto mb-1" size={24} />
                                    Hotspot
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`vouchers`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link text-secondary"
                                            : "nav-link text-white"
                                    }
                                >
                                    <FaTicketAlt
                                        className="bi d-block mx-auto mb-1"
                                        size={24}
                                    />
                                    Vouchers
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DeviceNavigation;