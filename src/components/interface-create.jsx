import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createBridges, getBridges } from "../store/devices/system/bridge";
import { createVlans, getVlans } from "../store/devices/system/vlan";
import { createPorts, getPorts } from "../store/devices/system/ports";

const CreateInterface = ({ uuid }) => {
    const [showBridge, setShowBridge] = useState(false);
    const [showVlan, setShowVlan] = useState(false);
    const [showPort, setShowPort] = useState(false);

    const [bridge, setBridge] = useState({
        bridge_name: "",
    });

    const [vlan, setVlan] = useState({
        vlan_name: "",
        vlan_interface: "",
        vlan_id: "",
    });

    const [port, setPort] = useState({
        port_interface: "",
        port_bridge: "",
    });


    const { bridge_name } = bridge;
    const { vlan_name, vlan_interface, vlan_id } = vlan;
    const { port_interface, port_bridge } = port;


    const handleBridgeClose = () => setShowBridge(false);
    const handlePortClose = () => setShowPort(false);
    const handleVlanClose = () => setShowVlan(false);

    const handleBridgeShow = () => setShowBridge(true);
    const handlePortShow = () => setShowPort(true);
    const handleVlanShow = () => setShowVlan(true);

    const dispatch = useDispatch();


    const { interfaces, isLoading, isError, message } = useSelector(
        (state) => state.interfaces
    );
    const { bridges, bridgeisLoading, bridgeisError, bridgemessage } = useSelector(
        (state) => state.bridges
    );
    const { vlanisLoading, vlanisError, vlanmessage } = useSelector(
        (state) => state.interfaces
    );
    const { portisLoading, portisError, portmessage } = useSelector(
        (state) => state.interfaces
    );





    const onChangeBridge = (e) => {
        setBridge((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangeVlan = (e) => {
        setVlan((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangePort = (e) => {
        setPort((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const onBridgeSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: bridge_name
            }
        };

        dispatch(createBridges(payload));
        dispatch(getBridges(uuid));
    }
    const onVlanSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                'vlan-id': vlan_id,
                name: vlan_name,
                interface: vlan_interface
            }
        };
        dispatch(createVlans(payload));
        dispatch(getVlans(uuid));
    }
    const onPortSubmit = (e) => {
        e.preventDefault();
        const payload = {
            uuid: uuid,
            data: {
                interface: port_interface,
                bridge: port_bridge
            }
        };

        dispatch(createPorts(payload));
        dispatch(getPorts(uuid));
    }

    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add Interface
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleBridgeShow} >Bridge</Dropdown.Item>
                    <Dropdown.Item onClick={handleVlanShow} >VLAN</Dropdown.Item>
                    <Dropdown.Item onClick={handlePortShow}>Port</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showBridge} onHide={handleBridgeClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Bridge</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onBridgeSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeBridge}
                                id="bridge_name"
                                name="bridge_name"
                                value={bridge_name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleBridgeClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={bridgeisLoading} variant="primary">
                            {bridgeisLoading ? (
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
            <Modal show={showVlan} onHide={handleVlanClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New VLAN</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onVlanSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeVlan}
                                id="vlan_name"
                                name="vlan_name"
                                value={vlan_name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                        <Row>
                            <Col sm={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Interface</Form.Label>
                                    <Form.Select onChange={onChangeVlan}
                                        id="vlan_interface"
                                        name="vlan_interface"
                                        value={vlan_interface}
                                    >
                                        {
                                            Object.keys(interfaces).map((iface, i) => (
                                                <option key={i}>{interfaces[iface]['name']}</option>
                                            ))
                                        }
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>VLAN ID</Form.Label>

                                    <Form.Control
                                        onChange={onChangeVlan}
                                        id="vlan_id"
                                        name="vlan_id"
                                        value={vlan_id}
                                        type="text"
                                        placeholder="VLAN ID"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleVlanClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={vlanisLoading} variant="primary">
                            {vlanisLoading ? (
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
            <Modal show={showPort} onHide={handlePortClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Port</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onPortSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col sm={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Interface</Form.Label>
                                    <Form.Select onChange={onChangePort}
                                        id="port_interface"
                                        name="port_interface"
                                        value={port_interface}
                                    >
                                        {
                                            Object.keys(interfaces).map((iface, i) => (
                                                <option key={i}>{interfaces[iface]['name']}</option>
                                            ))
                                        }
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>bridge_name</Form.Label>
                                    <Form.Select onChange={onChangePort}
                                        id="port_bridge"
                                        name="port_bridge"
                                        value={port_bridge}
                                    >
                                        {
                                            Object.keys(bridges).map((bridge, i) => (
                                                <option key={i}>{bridges[bridge]['name']}</option>
                                            ))
                                        }
                                    </Form.Select>

                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePortClose}>
                            Close
                        </Button>
                        <Button type="submit" disabled={portisLoading} variant="primary">
                            {portisLoading ? (
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

export default CreateInterface;