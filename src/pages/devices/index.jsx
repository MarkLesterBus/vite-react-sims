import { useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaServer, FaPlus, FaCogs, FaTrash, FaUsers } from "react-icons/fa";
import {
  getDevices, deleteDevice,
  reset,
} from "../../store/devices/deviceSlice";
import CreateDevice from "../../components/device-create";
import DeleteDevice from "../../components/device-delete";

function Devices() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { devices, isLoading, isError, message } = useSelector(
    (state) => state.devices
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!token) {
      navigate("/login");
    }

    dispatch(getDevices());

    return () => {
      dispatch(reset());
    };
  }, [token, dispatch]);


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
          <h1 className="h2">Devices {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : ""}</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <CreateDevice />
          </div>
        </div>

        <Col>
          <Table className="mt-2" striped bordered hover>
            <thead>
              <tr>
                <th>UUID</th>
                <th>Name</th>
                <th>Host</th>
                <th>Port</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.uuid}>
                  <td>{device.uuid}</td>
                  <td>{device.name}</td>
                  <td>{device.host}</td>
                  <td>{device.port}</td>
                  <td>
                    <div>
                      <Button href={`/devices/${device.id}/dashboard`} variant="info" size="sm">
                        <FaCogs /> Manage
                      </Button>{" "}
                      <Button variant="warning" size="sm">
                        <FaServer /> Edit
                      </Button>{" "}
                      <DeleteDevice id={device.uuid} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>


      </section>
    </>
  );
}

export default Devices;
