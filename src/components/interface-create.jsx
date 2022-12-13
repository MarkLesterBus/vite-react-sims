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
        vlan_bridge: "",
        vlan_ids: "",
        tagged: "",
        untagged: "",
    });

    const [port, setPort] = useState({
        port_interface: "",
        port_bridge: "",
        pvid: '',
    });


    const { bridge_name } = bridge;
    const { vlan_bridge, vlan_ids, tagged, untagged } = vlan;
    const { port_interface, port_bridge, pvid } = port;


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
                bridge: vlan_bridge,
                vlan_ids: vlan_ids,
                tagged: tagged,
                untagged: untagged
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
                bridge: port_bridge,
                pvid: pvid
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
                            <Form.Label>Bridge</Form.Label>
                            <Form.Select onChange={onChangeVlan}
                                id="vlan_bridge"
                                name="vlan_bridge"
                                value={vlan_bridge}
                            >
                                {
                                    Object.keys(bridges).map((bridge, i) => (
                                        <option key={i}>{bridges[bridge]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>PVID</Form.Label>

                            <Form.Control
                                onChange={onChangeVlan}
                                id="vlan_ids"
                                name="vlan_ids"
                                value={vlan_ids}
                                type="text"
                                placeholder="1"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tagged</Form.Label>
                            <Form.Select onChange={onChangeVlan}
                                id="tagged"
                                name="tagged"
                                value={tagged}
                            >
                                {
                                    Object.keys(interfaces).map((iface, i) => (
                                        <option key={i}>{interfaces[iface]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Untagged</Form.Label>
                            <Form.Select onChange={onChangeVlan}
                                id="untagged"
                                name="untagged"
                                value={untagged}
                            >
                                {
                                    Object.keys(interfaces).map((iface, i) => (
                                        <option key={i}>{interfaces[iface]['name']}</option>
                                    ))
                                }
                            </Form.Select>

                        </Form.Group>

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
                            <Col sm={6}>
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
                            <Col sm={6}>
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
                        <Form.Group className="mb-3">
                            <Form.Label>PVID</Form.Label>

                            <Form.Control
                                onChange={onChangePort}
                                id="pvid"
                                name="pvid"
                                value={pvid}
                                type="text"
                                placeholder="1"
                            />
                        </Form.Group>

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