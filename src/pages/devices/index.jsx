import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table, Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";
import { FaServer, FaPlus, FaCogs, FaTrash } from "react-icons/fa";
import {
  getDevices,
  createDevice,
  reset,
} from "../../store/devices/deviceSlice";

function Devices() {
  const [show, setShow] = useState(false);
  const [device, setDevice] = useState({
    name: "",
    host: "",
    user: "",
    pass: "",
    port: "",
  });

  const { name, host, user, pass, port } = device;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const onChange = (e) => {
    setDevice((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const deviceData = {
      name,
      host,
      user,
      pass,
      port,
    };

    dispatch(createDevice(deviceData));
  };
  return (
    <section className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Devices</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              type="button"
              onClick={handleShow}
              className="btn btn-sm btn-outline-secondary"
            >
              <FaPlus className="mr-2" />
              New Device
            </button>
          </div>
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
                    <Button variant="warning" size="sm">
                      <FaCogs /> Manage
                    </Button>{" "}
                    <Button variant="warning" size="sm">
                      <FaServer /> Edit
                    </Button>{" "}
                    <Button variant="danger" size="sm">
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Device</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Device Name</Form.Label>
              <Form.Control
                onChange={onChange}
                id="name"
                name="name"
                value={name}
                type="text"
                placeholder="Name"
              />
            </Form.Group>

            <Row>
              <Col sm={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Host Address</Form.Label>

                  <Form.Control
                    onChange={onChange}
                    id="host"
                    name="host"
                    value={host}
                    type="text"
                    placeholder="IP address"
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Port</Form.Label>

                  <Form.Control
                    onChange={onChange}
                    id="port"
                    name="port"
                    value={port}
                    type="text"
                    placeholder="Port"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                onChange={onChange}
                id="user"
                name="user"
                value={user}
                type="text"
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={onChange}
                id="pass"
                name="pass"
                value={pass}
                type="password"
                placeholder="password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" disabled={isLoading} variant="primary">
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Save Device"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </section>
  );
}

export default Devices;
