import { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import {
    getBridges, reset

} from "../store/devices/deviceSlice";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Col, Row, Dropdown, Button, Modal, Form, Spinner } from "react-bootstrap";

const CreateDevice = ({ uuid }) => {
    const [showBridge, setShowBridge] = useState(false);

    const [bridge, setBridge] = useState({
        name: "",
    });

    const { name } = bridge;

    const handleBridgeClose = () => setBridgeShow(false);
    const handleBridgeShow = () => setShowBridge(true);
    const dispatch = useDispatch();


    const { interfaces, bridges, isLoading, isError, message } = useSelector(
        (state) => state.system
    );

    useEffect(() => {


        dispatch(getBridges(uuid))

        return () => {
            dispatch(reset())
        }
    }, [dispatch])


    // const onChange = (e) => {
    //     setDevice((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

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
                <Form onSubmit={onSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={onChange}
                                id="name"
                                name="name"
                                value={name}
                                type="text"
                                placeholder="Name"
                            />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleBridgeClose}>
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