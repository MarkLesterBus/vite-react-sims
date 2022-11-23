import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createDevice, getDevices

} from "../store/devices/deviceSlice";
import { FaPlus } from "react-icons/fa";
import { Col, Row, Button, Modal, Form, Spinner } from "react-bootstrap";

const CreateDevice = () => {
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
    const dispatch = useDispatch();
    const { devices, isLoading, isError, message } = useSelector(
        (state) => state.devices
    );

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
        dispatch(getDevices());
    };
    return (
        <div className="btn-group me-2">
            <button
                type="button"
                onClick={handleShow}
                className="btn btn-sm btn-outline-secondary"
            >
                <FaPlus className="mr-2" />
                New Device
            </button>
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
        </div>
    );

}

export default CreateDevice;