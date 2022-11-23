import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
    updateDevice, getDevice, reset

} from "../../store/devices/deviceSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus, FaServer, FaUsers } from "react-icons/fa";
import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";

const EditDevice = () => {
    const { id } = useParams();
    const [_device, _setDevice] = useState({
        name: "",
        host: "",
        user: "",
        pass: "",
        port: "",
    });
    const { name, host, user, pass, port } = _device;


    const dispatch = useDispatch();
    const { token } = useSelector(
        (state) => state.auth
    );
    const { device, isLoading, isError, message } = useSelector(
        (state) => state.devices
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!token) {
            navigate("/login");
        }

        dispatch(getDevice(id))

        return () => {
            dispatch(reset())
        }
    }, [dispatch])


    const onChange = (e) => {
        _setDevice((prevState) => ({
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

        dispatch(updateDevice(deviceData));
    };
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
                    <h1 className="h2">Edit Device</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <Row>
                    <Col md={5}>
                        <Form onSubmit={onSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Device Name</Form.Label>
                                <Form.Control
                                    onChange={onChange}
                                    id="name"
                                    name="name"
                                    value={device.name}
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
                                            value={device.host}
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
                                            value={device.port}
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
                                    value={device.user}
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
                                    value={device.pass}
                                    type="password"
                                    placeholder="password"
                                />
                            </Form.Group>

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
                                    "Save Changes"
                                )}
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </section>
        </>

    );

}

export default EditDevice;