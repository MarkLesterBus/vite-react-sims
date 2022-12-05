import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";

import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";
import { createAddresses, getAddresses, createPools, getPools } from "../store/devices/system/ip";

const CreateIP = ({ uuid }) => {
    const [showAddress, setShowAddress] = useState(false);
    const [showPool, setShowPool] = useState(false);

    const [addresses, setAddress] = useState({
        address: "",
        network: "",
        _interface: "",
    });
    const [pools, setPools] = useState({
        name: "",
        ranges: "",
    });



    const { address, network, _interface } = addresses;
    const { name, ranges } = pools;

    const handleAddressClose = () => setShowAddress(false);
    const handlePoolClose = () => setShowPool(false);


    const handleAddresShow = () => setShowAddress(true);
    const handlePoolShow = () => setShowPool(true);


    const dispatch = useDispatch();


    const { interfaces, isLoading, isError, message } = useSelector(
        (state) => state.interfaces
    );


    const onChangeAddress = (e) => {
        setAddress((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onChangePool = (e) => {
        setPools((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };



    const onAddressSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                address: address,
                network: network,
                interface: _interface
            }
        };

        dispatch(createAddresses(payload));
        dispatch(getAddresses(uuid));
    }
    const onPoolSubmit = (e) => {
        e.preventDefault();

        const payload = {
            uuid: uuid,
            data: {
                name: name,
                ranges: ranges,
            }
        };

        dispatch(createPools(payload));
        dispatch(getPools(uuid));
    }

    return (
        <div className="btn-group me-2">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Add IP
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleAddresShow} >Addresses</Dropdown.Item>
                    <Dropdown.Item onClick={handlePoolShow} >Pool</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showAddress} onHide={handleAddressClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Address</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onAddressSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="address"
                                name="address"
                                value={address}
                                type="text"
                                placeholder="Address"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ranges</Form.Label>
                            <Form.Control
                                onChange={onChangeAddress}
                                id="network"
                                name="network"
                                value={network}
                                type="text"
                                placeholder="Network"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Interface</Form.Label>
                            <Form.Select onChange={onChangeAddress}
                                id="interface"
                                name="_interface"
                                value={_interface}
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
                        <Button variant="secondary" onClick={handleAddressClose}>
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
                                "Save Address"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showPool} onHide={handlePoolClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Pool</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onPoolSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChangePool}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ranges</Form.Label>
                            <Form.Control
                                onChange={onChangePool}
                                id="ranges"
                                name="ranges"
                                value={ranges}
                                type="text"
                                placeholder="0.0.0.0,1.1.1.1"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handlePoolClose}>
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
                                "Save Pool"
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );

}

export default CreateIP;